const scriptName = '滴滴出行';
const didiTokenKey = 'didi_token';
const didiCityIdKey = 'didi_city_id';
const didiLotteryKey = 'didi_lottery_id';
const didiMySourceIdKey = 'didi_my_source_id';
const didiGroupIdKey = 'didi_group_id';
const didiFinanceChannelIdKey = 'didi_finance_channel_id';
const didiFinanceActivityIdKey = 'didi_finance_activity_id';
const getTokenRegex = /^https?:\/\/api\.didialift\.com\/beatles\/userapi\/user\/user\/getuserinfo?.*city_id=(\d+).*&token=([^&]*)/;
const getTokenRegex2 = /^https?:\/\/as\.xiaojukeji\.com\/ep\/as\/toggles\?.*location_cityid=(\d+).*&ticket=([^&]*)/;
const getLidRegex = /^https?:\/\/bosp-api\.xiaojukeji\.com\/bosp-api\/lottery\/info?.*lid=([^&]*)/;
const getGroupIdRegex = /^https?:\/\/bosp-api\.xiaojukeji\.com\/wechat\/benefit\/public\/v2\/index/;
const getActivityIdRegex = /^https?:\/\/pay\.diditaxi\.com\.cn\/web_wallet\/v2\/wallet\/home/;

// let sourceIdConf = {'7mO4XP93fb84VMSC8Xk5vg%3D%3D': 7, 'pDmWW7HoWUkNu2nmJ3HJEQ%3D%3D': 3};
let sourceIdConf = {}
let magicJS = MagicJS(scriptName, "INFO");
magicJS.unifiedPushUrl = magicJS.read('didi_unified_push_url') || magicJS.read('magicjs_unified_push_url');

// 滴滴出行签到
function BenefitCheckIn(token, cityId, source_id=''){
  const funcName = '福利金签到';
  return new Promise((resolve, reject) =>{
    let url = '';
    if (source_id){
      url = `https://bosp-api.xiaojukeji.com/wechat/benefit/public/index?city_id=${cityId}&share_source_id=${source_id}&share_date=${magicJS.today()}`;
    }
    else{
      url = `https://bosp-api.xiaojukeji.com/wechat/benefit/public/index?city_id=${cityId}&share_date=${magicJS.today()}`;
    }
    magicJS.logDebug(`当前使用的source_id：${source_id}`);
    let options = {
      url: url,
      headers: {
        'Didi-Ticket': token
      },
      body: ''
    }
    magicJS.get(options, (err, resp, data)=>{
      if (err){
        magicJS.logError(`${funcName}失败，请求异常：${err}`);
        reject('签到失败');
      }
      else{
        try{
          magicJS.logDebug(`${funcName}接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno == 0){
            if (obj.data.hasOwnProperty('share') && obj.data.share.hasOwnProperty('source_id')){
              magicJS.write(didiMySourceIdKey, obj.data.share.source_id);
              magicJS.logDebug(`您的source_id：${obj.data.share.source_id}`);
            }
            if (obj.data.sign.info){
              let signDays = 0;
              let signAmount = 0;
              obj.data.sign.info.sign_activity.forEach(element => {
                if (element.sign_status == 1){
                  signDays += 1;
                  // 累计每日签到奖励
                  if (element.sign_rule.hasOwnProperty('track_bonus')){
                    element.sign_rule.track_bonus.forEach(item => {
                      signAmount += item.amount;
                    });
                  }
                  // 连续签到的额外奖励
                  if (element.sign_rule.perfect_attendance_bonus && element.sign_rule.perfect_attendance_bonus.length > 0){
                    element.sign_rule.perfect_attendance_bonus.forEach(item => {
                      signAmount += item.amount;
                    });
                  }
                }
              });
              resolve(['签到成功', signDays, signAmount]);
            }
            else{
              resolve(['重复签到', 0, 0, []]);
            }
          }
          else if(obj.errno === 101){
            reject(`签到失败，${obj.errmsg}`);
          }
          else{
            magicJS.logError(`${funcName}失败，接口响应异常：${data}`);
            reject('签到失败，响应异常，请查阅日志！');
          }
        }
        catch(err){
          magicJS.logError(`${funcName}失败，执行异常：${err}，接口返回：${data}`);
          reject('签到失败，执行异常！');
        }
      }
    })
  });
}

// 获取订单列表
function GetOrderList(token){
  return new Promise((resolve) =>{
    let url = `https://api.udache.com/gulfstream/passenger/v2/other/pListReward?token=${token}`;
    magicJS.get(url, (err, resp, data)=>{
      if (err){
        magicJS.logError(`获取待领取的福利金失败，请求异常：${err}`);
        resolve([]);
      }
      else{
        magicJS.logDebug(`获取待领取的福利金，接口响应：${data}`);
        let obj = JSON.parse(data);
        if (obj.errno == 0){
          resolve(typeof obj.data === 'undefined'? []: obj.data);
        }
        else{
          magicJS.logWarning(`没有获取到待领取的福利金，响应异常：${data}`);
          resolve([]);
        }
      }
    })
  })
}

// 领取福利金
function GetRewards(orderId, token){
  return new Promise((resolve) =>{
    let url = `https://api.udache.com/gulfstream/passenger/v2/otherpGetRewards?order_id=${orderId}&token=${token}`;
    magicJS.get(url, (err, resp, data)=>{
      if (err){
        magicJS.logError(`领取福利金失败，请求异常：${err}`);
        resolve(0);
      }
      else{
        magicJS.logInfo(`领取福利金，接口响应：${data}`);
        let obj = JSON.parse(data);
        if (obj.errno == 0){
          resolve(0);
        }
        else{
          magicJS.logWarning(`没有获取到待领取的福利金，响应异常：${data}`);
          resolve(0);
        }
      }
    })
  })
}

// 获取会员抽奖次数
function GetDrawAmount(lid, token){
  const funcName = '获取会员抽奖次数';
  return new Promise((resolve) =>{
    try{
      let url = `https://bosp-api.xiaojukeji.com/bosp-api/lottery/info?lid=${lid}&token=${token}&lucky_users=0`;
      magicJS.get(url, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          resolve(0);
        }
        else{
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.code == 0){
            magicJS.logInfo(`${funcName}：${obj.data.eliminate_info.base_share_amount}`);
            resolve(obj.data.eliminate_info.base_share_amount);
          }
          else if (obj.code == 20008){
            magicJS.logWarning(obj.message);
            resolve(0);
          }
          else{
            magicJS.logWarning(`${funcName}失败，响应异常：${data}`);
            resolve(0);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      resolve(0);
    }
  });
}

// 会员抽奖
function LotteryDraw(lid, token){
  const funcName = '会员抽奖';
  return new Promise((resolve) =>{
    try{
      let url = `https://bosp-api.xiaojukeji.com/bosp-api/lottery/draw?lid=${lid}&token=${token}`;
      magicJS.get(url, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          resolve();
        }
        else{
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.code === 0){
            resolve(obj.data.prize.name);
          }
          else if(obj.code === 20003){
            magicJS.logWarning(`${funcName}出现异常：${data}`);
            resolve(obj.message);
          }
          else if(obj.code === 20010){
            magicJS.logWarning(`${funcName}福利金不足：${data}`);
            resolve(obj.message);
          }
          else{
            magicJS.logWarning(`${funcName}，响应异常：${data}`);
            resolve(obj.message);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 随机获取SourceId
function getSourceId(){
  let mySourceId = magicJS.read(didiMySourceIdKey);
  if (!!mySourceId){
    delete sourceIdConf[mySourceId];
  }
  let newSourceIdList = [];
  for (sourceId in sourceIdConf){
    let sourceIdArray = new Array(sourceIdConf[sourceId]).fill(sourceId);
    newSourceIdList = newSourceIdList.concat(sourceIdArray);
  } 
  return newSourceIdList[Math.round(Math.random() * (newSourceIdList.length - 1))]; 
}

// 天天有奖签到
function DailyLotteryDraw(token, channelId, activityId, clientId=1){
  const funcName = '天天有奖签到';
  return new Promise((resolve, reject) =>{
    try{
      let options = {
        url: 'https://manhattan.webapp.xiaojukeji.com/marvel/api/manhattan-signin-task/signIn/execute',
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans;q=1",
          "Content-Type": "application/json",
          "X-Surge-Skip-Scripting": true
        },
        body: magicJS.isNode? {'token': token, 'channelId': channelId, 'activityId': activityId, 'clientId': clientId} : JSON.stringify({'token': token, 'channelId': channelId, 'activityId': activityId, 'clientId': clientId})
      }
      magicJS.post(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          reject('签到失败');
        }
        else{
          let obj = typeof data === 'string'? JSON.parse(data) : data;
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let giftList = [];
          if (obj.errorCode === 0){
            obj.data.giftDetail.forEach(gift => {
              magicJS.logInfo(`${funcName}结果：${gift.displayJson.displayName} ${gift.displayValue} ${gift.displayUnit}`);
              giftList.push({'name': gift.displayJson.displayName, 'value': gift.displayValue, 'unit': gift.displayUnit, 'endDate':gift.giftEndDate});
            });
            resolve([`连续签到${obj.data.serialSignInTimes}天`, giftList]);
          }
          else if(obj.errorCode === 500000 && obj.errorMsg === "今天已经签到过了"){
            resolve([`重复签到`, []]);
          }
          else if(obj.errorCode === 500000 && obj.errorMsg === "断签"){
            resolve(['出现断签', []]);
          }
          else{
            magicJS.logWarning(`${funcName}失败，响应异常：${data}`);
            reject('签到失败');
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      reject('签到失败');
    }
  });
}

// 天天有奖签到断签后重新开始周期
function DailyLotteryRestart(token, activityId, clientId=1){
  const funcName = '天天有奖断签重置';
  return new Promise((resolve, reject) =>{
    try{
      let options = {
        url: 'https://manhattan.webapp.xiaojukeji.com/marvel/api/manhattan-signin-task/signIn/restart',
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans;q=1",
          "Content-Type": "application/json",
          "X-Surge-Skip-Scripting": true
        },
        body: magicJS.isNode? {'token': token, 'activityId': activityId, 'clientId': clientId} : JSON.stringify({'token': token, 'activityId': activityId, 'clientId': clientId})
      }
      magicJS.post(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          reject(`${funcName}断签，尝试开始新的签到周期失败，请求异常`);
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logWarning(`${funcName}出现断签，尝试开始新的签到周期：${data}`);
          let obj = JSON.parse(data);
          if (obj.errorCode === 500000 && obj.errorMsg === '非断签状态无法清零并重新开始'){
            magicJS.logWarning('非断签状态无法清零并重新开始');
            resolve(obj.errorMsg);
          }
          else if(obj.errorCode === 0 && obj.errorMsg === 'ok'){
            magicJS.logInfo('重新开始新的签到周期成功');
            resolve()
          }
          else{
            magicJS.logError(`重新开始新的签到周期失败，响应异常：${data}`);
            resolve()
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`天天有奖失败，异常信息：${err}`);
      resolve([null, []]);
    }
  });
}

// 获取用户信息
function GetUserInfo(ts, token, app_id='common'){
  const funcName = '获取用户信息';
  return new Promise((resolve) =>{
    try{
      let url = `https://quartz.xiaojukeji.com/volcano/quartz/user/info?ts=${ts}&app_id=${app_id}&token=${token}&source_id=wdcn_1000&partition_id=1007`;
      magicJS.get(url, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          resolve();
        }
        else{
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            resolve(obj);
          }
          else{
            magicJS.logWarning(`${funcName}息失败，响应异常：${data}`);
            resolve();
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 领取积分
function CollectPoint(token, app_id='common'){
  const funcName = '领取积分';
  return new Promise((resolve) =>{
    try{
      let options = {
        'url': `https://quartz.xiaojukeji.com/volcano/quartz/points/collect?ts=${new Date().getTime()}`,
        'headers': {
          "Accept": "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "quartz.xiaojukeji.com",
          "Origin": "https://page.udache.com",
          "Referer": "https://page.udache.com/activity/apps/gain-points/index.html",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.0.12 FusionKit/1.2.14"
        },
        'body': `app_id=${app_id}&token=${token}`
      };
      magicJS.post(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          resolve();
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            magicJS.logInfo(`${funcName}完成`);
            resolve();
          }
          else{
            magicJS.logWarning(`${funcName}失败，响应异常：${data}`);
            resolve();
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 获取积分签到活动配置
function GetActivitiesDetail(){
  const funcName = '获取积分签到活动详情';
  return new Promise((resolve, reject) =>{
    try{
      let options = {
        'url': `https://dpubstatic.udache.com/static/dpubimg/ee412b1555e0565f818f919c9193aa65/index.html`,
        'headers': {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Host": "dpubstatic.udache.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.0.12 FusionKit/1.2.14"
        }
      };
      magicJS.get(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败：${err}`);
          reject();
        }
        else{
          data = data.replace(' ', '');
          let startTime = data.match(/"start_time":(\d*)/)[1];
          let endTime = data.match(/"end_time":(\d*)/)[1];
          let activityId = data.match(/"activity_id":"(\d*)/)[1];
          let configId = data.match(/"dpubConfigId":(\d*)/)[1];
          let tempPrizeIdList = data.match(/"prize_id":"[^"]*/ig);
          let prizeIdList = [];
          tempPrizeIdList.forEach(element => {
            let prizeId = element.match(/"prize_id":"([^"]*)/)[1];
            if (!prizeIdList.includes(prizeId)){
              prizeIdList.push(prizeId);
            }
          });
          resolve([parseInt(startTime), parseInt(endTime), activityId, configId, prizeIdList]);
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      reject();
    }
  });
}

// 每日积分签到
function PointSignin(activityId, signinDay, userToken){
  const funcName = '积分签到';
  return new Promise((resolve) =>{
    try{
      let options = {
        'url': `https://gsh5act.xiaojukeji.com/dpub_data_api/activities/${activityId}/signin`,
        'headers': {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/json; charset=utf-8",
          "Host": "gsh5act.xiaojukeji.com",
          "Origin": "https://dpubstatic.udache.com",
          "Referer": "https://dpubstatic.udache.com/",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
        },
        'body': {
          "signin_day": signinDay,
          "signin_type": 0,
          "signin_user_token": userToken
        }
      };
      magicJS.post(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            magicJS.logInfo(`${funcName}完成`);
            resolve('签到成功');
          }
          else if (obj.errno === 1 && obj.errmsg.indexOf('已经签') >= 0){
            magicJS.logWarning('本日已签到过了');
            resolve('重复签到');
          }
          else{
            magicJS.logWarning(`${funcName}失败，响应异常：${data}`);
            resolve();
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 每日积分签到领取奖励
function PointLottery(activityId, lotteryId, userToken, signinDay){
  const funcName = '领取积分签到奖励';
  return new Promise((resolve, reject) =>{
    try{
      let options = {
        'url': `https://gsh5act.xiaojukeji.com/dpub_data_api/activities/${activityId}/reward_lottery`,
        'headers': {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/json; charset=utf-8",
          "Host": "gsh5act.xiaojukeji.com",
          "Origin": "https://dpubstatic.udache.com",
          "Referer": "https://dpubstatic.udache.com/",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
        },
        'body': {
          "user_token": userToken,
          "signin_day": signinDay,
          "lottery_id": lotteryId
        }
      };
      magicJS.post(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          reject();
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            magicJS.logInfo(`${funcName}完成`);
            resolve(obj.lottery.prize.win_content);
          }
          else if(obj.errno === 1 && obj.errmsg === '您已经领过签到当天奖励'){
            magicJS.logWarning(obj.errmsg);
            resolve('已领取过奖励');
          }
          else if(obj.errno === 1){
            let msg = obj.errmsg || `${funcName}异常`;
            reject(msg);
          }
          else{
            magicJS.logWarning(`${funcName}失败，响应异常：${data}`);
            reject();
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      reject();
    }
  });
}

// 获取积分签到结果
function GetPointSigninDay(activityId, userToken){
  return new Promise((resolve) =>{
    try{
      let options = {
        'url': `https://gsh5act.xiaojukeji.com/dpub_data_api/activities/${activityId}/signin?signin_user_token=${userToken}&include=current_server_time`,
        'headers': {
          "Accept": "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Host": "gsh5act.xiaojukeji.com",
          "Origin": "https://dpubstatic.udache.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.0.12 FusionKit/1.2.14"
        }
      };
      magicJS.get(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`获取积分签到结果失败，请求异常：${err}`);
          resolve(0);
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logDebug(`获取积分签到结果失败，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            resolve(obj.signins.length);
          }
          else if(obj.errno === 1){
            let msg = obj.errmsg || '获取积分签到结果异常';
            magicJS.logError(msg);
            resolve(0);
          }
          else{
            magicJS.logWarning(`获取积分签到结果失败，响应异常：${data}`);
            resolve(0);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`获取积分签到结果失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 瓜分福利金/薅羊毛活动配置
function GetWoolActivity(ticket, groupId, actId='NaN', appId='common'){
  return new Promise((resolve) =>{
    try{
      let ts = new Date().getTime();
      let options = {
        'url': `https://bosp-api.xiaojukeji.com/wechat/lucina/activity?ts=${ts}&app_id=${appId}&group_id=${groupId}&act_id=${actId}&ticket=${ticket}`,
        'headers': {
          "Accept": "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Host": "bosp-api.xiaojukeji.com",
          "Origin": "https://page.udache.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.0.12 FusionKit/1.2.14"
        }
      };
      magicJS.get(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`获取瓜分福利金活动明细失败，请求异常：${err}`);
          resolve([]);
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logDebug(`获取瓜分福利金活动明细，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            let woolsIndex = [];
            if (obj.data.running !== null && obj.data.running.hasOwnProperty('sheep')){
              obj.data.running.sheep.wools.forEach(element => {
                if (element.num > 0){
                  woolsIndex.push(element.index);
                }
              });
            }
            resolve([obj.data.act_id, obj.data.pre_act.id, woolsIndex]);
          }
          else if(obj.errno === 1){
            magicJS.logError(`获取瓜分福利金活动明细异常：${obj.errmsg}`);
            resolve([]);
          }
          else{
            magicJS.logWarning(`获取瓜分福利金活动明细果失败，响应异常：${data}`);
            resolve([]);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`获取瓜分福利金活动明细失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 天降羊毛
function WoolSignin(ticket, actId, appId='common'){
  return new Promise((resolve) =>{
    const funcName = '天降羊毛';
    try{
      let ts = new Date().getTime();
      let options = {
        'url': `https://bosp-api.xiaojukeji.com/wechat/lucina/sign?ts=${ts}`,
        'headers': {
          "Accept": "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "bosp-api.xiaojukeji.com",
          "Origin": "https://page.udache.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.0.12 FusionKit/1.2.14"
        },
        body: {
          "app_id": appId,
          "act_id": actId,
          "ticket": ticket
        }
      };
      magicJS.post(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          resolve(0);
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            resolve(obj.data.num);
          }
          else if(obj.errno === 8102){
            magicJS.logWarning(obj.errmsg);
            resolve(0);
          }
          else{
            magicJS.logWarning(`${funcName}失败，响应异常：${data}`);
            resolve(0);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 拾取羊毛
function CollectWools(index, actId, ticket, appId='common'){
  const funcName = '拾取羊毛';
  return new Promise((resolve) =>{
    try{
      let ts = new Date().getTime();
      let options = {
        'url': `https://bosp-api.xiaojukeji.com/wechat/lucina/sheep?ts=${ts}`,
        'headers': {
          "Accept": "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Host": "bosp-api.xiaojukeji.com",
          "Origin": "https://page.udache.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.0.12 FusionKit/1.2.14"
        },
        body: {
          "app_id": appId,
          "act_id": actId,
          "ticket": ticket,
          "index": index
        }
      };
      magicJS.post(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`${funcName}失败，请求异常：${err}`);
          resolve(0);
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logDebug(`${funcName}，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            resolve(obj.data.num);
          }
          else{
            magicJS.logWarning(`${funcName}失败，响应异常：${data}`);
            resolve(0);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`${funcName}失败，异常信息：${err}`);
      resolve();
    }
  });
}

;(async () =>{
  if (magicJS.isRequest){
    if (getTokenRegex.test(magicJS.request.url) || getTokenRegex2.test(magicJS.request.url)){
      try{
        let arr = magicJS.request.url.match(getTokenRegex);
        // 使用备用匹配
        if (arr === null){
          arr = magicJS.request.url.match(getTokenRegex2);
        }
        let cityId = arr[1];
        let token = arr[2];
        let hisToken = magicJS.read(didiTokenKey);
        magicJS.logDebug(`city：${cityId}，token：${token}`);
        magicJS.write(didiCityIdKey, cityId);
        if (token !== hisToken){
          magicJS.write(didiTokenKey, token);
          magicJS.logInfo(`新的Token：\n${token}，旧的Token：\n${hisToken}，Token已更新。`);
          magicJS.notify('🎉滴滴出行写入Token成功！！');
        }
        else{
          magicJS.logInfo(`新的Token：\n${token}，旧的Token：\n${hisToken}，滴滴出行Token没有变化，无需更新。`);
        }
      }
      catch(err){
        magicJS.logError(`滴滴出行写入Token失败，执行异常：${err}。`);
        magicJS.notify('❌滴滴出行写入Token失败，请查阅日志');
      }
    }
    // 获取lid
    else if (getLidRegex.test(magicJS.request.url)){
      try{
        let arr = magicJS.request.url.match(getLidRegex);
        let lid = arr[1];
        let hisLid = magicJS.read(didiLotteryKey);
        magicJS.logDebug(`新的LotteryId：${lid}，旧的LotteryId：${hisLid}`);
        if (lid !== hisLid)
        {
          magicJS.write(didiLotteryKey, lid);
          magicJS.notify('🎉滴滴出行写入LotteryId成功！！');
        }
        else{
          magicJS.logInfo(`滴滴出行LotteryId没有变化，无需更新。LotteryId：${lid}`);
        }
      }
      catch (err){
        magicJS.logError(`滴滴出行写入LotteryId失败，执行异常：${err}。`);
        magicJS.notify('❌滴滴出行写入LotteryId失败，请查阅日志');
      }
    }
  }
  else if(magicJS.isResponse){
    // 天天有奖ActivityId和ChannelId
    if (getActivityIdRegex.test(magicJS.request.url)){
      try{
        let financeActivityId = magicJS.response.body.match(/activityid=(\d*)/)[1];
        let financeChannelId = magicJS.response.body.match(/channelId=(\d*)/)[1];
        let hisFinanceActivityIdKey = magicJS.read(didiFinanceActivityIdKey);
        let hisFinanceChannelId = magicJS.read(didiFinanceChannelIdKey);
        if (financeActivityId != hisFinanceActivityIdKey || financeChannelId != hisFinanceChannelId){
          magicJS.write(didiFinanceActivityIdKey, financeActivityId);
          magicJS.write(didiFinanceChannelIdKey, financeChannelId);
          magicJS.logInfo(`获取天天有奖ActivityId和ChannelId成功：${financeActivityId}，${financeChannelId}`);
          magicJS.notify('获取天天有奖ActivityId和ChannelId成功');
        }
        else{
          magicJS.logInfo('天天有奖ActivityId和ChannelId没有变化，无需更新。');
        }
      }
      catch(err){
        magicJS.logError(`获取天天有奖ActivityId异常：${err}`);
      }
    }
    // 获取GroupId
    else if (getGroupIdRegex.test(magicJS.request.url)){
      try{
        let matchArray = magicJS.response.body.match(/group_id=(\d*)/);
        if (matchArray){
          let groupId = matchArray[1];
          let hisGroupId = magicJS.read(didiGroupIdKey);
          if (groupId != hisGroupId){
            magicJS.write(didiGroupIdKey, groupId);
            magicJS.logInfo(`获取GroupId成功：${groupId}`);
            magicJS.notify(`获取GroupId成功：${groupId}`);
          }
          else{
            magicJS.logInfo(`当前获取的GroupId：${groupId}，没有变化，无需更新。`)
          }
        }
      }
      catch(err){
        magicJS.logError(`获取GroupId异常：${err}`);
      }
    }
  }
  else{
    let title = scriptName;
    let sysMsg = ''; // 系统消息
    let cityId = magicJS.read(didiCityIdKey);
    let token = magicJS.read(didiTokenKey);
    let groupId = magicJS.read(didiGroupIdKey);
    let lotteryId = magicJS.read(didiLotteryKey) || '41h93p17';
    let financeChannelId = magicJS.read(didiFinanceChannelIdKey) || '5286158810015504'
    let financeActivityId = magicJS.read(didiFinanceActivityIdKey) || '140737579736652';
    let clientId = 1;
    let avatar = '';
    // 账户信息相关通知
    let accountSubTitle = '';
    let accountContent = '';

    if (token && cityId){
      let source_id = getSourceId();

      magicJS.logInfo('=======会员部分开始=======');
      magicJS.logInfo('🔥获取用户信息');
      // 获取用户信息
      let userInfo = await GetUserInfo(new Date().getTime(), token, app_id='common');
      if (!!userInfo){
        try{
          avatar = userInfo.data.info.avatar;
          title += ` - ${userInfo.data.info.cell}`;
          magicJS.logInfo(`账户共有积分${userInfo.data.account.dcoin.coin}`);
          accountSubTitle = `🚕账户信息：共有积分${userInfo.data.account.dcoin.coin}`;
          if (!!userInfo.data.account.dcoin.expire_balance){
            if (accountContent) accountContent += '\n';
            let expireBalance = `${userInfo.data.account.dcoin.expire_balance}积分在${userInfo.data.account.dcoin.expire_date}过期`;
            magicJS.logInfo(expireBalance);
            accountContent += expireBalance;
          }
        }
        catch(err){
          magicJS.logError(`处理用户信息出现异常：${err}`);
        }
      }

      // 会员抽奖
      magicJS.logInfo('🔥抽奖开始');
      if (lotteryId) {
        let drawCount = await GetDrawAmount(lotteryId, token);
        if (drawCount > 0){
          if (accountContent) accountContent += '\n';
          magicJS.logInfo(`可抽奖次数：${drawCount}`);
          accountContent += `会员抽奖次数：${drawCount}次`;
          for (let i=0;i<drawCount;i++){
            // 避免抽奖太频繁
            await magicJS.sleep(5000);
            let drawResult = await LotteryDraw(lotteryId, token);
            if (drawResult){
              let resultStr = `第${i+1}次：${drawResult}`;
              magicJS.logInfo(resultStr);
              accountContent += `\n${resultStr}`;
            }
          }
        }
      }

      magicJS.logInfo('=======福利金部分开始=======');
      // 福利金部分通知
      let benefitSubTitle = '';
      let benefitContent = '';
      // 福利金签到 
      magicJS.logInfo('🔥福利金签到开始');
      let [didiCheckInErr, [didiSigninStr, signDays, signAmount]] = await magicJS.attempt(magicJS.retry(BenefitCheckIn, 3, 1000)(token, cityId, source_id), [null, null, null, null]);
      if (didiCheckInErr){
        magicJS.logError(didiCheckInErr);
        benefitSubTitle += `🧧福利金签到：${didiCheckInErr}`;
      }
      else{
        magicJS.logInfo(didiSigninStr);
        benefitSubTitle += `🧧福利金签到：${didiSigninStr}`;
        if (signDays > 0){
          benefitContent += `本周期已连续签到${signDays}天\n累计获得${signAmount}福利金`;
        }
        // if (subsidy > 0){
        //   benefitContent += `获取${subsidy}福利金`;
        // }
        // if (balance) benefitContent = `账户共${balance}福利金，可抵扣${balance/100}元`;
        // // 系统通消息，通知置后提醒
        // notification.forEach(element => {
        //   if (sysMsg) sysMsg += '\n';
        //   sysMsg += element + '';
        // });
      }

      // 瓜分福利金
      magicJS.logInfo('🔥瓜分福利金开始');
      let [woolActId, woolPreActId, woolsIndex] = await GetWoolActivity(token, groupId);
      if (!woolActId){
        magicJS.logWarning(`获取瓜分福利金act_id失败`);
      }
      else{
        magicJS.logDebug(`获取到woolActId：${woolActId}`);
        if (woolsIndex.length === 0){
          magicJS.logWarning('本次没有发现待薅的羊毛');
        }
        else{
          // 天降羊毛
          let woolSigninNum = await WoolSignin(token, woolActId);
          magicJS.logInfo(`天降羊毛获取${woolSigninNum}团羊毛`);
          if (benefitContent) benefitContent += '\n';
          benefitContent += `天降羊毛获取${woolSigninNum}团羊毛`;
          // 薅羊毛
          magicJS.logInfo(`发现${woolsIndex.length}只待薅的羊🐏`);
          let woolCollectCNum = 0;
          for(let index of woolsIndex){
            woolCollectCNum += await CollectWools(index, woolActId, token);
          }
          magicJS.logInfo(`本次从${woolsIndex.length}只羊🐏身上，共获取${woolCollectCNum}团羊毛`);
          if (benefitContent) benefitContent += '\n';
          benefitContent += `从${woolsIndex.length}只🐏身上，获取${woolCollectCNum}团羊毛`;
        }
      }

      // 领取福利金
      magicJS.logInfo('🔥领取福利金开始');
      let orderList = await GetOrderList(token);
      magicJS.logInfo(`当前获取的订单信息：${JSON.stringify(orderList)}`);
      let rewardList = [];
      let total = 0;
      orderList.forEach(element => {
        total += Number(element.bonus_info.amount);
        rewardList.push(GetRewards(element.oid, token));
      });
      if (rewardList){
        await Promise.all(rewardList);
      }

      if (total > 0){
        if (benefitContent) benefitContent += '\n';
        benefitContent += `\n本日领取福利金${total}`
      }
      if (benefitSubTitle || benefitContent){
        magicJS.notify(title, benefitSubTitle, benefitContent, {'media-url':avatar});
      }

      magicJS.logInfo('=======积分部分开始=======');
      let pointSubTitle = '';
      let pointContent = '';
      // 领取积分
      magicJS.logInfo('🔥领取积分开始');
      await CollectPoint(token, app_id='common');

      // 获取积分签到活动详情
      magicJS.logInfo('🔥积分签到开始');
      let ts = parseInt(Date.parse(new Date()).toString().substr(0,10));
      let [, [pointStartTime=null, pointEndTime=null, pointActivityId=null, pointConfigId=null, pointPrizeIds=null]] = await magicJS.attempt(GetActivitiesDetail());
      magicJS.logInfo(`活动配置获取结果\nts:${ts}\nstart_time：${pointStartTime}\nend_time：${pointEndTime}\nactivity_id：${pointActivityId}\nlottery_id：${JSON.stringify(pointPrizeIds)}`);
      if (pointStartTime <= ts <= pointEndTime){
        magicJS.logInfo('活动时间校验通过');
        // 获取签到天数
        let pointSigninDay = await GetPointSigninDay(pointActivityId, token);
        pointSigninDay += 1;
        // 积分签到
        let pointSigninStr = await PointSignin(pointActivityId, pointSigninDay, token);
        if (pointSigninStr){
          pointSubTitle = `💡积分签到：${pointSigninStr}`;
        }
        // 获取签到天数
        if (pointSigninStr === '签到成功' && pointSigninDay){
          pointContent = `连续签到${pointSigninDay}天`;
          if (pointPrizeIds.length >= pointSigninDay){
            // 签到后领取奖励
            await magicJS.sleep(5000);
            let prizeContent = await  magicJS.retry(PointLottery, 3, 1000)(pointActivityId, pointPrizeIds[pointSigninDay-1], token, pointSigninDay);
            if (prizeContent){
              pointContent += `，${prizeContent}`;
            }
          }
        }
      }
      else{
        magicJS.logError(`无法获取到有效的积分签到配置，可能活动已结束或活动地址变化，请联系原作者。`);
      }
      if (pointSubTitle || pointContent){
        magicJS.notify(title, pointSubTitle, pointContent, {'media-url':avatar});
      }

      magicJS.logInfo('=======滴滴金融部分开始=======');
      // 天天有奖
      let financeSubTitle = '';
      let financeContent = '';
      magicJS.logInfo('🔥天天有奖开始');
      if (financeChannelId && financeActivityId){
        let [dailyLotteryErr, [serialSignInTimes, giftList]] = await magicJS.attempt(magicJS.retry(DailyLotteryDraw, 5, 1000, async(result)=>{
          let [msg,] = result;
          if (msg.indexOf('断签') >= 0){
            magicJS.logWarning('天天有奖出现断签');
            await DailyLotteryRestart(token, financeActivityId, clientId);
            throw msg;
          }
        })(token, financeChannelId, financeActivityId), ["", []]);
        if (dailyLotteryErr){
          magicJS.logError(dailyLotteryErr);
          financeSubTitle = `🎁天天有奖：${dailyLotteryErr}`;
        }
        else{
          if (serialSignInTimes !== null){
            magicJS.logInfo(serialSignInTimes);
            financeSubTitle = `🎁天天有奖：${serialSignInTimes}`;
          }
          if (giftList.length > 0){
            for(let i=0;i<giftList.length;i++){
              if (financeContent) financeContent += '\n';
              financeContent += `${giftList[i].name} ${giftList[i].value} ${giftList[i].unit} 过期 ${giftList[i].endDate}`;
            }
          }
        }
      }
      if (financeSubTitle || financeContent){
        magicJS.notify(title, financeSubTitle, financeContent, {'media-url':avatar});
      }
      
      magicJS.logInfo('=======系统消息部分开始=======');
      // 系统消息
      magicJS.logInfo('🔥系统消息开始');
      if (sysMsg){
        accountSubTitle += '\n📧系统消息';
        magicJS.logInfo(sysMsg);
        if (accountContent) accountContent += '\n';
        accountContent += sysMsg;
      }
      else{
        magicJS.logInfo('没有任何系统消息');
      }
      if (accountSubTitle || accountContent){
        magicJS.notify(title, accountSubTitle, accountContent, {'media-url':avatar});
      }
    }
    else{
      magicJS.notify(title, '', '❓请先获取滴滴出行Token再执行脚本\n路径：滴滴出行-钱包-福利金');
    }
  }
  magicJS.done();
})();

function MagicJS(e="MagicJS",t="INFO"){const s={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){this.version="2.2.3.3";this.scriptName=e;this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};this.isLoon=typeof $loon!=="undefined";this.isQuanX=typeof $task!=="undefined";this.isJSBox=typeof $drive!=="undefined";this.isNode=typeof module!=="undefined"&&!this.isJSBox;this.isSurge=typeof $httpClient!=="undefined"&&!this.isLoon;this.platform=this.getPlatform();this.node={request:undefined,fs:undefined,data:{}};this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";this.logLevel=t;this._unifiedPushUrl="";if(this.isNode){this.node.fs=require("fs");this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(e){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else if(this.isJSBox){if(!$file.exists("drive://MagicJS")){$file.mkdir("drive://MagicJS")}if(!$file.exists("drive://MagicJS/magic.json")){$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"})}}}set unifiedPushUrl(e){this._unifiedPushUrl=!!e?e.replace(/\/+$/g,""):""}set logLevel(e){this._logLevel=typeof e==="string"?e.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}getPlatform(){if(this.isSurge)return"Surge";else if(this.isQuanX)return"QuantumultX";else if(this.isLoon)return"Loon";else if(this.isJSBox)return"JSBox";else if(this.isNode)return"Node.js";else return"unknown"}read(e,t=""){let s="";if(this.isSurge||this.isLoon){s=$persistentStore.read(e)}else if(this.isQuanX){s=$prefs.valueForKey(e)}else if(this.isNode){s=this.node.data}else if(this.isJSBox){s=$file.read("drive://MagicJS/magic.json").string}try{if(this.isNode)s=s[e];if(this.isJSBox)s=JSON.parse(s)[e];if(!!t){if(typeof s==="string")s=JSON.parse(s);s=!!s&&typeof s==="object"?s[t]:null}}catch(i){this.logError(i);s=!!t?{}:null;this.del(e)}if(typeof s==="undefined")s=null;try{if(!!s&&typeof s==="string")s=JSON.parse(s)}catch(e){}this.logDebug(`READ DATA [${e}]${!!t?`[${t}]`:""}(${typeof s})\n${JSON.stringify(s)}`);return s}write(e,t,s=""){let i=!!s?{}:"";if(!!s&&(this.isSurge||this.isLoon)){i=$persistentStore.read(e)}else if(!!s&&this.isQuanX){i=$prefs.valueForKey(e)}else if(this.isNode){i=this.node.data}else if(this.isJSBox){i=JSON.parse($file.read("drive://MagicJS/magic.json").string)}if(!!s){try{if(typeof i==="string")i=JSON.parse(i);i=typeof i==="object"&&!!i?i:{}}catch(t){this.logError(t);this.del(e);i={}}if(this.isJSBox||this.isNode){if(!i.hasOwnProperty(e)||typeof i[e]!=="object"||i[e]===null){i[e]={}}if(!i[e].hasOwnProperty(s)){i[e][s]=null}if(typeof t==="undefined"){delete i[e][s]}else{i[e][s]=t}}else{if(typeof t==="undefined"){delete i[s]}else{i[s]=t}}}else{if(this.isNode||this.isJSBox){if(typeof t==="undefined"){delete i[e]}else{i[e]=t}}else{if(typeof t==="undefined"){i=null}else{i=t}}}if(typeof i==="object")i=JSON.stringify(i);if(this.isSurge||this.isLoon){$persistentStore.write(i,e)}else if(this.isQuanX){$prefs.setValueForKey(i,e)}else if(this.isNode){this.node.fs.writeFileSync("./magic.json",i)}else if(this.isJSBox){$file.write({data:$data({string:i}),path:"drive://MagicJS/magic.json"})}this.logDebug(`WRITE DATA [${e}]${!!s?`[${s}]`:""}(${typeof t})\n${JSON.stringify(t)}`)}del(e,t=""){this.logDebug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`);this.write(e,null,t)}notify(e=this.scriptName,t="",s="",i=""){let o=e=>{let t={};if(this.isSurge||this.isQuanX||this.isLoon){if(typeof e==="string"){if(this.isLoon)t={openUrl:e};else if(this.isQuanX)t={"open-url":e};else if(this.isSurge)t={url:e}}else if(typeof e==="object"){let s={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}};let i=Object.keys(e);for(let o=0;o<i.length;o++){if(!!s[this.platform][i[o]]){t[s[this.platform][i[o]]]=e[i[o]]}else{t[i[o]]=e[i[o]]}}}}return t};i=o(i);this.logNotify(`title:${e}\nsubTitle:${t}\nbody:${s}\noptions:${typeof i==="object"?JSON.stringify(i):i}`);if(arguments.length==1){e=this.scriptName;t="",s=arguments[0]}if(!!this._unifiedPushUrl){let i=encodeURI(`${e}/${t}${!!t?"\n":""}${s}`);this.get(`${this._unifiedPushUrl}/${i}`,()=>{})}if(this.isSurge||this.isLoon){$notification.post(e,t,s,i)}else if(this.isQuanX){$notify(e,t,s,i)}else if(this.isJSBox){let i={title:e,body:!!t?`${t}\n${s}`:s};$push.schedule(i)}}log(e,t="INFO"){if(!(this.logLevels[this._logLevel]<this.logLevels[t.toUpperCase()]))console.log(`[${t}] [${this.scriptName}]\n${e}\n`)}logDebug(e){this.log(e,"DEBUG")}logInfo(e){this.log(e,"INFO")}logNotify(e){this.log(e,"NOTIFY")}logWarning(e){this.log(e,"WARNING")}logError(e){this.log(e,"ERROR")}adapterHttpOptions(e,t){let i=typeof e==="object"?Object.assign({},e):{url:e,headers:{}};if(i.hasOwnProperty("header")&&!i.hasOwnProperty("headers")){i["headers"]=i["header"];delete i["header"]}if(typeof i.headers==="object"&&!!s){for(let e in i.headers){if(s[e]){i.headers[s[e]]=i.headers[e];delete i.headers[e]}}}if(!!!i.headers||typeof i.headers!=="object"||!!!i.headers["User-Agent"]){if(!!!i.headers||typeof i.headers!=="object")i.headers={};if(this.isNode)i.headers["User-Agent"]=this.pcUserAgent;else i.headers["User-Agent"]=this.iOSUserAgent}let o=false;if(typeof i["opts"]==="object"&&(i["opts"]["hints"]===true||i["opts"]["Skip-Scripting"]===true)||typeof i["headers"]==="object"&&i["headers"]["X-Surge-Skip-Scripting"]===true){o=true}if(!o){if(this.isSurge)i.headers["X-Surge-Skip-Scripting"]=false;else if(this.isLoon)i.headers["X-Requested-With"]="XMLHttpRequest";else if(this.isQuanX){if(typeof i["opts"]!=="object")i.opts={};i.opts["hints"]=false}}if(!this.isSurge||o)delete i.headers["X-Surge-Skip-Scripting"];if(!this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"];if(this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"]["Skip-Scripting"];if(t==="GET"&&!this.isNode&&!!i.body){let e=Object.keys(i.body).map(e=>{if(typeof i.body==="undefined")return"";return`${encodeURIComponent(e)}=${encodeURIComponent(i.body[e])}`}).join("&");if(i.url.indexOf("?")<0)i.url+="?";if(i.url.lastIndexOf("&")+1!=i.url.length&&i.url.lastIndexOf("?")+1!=i.url.length)i.url+="&";i.url+=e;delete i.body}if(this.isQuanX){if(i.hasOwnProperty("body")&&typeof i["body"]!=="string")i["body"]=JSON.stringify(i["body"]);i["method"]=t}else if(this.isNode){delete i.headers["Accept-Encoding"];if(typeof i.body==="object"){if(t==="GET"){i.qs=i.body;delete i.body}else if(t==="POST"){i["json"]=true;i.body=i.body}}}else if(this.isJSBox){i["header"]=i["headers"];delete i["headers"]}return i}get(e,t){let s=this.adapterHttpOptions(e,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.get(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>t(e.error,null,null))}else if(this.isNode){return this.node.request.get(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.get(s)}}post(e,t){let s=this.adapterHttpOptions(e,"POST");this.logDebug(`HTTP POST: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.post(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>{t(e.error,null,null)})}else if(this.isNode){return this.node.request.post(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.post(s)}}done(e={}){if(typeof $done!=="undefined"){$done(e)}}isToday(e){if(e==null){return false}else{let t=new Date;if(typeof e=="string"){e=new Date(e)}if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()&&t.getDay()==e.getDay()){return true}else{return false}}}isNumber(e){return parseFloat(e).toString()==="NaN"?false:true}attempt(e,t=null){return e.then(e=>{return[null,e]}).catch(e=>{this.logError(e);return[e,t]})}retry(e,t=5,s=0,i=null){return(...o)=>{return new Promise((r,n)=>{function a(...o){Promise.resolve().then(()=>e.apply(this,o)).then(e=>{if(typeof i==="function"){Promise.resolve().then(()=>i(e)).then(()=>{r(e)}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}else{r(e)}}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}a.apply(this,o)})}}formatTime(e,t="yyyy-MM-dd hh:mm:ss"){var s={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in s)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?s[e]:("00"+s[e]).substr((""+s[e]).length));return t}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(e){return new Promise(t=>setTimeout(t,e))}}(e)}
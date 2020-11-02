const scriptName = '滴滴出行';
const didiTokenKey = 'didi_token';
const didiCityIdKey = 'didi_city_id';
const didiLidKey = 'didi_lid';
const didiMySourceIdKey = 'didi_my_source_id';
const didiActivityIdKey = 'didi_activity_id';
const didiChannelIdKey = 'didi_channel_id';
const getTokenRegex = /^https?:\/\/api\.didialift\.com\/beatles\/userapi\/user\/user\/getuserinfo?.*city_id=(\d+).*&token=([^&]*)/;
const getTokenRegex2 = /^https?:\/\/as\.xiaojukeji\.com\/ep\/as\/toggles\?.*location_cityid=(\d+).*&ticket=([^&]*)/;
const getLidRegex = /^https?:\/\/bosp-api\.xiaojukeji\.com\/bosp-api\/lottery\/info?.*lid=([^&]*)/;
const getActivityIdRegex = /^https?:\/\/manhattan\.webapp\.xiaojukeji\.com\/marvel\/api\/manhattan\-signin\-task\/signIn\/execute/;
let sourceIdConf = {'7mO4XP93fb84VMSC8Xk5vg%3D%3D': 7, 'pDmWW7HoWUkNu2nmJ3HJEQ%3D%3D': 3};
let magicJS = MagicJS(scriptName, "INFO");
magicJS.unifiedPushUrl = magicJS.read('didi_unified_push_url') || magicJS.read('magicjs_unified_push_url');

// 滴滴出行签到
function CheckIn(token, cityId, source_id=''){
  return new Promise((resolve, reject) =>{
    let url = '';
    if (source_id){
      url = `https://bosp-api.xiaojukeji.com/wechat/benefit/public/index?city_id=${cityId}&share_source_id=${source_id}&share_date=${magicJS.today()}`;
    }
    else{
      url = `https://bosp-api.xiaojukeji.com/wechat/benefit/public/index?city_id=${cityId}&share_date=${magicJS.today()}`;
    }
    magicJS.logInfo(`当前使用的source_id：${source_id}`);
    let options = {
      url: url,
      headers: {
        'Didi-Ticket': token
      },
      body: ''
    }
    magicJS.get(options, (err, resp, data)=>{
      if (err){
        magicJS.logError(`滴滴出行签到失败，请求异常：${err}`);
        reject('签到失败，请求异常');
      }
      else{
        try{
          magicJS.logDebug(`滴滴签到接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno == 0){
            if (obj.data.hasOwnProperty('share') && obj.data.share.hasOwnProperty('source_id')){
              magicJS.write(didiMySourceIdKey, obj.data.share.source_id);
              magicJS.logDebug(`您的source_id：${obj.data.share.source_id}`);
            }
            if (obj.data.sign.sign){
              let subsidy = Number(obj.data.sign.sign.subsidy_state.subsidy_amount + obj.data.sign.sign.subsidy_state.extra_subsidy_amount);
              resolve(['🚕滴滴出行签到成功！', subsidy, obj.data.welfare.balance, obj.data.notification.reverse()]);
            }
            else{
              resolve(['🚕滴滴出行今天已经签到过了。', 0, 0, []]);
            }
          }
          else if(obj.errno === 101){
            reject(`签到失败，${obj.errmsg}`);
          }
          else{
            magicJS.logError(`签到失败，接口响应异常：${data}`);
            reject('签到失败，响应异常，请查阅日志！');
          }
        }
        catch(err){
          magicJS.logError(`滴滴出行签到失败，执行异常：${err}，接口返回：${data}`);
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

// 获取福利金抽奖次数
function GetDrawAmount(lid, token){
  return new Promise((resolve) =>{
    try{
      let url = `https://bosp-api.xiaojukeji.com/bosp-api/lottery/info?lid=${lid}&token=${token}&lucky_users=0`;
      magicJS.get(url, (err, resp, data)=>{
        if (err){
          magicJS.logError(`获取福利金抽奖次数失败，请求异常：${err}`);
          resolve(0);
        }
        else{
          magicJS.logDebug(`福利金抽奖，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.code == 0){
            magicJS.logInfo(`福利金抽奖次数：${obj.data.eliminate_info.base_share_amount}`);
            resolve(obj.data.eliminate_info.base_share_amount);
          }
          else if (obj.code == 20008){
            magicJS.logWarning('获取福利金抽奖次数失败');
            magicJS.logWarning(obj.message);
            resolve(0);
          }
          else{
            magicJS.logWarning(`获取福利金抽奖次数失败，响应异常：${data}`);
            resolve(0);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`获取福利金抽奖次数失败，异常信息：${err}`);
      resolve(0);
    }
  });
}

// 福利金抽奖
function LotteryDraw(lid, token){
  return new Promise((resolve) =>{
    try{
      let url = `https://bosp-api.xiaojukeji.com/bosp-api/lottery/draw?lid=${lid}&token=${token}`;
      magicJS.get(url, (err, resp, data)=>{
        if (err){
          magicJS.logError(`福利金抽奖失败，请求异常：${err}`);
          resolve();
        }
        else{
          magicJS.logDebug(`福利金抽奖，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.code === 0){
            magicJS.logInfo(`本次抽奖结果：${obj.data.prize.name}`);
            resolve(obj.data.prize.name);
          }
          else if(obj.code === 20003){
            magicJS.logWarning(`福利金抽奖出现异常：${data}`);
            resolve(obj.message);
          }
          else if(obj.code === 20010){
            magicJS.logWarning(`福利金抽奖福利金不足：${data}`);
            resolve(obj.message);
          }
          else{
            magicJS.logWarning(`福利金抽奖，响应异常：${data}`);
            resolve(obj.message);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`福利金抽奖失败，异常信息：${err}`);
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
  sourceIdList = Object.keys(sourceIdConf);
  let newSourceIdList = [];
  for (sourceId in sourceIdConf){
    let sourceIdArray = new Array(sourceIdConf[sourceId]).fill(sourceId);
    newSourceIdList = newSourceIdList.concat(sourceIdArray);
  } 
  return newSourceIdList[Math.round(Math.random() * (newSourceIdList.length - 1))]; 
}

// 天天有奖签到
function DailyLotteryDraw(token, channelId, activityId, clientId=1){
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
          magicJS.logError(`天天有奖签到失败，请求异常：${err}`);
          reject('天天有奖签到失败，请求异常');
        }
        else{
          let obj = typeof data === 'string'? JSON.parse(data) : data;
          magicJS.logDebug(`天天有奖，接口响应：${data}`);
          let giftList = [];
          if (obj.errorCode === 0){
            obj.data.giftDetail.forEach(gift => {
              magicJS.logInfo(`天天有奖签到结果：${gift.displayJson.displayName} ${gift.displayValue} ${gift.displayUnit}`);
              giftList.push({'name': gift.displayJson.displayName, 'value': gift.displayValue, 'unit': gift.displayUnit, 'endDate':gift.giftEndDate});
            });
            resolve([`🎁天天有奖连续签到${obj.data.serialSignInTimes}天`, giftList]);
          }
          else if(obj.errorCode === 500000 && obj.errorMsg === "今天已经签到过了"){
            resolve([`🎁天天有奖今天已经签到过了`, []]);
          }
          else if(obj.errorCode === 500000 && obj.errorMsg === "断签"){
            resolve(['天天有奖断签', []]);
          }
          else{
            magicJS.logWarning(`天天有奖签到失败，响应异常：${data}`);
            reject('天天有奖签到失败，响应异常');
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

// 天天有奖签到断签后重新开始周期
function DailyLotteryRestart(token, activityId, clientId=1){
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
          magicJS.logError(`天天有奖签到失败，请求异常：${err}`);
          reject('天天有奖出现断签，尝试开始新的签到周期失败，请求异常');
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logWarning(`天天有奖出现断签，尝试开始新的签到周期：${data}`);
          let obj = JSON.parse(data);
          if (obj.errorCode === 500000 && obj.errorMsg === '非断签状态无法清零并重新开始'){
            magicJS.logWarning('非断签状态无法清零并重新开始');
            resolve(obj.errorMsg);
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
  return new Promise((resolve) =>{
    try{
      let url = `https://quartz.xiaojukeji.com/volcano/quartz/user/info?ts=${ts}&app_id=${app_id}&token=${token}&source_id=wdcn_1000&partition_id=1007`;
      magicJS.get(url, (err, resp, data)=>{
        if (err){
          magicJS.logError(`获取用户信息失败，请求异常：${err}`);
          resolve();
        }
        else{
          magicJS.logDebug(`获取用户信息，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            resolve(obj);
          }
          else{
            magicJS.logWarning(`获取用户信息失败，响应异常：${data}`);
            resolve();
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`获取用户信息失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 领取积分
function CollectPoint(token, app_id='common'){
  return new Promise((resolve) =>{
    try{
      let options = {
        'url': `https://quartz.xiaojukeji.com/volcano/quartz/points/collect?ts=${new Date().getTime()}`,
        'headers': {
          "Accept": "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Length": "238",
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
          magicJS.logError(`领取积分失败，请求异常：${err}`);
          resolve();
        }
        else{
          data = typeof data === 'object' ? JSON.stringify(data) : data;
          magicJS.logDebug(`领取积分失败，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno === 0){
            magicJS.logInfo('领取积分完成');
            resolve();
          }
          else{
            magicJS.logWarning(`领取积分失败，响应异常：${data}`);
            resolve();
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`领取积分失败，异常信息：${err}`);
      resolve();
    }
  });
}

async function Main(){
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
    else if (getLidRegex.test(magicJS.request.url)){
      try{
        let arr = magicJS.request.url.match(getLidRegex);
        let lid = arr[1];
        let hisLid = magicJS.read(didiLidKey);
        magicJS.logDebug(`新的lid：${lid}，旧的lid：${hisLid}`);
        if (lid !== hisLid)
        {
          magicJS.write(didiLidKey, lid);
          magicJS.notify('🎉滴滴出行写入lid成功！！');
        }
        else{
          magicJS.logInfo(`滴滴出行lid没有变化，无需更新。lid：${lid}`);
        }
      }
      catch (err){
        magicJS.logError(`滴滴出行写入lid失败，执行异常：${err}。`);
        magicJS.notify('❌滴滴出行写入lid失败，请查阅日志');
      }
    }
    else if (getActivityIdRegex.test(magicJS.request.url)){
      try{
        let obj = JSON.parse(magicJS.request.body);
        magicJS.write(didiActivityIdKey, obj.activityId);
        magicJS.write(didiChannelIdKey, obj.channelId);
        magicJS.logInfo(`获取天天有奖ActivityId和ChannelId成功：${obj.activityId}，${obj.channelId}`);
        magicJS.notify('获取天天有奖ActivityId和ChannelId成功');
      }
      catch(err){
        magicJS.logError(`获取天天有奖ActivityId异常：${err}`);
      }
    }
  }
  else{
    let title = scriptName;
    let subTitle = '';
    let content = '';
    let cityId = magicJS.read(didiCityIdKey);
    let token = magicJS.read(didiTokenKey);
    let lid = magicJS.read(didiLidKey);
    let channelId = magicJS.read(didiChannelIdKey) || '5286158810015504';
    let activityId = magicJS.read(didiActivityIdKey) || '140737579736652';
    let clientId = 1;
    let avatar = '';


    // 签到
    if (token && cityId){
      let source_id = getSourceId();
      let [checkInErr, [checkInStr, subsidy, balance, notification]] = await magicJS.attempt(magicJS.retry(CheckIn, 3, 1000)(token, cityId, source_id), [null, null, null, null]);
      if (checkInErr){
        subTitle = checkInErr;
      }
      else{
        subTitle = checkInStr;
        if (subsidy > 0){
          subTitle += `获取${subsidy}福利金！`;
        }
        if (balance) content = `账户共${balance}福利金，可抵扣${balance/100}元。`;
        // 系统通知
        notification.forEach(element => {
          if (content) content += '\n';
          content += element + '。';
        });
      }

      // 领取积分
      await CollectPoint(token, app_id='common');

      // 福利金抽奖
      if (lid) {
        let drawCount = await GetDrawAmount(lid, token);
        if (drawCount > 0){
          if (content) content += '\n';
          content = `福利金抽奖${drawCount}次：`;
          for (let i=0;i<drawCount;i++){
            // 避免抽奖太频繁
            await magicJS.sleep(5000);
            let drawResult = await LotteryDraw(lid, token);
            if (drawResult){
              content += `\n第${i+1}次：${drawResult}`;
            }
          }
        }
      }

      // 天天有奖
      if (channelId && activityId){
        let [dailyLotteryErr, [serialSignInTimes, giftList]] = await magicJS.attempt(magicJS.retry(DailyLotteryDraw, 5, 1000, async(result)=>{
          let [msg,] = result;
          if (msg.indexOf('断签') >= 0){
            await DailyLotteryRestart(token, activityId, clientId);
            throw msg;
          }
        })(token, channelId, activityId), ["", []]);
        if (dailyLotteryErr){
          if (content) content += '\n';
          content += dailyLotteryErr;
        }
        else{
          if (serialSignInTimes !== null){
            if (content) content += '\n';
            content += serialSignInTimes;
          }
          if (giftList.length > 0){
            content += '，奖励：';
            for(let i=0;i<giftList.length;i++){
              content += `\n${giftList[i].name} ${giftList[i].value} ${giftList[i].unit} 过期 ${giftList[i].endDate}`;
            }
          }
          else{
            content += '。';
          }
        }
      }

      // 领取福利金
      let orderList = await GetOrderList(token);
      magicJS.logInfo(`当前获取的订单信息：${JSON.stringify(orderList)}`);
      let rewardList = [];
      let total = 0;
      orderList.forEach(element => {
        total += Number(element.bonus_info.amount);
        rewardList.push(GetRewards(element.oid, token));
      });

      await Promise.all(rewardList);

      if (total > 0){
        if (content) content += '\n';
        content += `\n本日领取福利金${total}。`
      }

      // 获取用户信息
      let userInfo = await GetUserInfo(new Date().getTime(), token, app_id='common');
      if (!!userInfo){
        try{
          avatar = userInfo.data.info.avatar;
          title += ` - ${userInfo.data.info.cell}`;
          if (content) content += '\n';
          content += `💡账户共有积分${userInfo.data.account.dcoin.coin}`;
          if (!!userInfo.data.account.dcoin.expire_balance){
            content += `\n${userInfo.data.account.dcoin.expire_balance}积分在${userInfo.data.account.dcoin.expire_date}过期`;
          }
        }
        catch(err){
          magicJS.logError(`处理用户信息出现异常：${err}`);
        }
      }
      
    }
    else{
      content = '❓请先获取滴滴出行Token再进行签到。';
    }

    // 通知
    magicJS.notify(title, subTitle, content, {'media-url':avatar});
  }
  magicJS.done();
};

Main();

function MagicJS(e="MagicJS",t="INFO"){const s={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){this.version="2.2.3.3";this.scriptName=e;this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};this.isLoon=typeof $loon!=="undefined";this.isQuanX=typeof $task!=="undefined";this.isJSBox=typeof $drive!=="undefined";this.isNode=typeof module!=="undefined"&&!this.isJSBox;this.isSurge=typeof $httpClient!=="undefined"&&!this.isLoon;this.platform=this.getPlatform();this.node={request:undefined,fs:undefined,data:{}};this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";this.logLevel=t;this._unifiedPushUrl="";if(this.isNode){this.node.fs=require("fs");this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(e){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else if(this.isJSBox){if(!$file.exists("drive://MagicJS")){$file.mkdir("drive://MagicJS")}if(!$file.exists("drive://MagicJS/magic.json")){$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"})}}}set unifiedPushUrl(e){this._unifiedPushUrl=!!e?e.replace(/\/+$/g,""):""}set logLevel(e){this._logLevel=typeof e==="string"?e.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}getPlatform(){if(this.isSurge)return"Surge";else if(this.isQuanX)return"QuantumultX";else if(this.isLoon)return"Loon";else if(this.isJSBox)return"JSBox";else if(this.isNode)return"Node.js";else return"unknown"}read(e,t=""){let s="";if(this.isSurge||this.isLoon){s=$persistentStore.read(e)}else if(this.isQuanX){s=$prefs.valueForKey(e)}else if(this.isNode){s=this.node.data}else if(this.isJSBox){s=$file.read("drive://MagicJS/magic.json").string}try{if(this.isNode)s=s[e];if(this.isJSBox)s=JSON.parse(s)[e];if(!!t){if(typeof s==="string")s=JSON.parse(s);s=!!s&&typeof s==="object"?s[t]:null}}catch(i){this.logError(i);s=!!t?{}:null;this.del(e)}if(typeof s==="undefined")s=null;try{if(!!s&&typeof s==="string")s=JSON.parse(s)}catch(e){}this.logDebug(`READ DATA [${e}]${!!t?`[${t}]`:""}(${typeof s})\n${JSON.stringify(s)}`);return s}write(e,t,s=""){let i=!!s?{}:"";if(!!s&&(this.isSurge||this.isLoon)){i=$persistentStore.read(e)}else if(!!s&&this.isQuanX){i=$prefs.valueForKey(e)}else if(this.isNode){i=this.node.data}else if(this.isJSBox){i=JSON.parse($file.read("drive://MagicJS/magic.json").string)}if(!!s){try{if(typeof i==="string")i=JSON.parse(i);i=typeof i==="object"&&!!i?i:{}}catch(t){this.logError(t);this.del(e);i={}}if(this.isJSBox||this.isNode){if(!i.hasOwnProperty(e)||typeof i[e]!=="object"||i[e]===null){i[e]={}}if(!i[e].hasOwnProperty(s)){i[e][s]=null}if(typeof t==="undefined"){delete i[e][s]}else{i[e][s]=t}}else{if(typeof t==="undefined"){delete i[s]}else{i[s]=t}}}else{if(this.isNode||this.isJSBox){if(typeof t==="undefined"){delete i[e]}else{i[e]=t}}else{if(typeof t==="undefined"){i=null}else{i=t}}}if(typeof i==="object")i=JSON.stringify(i);if(this.isSurge||this.isLoon){$persistentStore.write(i,e)}else if(this.isQuanX){$prefs.setValueForKey(i,e)}else if(this.isNode){this.node.fs.writeFileSync("./magic.json",i)}else if(this.isJSBox){$file.write({data:$data({string:i}),path:"drive://MagicJS/magic.json"})}this.logDebug(`WRITE DATA [${e}]${!!s?`[${s}]`:""}(${typeof t})\n${JSON.stringify(t)}`)}del(e,t=""){this.logDebug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`);this.write(e,null,t)}notify(e=this.scriptName,t="",s="",i=""){let o=e=>{let t={};if(this.isSurge||this.isQuanX||this.isLoon){if(typeof e==="string"){if(this.isLoon)t={openUrl:e};else if(this.isQuanX)t={"open-url":e};else if(this.isSurge)t={url:e}}else if(typeof e==="object"){let s={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}};let i=Object.keys(e);for(let o=0;o<i.length;o++){if(!!s[this.platform][i[o]]){t[s[this.platform][i[o]]]=e[i[o]]}else{t[i[o]]=e[i[o]]}}}}return t};i=o(i);this.logNotify(`title:${e}\nsubTitle:${t}\nbody:${s}\noptions:${typeof i==="object"?JSON.stringify(i):i}`);if(arguments.length==1){e=this.scriptName;t="",s=arguments[0]}if(!!this._unifiedPushUrl){let i=encodeURI(`${e}/${t}${!!t?"\n":""}${s}`);this.get(`${this._unifiedPushUrl}/${i}`,()=>{})}if(this.isSurge||this.isLoon){$notification.post(e,t,s,i)}else if(this.isQuanX){$notify(e,t,s,i)}else if(this.isJSBox){let i={title:e,body:!!t?`${t}\n${s}`:s};$push.schedule(i)}}log(e,t="INFO"){if(!(this.logLevels[this._logLevel]<this.logLevels[t.toUpperCase()]))console.log(`[${t}] [${this.scriptName}]\n${e}\n`)}logDebug(e){this.log(e,"DEBUG")}logInfo(e){this.log(e,"INFO")}logNotify(e){this.log(e,"NOTIFY")}logWarning(e){this.log(e,"WARNING")}logError(e){this.log(e,"ERROR")}adapterHttpOptions(e,t){let i=typeof e==="object"?Object.assign({},e):{url:e,headers:{}};if(i.hasOwnProperty("header")&&!i.hasOwnProperty("headers")){i["headers"]=i["header"];delete i["header"]}if(typeof i.headers==="object"&&!!s){for(let e in i.headers){if(s[e]){i.headers[s[e]]=i.headers[e];delete i.headers[e]}}}if(!!!i.headers||typeof i.headers!=="object"||!!!i.headers["User-Agent"]){if(!!!i.headers||typeof i.headers!=="object")i.headers={};if(this.isNode)i.headers["User-Agent"]=this.pcUserAgent;else i.headers["User-Agent"]=this.iOSUserAgent}let o=false;if(typeof i["opts"]==="object"&&(i["opts"]["hints"]===true||i["opts"]["Skip-Scripting"]===true)||typeof i["headers"]==="object"&&i["headers"]["X-Surge-Skip-Scripting"]===true){o=true}if(!o){if(this.isSurge)i.headers["X-Surge-Skip-Scripting"]=false;else if(this.isLoon)i.headers["X-Requested-With"]="XMLHttpRequest";else if(this.isQuanX){if(typeof i["opts"]!=="object")i.opts={};i.opts["hints"]=false}}if(!this.isSurge||o)delete i.headers["X-Surge-Skip-Scripting"];if(!this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"];if(this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"]["Skip-Scripting"];if(t==="GET"&&!this.isNode&&!!i.body){let e=Object.keys(i.body).map(e=>{if(typeof i.body==="undefined")return"";return`${encodeURIComponent(e)}=${encodeURIComponent(i.body[e])}`}).join("&");if(i.url.indexOf("?")<0)i.url+="?";if(i.url.lastIndexOf("&")+1!=i.url.length&&i.url.lastIndexOf("?")+1!=i.url.length)i.url+="&";i.url+=e;delete i.body}if(this.isQuanX){if(i.hasOwnProperty("body")&&typeof i["body"]!=="string")i["body"]=JSON.stringify(i["body"]);i["method"]=t}else if(this.isNode){delete i.headers["Accept-Encoding"];if(typeof i.body==="object"){if(t==="GET"){i.qs=i.body;delete i.body}else if(t==="POST"){i["json"]=true;i.body=i.body}}}else if(this.isJSBox){i["header"]=i["headers"];delete i["headers"]}return i}get(e,t){let s=this.adapterHttpOptions(e,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.get(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>t(e.error,null,null))}else if(this.isNode){return this.node.request.get(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.get(s)}}post(e,t){let s=this.adapterHttpOptions(e,"POST");this.logDebug(`HTTP POST: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.post(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>{t(e.error,null,null)})}else if(this.isNode){return this.node.request.post(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.post(s)}}done(e={}){if(typeof $done!=="undefined"){$done(e)}}isToday(e){if(e==null){return false}else{let t=new Date;if(typeof e=="string"){e=new Date(e)}if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()&&t.getDay()==e.getDay()){return true}else{return false}}}isNumber(e){return parseFloat(e).toString()==="NaN"?false:true}attempt(e,t=null){return e.then(e=>{return[null,e]}).catch(e=>{this.logError(e);return[e,t]})}retry(e,t=5,s=0,i=null){return(...o)=>{return new Promise((r,n)=>{function a(...o){Promise.resolve().then(()=>e.apply(this,o)).then(e=>{if(typeof i==="function"){Promise.resolve().then(()=>i(e)).then(()=>{r(e)}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}else{r(e)}}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}a.apply(this,o)})}}formatTime(e,t="yyyy-MM-dd hh:mm:ss"){var s={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in s)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?s[e]:("00"+s[e]).substr((""+s[e]).length));return t}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(e){return new Promise(t=>setTimeout(t,e))}}(e)}
const zhiyouRegex = /^https?:\/\/zhiyou\.smzdm\.com\/user$/;
const appLoginRegex = /^https?:\/\/user-api\.smzdm\.com\/user_login\/normal$/;
const smzdmCookieKey = 'smzdm_cookie';
const smzdmSessionKey = 'smzdm_session';
const smzdmTokenKey = 'smzdm_token';
const smzdmAccountKey = 'smzdm_account';
const smzdmPasswordKey = 'smzdm_password';
const scriptName = '什么值得买';
const smzdmAccount = '' // 什么值得买账号
const smzdmPassword = '' // 什么值得买密码
let clickGoBuyMaxTimes = 12; // 好价点击去购买的次数
let clickLikeProductMaxTimes = 7; // 好价点值次数
let clickLikeArticleMaxTimes = 7; // 好文点赞次数
let clickFavArticleMaxTimes = 7; // 好文收藏次数

let magicJS = MagicJS(scriptName, "INFO");

let webCheckinOptions = {
    url : 'https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=jQuery112404020093264993104_1597893638970&_=1597893638973',
    headers : {
      'Accept': '*/*',
      'Accept-Language': 'zh-cn',
      'Connection': 'keep-alive',
      'Host': 'zhiyou.smzdm.com',
      'Referer': 'https://www.smzdm.com/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15',
      'Cookie': null
    }
};

let getAppTokenOptions ={
  url : 'https://api.smzdm.com/v1/user/login',
  headers : {
    'Accept': '*/*',
    'Accept-Language': 'zh-cn',
    'Connection': 'keep-alive',
    'Host': 'api.smzdm.com',
    'Content-Type':'application/x-www-form-urlencoded'
  },
  body: ''
};

let appCheckinOptions ={
  url : 'https://api.smzdm.com/v1/user/checkin',
  headers : {
    'Accept': '*/*',
    'Accept-Language': 'zh-cn',
    'Connection': 'keep-alive',
    'Host': 'api.smzdm.com',
    'Content-Type':'application/x-www-form-urlencoded'
  },
  body: ''
};

// 获取用户信息，新版
function WebGetCurrentInfoNewVersion(smzdmCookie){
  return new Promise(resolve =>{
    let getUserPointOptions ={
      url : 'https://zhiyou.smzdm.com/user/point/',
      headers : {
        'Cookie': ''
      },
      body: ''
    };
    getUserPointOptions.headers.Cookie = smzdmCookie;
    magicJS.get(getUserPointOptions, (err, resp, data)=>{
      if (err){
        magicJS.logError(`获取用户信息失败，异常信息：${err}`);
        resolve([null,null,null,null,null,null,null]);
      }
      else{
        try{
          // 获取用户名
          let userName =data.match(/<a.*zhiyou\.smzdm\.com\/user[^<]*>([^<]*)</)[1].trim();
          // 获取近期经验值变动情况
          let pointTimeList = data.match(/\<div class=['"]scoreLeft['"]\>(.*)\<\/div\>/ig);
          let pointDetailList = data.match(/\<div class=['"]scoreRight ellipsis['"]\>(.*)\<\/div\>/ig);
          let minLength = pointTimeList.length > pointDetailList.length ? pointDetailList.length : pointTimeList.length;
          let userPointList = [];
          for (let i=0;i<minLength;i++){
            userPointList.push({
              'time': pointTimeList[i].match(/\<div class=['"]scoreLeft['"]\>(.*)\<\/div\>/)[1], 
              'detail': pointDetailList[i].match(/\<div class=['"]scoreRight ellipsis['"]\>(.*)\<\/div\>/)[1]
            });
          }
          // 获取用户资源
          let assetsNumList = data.match(/assets-num[^<]*>(.*)</ig);
          let points = assetsNumList[0].match(/assets-num[^<]*>(.*)</)[1]; // 积分
          let experience = assetsNumList[1].match(/assets-num[^<]*>(.*)</)[1]; // 经验
          let gold = assetsNumList[2].match(/assets-num[^<]*>(.*)</)[1]; // 金币
          let prestige = assetsNumList[3].match(/assets-num[^<]*>(.*)</)[1]; // 威望
          let silver = assetsNumList[4].match(/assets-num[^<]*>(.*)</)[1]; // 碎银子
          resolve([userName, userPointList, Number(points), Number(experience), Number(gold), Number(prestige), Number(silver)]);
        }
        catch(err){
          magicJS.logError(`获取用户信息失败，异常信息：${err}`);
          resolve([null,null,null,null,null,null,null]);
        }
      }
    })
  })
}

// 获取用户信息
function WebGetCurrentInfo(smzdmCookie){
  return new Promise((resolve) => {
    let webGetCurrentInfo = {
      url : `https://zhiyou.smzdm.com/user/info/jsonp_get_current?with_avatar_ornament=1&callback=jQuery112403507528653716241_${new Date().getTime()}&_=${new Date().getTime()}`,
      headers : {
        'Accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Host': 'zhiyou.smzdm.com',
        'Referer': 'https://zhiyou.smzdm.com/user/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        'Cookie': smzdmCookie
      }
    };
    magicJS.get(webGetCurrentInfo, (err, resp, data)=>{
      try{
        let obj = JSON.parse(/\((.*)\)/.exec(data)[1]);
        if (obj['smzdm_id'] !== 0){
          resolve([
            obj['nickname'],  // 昵称
            `https:${obj['avatar']}`,  // 头像
            obj['vip_level'], // 新版VIP等级
            obj['checkin']['has_checkin'], //是否签到
            Number(obj['checkin']['daily_checkin_num']), //连续签到天数
            Number(obj['unread']['notice']['num']), // 未读消息
            Number(obj['level']),  // 旧版等级
            Number(obj['exp']),  // 旧版经验
            Number(obj['point']), // 积分
            Number(obj['gold']), // 金币
            Number(obj['silver']) // 碎银子
          ]);
        }
        else {
          magicJS.logWarning(`获取用户信息异常，接口返回数据不合法：${data}`);
          resolve([null, null, null, null, null, false, null, null]);
        }
      }
      catch (err){
        magicJS.logError(`获取用户信息异常，代码执行异常：${err}，接口返回数据：${data}`);
        resolve([null, null, null, null, null, false, null, null]);
      }
    })
  });
}

// 每日签到
function WebCheckin(smzdmCookie) {
  return new Promise((resolve, reject) => {
    webCheckinOptions.url = webCheckinOptions.url.replace(/_[0-9]*&_=[0-9]*/, `_${new Date().getTime()}&_=${new Date().getTime()}`);
    webCheckinOptions.headers.Cookie = smzdmCookie;
    magicJS.get(webCheckinOptions, (err, resp, data)=>{
      if (err) {
        magicJS.logWarning('Web端签到出现异常:' + err);
        reject('Web端签到异常');
      }
      else{
        try {
          let checkin_data = /\((.*)\)/.exec(data);
          if (checkin_data){
            let checkin_obj = JSON.parse(checkin_data[1]);
            if (!!checkin_obj && checkin_obj.hasOwnProperty('error_code')){
              if (checkin_obj.error_code == -1){
                magicJS.logWarning(`Web端签到出现异常，网络繁忙，接口返回：${data}`);
                reject( 'Web端网络繁忙');
              }
              else if (checkin_obj['error_code'] == 0){
                magicJS.logInfo('Web端签到成功');
                resolve([true, 'Web端签到成功']);
              }
              else{
                magicJS.logWarning(`Web端签到出现异常，接口返回数据不合法：${data}`);
                reject('Web端返回错误');
              }
            }
            else{
              magicJS.logWarning(`Web端签到出现异常，接口返回数据：${data}`);
              reject('Web端签到异常');
            }
          }
          else{
            magicJS.logWarning(`Web端签到出现异常，接口返回数据不合法：${data}`);
            reject('Web端签到异常');
          }
        }
        catch (err){
          magicJS.logWarning(`Web端签到出现异常，代码执行异常：${err}，接口返回：${data}`);
          reject('Web端执行异常');
        }
      }
    });
  });
}

// 获取App端签到Token
function AppGetToken(account, password){
  return new Promise((resolve) => {
    if (magicJS.isJSBox){
      getAppTokenOptions.body = {user_login: account, user_pass: password, f:'win'};
    }
    else if (magicJS.isNode){
      getAppTokenOptions.form = {user_login: account, user_pass: password, f:'win'};
    }
    else{
      getAppTokenOptions.body = `user_login=${account}&user_pass=${password}&f=win`;
    }
    if (magicJS.isNode){
      delete getAppTokenOptions['headers']['Accept-Encoding'];
    }
    magicJS.post(getAppTokenOptions, (err, resp, data) => {
      if (err){
        magicJS.logWarning(`App端登录失败，http请求异常。异常内容：${err}`);
        resolve([false,'App端登录异常',null]);
      }
      else{
        try{
          let obj = JSON.parse(data);
          magicJS.logDebug(`App端登录，接口响应内容：${data}`);
          if (obj.error_code == '111101'){
            magicJS.logWarning(`App端登录失败，邮箱不能为空`);
            resolve([false,'App端邮箱不能为空',null]);
          }
          if (obj.error_code == '111104'){
            magicJS.logWarning(`App端登录失败，账号密码错误`);
            resolve([false,'App端账号密码错误',null]);
          }
          if (obj.error_code == '110202'){
            magicJS.logWarning(`App端登录失败，验证码错误`);
            resolve([false,'App端验证码错误',null]);
          }
          else if (obj.error_code != '0'){
            magicJS.logWarning(`App端登录失败，接口响应格式不合法`);
            resolve([false,'App端响应异常',null]);
          }
          else{
            magicJS.logInfo(`App端登录成功`);
            magicJS.write(smzdmTokenKey, obj['data']['token']);
            resolve([true,'App端登录成功',obj['data']['token']]);
          }
        }
        catch (ex){
          magicJS.logWarning(`App端登录失败，代码执行异常。异常内容：${ex}`);
          resolve([false,'App端执行异常',null]);
        }
      }
    })
  })
}

/*
App端签到，感谢苍井灰灰提供接口
返回值 0 失败 1 成功 2 网络繁忙 3 token失效 4 重复签到
*/
function AppCheckin(){
  return new Promise((resolve, reject) => {
    let appToken = magicJS.read(smzdmTokenKey);
    if (magicJS.isJSBox){
      appCheckinOptions.body = {token: appToken, f:'win'};
    }
    else if (magicJS.isNode){
      appCheckinOptions.form = {token: appToken, f:'win'};
    }
    else{
      appCheckinOptions.body =  `token=${appToken}&f=win`;
    }
    if (magicJS.isNode){
      delete appCheckinOptions['headers']['Accept-Encoding'];
    }
    magicJS.post(appCheckinOptions, (err, resp, data) => {
      if (err){
        magicJS.logWarning(`App端签到失败，http请求异常。异常内容：${err}`);
        reject('App端请求异常');
      }
      else{
        try{
          let obj = JSON.parse(data);
          if (obj.error_code == '-1' && obj.error_msg.indexOf('主页君较忙') >= 0){
            magicJS.logError(`App端签到失败，网络繁忙。接口返回：${data}`);
            reject('App端网络繁忙');
          }
          else if (obj.error_code == '11111'){
            magicJS.logWarning(`App端签到失败，Token已过期。接口返回：${data}`);
            resolve([3, 'App端Token过期']);
          }
          else if (obj.error_code != '0'){
            magicJS.logWarning(`App端签到失败，接口响应格式不合法：${data}`);
            resolve([3, 'App端返回异常']);
          }
          else if(obj.error_msg == '已签到'){
            magicJS.logWarning('App端重复签到');
            resolve([4, 'App端重复签到']);
          }
          else{
            magicJS.logInfo('App端签到成功');
            resolve([1, 'App端签到成功']);
          }
        }
        catch (ex){
          magicJS.logError(`App端签到失败，代码执行异常。异常内容：${ex}，接口返回：${data}`);
          reject('App端执行异常');
        }
      }
    })
  })
}

// 获取点击去购买和点值的链接
function GetProductList(){
  return new Promise((resolve, reject) =>{
    let getGoBuyOptions ={
      url : 'https://faxian.smzdm.com/',
      headers : {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'www.smzdm.com',
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 Edg/84.0.522.52'
      },
      body: ''
    };
    magicJS.get(getGoBuyOptions, (err, resp, data)=>{
      if (err){
        reject(err);
      }
      else{
        // 获取每日去购买的链接
        let goBuyList = data.match(/https?:\/\/go\.smzdm\.com\/[0-9a-zA-Z]*\/[^"']*_0/ig);
        if (!!goBuyList){
          // 去除重复的商品链接
          let goBuyDict = {};
          goBuyList.forEach(element => {
            let productCode = element.match(/https?:\/\/go\.smzdm\.com\/[0-9a-zA-Z]*\/([^"']*_0)/)[1]
            goBuyDict[productCode] = element;
          });
          goBuyList = Object.values(goBuyDict);
          magicJS.logDebug(`当前获取的每日去购买链接: ${JSON.stringify(goBuyList)}`);
        }
        else{
          goBuyList = []
        }

        // 获取每日点值的链接
        let productUrlList = data.match(/https?:\/\/www\.smzdm\.com\/p\/[0-9]*/ig);
        let likeProductList = []
        if (!!productUrlList){
          productUrlList.forEach(element => {
            likeProductList.push(element.match(/https?:\/\/www\.smzdm\.com\/p\/([0-9]*)/)[1]);
          });
        }
        resolve([goBuyList, likeProductList]);
      }
    });
  })
}

// 获取点赞和收藏的好文Id
function GetDataArticleIdList(){
  return new Promise((resolve) =>{
    let getArticleOptions = {
      url: 'https://post.smzdm.com/',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Host': 'post.smzdm.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41'
      },
      body:''
    }
    magicJS.get(getArticleOptions, (err, resp, data) =>{
      if (err){
        magicJS.logWarning(`获取好文列表失败，请求异常：${err}`);
        resolve([]);
      }
      else{
        try{
          let articleList = data.match(/data-article=".*" data-type="zan"/ig);
          let result = []
          articleList.forEach(element => {
            result.push(element.match(/data-article="(.*)" data-type="zan"/)[1]);
          });
          resolve(result);
        }
        catch(err){
          magicJS.logWarning(`获取好文列表失败，执行异常：${err}`);
          resolve([]);
        }
      }
    })
  })
}

// 点击去购买
function ClickGoBuyButton(cookie, url){
  return new Promise((resolve) =>{
    let clickGoBuyOptions = {
      url: url,
      headers: {
        'Cookie': cookie
      }
    }
    magicJS.get(clickGoBuyOptions, (err, resp, data)=>{
      resolve();
    });
  })
}

// 好价点值
function ClickLikeProduct(cookie, articleId){
  return new Promise((resolve) =>{
    let ClickLikeProductOptions = {
      url: 'https://zhiyou.smzdm.com/user/rating/ajax_add',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Host': 'zhiyou.smzdm.com',
        'Origin': 'https://faxian.smzdm.com',
        'Referer': 'https://faxian.smzdm.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41',
        'Cookie': cookie
      },
      body: `article_id=${articleId}&channel_id=3&rating=1&client_type=PC&event_key=%E7%82%B9%E5%80%BC&otype=%E5%80%BC&aid=${articleId}&p=16&cid=2&source=%E6%97%A0&atp=3&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Ffaxian.smzdm.com%2F&sourceMode=%E6%97%A0`
    }
    magicJS.post(ClickLikeProductOptions, (err, resp, data)=>{
      if (err){
        magicJS.logWarning(`好价${articleId}点值失败，请求异常：${articleId}`);
        resolve(false);
      }
      else{
        try{
          let obj = JSON.parse(data);
          if (obj.error_code == 0){
            magicJS.logDebug(`好价${articleId}点值成功`);
            resolve(true);
          }
          else if (obj.error_code == 1){
            magicJS.logDebug(`好价${articleId}点值重复点值`);
            resolve(true);
          }
          else{
            magicJS.logWarning(`好价${articleId}点值失败，接口响应异常：${data}`);
            resolve(false);
          }
        }
        catch(err){
          magicJS.logWarning(`好价${articleId}点值失败，执行异常：${articleId}`);
          resolve(false);
        }
      }
    });
  })
}

// 好文点赞
function ClickLikeArticle(cookie, articleId){
  return new Promise((resolve) =>{
    let ClickLikeProductOptions = {
      url: 'https://zhiyou.smzdm.com/user/rating/ajax_add',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Host': 'zhiyou.smzdm.com',
        'Origin': 'https://post.smzdm.com',
        'Referer': 'https://post.smzdm.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41',
        'Cookie': cookie
      },
      body: `article_id=${articleId}&channel_id=11&rating=1&client_type=PC&event_key=%E7%82%B9%E5%80%BC&otype=%E7%82%B9%E8%B5%9E&aid=${articleId}&p=2&cid=11&source=%E6%97%A0&atp=76&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Fpost.smzdm.com%2F&sourceMode=%E6%97%A0`
    }
    magicJS.post(ClickLikeProductOptions, (err, resp, data)=>{
      if (err){
        magicJS.logWarning(`好文${articleId}点赞失败，请求异常：${articleId}`);
        resolve(false);
      }
      else{
        try{
          let obj = JSON.parse(data);
          if (obj.error_code == 0){
            magicJS.logDebug(`好文${articleId}点赞成功`);
            resolve(true);
          }
          else if(obj.error_code == 1 && obj.error_msg == '已喜欢'){
            magicJS.logDebug(`好文${articleId}点赞失败，重复点值。`);
            resolve(false);
          }
          else{
            magicJS.logWarning(`好文${articleId}点赞失败，接口响应异常：${data}`);
            resolve(false);
          }
        }
        catch(err){
          magicJS.logWarning(`好文${articleId}点赞失败，请求异常：${err}`);
          resolve(false);
        }
      }
    });
  })
}

// 好文收藏/取消收藏
function ClickFavArticle(cookie, articleId){
  return new Promise((resolve) =>{
    let options = {
      url: 'https://zhiyou.smzdm.com/user/favorites/ajax_favorite',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Host': 'zhiyou.smzdm.com',
        'Origin': 'https://post.smzdm.com',
        'Referer': 'https://post.smzdm.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41',
        'Cookie': cookie
      },
      body: `article_id=${articleId}&channel_id=11&client_type=PC&event_key=%E6%94%B6%E8%97%8F&otype=%E6%94%B6%E8%97%8F&aid=${articleId}&cid=11&p=2&source=%E6%97%A0&atp=76&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Fpost.smzdm.com%2F&sourceMode=%E6%97%A0`
    }
    magicJS.post(options, (err, resp, data)=>{
      if (err){
        magicJS.logWarning(`好文${articleId}收藏失败，请求异常：${articleId}`);
        resolve(false);
      }
      else{
        try{
          let obj = JSON.parse(data);
          if (obj.error_code == 0){
            magicJS.logDebug(`好文${articleId}收藏成功`);
            resolve(true);
          }
          else if(obj.error_code == 2){
            magicJS.logDebug(`好文${articleId}取消收藏成功`);
            resolve(true);
          }
          else{
            magicJS.logWarning(`好文${articleId}收藏失败，接口响应异常：${data}`);
            resolve(false);
          }
        }
        catch(err){
          magicJS.logWarning(`好文${articleId}收藏失败，请求异常：${err}`);
          resolve(false);
        }
      }
    });
  })
}

async function Main(){
  // 获取Cookie与账号密码
  if (magicJS.isRequest){
    if(zhiyouRegex.test(magicJS.request.url) && magicJS.request.method == 'GET'){
      let match_str = magicJS.request.headers.Cookie.match(/sess=[^\s]*;/);
      session_id = match_str != null ? match_str[0] : null;
      // 获取新的session_id
      if (session_id){
        // 获取持久化的session_id
        old_session_id = magicJS.read(smzdmSessionKey) != null ? magicJS.read(smzdmSessionKey) : '';
        // 获取新的session_id
        console.log({'old_session_id': old_session_id, 'new_session_id': session_id});    
        // 比较差异
        if (old_session_id == session_id){
          magicJS.logInfo('网页版cookie没有变化，无需更新。');
        }
        else{
          // 持久化cookie
          magicJS.write(smzdmSessionKey, session_id);
          magicJS.write(smzdmCookieKey, magicJS.request.headers.Cookie);
          magicJS.logInfo('写入cookie ' + magicJS.request.headers.Cookie);
          magicJS.notify(scriptName, '', '🎈获取cookie成功！！');
        }
      }
      else{
        magicJS.logError('没有读取到有效的Cookie信息。');
      }
    }
    else if(appLoginRegex.test(magicJS.request.url) && magicJS.request.method == 'POST'){
      if (magicJS.request.body){
        try{
          let matchArray = magicJS.request.body.match(/(user_login=)([^&]*)(&user_pass=)([^&]*)(&v=)/);
          let account = decodeURIComponent(matchArray[2]);
          let password = matchArray[4];
          let hisAccount = magicJS.read(smzdmAccountKey);
          let hisPassword = magicJS.read(smzdmPasswordKey);
          if (account != hisAccount || password != hisPassword){
            magicJS.write(smzdmAccountKey, account);
            magicJS.write(smzdmPasswordKey, password);
            magicJS.notify(scriptName, '', '🎈获取账号密码成功！！');
            magicJS.logInfo(`获取账号密码成功，登录账号：${account}`);
          }
          else{
            magicJS.logInfo(`账号密码没有变化，无需更新。登录账号：${account}`);
          }
        }
        catch (ex){
          magicJS.notify(scriptName, '', '❌获取账号密码出现异常,请查阅日志！！');
          magicJS.logError(`获取账号密码出现异常。\n请求数据：${magicJS.request.body}\n异常信息：${ex}`);
        }        
      }
      else{
        magicJS.logWarning(`获取账号密码时请求数据不合法 。\n请求数据：${magicJS.request.body}`);
      }
    }
  }
  // 每日签到与完成任务
  else{
    // 获取Cookie
    let smzdmCookie = magicJS.read(smzdmCookieKey);

    if (!!smzdmCookie === false){
      magicJS.logWarning('没有读取到什么值得买有效cookie，请访问zhiyou.smzdm.com进行登录');
      magicJS.notify(scriptName, '', '❓没有获取到Web端Cookie，请先进行登录。');
    }
    else{

      // 通知信息
      let title = '';
      let subTitle = '';
      let content = '';

      // Web端签到信息
      let webCheckinErr = null;
      let webCheckinResult = '';
      let webCheckinStr = '';

      // App端签到信息
      let getTokenStr = '';
      let appCheckinErr = null;
      let appCheckinStr = '';

      // 任务完成情况
      let clickGoBuyTimes = 0;
      let clickLikePrductTimes = 0;
      let clickLikeArticleTimes = 0;
      let clickFavArticleTimes = 0;
      
      // ---------------------- 查询签到前用户数据 ---------------------- 
      let [, , , beforeExp, , beforePrestige, ] = await WebGetCurrentInfoNewVersion(smzdmCookie);
      let [nickName, avatar, beforeVIPLevel, beforeHasCheckin, , beforeNotice, , ,beforePoint, beforeGold, beforeSilver] = await WebGetCurrentInfo(smzdmCookie);

      magicJS.logInfo(`昵称：${nickName}\nWeb端签到状态：${beforeHasCheckin}\n签到前等级${beforeVIPLevel}，积分${beforePoint}，经验${beforeExp}，金币${beforeGold}，碎银子${beforeSilver}，威望${beforePrestige}, 未读消息${beforeNotice}`);

      // ---------------------- 开始签到 ---------------------- 

      // App端签到
      let account = !!smzdmAccount? smzdmAccount : magicJS.read(smzdmAccountKey);
      let password = !!smzdmPassword? smzdmPassword : magicJS.read(smzdmPasswordKey);
      if (!!account && !!password){
        let appToken = magicJS.read(smzdmTokenKey);
        if (!appToken){
          [,getTokenStr,appToken] = await AppGetToken(account, password);
        }
        if (!!appToken){
          let AppCheckinRetry = magicJS.retry(AppCheckin, 3, 3000, async (result)=>{
            if (result[0] == 3){
              [, ,appToken] = await AppGetToken(account, password);
              if (appToken) throw 'AppToken已失效，触发重试！';
            }
          });
          // 重试
          [appCheckinErr,[,appCheckinStr]] = await magicJS.attempt(AppCheckinRetry(), [false, 'App端签到异常']);
          if (appCheckinErr){
            appCheckinStr = appCheckinErr;
          }
        }
        else{
          appCheckinStr = getTokenStr;
        }
      }
      else{
        magicJS.notify(scriptName, '', '❓没有获取到App端账号密码，请先进行登录。');
      }

      // 必须间隔3秒才能确保签到成功
      await magicJS.sleep(3000);
      
      // Web端签到
      if (!beforeHasCheckin){
        let webCheckinRetry = magicJS.retry(WebCheckin, 3, 3000);
        [webCheckinErr,[webCheckinResult, webCheckinStr]] = await magicJS.attempt(webCheckinRetry(smzdmCookie), [false, 'Web端签到异常']);
        if (webCheckinErr){
          webCheckinStr = webCheckinErr;
          magicJS.logWarning('Web端签到异常：' + webCheckinErr);
        }
      }
      else{
        magicJS.logWarning('Web端重复签到');
        [webCheckinErr,[webCheckinResult, webCheckinStr]] = [null, [true, '重复签到']];
      }

      // ---------------------- 每日完成任务 ---------------------- 
      
      // 获取去购买和好价Id列表
      let [goBuyList, likProductList] = await GetProductList();
      // 获取好文列表
      let articleList = await GetDataArticleIdList();

      // 好价点击去购买
      const clickGoBuyAsync = async() =>{
        let clickGoBuyList = goBuyList.splice(0, clickGoBuyMaxTimes);
        if (clickGoBuyList.length > 0){
          for (let i=0;i<clickGoBuyList.length;i++){
            await ClickGoBuyButton(smzdmCookie, clickGoBuyList[i]);
            magicJS.logInfo(`完成第${i+1}次“每日去购买”任务，点击链接：\n${clickGoBuyList[i]}`);
            clickGoBuyTimes += 1;
            await magicJS.sleep(3100);
          }
        }
      }

      // 好价点值
      const clickLikeProductAsync = async() =>{
        let clickLikeProductList = likProductList.splice(0, clickLikeProductMaxTimes);
        if (clickLikeProductList.length > 0){
          for (let i=0;i<clickLikeProductList.length;i++){
            await ClickLikeProduct(smzdmCookie, clickLikeProductList[i]);
            magicJS.logInfo(`完成第${i+1}次“好价点值”任务，好价Id：\n${clickLikeProductList[i]}`);
            clickLikePrductTimes += 1;
            await magicJS.sleep(3100);
          }
        } 
      }

      // 好文点赞
      const clickLikeArticleAsync = async() =>{
        let likeArticleList = articleList.splice(0, clickLikeArticleMaxTimes);
        if (likeArticleList.length > 0){
          for (let i=0;i<likeArticleList.length;i++){
            await ClickLikeArticle(smzdmCookie, likeArticleList[i]);
            magicJS.logInfo(`完成第${i+1}次“好文点赞”任务，好文Id：\n${likeArticleList[i]}`);
            clickLikeArticleTimes += 1;
            await magicJS.sleep(3100);
          }
        }
      }

      // 好文收藏
      const clickFavArticleAsync = async() =>{
        let favArticleList = articleList.splice(0, clickFavArticleMaxTimes);
        if (favArticleList.length > 0){
          // 好文收藏
          for (let i=0;i<favArticleList.length;i++){
            await ClickFavArticle(smzdmCookie, articleList[i]);
            magicJS.logInfo(`完成第${i+1}次“好文收藏”任务，好文Id：\n${articleList[i]}`);
            clickFavArticleTimes += 1;
            await magicJS.sleep(3100);
          }
          // 取消收藏
          for (let i=0;i<favArticleList.length;i++){
            await ClickFavArticle(smzdmCookie, articleList[i]);
            magicJS.logInfo(`取消第${i+1}次“好文收藏”任务的好文，好文Id：\n${articleList[i]}`);
            await magicJS.sleep(3100);
          }
        }
      }

      await Promise.all([clickGoBuyAsync(), clickLikeProductAsync()]);
      await Promise.all([clickLikeArticleAsync(), clickFavArticleAsync()]);

      // ---------------------- 查询签到后用户数据 ---------------------- 
      // 休眠3秒再查询，减少延迟显示的情况
      await magicJS.sleep(3000); 
      let [, afteruserPointList, , afterExp, ,afterPrestige, ] = await WebGetCurrentInfoNewVersion(smzdmCookie);
      let [, , afterVIPLevel, afterHasCheckin, afterCheckinNum, afterNotice, , , afterPoint, afterGold, afterSilver] = await WebGetCurrentInfo(smzdmCookie);

      magicJS.logInfo(`昵称：${nickName}\nWeb端签到状态：${afterHasCheckin}\n签到前等级${afterVIPLevel}，积分${afterPoint}，经验${afterExp}，金币${afterGold}，碎银子${afterSilver}，威望${afterPrestige}, 未读消息${afterNotice}`);
      title = `${scriptName} - ${nickName} V${afterVIPLevel}`;
  
      if (beforeHasCheckin && afterHasCheckin){
        webCheckinStr = 'Web端重复签到';
      }
      else if(!beforeHasCheckin && afterHasCheckin){
        webCheckinStr = 'Web端签到成功';
      }
  
      subTitle = `${webCheckinStr} ${appCheckinStr}`;
      if (!!afterCheckinNum) subTitle += ` 已签${afterCheckinNum}天`;
  
      if (afterExp && beforeExp){
        let addPoint = afterPoint - beforePoint;
        let addExp = afterExp - beforeExp;
        let addGold = afterGold - beforeGold;
        let addPrestige = afterPrestige - beforePrestige;
        let addSilver = afterSilver - beforeSilver;
        content += !!content? '\n' : '';
        content += '积分' + afterPoint + (addPoint > 0 ? '(+' + addPoint + ')' : '') +  
        ' 经验' + afterExp + (addExp > 0 ? '(+' + addExp + ')' : '') + 
        ' 金币' + afterGold + (addGold > 0 ? '(+' + addGold + ')' : '') + '\n' +
        '碎银子' + afterSilver + (addSilver > 0 ? '(+' + addSilver + ')' : '') +
        ' 威望' + afterPrestige + (addPrestige > 0 ? '(+' + addPrestige + ')' : '') + 
        ' 未读消息' + afterNotice;
      }
      
      content += `\n点值 ${clickLikePrductTimes}/${clickLikeProductMaxTimes} 去购买 ${clickGoBuyTimes}/${clickGoBuyMaxTimes}\n点赞 ${clickLikeArticleTimes}/${clickLikeArticleMaxTimes} 收藏 ${clickLikeArticleTimes}/${clickFavArticleTimes}`

      content += !!content? '\n' : '';
      if (afteruserPointList.length > 0){
        content += '用户近期经验变动情况(有延迟)：'
        afteruserPointList.forEach(element => {
          content += `\n${element['time']} ${element['detail']}`
        });
        content += '\n如经验值无变动，请更新ookie。';
      }
      else{
        content += '没有获取到用户近期的经验变动情况'
      }
  
      if (webCheckinStr || appCheckinStr || content){
        magicJS.notify(title, subTitle, content, {'media-url': avatar});
      }
    }



  }
  magicJS.done();
}

Main();

function MagicJS(scriptName='MagicJS', logLevel='INFO'){

  return new class{

    constructor(){
      this.version = '2.2.2'
      this.scriptName = scriptName;
      this.logLevels = {
        DEBUG: 5,
        INFO: 4,
        NOTIFY: 3,
        WARNING: 2,
        ERROR: 1,
        CRITICAL: 0,
        NONE: -1
      };
      this.isLoon = typeof $loon !== 'undefined';
      this.isQuanX = typeof $task !== 'undefined';
      this.isJSBox = typeof $drive !== 'undefined';
      this.isNode = typeof module !== 'undefined' && !this.isJSBox;
      this.isSurge = typeof $httpClient !== 'undefined' && !this.isLoon;
      this.node = {'request': undefined, 'fs': undefined, 'data': {}};
      this.iOSUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1';
      this.pcUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59';
      this.logLevel = logLevel;
      if (this.isNode){
        this.node.fs = require('fs');
        this.node.request = require('request');
        try{
          this.node.fs.accessSync('./magic.json', this.node.fs.constants.R_OK | this.node.fs.constants.W_OK);
        }
        catch(err){
          this.node.fs.writeFileSync('./magic.json', '{}', {encoding: 'utf8'})
        }
        this.node.data = require('./magic.json');
      }
      else if (this.isJSBox){
        if (!$file.exists('drive://MagicJS')){
          $file.mkdir('drive://MagicJS');
        }
        if (!$file.exists('drive://MagicJS/magic.json')){
          $file.write({
            data: $data({string: '{}'}),
            path: 'drive://MagicJS/magic.json'
          })
        }
      }
    }

    set logLevel(level) {this._logLevel = typeof level === 'string'? level.toUpperCase(): 'DEBUG'};
    get logLevel() {return this._logLevel};
    get isRequest() { return typeof $request !== 'undefined' && typeof $response === 'undefined'}
    get isResponse() { return typeof $response !== 'undefined' }
    get request() { return typeof $request !== 'undefined' ? $request : undefined }
    get response() { 
      if (typeof $response !== 'undefined'){
        if ($response.hasOwnProperty('status')) $response['statusCode'] = $response['status']
        if ($response.hasOwnProperty('statusCode')) $response['status'] = $response['statusCode']
        return $response;
      }
      else{
        return undefined;
      }
    }
    get platform(){
      if (this.isSurge) return "Surge"
      else if (this.isQuanX) return "Quantumult X"
      else if (this.isLoon) return "Loon"
      else if (this.isJSBox) return "JSBox"
      else if (this.isNode) return "Node.js"
      else return "unknown"
    }

    read(key, session=''){
      let val = '';
      // 读取原始数据
      if (this.isSurge || this.isLoon) {
        val = $persistentStore.read(key);
      }
      else if (this.isQuanX) {
        val = $prefs.valueForKey(key);
      }
      else if (this.isNode){
        val = this.node.data;
      }
      else if (this.isJSBox){
        val = $file.read('drive://MagicJS/magic.json').string;
      }
      try {
        // Node 和 JSBox数据处理
        if (this.isNode) val = val[key]
        if (this.isJSBox) val = JSON.parse(val)[key];
        // 带Session的情况
        if (!!session){
          if(typeof val === 'string') val = JSON.parse(val);
          val = !!val && typeof val === 'object' ? val[session]: null;
        }
      } 
      catch (err){ 
        this.logError(err);
        val = !!session? {} : null;
        this.del(key);
      }
      if (typeof val === 'undefined') val = null;
      try {if(!!val && typeof val === 'string') val = JSON.parse(val)} catch(err) {}
      this.logDebug(`READ DATA [${key}]${!!session? `[${session}]`: ''}(${typeof val})\n${JSON.stringify(val)}`);
      return val;
    };

    write(key, val, session=''){
      let data = !!session ? {} : '';
      // 读取原先存储的JSON格式数据
      if (!!session && (this.isSurge || this.isLoon)) {
        data = $persistentStore.read(key);
      }
      else if (!!session && this.isQuanX) {
        data = $prefs.valueForKey(key);
      }
      else if (this.isNode){
        data = this.node.data;
      }
      else if (this.isJSBox){
        data = JSON.parse($file.read('drive://MagicJS/magic.json').string);
      }
      if (!!session){
        // 有Session，所有数据都是Object
        try {
          if (typeof data === 'string') data = JSON.parse(data)
          data = typeof data === 'object' && !!data ? data : {};
        }
        catch(err){
          this.logError(err);
          this.del(key); 
          data = {};
        };
        if (this.isJSBox || this.isNode){
          // 构造数据
          if (!data.hasOwnProperty(key) || typeof data[key] != 'object'){
            data[key] = {};
          }
          if (!data[key].hasOwnProperty(session)){
            data[key][session] = null;
          }
          // 写入或删除数据
          if (typeof val === 'undefined'){
            delete data[key][session];
          }
          else{
            data[key][session] = val;
          }
        }
        else {
          // 写入或删除数据      
          if (typeof val === 'undefined'){
            delete data[session];
          }
          else{
            data[session] = val;
          }
        }
      }
      // 没有Session时
      else{
        if (this.isNode || this.isJSBox){
          // 删除数据
          if (typeof val === 'undefined'){
            delete data[key];
          }
          else{
            data[key] = val;
          }
        }        
        else{    
          // 删除数据      
          if (typeof val === 'undefined'){
            data = null;
          }
          else{
            data = val;
          }
        }
      }
      // 数据回写
      if (typeof data === 'object') data = JSON.stringify(data);
      if (this.isSurge || this.isLoon) {
        $persistentStore.write(data, key);
      }
      else if (this.isQuanX) {
        $prefs.setValueForKey(data, key);
      }
      else if (this.isNode){
        this.node.fs.writeFileSync('./magic.json', data)
      }
      else if (this.isJSBox){
        $file.write({data: $data({string: data}), path: 'drive://MagicJS/magic.json'});
      }
      this.logDebug(`WRITE DATA [${key}]${!!session? `[${session}]`: ''}(${typeof val})\n${JSON.stringify(val)}`);
    };

    del(key, session=''){
      this.logDebug(`DELETE KEY [${key}]${!!session ? `[${session}]`:''}`);
      this.write(key, undefined, session);
    }

    /**
     * iOS系统通知
     * @param {*} title 通知标题
     * @param {*} subTitle 通知副标题
     * @param {*} body 通知内容
     * @param {*} options 通知选项，目前支持传入超链接或Object
     * Surge不支持通知选项，Loon仅支持打开URL，QuantumultX支持打开URL和多媒体通知
     * options "applestore://" 打开Apple Store
     * options "https://www.apple.com.cn/" 打开Apple.com.cn
     * options {'open-url': 'https://www.apple.com.cn/'} 打开Apple.com.cn
     * options {'open-url': 'https://www.apple.com.cn/', 'media-url': 'https://raw.githubusercontent.com/Orz-3/mini/master/Apple.png'} 打开Apple.com.cn，显示一个苹果Logo
     */ 
    notify(title=this.scriptName, subTitle='', body='', options=''){
      this.logNotify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${typeof options === 'object'? JSON.stringify(options) : options}`);
      let convertOptions = (_options) =>{
        let newOptions = '';
        if (typeof _options === 'string'){
          if (this.isLoon) newOptions = _options;
          else if (this.isQuanX) newOptions = {'open-url': _options};
        }
        else if (typeof _options === 'object'){
          if (this.isLoon) newOptions = !!_options['open-url'] ? _options['open-url'] : '';
          else if (this.isQuanX) newOptions = !!_options['open-url'] || !!_options['media-url'] ? _options : {};
        }
        return newOptions;
      }
      options = convertOptions(options);
      // 支持单个参数通知
      if (arguments.length == 1){
        title = this.scriptName;
        subTitle = '',
        body = arguments[0];
      }
      if (this.isSurge){
        $notification.post(title, subTitle, body);
      }
      else if (this.isLoon){
        if (!!options) $notification.post(title, subTitle, body, options);
        else $notification.post(title, subTitle, body);
      }
      else if (this.isQuanX) {
         $notify(title, subTitle, body, options);
      }
      else if (this.isNode) {}
      else if (this.isJSBox){
        let push = {
          title: title,
          body: !!subTitle ? `${subTitle}\n${body}` : body,
        }
        $push.schedule(push);
      } 
    }
    
    log(msg, level="INFO"){
      if (!(this.logLevels[this._logLevel] < this.logLevels[level.toUpperCase()])) console.log(`[${level}] [${this.scriptName}]\n${msg}\n`);
    }

    logDebug(msg){
      this.log(msg, "DEBUG");
    }

    logInfo(msg){
      this.log(msg, "INFO");
    }

    logNotify(msg){
      this.log(msg, "NOTIFY");
    }

    logWarning(msg){
      this.log(msg, "WARNING");
    }

    logError(msg){
      this.log(msg, "ERROR");
    }

    /**
     * 对传入的Http Options根据不同环境进行适配
     * @param {*} options 
     */
    adapterHttpOptions(options, method){
      let _options = typeof options === 'object'? Object.assign({}, options): {'url': options, 'headers': {}};
      
      if (_options.hasOwnProperty('header') && !_options.hasOwnProperty('headers')){
        _options['headers'] = _options['header'];
        delete _options['header'];
      }

      // 规范化的headers
      const headersMap = {
        'accept': 'Accept',
        'accept-ch': 'Accept-CH',
        'accept-charset': 'Accept-Charset',
        'accept-features': 'Accept-Features',
        'accept-encoding': 'Accept-Encoding',
        'accept-language': 'Accept-Language',
        'accept-ranges': 'Accept-Ranges',
        'access-control-allow-credentials': 'Access-Control-Allow-Credentials',
        'access-control-allow-origin': 'Access-Control-Allow-Origin',
        'access-control-allow-methods': 'Access-Control-Allow-Methods',
        'access-control-allow-headers': 'Access-Control-Allow-Headers',
        'access-control-max-age': 'Access-Control-Max-Age',
        'access-control-expose-headers': 'Access-Control-Expose-Headers',
        'access-control-request-method': 'Access-Control-Request-Method',
        'access-control-request-headers': 'Access-Control-Request-Headers',
        'age': 'Age',
        'allow': 'Allow',
        'alternates': 'Alternates',
        'authorization': 'Authorization',
        'cache-control': 'Cache-Control',
        'connection': 'Connection',
        'content-encoding': 'Content-Encoding',
        'content-language': 'Content-Language',
        'content-length': 'Content-Length',
        'content-location': 'Content-Location',
        'content-md5': 'Content-MD5',
        'content-range': 'Content-Range',
        'content-security-policy': 'Content-Security-Policy',
        'content-type': 'Content-Type',
        'cookie': 'Cookie',
        'dnt': 'DNT',
        'date': 'Date',
        'etag': 'ETag',
        'expect': 'Expect',
        'expires': 'Expires',
        'from': 'From',
        'host': 'Host',
        'if-match': 'If-Match',
        'if-modified-since': 'If-Modified-Since',
        'if-none-match': 'If-None-Match',
        'if-range': 'If-Range',
        'if-unmodified-since': 'If-Unmodified-Since',
        'last-event-id': 'Last-Event-ID',
        'last-modified': 'Last-Modified',
        'link': 'Link',
        'location': 'Location',
        'max-forwards': 'Max-Forwards',
        'negotiate': 'Negotiate',
        'origin': 'Origin',
        'pragma': 'Pragma',
        'proxy-authenticate': 'Proxy-Authenticate',
        'proxy-authorization': 'Proxy-Authorization',
        'range': 'Range',
        'referer': 'Referer',
        'retry-after': 'Retry-After',
        'sec-websocket-extensions': 'Sec-Websocket-Extensions',
        'sec-websocket-key': 'Sec-Websocket-Key',
        'sec-websocket-origin': 'Sec-Websocket-Origin',
        'sec-websocket-protocol': 'Sec-Websocket-Protocol',
        'sec-websocket-version': 'Sec-Websocket-Version',
        'server': 'Server',
        'set-cookie': 'Set-Cookie',
        'set-cookie2': 'Set-Cookie2',
        'strict-transport-security': 'Strict-Transport-Security',
        'tcn': 'TCN',
        'te': 'TE',
        'trailer': 'Trailer',
        'transfer-encoding': 'Transfer-Encoding',
        'upgrade': 'Upgrade',
        'user-agent': 'User-Agent',
        'variant-vary': 'Variant-Vary',
        'vary': 'Vary',
        'via': 'Via',
        'warning': 'Warning',
        'www-authenticate': 'WWW-Authenticate',
        'x-content-duration': 'X-Content-Duration',
        'x-content-security-policy': 'X-Content-Security-Policy',
        'x-dnsprefetch-control': 'X-DNSPrefetch-Control',
        'x-frame-options': 'X-Frame-Options',
        'x-requested-with': 'X-Requested-With',
        'x-surge-skip-scripting':'X-Surge-Skip-Scripting'
      }
      if (typeof _options.headers === 'object'){
        for (let key in _options.headers){
          if (headersMap[key]) {
            _options.headers[headersMap[key]] = _options.headers[key];
            delete _options.headers[key];
          }
        }
      }

      // 自动补完User-Agent，减少请求特征
      if (!!!_options.headers || typeof _options.headers !== 'object' || !!!_options.headers['User-Agent']){
        if (!!!_options.headers || typeof _options.headers !== 'object') _options.headers = {};
        if (this.isNode) _options.headers['User-Agent'] = this.pcUserAgent;
        else  _options.headers['User-Agent'] = this.iOSUserAgent
      }

      // 判断是否跳过脚本处理
      let skipScripting = false;
      if ((typeof _options['opts'] === 'object' && (_options['opts']['hints'] === true || _options['opts']['Skip-Scripting'] === true)) || 
          (typeof _options['headers'] === 'object' && _options['headers']['X-Surge-Skip-Scripting'] === true)){
        skipScripting = true;
      }
      if (!skipScripting){
        if (this.isSurge) _options.headers['X-Surge-Skip-Scripting'] = false;
        // 目前对Loon的处理暂时无用，会被强制覆盖掉，等待作者更新
        else if (this.isLoon) _options.headers['X-Requested-With'] = 'XMLHttpRequest'; 
        else if (this.isQuanX){
          if (typeof _options['opts'] !== 'object') _options.opts = {};
          _options.opts['hints'] = false;
        }
      }

      // 对请求数据做清理
      if (!this.isSurge || skipScripting) delete _options.headers['X-Surge-Skip-Scripting'];
      if (!this.isQuanX && _options.hasOwnProperty('opts')) delete _options['opts'];
      if (this.isQuanX && _options.hasOwnProperty('opts')) delete _options['opts']['Skip-Scripting'];
      
      // GET请求将body转换成QueryString(beta)
      if (method === 'GET' && !this.isNode && !!_options.body){
        let qs = Object.keys(_options.body).map(key=>{
          if (typeof _options.body === 'undefined') return ''
          return `${encodeURIComponent(key)}=${encodeURIComponent(_options.body[key])}`
        }).join('&');
        if (_options.url.indexOf('?') < 0) _options.url += '?'
        if (_options.url.lastIndexOf('&')+1 != _options.url.length && _options.url.lastIndexOf('?')+1 != _options.url.length) _options.url += '&'
        _options.url += qs;
        delete _options.body;
      }

      // 适配多环境
      if (this.isQuanX){
        if (_options.hasOwnProperty('body') && typeof _options['body'] !== 'string') _options['body'] = JSON.stringify(_options['body']);
        _options['method'] = method;
      }
      else if (this.isNode){
        delete _options.headers['Accept-Encoding'];
        if (typeof _options.body === 'object'){
          if (method === 'GET'){
            _options.qs = _options.body;
            delete _options.body
          }
          else if (method === 'POST'){
            _options['json'] = true;
            _options.body = _options.body;
          }
        }
      }
      else if (this.isJSBox){
        _options['header'] = _options['headers'];
        delete _options['headers']
      }

      return _options;
    }
    
    /**
     * Http客户端发起GET请求
     * @param {*} options 
     * @param {*} callback 
     * options可配置参数headers和opts，用于判断由脚本发起的http请求是否跳过脚本处理。
     * 支持Surge和Quantumult X两种配置方式。
     * 以下几种配置会跳过脚本处理，options没有opts或opts的值不匹配，则不跳过脚本处理
     * {opts:{"hints": true}}
     * {opts:{"Skip-Scripting": true}}
     * {headers: {"X-Surge-Skip-Scripting": true}}
     */
    get(options, callback){
      let _options = this.adapterHttpOptions(options, 'GET');
      this.logDebug(`HTTP GET: ${JSON.stringify(_options)}`);
      if (this.isSurge || this.isLoon) {
        $httpClient.get(_options, callback);
      }
      else if (this.isQuanX) {
        $task.fetch(_options).then(
          resp => {
            resp['status'] = resp.statusCode
            callback(null, resp, resp.body)
          },
          reason => callback(reason.error, null, null),
        )
      }
      else if(this.isNode){
        return this.node.request.get(_options, callback);
      }
      else if(this.isJSBox){
        _options['handler'] = (resp)=>{
          let err = resp.error? JSON.stringify(resp.error) : undefined;
          let data = typeof resp.data === 'object' ? JSON.stringify(resp.data) : resp.data;
          callback(err, resp.response, data);
        }
        $http.get(_options);
      }
    }

    /**
     * Http客户端发起POST请求
     * @param {*} options 
     * @param {*} callback 
     * options可配置参数headers和opts，用于判断由脚本发起的http请求是否跳过脚本处理。
     * 支持Surge和Quantumult X两种配置方式。
     * 以下几种配置会跳过脚本处理，options没有opts或opts的值不匹配，则不跳过脚本处理
     * {opts:{"hints": true}}
     * {opts:{"Skip-Scripting": true}}
     * {headers: {"X-Surge-Skip-Scripting": true}}
     */
    post(options, callback){
      let _options = this.adapterHttpOptions(options, 'POST');
      this.logDebug(`HTTP POST: ${JSON.stringify(_options)}`);
      if (this.isSurge || this.isLoon) {
        $httpClient.post(_options, callback);
      }
      else if (this.isQuanX) {
        $task.fetch(_options).then(
          resp => {
            resp['status'] = resp.statusCode
            callback(null, resp, resp.body)
          },
          reason => {callback(reason.error, null, null)}
        )
      }
      else if(this.isNode){
        return this.node.request.post(_options, callback);
      }
      else if(this.isJSBox){
        _options['handler'] = (resp)=>{
          let err = resp.error? JSON.stringify(resp.error) : undefined;
          let data = typeof resp.data === 'object' ? JSON.stringify(resp.data) : resp.data;
          callback(err, resp.response, data);
        }
        $http.post(_options);
      }
    }

    done(value = {}){
      if (typeof $done !== 'undefined'){
        $done(value);
      }
    }

    isToday(day){
      if (day == null){
          return false;
      }
      else{
        let today = new Date();
        if (typeof day == 'string'){
            day = new Date(day);
        }
        if (today.getFullYear() == day.getFullYear() && today.getMonth() == day.getMonth() && today.getDay() == day.getDay()){
            return true;
        }
        else{
            return false;
        }
      }
    }

    isNumber(val) {
      return parseFloat(val).toString() === "NaN"? false: true;
    }

    /**
     * 对await执行中出现的异常进行捕获并返回，避免写过多的try catch语句
     * 示例：let [err,val] = await magicJS.attempt(func(), 'defaultvalue');
     * 或者：let [err, [val1,val2]] = await magicJS.attempt(func(), ['defaultvalue1', 'defaultvalue2']);
     * @param {*} promise Promise 对象
     * @param {*} defaultValue 出现异常时返回的默认值
     * @returns 返回两个值，第一个值为异常，第二个值为执行结果
     */
    attempt(promise, defaultValue=null){ return promise.then((args)=>{return [null, args]}).catch(ex=>{this.logError(ex); return [ex, defaultValue]})};

    /**
     * 重试方法
     * @param {*} fn 需要重试的函数
     * @param {number} [retries=5] 重试次数
     * @param {number} [interval=0] 每次重试间隔
     * @param {function} [callback=null] 函数没有异常时的回调，会将函数执行结果result传入callback，根据result的值进行判断，如果需要再次重试，在callback中throw一个异常，适用于函数本身没有异常但仍需重试的情况。
     * @returns 返回一个Promise对象
     */
    retry(fn, retries=5, interval=0, callback=null) {
      return (...args)=>{
        return new Promise((resolve, reject) =>{
          function _retry(...args){
            Promise.resolve().then(()=>fn.apply(this,args)).then(
              result => {
                if (typeof callback === 'function'){
                  Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{
                    this.logError(ex);
                    if (retries >= 1 && interval > 0){
                      setTimeout(() => _retry.apply(this, args), interval);
                    }
                    else if (retries >= 1) {
                      _retry.apply(this, args);
                    }
                    else{
                      reject(ex);
                    }
                    retries --;
                  });
                }
                else{
                  resolve(result);
                }
              }
              ).catch(ex=>{
              this.logError(ex);
              if (retries >= 1 && interval > 0){
                setTimeout(() => _retry.apply(this, args), interval);
              }
              else if (retries >= 1) {
                _retry.apply(this, args);
              }
              else{
                reject(ex);
              }
              retries --;
            })
          }
          _retry.apply(this, args);
        });
      };
    }

    formatTime(time, fmt="yyyy-MM-dd hh:mm:ss") {
      var o = {
        "M+": time.getMonth() + 1,
        "d+": time.getDate(),
        "h+": time.getHours(),
        "m+": time.getMinutes(),
        "s+": time.getSeconds(),
        "q+": Math.floor((time.getMonth() + 3) / 3),
        "S": time.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    };

    now(){
      return this.formatTime(new Date(), "yyyy-MM-dd hh:mm:ss");
    }

    sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    
  }(scriptName);
}
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
let clickGoBuyMaxTimes = 0; // 好价点击去购买的次数
let clickLikeProductMaxTimes = 7; // 好价点值次数
let clickLikeArticleMaxTimes = 7; // 好文点赞次数
let clickFavArticleMaxTimes = 7; // 好文收藏次数

let magicJS = MagicJS(scriptName, "INFO");
magicJS.unifiedPushUrl = magicJS.read('smzdm_unified_push_url') || magicJS.read('magicjs_unified_push_url');

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

// APP端登录获取账号密码
function GetAppPassword() {
  if (magicJS.request.body) {
    try {
      let matchArray = magicJS.request.body.match(/(user_login=)([^&]*)(&user_pass=)([^&]*)(&v=)/);
      let account = decodeURIComponent(matchArray[2]);
      let password = matchArray[4];
      let hisAccount = magicJS.read(smzdmAccountKey);
      let hisPassword = magicJS.read(smzdmPasswordKey);
      if (account != hisAccount || password != hisPassword) {
        magicJS.write(smzdmAccountKey, account);
        magicJS.write(smzdmPasswordKey, password);
        magicJS.notify(scriptName, '', '🎈获取账号密码成功！！');
        magicJS.logInfo(`获取账号密码成功，登录账号：${account}`);
      }
      else {
        magicJS.logInfo(`账号密码没有变化，无需更新。登录账号：${account}`);
      }
    }
    catch (ex) {
      magicJS.notify(scriptName, '', '❌获取账号密码出现异常,请查阅日志！！');
      magicJS.logError(`获取账号密码出现异常。\n请求数据：${magicJS.request.body}\n异常信息：${ex}`);
    }
  }
  else {
    magicJS.logWarning(`获取账号密码时请求数据不合法 。\n请求数据：${magicJS.request.body}`);
  }
}

// Web端登录获取Cookie
function GetWebCookie() {
  let match_str = magicJS.request.headers.Cookie.match(/sess=[^\s]*;/);
  session_id = match_str != null ? match_str[0] : null;
  // 获取新的session_id
  if (session_id) {
    // 获取持久化的session_id
    old_session_id = magicJS.read(smzdmSessionKey) != null ? magicJS.read(smzdmSessionKey) : '';
    // 获取新的session_id
    console.log({ 'old_session_id': old_session_id, 'new_session_id': session_id });
    // 比较差异
    if (old_session_id == session_id) {
      magicJS.logInfo('网页版cookie没有变化，无需更新。');
    }
    else {
      // 持久化cookie
      magicJS.write(smzdmSessionKey, session_id);
      magicJS.write(smzdmCookieKey, magicJS.request.headers.Cookie);
      magicJS.logInfo('写入cookie ' + magicJS.request.headers.Cookie);
      magicJS.notify(scriptName, '', '🎈获取cookie成功！！');
    }
  }
  else {
    magicJS.logError('没有读取到有效的Cookie信息。');
  }
}

// 获取用户信息，新版
function WebGetCurrentInfoNewVersion(smzdmCookie){
  return new Promise(resolve =>{
    let getUserPointOptions ={
      url : 'https://zhiyou.smzdm.com/user/exp/',
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
          let userName =data.match(/info-stuff-nickname.*zhiyou\.smzdm\.com\/user[^<]*>([^<]*)</)[1].trim();
          // 获取近期经验值变动情况
          let pointTimeList = data.match(/<div class="scoreLeft">(.*)<\/div>/ig);
          let pointDetailList = data.match(/<div class=['"]scoreRight ellipsis['"]>(.*)<\/div>/ig);
          let minLength = pointTimeList.length > pointDetailList.length ? pointDetailList.length : pointTimeList.length;
          let userPointList = [];
          for (let i=0;i<minLength;i++){
            userPointList.push({
              'time': pointTimeList[i].match(/\<div class=['"]scoreLeft['"]\>(.*)\<\/div\>/)[1], 
              'detail': pointDetailList[i].match(/\<div class=['"]scoreRight ellipsis['"]\>(.*)\<\/div\>/)[1]
            });
          }
          // 获取用户资源
          let assetsNumList = data.match(/assets-part[^<]*>(.*)</ig);
          let points = assetsNumList[0].match(/assets-num[^<]*>(.*)</)[1]; // 积分
          let experience = assetsNumList[2].match(/assets-num[^<]*>(.*)</)[1]; // 经验
          let gold = assetsNumList[4].match(/assets-num[^<]*>(.*)</)[1]; // 金币
          // let prestige = assetsNumList[6].match(/assets-num[^<]*>(.*)</)[1]; // 威望
          let prestige = 0;
          let silver = assetsNumList[6].match(/assets-num[^<]*>(.*)</)[1]; // 碎银子
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
          else if (obj.error_code == '0' && obj.hasOwnProperty('s')){
            magicJS.write(smzdmTokenKey, obj['s']);
            resolve([true,'App端登录成功',obj['s']]);
            magicJS.logInfo(`App端登录成功`);
          }
          else{
            magicJS.logWarning(`App端登录失败，接口响应格式不合法。响应内容：${data}`);
            resolve([false,'App端响应异常',null]);
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
  return new Promise((resolve, reject) =>{
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
        reject('GetArticleListErr');
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
          reject('GetArticleListErr');
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

// 每日抽奖
function LotteryDraw(cookie, activeId='7mV1llk1l9'){
  return new Promise((resolve) =>{
      let options = {
        url : `https://zhiyou.smzdm.com/user/lottery/jsonp_draw?callback=jQuery34109305207178886287_${new Date().getTime()}&active_id=${activeId}&_=${new Date().getTime()}`,
        headers : {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Cookie": cookie,
          "Host": "zhiyou.smzdm.com",
          "Referer": "https://m.smzdm.com/zhuanti/life/choujiang/",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/smzdm 9.9.0 rv:91 (iPhone 11 Pro Max; iOS 14.2; zh_CN)/iphone_smzdmapp/9.9.0/wkwebview/jsbv_1.0.0"
        }
    };
    magicJS.get(options, (err, resp, data)=>{
      if (err){
        magicJS.logWarning(`每日抽奖失败，请求异常：${articleId}`);
        resolve('每日抽奖失败，请求异常');
      }
      else{
        try{
          let newData = /\((.*)\)/.exec(data);
          let obj = JSON.parse(newData[1]);
          if (obj.error_code === 0 || obj.error_code === 1 || obj.error_code === 4){
            magicJS.logDebug(obj.error_msg);
            resolve(obj.error_msg);
          }
          else{
            magicJS.logWarning(`每日抽奖失败，接口响应异常：${data}`);
            resolve('每日抽奖失败，接口响应异常');
          }
        }
        catch(err){
          magicJS.logWarning(`每日抽奖失败，请求异常：${err}`);
          resolve('每日抽奖失败，请求异常');
        }
      }
    });
  })
}

async function Main(){
  // 获取Cookie与账号密码
  if (magicJS.isRequest){
    if(zhiyouRegex.test(magicJS.request.url) && magicJS.request.method == 'GET'){
      GetWebCookie();
    }
    else if(appLoginRegex.test(magicJS.request.url) && magicJS.request.method == 'POST'){
      GetAppPassword();
    }
  }
  // 每日签到与完成任务
  else{
    // 获取Cookie
    let smzdmCookie = magicJS.read(smzdmCookieKey);
    // App端签到
    let account = !!smzdmAccount? smzdmAccount : magicJS.read(smzdmAccountKey);
    let password = !!smzdmPassword? smzdmPassword : magicJS.read(smzdmPasswordKey);

    if (!!smzdmCookie === false){
      magicJS.logWarning('没有读取到什么值得买有效cookie，请访问zhiyou.smzdm.com进行登录');
      magicJS.notify(scriptName, '', '❓没有获取到Web端Cookie，请先进行登录。');
    }
    else{

      let signinSubTitle = '';
      let signinSubContent = '';

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

      // 抽奖结果消息
      let lotteryStr = '';

      // 任务完成情况
      let clickGoBuyTimes = 0;
      let clickLikePrductTimes = 0;
      let clickLikeArticleTimes = 0;
      let clickFavArticleTimes = 0;
      
      // ---------------------- 查询签到前用户数据 ---------------------- 
      let [, , , beforeExp, , beforePrestige, ] = await WebGetCurrentInfoNewVersion(smzdmCookie);
      let [nickName, avatar, beforeVIPLevel, beforeHasCheckin, , beforeNotice, , ,beforePoint, beforeGold, beforeSilver] = await WebGetCurrentInfo(smzdmCookie);

      // 已经获取不到威望
      //magicJS.logInfo(`昵称：${nickName}\nWeb端签到状态：${beforeHasCheckin}\n签到前等级${beforeVIPLevel}，积分${beforePoint}，经验${beforeExp}，金币${beforeGold}，碎银子${beforeSilver}，威望${beforePrestige}, 未读消息${beforeNotice}`);
      magicJS.logInfo(`昵称：${nickName}\nWeb端签到状态：${beforeHasCheckin}\n签到前等级${beforeVIPLevel}，积分${beforePoint}，经验${beforeExp}，金币${beforeGold}，碎银子${beforeSilver}， 未读消息${beforeNotice}`);
      // ---------------------- 开始签到 ---------------------- 

      // 2021.01.18 暂时去除APP端签到
      // if (!!account && !!password){
      //   let appToken = magicJS.read(smzdmTokenKey);
      //   if (!appToken){
      //     [,getTokenStr,appToken] = await AppGetToken(account, password);
      //   }
      //   if (!!appToken){
      //     let AppCheckinRetry = magicJS.retry(AppCheckin, 3, 3000, async (result)=>{
      //       if (result[0] == 3){
      //         [, ,appToken] = await AppGetToken(account, password);
      //         if (appToken) throw 'AppToken已失效，触发重试！';
      //       }
      //     });
      //     // 重试
      //     [appCheckinErr,[,appCheckinStr]] = await magicJS.attempt(AppCheckinRetry(), [false, 'App端签到异常']);
      //     if (appCheckinErr){
      //       appCheckinStr = appCheckinErr;
      //     }
      //   }
      //   else{
      //     appCheckinStr = getTokenStr;
      //   }
      // }
      // else{
      //   magicJS.notify(scriptName, '', '❓没有获取到App端账号密码，请先进行登录。');
      // }

      // // 必须间隔3秒才能确保签到成功
      // await magicJS.sleep(3000);
      
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

      // ---------------------- 每日抽奖 ---------------------- 
      // 2021.01.18 暂时去除每日抽奖
      // lotteryStr = await LotteryDraw(smzdmCookie, '7mV1llk1l9');

      // ---------------------- 每日完成任务 ---------------------- 
      
      // 获取去购买和好价Id列表
      let [, [goBuyList=[], likProductList=[]]] = await magicJS.attempt(magicJS.retry(GetProductList, 5, 1000)(), [[], []]);
      // 获取好文列表
      let [, articleList=[]] = await magicJS.attempt(magicJS.retry(GetDataArticleIdList, 5, 1000)(), []);

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

      // 已经获取不到威望
      // magicJS.logInfo(`昵称：${nickName}\nWeb端签到状态：${afterHasCheckin}\n签到后等级${afterVIPLevel}，积分${afterPoint}，经验${afterExp}，金币${afterGold}，碎银子${afterSilver}，威望${afterPrestige}, 未读消息${afterNotice}`);
      magicJS.logInfo(`昵称：${nickName}\nWeb端签到状态：${afterHasCheckin}\n签到后等级${afterVIPLevel}，积分${afterPoint}，经验${afterExp}，金币${afterGold}，碎银子${afterSilver}，未读消息${afterNotice}`);
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
        // let addPrestige = afterPrestige - beforePrestige;
        let addSilver = afterSilver - beforeSilver;
        content += !!content? '\n' : '';
        content += '积分' + afterPoint + (addPoint > 0 ? '(+' + addPoint + ')' : '') +  
        ' 经验' + afterExp + (addExp > 0 ? '(+' + addExp + ')' : '') + 
        ' 金币' + afterGold + (addGold > 0 ? '(+' + addGold + ')' : '') + '\n' +
        '碎银子' + afterSilver + (addSilver > 0 ? '(+' + addSilver + ')' : '') +
        // ' 威望' + afterPrestige + (addPrestige > 0 ? '(+' + addPrestige + ')' : '') + 
        ' 未读消息' + afterNotice;
      }

      // 抽奖结果通知
      if (!!lotteryStr){
        content += `\n${lotteryStr}`;
      }
      
      content += `\n点值 ${clickLikePrductTimes}/${clickLikeProductMaxTimes} 去购买 ${clickGoBuyTimes}/${clickGoBuyMaxTimes}\n点赞 ${clickLikeArticleTimes}/${clickLikeArticleMaxTimes} 收藏 ${clickLikeArticleTimes}/${clickFavArticleTimes}`

      content += !!content? '\n' : '';
      if (afteruserPointList.length > 0){
        content += '用户近期经验变动情况(有延迟)：'
        afteruserPointList.forEach(element => {
          content += `\n${element['time']} ${element['detail']}`
        });
        content += '\n如经验值无变动，请更新Cookie。';
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

function MagicJS(e="MagicJS",t="INFO"){const s={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){this.version="2.2.3.3";this.scriptName=e;this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};this.isLoon=typeof $loon!=="undefined";this.isQuanX=typeof $task!=="undefined";this.isJSBox=typeof $drive!=="undefined";this.isNode=typeof module!=="undefined"&&!this.isJSBox;this.isSurge=typeof $httpClient!=="undefined"&&!this.isLoon;this.platform=this.getPlatform();this.node={request:undefined,fs:undefined,data:{}};this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";this.logLevel=t;this._unifiedPushUrl="";if(this.isNode){this.node.fs=require("fs");this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(e){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else if(this.isJSBox){if(!$file.exists("drive://MagicJS")){$file.mkdir("drive://MagicJS")}if(!$file.exists("drive://MagicJS/magic.json")){$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"})}}}set unifiedPushUrl(e){this._unifiedPushUrl=!!e?e.replace(/\/+$/g,""):""}set logLevel(e){this._logLevel=typeof e==="string"?e.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}getPlatform(){if(this.isSurge)return"Surge";else if(this.isQuanX)return"QuantumultX";else if(this.isLoon)return"Loon";else if(this.isJSBox)return"JSBox";else if(this.isNode)return"Node.js";else return"unknown"}read(e,t=""){let s="";if(this.isSurge||this.isLoon){s=$persistentStore.read(e)}else if(this.isQuanX){s=$prefs.valueForKey(e)}else if(this.isNode){s=this.node.data}else if(this.isJSBox){s=$file.read("drive://MagicJS/magic.json").string}try{if(this.isNode)s=s[e];if(this.isJSBox)s=JSON.parse(s)[e];if(!!t){if(typeof s==="string")s=JSON.parse(s);s=!!s&&typeof s==="object"?s[t]:null}}catch(i){this.logError(i);s=!!t?{}:null;this.del(e)}if(typeof s==="undefined")s=null;try{if(!!s&&typeof s==="string")s=JSON.parse(s)}catch(e){}this.logDebug(`READ DATA [${e}]${!!t?`[${t}]`:""}(${typeof s})\n${JSON.stringify(s)}`);return s}write(e,t,s=""){let i=!!s?{}:"";if(!!s&&(this.isSurge||this.isLoon)){i=$persistentStore.read(e)}else if(!!s&&this.isQuanX){i=$prefs.valueForKey(e)}else if(this.isNode){i=this.node.data}else if(this.isJSBox){i=JSON.parse($file.read("drive://MagicJS/magic.json").string)}if(!!s){try{if(typeof i==="string")i=JSON.parse(i);i=typeof i==="object"&&!!i?i:{}}catch(t){this.logError(t);this.del(e);i={}}if(this.isJSBox||this.isNode){if(!i.hasOwnProperty(e)||typeof i[e]!=="object"||i[e]===null){i[e]={}}if(!i[e].hasOwnProperty(s)){i[e][s]=null}if(typeof t==="undefined"){delete i[e][s]}else{i[e][s]=t}}else{if(typeof t==="undefined"){delete i[s]}else{i[s]=t}}}else{if(this.isNode||this.isJSBox){if(typeof t==="undefined"){delete i[e]}else{i[e]=t}}else{if(typeof t==="undefined"){i=null}else{i=t}}}if(typeof i==="object")i=JSON.stringify(i);if(this.isSurge||this.isLoon){$persistentStore.write(i,e)}else if(this.isQuanX){$prefs.setValueForKey(i,e)}else if(this.isNode){this.node.fs.writeFileSync("./magic.json",i)}else if(this.isJSBox){$file.write({data:$data({string:i}),path:"drive://MagicJS/magic.json"})}this.logDebug(`WRITE DATA [${e}]${!!s?`[${s}]`:""}(${typeof t})\n${JSON.stringify(t)}`)}del(e,t=""){this.logDebug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`);this.write(e,null,t)}notify(e=this.scriptName,t="",s="",i=""){let o=e=>{let t={};if(this.isSurge||this.isQuanX||this.isLoon){if(typeof e==="string"){if(this.isLoon)t={openUrl:e};else if(this.isQuanX)t={"open-url":e};else if(this.isSurge)t={url:e}}else if(typeof e==="object"){let s={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}};let i=Object.keys(e);for(let o=0;o<i.length;o++){if(!!s[this.platform][i[o]]){t[s[this.platform][i[o]]]=e[i[o]]}else{t[i[o]]=e[i[o]]}}}}return t};i=o(i);this.logNotify(`title:${e}\nsubTitle:${t}\nbody:${s}\noptions:${typeof i==="object"?JSON.stringify(i):i}`);if(arguments.length==1){e=this.scriptName;t="",s=arguments[0]}if(!!this._unifiedPushUrl){let i=encodeURI(`${e}/${t}${!!t?"\n":""}${s}`);this.get(`${this._unifiedPushUrl}/${i}`,()=>{})}if(this.isSurge||this.isLoon){$notification.post(e,t,s,i)}else if(this.isQuanX){$notify(e,t,s,i)}else if(this.isJSBox){let i={title:e,body:!!t?`${t}\n${s}`:s};$push.schedule(i)}}log(e,t="INFO"){if(!(this.logLevels[this._logLevel]<this.logLevels[t.toUpperCase()]))console.log(`[${t}] [${this.scriptName}]\n${e}\n`)}logDebug(e){this.log(e,"DEBUG")}logInfo(e){this.log(e,"INFO")}logNotify(e){this.log(e,"NOTIFY")}logWarning(e){this.log(e,"WARNING")}logError(e){this.log(e,"ERROR")}adapterHttpOptions(e,t){let i=typeof e==="object"?Object.assign({},e):{url:e,headers:{}};if(i.hasOwnProperty("header")&&!i.hasOwnProperty("headers")){i["headers"]=i["header"];delete i["header"]}if(typeof i.headers==="object"&&!!s){for(let e in i.headers){if(s[e]){i.headers[s[e]]=i.headers[e];delete i.headers[e]}}}if(!!!i.headers||typeof i.headers!=="object"||!!!i.headers["User-Agent"]){if(!!!i.headers||typeof i.headers!=="object")i.headers={};if(this.isNode)i.headers["User-Agent"]=this.pcUserAgent;else i.headers["User-Agent"]=this.iOSUserAgent}let o=false;if(typeof i["opts"]==="object"&&(i["opts"]["hints"]===true||i["opts"]["Skip-Scripting"]===true)||typeof i["headers"]==="object"&&i["headers"]["X-Surge-Skip-Scripting"]===true){o=true}if(!o){if(this.isSurge)i.headers["X-Surge-Skip-Scripting"]=false;else if(this.isLoon)i.headers["X-Requested-With"]="XMLHttpRequest";else if(this.isQuanX){if(typeof i["opts"]!=="object")i.opts={};i.opts["hints"]=false}}if(!this.isSurge||o)delete i.headers["X-Surge-Skip-Scripting"];if(!this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"];if(this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"]["Skip-Scripting"];if(t==="GET"&&!this.isNode&&!!i.body){let e=Object.keys(i.body).map(e=>{if(typeof i.body==="undefined")return"";return`${encodeURIComponent(e)}=${encodeURIComponent(i.body[e])}`}).join("&");if(i.url.indexOf("?")<0)i.url+="?";if(i.url.lastIndexOf("&")+1!=i.url.length&&i.url.lastIndexOf("?")+1!=i.url.length)i.url+="&";i.url+=e;delete i.body}if(this.isQuanX){if(i.hasOwnProperty("body")&&typeof i["body"]!=="string")i["body"]=JSON.stringify(i["body"]);i["method"]=t}else if(this.isNode){delete i.headers["Accept-Encoding"];if(typeof i.body==="object"){if(t==="GET"){i.qs=i.body;delete i.body}else if(t==="POST"){i["json"]=true;i.body=i.body}}}else if(this.isJSBox){i["header"]=i["headers"];delete i["headers"]}return i}get(e,t){let s=this.adapterHttpOptions(e,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.get(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>t(e.error,null,null))}else if(this.isNode){return this.node.request.get(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.get(s)}}post(e,t){let s=this.adapterHttpOptions(e,"POST");this.logDebug(`HTTP POST: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.post(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>{t(e.error,null,null)})}else if(this.isNode){return this.node.request.post(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.post(s)}}done(e={}){if(typeof $done!=="undefined"){$done(e)}}isToday(e){if(e==null){return false}else{let t=new Date;if(typeof e=="string"){e=new Date(e)}if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()&&t.getDay()==e.getDay()){return true}else{return false}}}isNumber(e){return parseFloat(e).toString()==="NaN"?false:true}attempt(e,t=null){return e.then(e=>{return[null,e]}).catch(e=>{this.logError(e);return[e,t]})}retry(e,t=5,s=0,i=null){return(...o)=>{return new Promise((r,n)=>{function a(...o){Promise.resolve().then(()=>e.apply(this,o)).then(e=>{if(typeof i==="function"){Promise.resolve().then(()=>i(e)).then(()=>{r(e)}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}else{r(e)}}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}a.apply(this,o)})}}formatTime(e,t="yyyy-MM-dd hh:mm:ss"){var s={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in s)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?s[e]:("00"+s[e]).substr((""+s[e]).length));return t}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(e){return new Promise(t=>setTimeout(t,e))}}(e)}
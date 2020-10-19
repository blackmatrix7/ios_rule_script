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

function MagicJS(a="MagicJS",b="INFO"){const c={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){if(this.version="2.2.3.2",this.scriptName=a,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.platform=this.getPlatform(),this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=b,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(a){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(a){this._barkUrl=a.replace(/\/+$/g,"")}set logLevel(a){this._logLevel="string"==typeof a?a.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"==typeof $request?void 0:$request}get response(){return"undefined"==typeof $response?void 0:($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response)}getPlatform(){return this.isSurge?"Surge":this.isQuanX?"QuantumultX":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"unknown"}read(a,b=""){let c="";this.isSurge||this.isLoon?c=$persistentStore.read(a):this.isQuanX?c=$prefs.valueForKey(a):this.isNode?c=this.node.data:this.isJSBox&&(c=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(c=c[a]),this.isJSBox&&(c=JSON.parse(c)[a]),!b||("string"==typeof c&&(c=JSON.parse(c)),c=c&&"object"==typeof c?c[b]:null)}catch(d){this.logError(d),c=b?{}:null,this.del(a)}"undefined"==typeof c&&(c=null);try{!c||"string"!=typeof c||(c=JSON.parse(c))}catch(a){}return this.logDebug(`READ DATA [${a}]${b?`[${b}]`:""}(${typeof c})\n${JSON.stringify(c)}`),c}write(a,b,c=""){let d=c?{}:"";if(!!c&&(this.isSurge||this.isLoon)?d=$persistentStore.read(a):!!c&&this.isQuanX?d=$prefs.valueForKey(a):this.isNode?d=this.node.data:this.isJSBox&&(d=JSON.parse($file.read("drive://MagicJS/magic.json").string)),!!c){try{"string"==typeof d&&(d=JSON.parse(d)),d="object"==typeof d&&d?d:{}}catch(b){this.logError(b),this.del(a),d={}}this.isJSBox||this.isNode?((!d.hasOwnProperty(a)||"object"!=typeof d[a]||null===d[a])&&(d[a]={}),!d[a].hasOwnProperty(c)&&(d[a][c]=null),"undefined"==typeof b?delete d[a][c]:d[a][c]=b):"undefined"==typeof b?delete d[c]:d[c]=b}else this.isNode||this.isJSBox?"undefined"==typeof b?delete d[a]:d[a]=b:"undefined"==typeof b?d=null:d=b;"object"==typeof d&&(d=JSON.stringify(d)),this.isSurge||this.isLoon?$persistentStore.write(d,a):this.isQuanX?$prefs.setValueForKey(d,a):this.isNode?this.node.fs.writeFileSync("./magic.json",d):this.isJSBox&&$file.write({data:$data({string:d}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${a}]${c?`[${c}]`:""}(${typeof b})\n${JSON.stringify(b)}`)}del(a,b=""){this.logDebug(`DELETE KEY [${a}]${!b?"":`[${b}]`}`),this.write(a,null,b)}notify(a=this.scriptName,b="",c="",d=""){if(d=(a=>{let b={};if(this.isSurge||this.isQuanX||this.isLoon)if("string"==typeof a)this.isLoon?b={openUrl:a}:this.isQuanX?b={"open-url":a}:this.isSurge&&(b={url:a});else if("object"==typeof a){let c={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}},d=Object.keys(a);for(let e=0;e<d.length;e++)c[this.platform][d[e]]?b[c[this.platform][d[e]]]=a[d[e]]:b[d[e]]=a[d[e]]}return b})(d),this.logNotify(`title:${a}\nsubTitle:${b}\nbody:${c}\noptions:${"object"==typeof d?JSON.stringify(d):d}`),1==arguments.length&&(a=this.scriptName,b="",c=arguments[0]),this.isSurge||this.isLoon)$notification.post(a,b,c,d);else if(this.isQuanX)$notify(a,b,c,d);else if(this.isNode){if(!!this._barkUrl){let d=encodeURI(`${a}/${b}\n${c}`);this.get(`${this._barkUrl}/${d}`,()=>{})}}else if(this.isJSBox){let d={title:a,body:b?`${b}\n${c}`:c};$push.schedule(d)}}log(a,b="INFO"){this.logLevels[this._logLevel]<this.logLevels[b.toUpperCase()]||console.log(`[${b}] [${this.scriptName}]\n${a}\n`)}logDebug(a){this.log(a,"DEBUG")}logInfo(a){this.log(a,"INFO")}logNotify(a){this.log(a,"NOTIFY")}logWarning(a){this.log(a,"WARNING")}logError(a){this.log(a,"ERROR")}adapterHttpOptions(a,b){let d="object"==typeof a?Object.assign({},a):{url:a,headers:{}};if(d.hasOwnProperty("header")&&!d.hasOwnProperty("headers")&&(d.headers=d.header,delete d.header),"object"==typeof d.headers&&!0)for(let a in d.headers)c[a]&&(d.headers[c[a]]=d.headers[a],delete d.headers[a]);!!d.headers&&"object"==typeof d.headers&&!!d.headers["User-Agent"]||((!!!d.headers||"object"!=typeof d.headers)&&(d.headers={}),d.headers["User-Agent"]=this.isNode?this.pcUserAgent:this.iOSUserAgent);let e=!1;if(("object"==typeof d.opts&&(!0===d.opts.hints||!0===d.opts["Skip-Scripting"])||"object"==typeof d.headers&&!0===d.headers["X-Surge-Skip-Scripting"])&&(e=!0),e||(this.isSurge?d.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?d.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof d.opts&&(d.opts={}),d.opts.hints=!1)),(!this.isSurge||e)&&delete d.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&d.hasOwnProperty("opts")&&delete d.opts,this.isQuanX&&d.hasOwnProperty("opts")&&delete d.opts["Skip-Scripting"],"GET"===b&&!this.isNode&&!!d.body){let a=Object.keys(d.body).map(a=>"undefined"==typeof d.body?"":`${encodeURIComponent(a)}=${encodeURIComponent(d.body[a])}`).join("&");0>d.url.indexOf("?")&&(d.url+="?"),d.url.lastIndexOf("&")+1!=d.url.length&&d.url.lastIndexOf("?")+1!=d.url.length&&(d.url+="&"),d.url+=a,delete d.body}return this.isQuanX?(d.hasOwnProperty("body")&&"string"!=typeof d.body&&(d.body=JSON.stringify(d.body)),d.method=b):this.isNode?(delete d.headers["Accept-Encoding"],"object"==typeof d.body&&("GET"===b?(d.qs=d.body,delete d.body):"POST"==b&&(d.json=!0,d.body=d.body))):this.isJSBox&&(d.header=d.headers,delete d.headers),d}get(a,b){let c=this.adapterHttpOptions(a,"GET");if(this.logDebug(`HTTP GET: ${JSON.stringify(c)}`),this.isSurge||this.isLoon)$httpClient.get(c,b);else if(this.isQuanX)$task.fetch(c).then(a=>{a.status=a.statusCode,b(null,a,a.body)},a=>b(a.error,null,null));else{if(this.isNode)return this.node.request.get(c,b);this.isJSBox&&(c.handler=a=>{let c=a.error?JSON.stringify(a.error):void 0,d="object"==typeof a.data?JSON.stringify(a.data):a.data;b(c,a.response,d)},$http.get(c))}}post(a,b){let c=this.adapterHttpOptions(a,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(c)}`),this.isSurge||this.isLoon)$httpClient.post(c,b);else if(this.isQuanX)$task.fetch(c).then(a=>{a.status=a.statusCode,b(null,a,a.body)},a=>{b(a.error,null,null)});else{if(this.isNode)return this.node.request.post(c,b);this.isJSBox&&(c.handler=a=>{let c=a.error?JSON.stringify(a.error):void 0,d="object"==typeof a.data?JSON.stringify(a.data):a.data;b(c,a.response,d)},$http.post(c))}}done(a={}){"undefined"!=typeof $done&&$done(a)}isToday(a){if(null==a)return!1;else{let b=new Date;return"string"==typeof a&&(a=new Date(a)),b.getFullYear()==a.getFullYear()&&b.getMonth()==a.getMonth()&&b.getDay()==a.getDay()}}isNumber(a){return"NaN"!==parseFloat(a).toString()}attempt(a,b=null){return a.then(a=>[null,a]).catch(a=>(this.logError(a),[a,b]))}retry(a,b=5,c=0,d=null){return(...e)=>new Promise((f,g)=>{function h(...e){Promise.resolve().then(()=>a.apply(this,e)).then(a=>{"function"==typeof d?Promise.resolve().then(()=>d(a)).then(()=>{f(a)}).catch(a=>{this.logError(a),1<=b&&0<c?setTimeout(()=>h.apply(this,e),c):1<=b?h.apply(this,e):g(a),b--}):f(a)}).catch(a=>{this.logError(a),1<=b&&0<c?setTimeout(()=>h.apply(this,e),c):1<=b?h.apply(this,e):g(a),b--})}h.apply(this,e)})}formatTime(a,b="yyyy-MM-dd hh:mm:ss"){var c={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),S:a.getMilliseconds()};for(let d in /(y+)/.test(b)&&(b=b.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length))),c)new RegExp("("+d+")").test(b)&&(b=b.replace(RegExp.$1,1==RegExp.$1.length?c[d]:("00"+c[d]).substr((""+c[d]).length)));return b}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(a){return new Promise(b=>setTimeout(b,a))}}(a)}
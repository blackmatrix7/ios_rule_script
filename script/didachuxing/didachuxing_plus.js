const didaGetCookieRegex = /^https?:\/\/www\.didapinche\.com\/hapis\/api\/t\/Jifen\/getSignInInfo\?userCid=.*/;
const didaCidKey = 'dida_cid';
const didaCookieKey = 'dida_cookie';
const didaUserAgentKey = 'dida_useragent';
const didaAccessTokenKey = 'dida_access_token';
const scriptName = '嘀嗒出行';

let magicJS = MagicJS(scriptName);
let didaCid = null;
let didaCookie = null;
let didaUserAgent = null;
let didaCinfo = null;
let didaAccessToken = null;
let didaGetBeikeResult = [];
let didaGetBeikeCount = 0;
let didaNotifyContent = '';

let checkinOptions = {
    url : 'https://www.didapinche.com/hapis/api/t/Jifen/signIn?userCid=',
    headers : {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Cookie": null,
      "Host": "www.didapinche.com",
      "Referer": "https://www.didapinche.com/dida/public/didashell/index.html",
      "User-Agent": null,
      "ddcinfo": null,
      "x-access-token": null
    }
};

let getBeikeAccountOptions = {
  url : 'https://www.didapinche.com/hapis/api/t/Jifen/getBeikeAccount?userCid=',
  headers : {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Cookie": null,
    "Host": "www.didapinche.com",
    "Referer": "https://www.didapinche.com/dida/public/didashell/index.html",
    "User-Agent": null,
    "ddcinfo": null,
    "x-access-token": null,
    "UserAgent": ''
  }
}

// 检查cookie完整性
function CheckCookie(){
  if (didaAccessToken == null){
    didaAccessToken = magicJS.read(didaAccessTokenKey, 'default');      
    didaCookie = magicJS.read(didaCookieKey, 'default');
    didaUserAgent = magicJS.read(didaUserAgentKey, 'default');
    didaCinfo = magicJS.read(didaCookieKey, 'default');
    didaAccessToken = magicJS.read(didaAccessTokenKey, 'default');
    didaCid = magicJS.read(didaCidKey, 'default');
    if (didaAccessToken == null || didaAccessToken == '' || didaAccessToken == {}){
        magicJS.log('没有读取到嘀嗒出行有效cookie，请先访问贝壳广场进行获取。');
        magicJS.notify(scriptName, '', '❓没有读取到cookie，请先访问贝壳广场进行获取。')
        return false;
    }
    else{
        return true;
    }
  }
  else{
    return true;
  }
}

// 每日签到
function Checkin() {
  return new Promise((resolve) => {
    if (CheckCookie()){
      let url = checkinOptions.url.replace(/(userCid=[^&]*)/i, `userCid=${didaCid}`);
      checkinOptions.url = url;
      checkinOptions.headers['Cookie'] = didaCookie;
      checkinOptions.headers['User-Agent'] = didaUserAgent;
      checkinOptions.headers['ddcinfo'] = didaCinfo;
      checkinOptions.headers['x-access-token'] = didaAccessToken;
      let checkinLog = '';
      let checkinNotify = '';
      magicJS.get(checkinOptions, (err, resp, data)=>{
        if (err) {
          checkinNotify = '❌签到出现异常，http请求错误。';
          checkinLog = '签到出现异常:' + err;
          didaNotifyContent += checkinNotify;
          resolve(checkinLog);
        }
        else{
          magicJS.log('签到结果返回数据：' + data);
          let checkin_obj = JSON.parse(data);
          if (checkin_obj.hasOwnProperty('code') && checkin_obj.hasOwnProperty('ret') && checkin_obj['code'] == 0){
            if (typeof checkin_obj['ret'] == 'object'){
              checkinLog = `签到成功，连续签到${checkin_obj['ret']['continueSign']}天，${checkin_obj['ret']['toast']}`;
              checkinNotify = `🎉${checkinLog}`;
              didaNotifyContent += checkinNotify;
              magicJS.log(checkinLog);
              resolve(checkinLog);
            }
            else if (typeof checkin_obj['ret'] == 'string'){
              if (checkin_obj['ret'] == '已经签到过'){
                checkinNotify = `🎉本日已经签到过，不要重复签到哦！！`;
              }
              else{
                checkinNotify = `🎉${checkinLog}`;
              }
              checkinLog = checkin_obj['ret'];
              didaNotifyContent += checkinNotify;
              magicJS.log(checkinLog);
              resolve(checkinLog);
            }
            else {
              checkinLog = '签到出现异常:' + data;
              checkinNotify = '❌签到出现异常，请查看日志';
              didaNotifyContent += checkinNotify;
              magicJS.log(checkinLog);
              resolve(checkinLog);
            }
          }
          else{
            checkinLog = '签到出现异常:' + data;
            checkinNotify = '❌签到出现异常，请查看日志';
            didaNotifyContent += checkinNotify;
            magicJS.log(checkinLog);
            resolve(checkinLog);
          }
        }
      });
    }
  });
}

// 获取账户待领取贝壳
function GetBeikeAccount(){
  let beikeList = {};
  return new Promise((resolve) => {
    if (CheckCookie()){
      let url = getBeikeAccountOptions.url.replace(/(userCid=[^&]*)/i, `userCid=${didaCid}`);
      getBeikeAccountOptions.url = url;
      getBeikeAccountOptions.headers['Cookie'] = didaCookie;
      getBeikeAccountOptions.headers['User-Agent'] = didaUserAgent;
      getBeikeAccountOptions.headers['ddcinfo'] = didaCinfo;
      getBeikeAccountOptions.headers['x-access-token'] = didaAccessToken;

      magicJS.get(getBeikeAccountOptions, (err, resp, data)=>{
        if (err) {
          magicJS.notify(scriptName, '', '❌获取账户下待领取贝壳异常，http请求错误。');
          magicJS.log('获取账户下待领取贝壳异常，http请求错误：' + err);
          resolve(beikeList);
        }
        else{
          let obj = JSON.parse(data);
          if (obj.hasOwnProperty('code') && obj['code'] == 0 && obj.hasOwnProperty('ret') && typeof obj['ret'] == 'object'){
            beikeList = obj['ret']['receivableAccountList'];
            magicJS.log('待拾取贝壳情况：' + JSON.stringify(beikeList));
            resolve(beikeList);
          }
          else{
            magicJS.notify(scriptName, '', '❌获取账户下待领取贝壳异常，接口响应错误。');
            magicJS.log('获取账户下待领取贝壳异常，接口响应错误：' + data);
            resolve(beikeList);
          }
        }
      })
    }
  });
}

// 模拟点击实现单个贝壳拾取操作
function AddBeikeAccount(uniqueKey, changeAmount, beikeType){
  let beikeData = {'uniqueKey': uniqueKey, 'changeAmount': changeAmount, 'beikeType': beikeType};;
  return new Promise((resolve) => {
    if (CheckCookie()){
      let addBeikeAccount = {
        url : `https://www.didapinche.com/hapis/api/t/Jifen/addBeikeAccountFromRedis?userCid=${didaCid}&uniqueKey=${beikeData['uniqueKey']}`,
        headers : {
          "Accept": "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Cookie": didaCookie,
          "Host": "www.didapinche.com",
          "Referer": "https://www.didapinche.com/dida/public/didashell/index.html",
          "User-Agent": didaUserAgent,
          "ddcinfo": didaCinfo,
          "x-access-token": didaAccessToken
        }
      };
      magicJS.get(addBeikeAccount, (err, resp, data)=>{
        if (err) {
          magicJS.notify(scriptName, '', '❌拾取贝壳失败，http请求错误。');
          magicJS.log('拾取贝壳失败，http请求错误：' + err);
          resolve(beikeData);
        }
        else{
          magicJS.log('拾取贝壳接口响应内容：' + data);
          let obj = JSON.parse(data);
          if (obj.hasOwnProperty('code') && obj['code'] == 0){
            didaGetBeikeResult.push(beikeData);
            didaGetBeikeCount += Number(beikeData['changeAmount']);
            magicJS.log('拾取贝壳成功，贝壳数据：' + JSON.stringify(beikeData));
            resolve(beikeData);
          }
          else{
            magicJS.notify(scriptName, '', '❌拾取贝壳失败，接口响应错误。');
            magicJS.log('拾取贝壳失败，接口响应错误：' + data);
            resolve(beikeData);
          }
        }
      });
    }
  });
}

async function GetAccountAllBeike(){
  let beikeList = await GetBeikeAccount();
  if (beikeList.length > 0){
    for (let index=0; index < beikeList.length; index ++){
        let element = beikeList[index];
        await AddBeikeAccount(element['uniqueKey'], element['changeAmount'], element['beikeType']);
    }
    if (didaGetBeikeResult.length > 0 && didaGetBeikeCount > 0){
      magicJS.log(`本次共拾取贝壳${didaGetBeikeCount}个，详细情况如下：${JSON.stringify(didaGetBeikeResult)}`);
      didaNotifyContent += `\n🏖本次共拾取贝壳${didaGetBeikeCount}，左滑查看详情`;
      didaGetBeikeResult.forEach(element => {
        didaNotifyContent += `\n${element['beikeType']}：${element['changeAmount']}个`;
      });
    }
  }
  else{
    didaNotifyContent += '\n🏖本次没有发现待拾取的贝壳';
    magicJS.log('没有待拾取的贝壳');
  }
}

async function Main(){
  if (magicJS.isRequest){
    if(didaGetCookieRegex.test(magicJS.request.url) && magicJS.request.method == 'GET' && magicJS.request.headers.hasOwnProperty('UserAgent') == false){

      magicJS.log('获取http headers：' + JSON.stringify(magicJS.request.headers));

      didaCid = magicJS.request.url.match(/userCid=([^\s]*)/)[1];
      didaCookie = magicJS.request.headers['Cookie'];
      didaUserAgent = magicJS.request.headers['User-Agent'];
      didaCinfo = magicJS.request.headers['ddcinfo'];
      didaAccessToken = magicJS.request.headers['x-access-token'];

      let didaHisAccessToken = magicJS.read(didaAccessTokenKey, 'default');
      let didaHisCid = magicJS.read(didaCidKey, 'default');
      let didaHisCookie = magicJS.read(didaCookieKey, 'default');

      if (didaHisAccessToken == didaAccessToken){
        magicJS.log('token与cookie没有变化，无需更新。');
      }
      else if (didaHisCid == null || didaHisCid != didaCid || didaHisAccessToken == null || didaHisAccessToken != didaAccessToken || didaHisCookie == null || didaHisCookie != didaCookie){
        magicJS.write(didaCidKey, didaCid, 'default');
        magicJS.write(didaCookieKey, didaCookie, 'default');
        magicJS.write(didaUserAgentKey, didaUserAgent, 'default');
        magicJS.write(didaCookieKey, didaCinfo, 'default');
        magicJS.write(didaAccessTokenKey, didaAccessToken, 'default');
        magicJS.log('获取嘀嗒出行token成功。');
        magicJS.notify(scriptName, '', '🎈获取token与cookie成功。')
      }
      else{
        magicJS.log('没有读取到有效的Cookie信息。');
      }
    }
    magicJS.done();
  }
  else{
    
    await Checkin();
    
    // await GetAccountAllBeike();

    magicJS.notify(scriptName, '', didaNotifyContent);

    magicJS.done();
  }
}

Main();

function MagicJS(scriptName='MagicJS', logLevel='INFO'){

  return new class{
    constructor(){
      this.scriptName = scriptName;
      this.logLevel = this.getLogLevels(logLevel.toUpperCase());
      this.node = {'request': undefined, 'fs': undefined, 'data': {}};
      if (this.isNode){
        this.node.fs = require('fs');
        this.node.request = require('request');
        try{
          this.node.fs.accessSync('./magic.json');
        }
        catch(err){
          this.logError(err);
          this.node.fs.writeFileSync('./magic.json', '{}')
        }
        this.node.data = require('./magic.json');
      }
      if (this.isJSBox){
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
    
    get version() { return 'v2.1.4' };
    get isSurge() { return typeof $httpClient !== 'undefined' && !this.isLoon };
    get isQuanX() { return typeof $task !== 'undefined' };
    get isLoon() { return typeof $loon !== 'undefined' };
    get isJSBox() { return typeof $drive !== 'undefined'};
    get isNode() { return typeof module !== 'undefined' && !this.isJSBox };
    get isRequest() { return (typeof $request !== 'undefined') && (typeof $response === 'undefined')}
    get isResponse() { return typeof $response !== 'undefined' }
    get request() { return (typeof $request !== 'undefined') ? $request : undefined }
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

    get logLevels(){
      return {
        DEBUG: 4,
        INFO: 3,
        WARNING: 2,
        ERROR: 1,
        CRITICAL: 0
      };
    } 

    getLogLevels(level){
      try{
        if (this.isNumber(level)){
          return level;
        }
        else{
          let levelNum = this.logLevels[level];
          if (typeof levelNum === 'undefined'){
            this.logError(`获取MagicJS日志级别错误，已强制设置为DEBUG级别。传入日志级别：${level}。`)
            return this.logLevels.DEBUG;
          }
          else{
            return levelNum;
          }
        }
      }
      catch(err){
        this.logError(`获取MagicJS日志级别错误，已强制设置为DEBUG级别。传入日志级别：${level}，异常信息：${err}。`)
        return this.logLevels.DEBUG;
      }
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
        this.logError(`raise exception: ${err}`);
        val = !!session? {} : null;
        this.del(key);
      }
      if (typeof val === 'undefined') val = null;
      try {if(!!val && typeof val === 'string') val = JSON.parse(val)} catch(err) {}
      this.logDebug(`read data [${key}]${!!session? `[${session}]`: ''}(${typeof val})\n${JSON.stringify(val)}`);
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
        // 有Session，要求所有数据都是Object
        try {
          if (typeof data === 'string') data = JSON.parse(data)
          data = typeof data === 'object' && !!data ? data : {};
        }
        catch(err){
          this.logError(`raise exception: ${err}`);
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
      this.logDebug(`write data [${key}]${!!session? `[${session}]`: ''}(${typeof val})\n${JSON.stringify(val)}`);
    };

    del(key, session=''){
      this.logDebug(`delete key [${key}]${!!session ? `[${session}]`:''}`);
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
        // 2020.08.11 Loon2.1.3(194)TF 如果不加这个log，在跑测试用例连续6次通知，会漏掉一些通知，已反馈给作者。
        this.logInfo(`title: ${title}, subTitle：${subTitle}, body：${body}, options：${options}`);
        if (!!options) $notification.post(title, subTitle, body, options);
        else $notification.post(title, subTitle, body);
      }
      else if (this.isQuanX) {
         $notify(title, subTitle, body, options);
      }
      else if (this.isNode) {
        this.log(`${title} ${subTitle}\n${body}`);
      }
      else if (this.isJSBox){
        let push = {
          title: title,
          body: !!subTitle ? `${subTitle}\n${body}` : body,
        }
        $push.schedule(push);
      } 
    }
    
    log(msg, level="INFO"){
      if (this.logLevel >= this.getLogLevels(level.toUpperCase())) console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)
    }

    logDebug(msg){
      this.log(msg, "DEBUG");
    }

    logInfo(msg){
      this.log(msg, "INFO");
    }

    logWarning(msg){
      this.log(msg, "WARNING");
    }

    logError(msg){
      this.log(msg, "ERROR");
    }
    
    get(options, callback){
      let _options = typeof options === 'object'? Object.assign({}, options): options;
      this.logDebug(`http get: ${JSON.stringify(_options)}`);
      if (this.isSurge || this.isLoon) {
        $httpClient.get(_options, callback);
      }
      else if (this.isQuanX) {
        if (typeof _options === 'string') _options = { url: _options }
        _options['method'] = 'GET'
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
        _options = typeof _options === 'string'? {'url': _options} :_options;
        options['header'] = _options['headers'];
        delete _options['headers']
        _options['handler'] = (resp)=>{
          let err = resp.error? JSON.stringify(resp.error) : undefined;
          let data = typeof resp.data === 'object' ? JSON.stringify(resp.data) : resp.data;
          callback(err, resp.response, data);
        }
        $http.get(_options);
      }
    }

    post(options, callback){
      let _options = typeof options === 'object'? Object.assign({}, options): options;
      this.logDebug(`http post: ${JSON.stringify(_options)}`);
      if (this.isSurge || this.isLoon) {
        $httpClient.post(_options, callback);
      }
      else if (this.isQuanX) {
        if (typeof _options === 'string') _options = { url: _options }
        if (_options.hasOwnProperty('body') && typeof _options['body'] !== 'string') _options['body'] = JSON.stringify(_options['body']);
        _options['method'] = 'POST'
        $task.fetch(_options).then(
          resp => {
            resp['status'] = resp.statusCode
            callback(null, resp, resp.body)
          },
          reason => {callback(reason.error, null, null)}
        )
      }
      else if(this.isNode){
        if (typeof _options.body === 'object') _options.body = JSON.stringify(_options.body);
        return this.node.request.post(_options, callback);
      }
      else if(this.isJSBox){
        _options = typeof _options === 'string'? {'url': _options} : _options;
        _options['header'] = _options['headers'];
        delete _options['headers']
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
     * @param {*} promise Promise 对象
     * @param {*} defaultValue 出现异常时返回的默认值
     * @returns 返回两个值，第一个值为异常，第二个值为执行结果
     */
    attempt(promise, defaultValue=null){ return promise.then((args)=>{return [null, args]}).catch(ex=>{this.log('raise exception:' + ex); return [ex, defaultValue]})};

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
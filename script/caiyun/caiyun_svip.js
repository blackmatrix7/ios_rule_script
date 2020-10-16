/**
 * [MITM]
 * hostname = biz.caiyunapp.com
 * 
 * [Script]
 * 彩云天气_SVIP = type=http-response,requires-body=1,max-size=0,pattern=https?:\/\/biz\.caiyunapp\.com\/(membership_rights|v2\/user),script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/caiyun/caiyun_svip.js
 * 
 */

const SCRIPT_NAME = '彩云天气';
const USER_REGEX = /https?:\/\/biz\.caiyunapp\.com\/v2\/user/;
const RIGHTS_REGEX = /https?:\/\/biz\.caiyunapp\.com\/membership_rights/;
const RESULT = {
  is_vip: true,
  vip_type: "s",
  svip_expired_at: 1882066669.9452950954,
}
const RESULT_WT = {
  vip: {
    enable: true,
    svip_expired_at: 1882066669.9452950954
  }
}
const RIGHTS = { 
  "result": [
    { 
      "name": "\u514d\u5e7f\u544a", 
      "enabled": true, 
      "vip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/vip-ads-free.png",
      "vip": true, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee08f", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-ads-free.png" 
    }, 
    { 
      "name": "\u591a\u5730\u5929\u6c14\u63a8\u9001", 
      "enabled": true, 
      "vip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/vip-custom-push.png", 
      "vip": true, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee090", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-custom-push.png" 
    }, 
    { 
      "name": "\u964d\u6c34\u63d0\u9192", 
      "enabled": true, 
      "vip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/vip-rain-notification.png", 
      "vip": true, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee091", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-rain-notification.png" 
    }, 
    { 
      "name": "\u536b\u661f\u4e91\u56fe", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee092", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-satellite-clouds.png" 
    }, 
    { 
      "name": "\u4e91\u91cf", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true,
      "_id": "5ee5eb091d28d2634a2ee093", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-cloud-cover.png"
    }, 
    { 
      "name": "\u6c14\u6e29\u9884\u62a5", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee094", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-tmp-forecast.png"
    }, 
    { 
      "name": "\u9732\u70b9\u6e29\u5ea6\u9884\u62a5", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee095", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-dew-point-tmp-forecast.png" 
    }, 
    { 
      "name": "\u77ed\u6ce2\u8f90\u5c04\u901a\u91cf", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee096", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-short-wave-radiation.png" 
    }, 
    { 
      "name": "\u6c14\u538b", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee097", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-pressure.png" 
    }, 
    { 
      "name": "\u80fd\u89c1\u5ea6", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee098", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-visibility.png" 
    }, 
    { 
      "name": "\u6e7f\u5ea6\u9884\u62a5", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee099", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-humidity-forecast.png" 
    }, 
    { 
      "name": "2\u5929\u964d\u96e8\u9884\u62a5\u56fe", 
      "enabled": true, 
      "vip_icon": null, 
      "vip": false, 
      "svip": true, 
      "_id": "5ee5eb091d28d2634a2ee09a", 
      "svip_icon": "https://cdn.caiyunapp.com/ad/img/membership_rights/svip-rain-forecast.png" 
    }
  ], 
  "rc": 0 
}

let magicJS = MagicJS(SCRIPT_NAME);

function Main(){
  if (magicJS.isResponse){
    if (USER_REGEX.test(magicJS.request.url)){
      try{
        let obj = JSON.parse(magicJS.response.body);
        Object.assign(obj['result'], RESULT)
        Object.assign(obj['result']['wt'], RESULT_WT)
        let body = JSON.stringify(obj);
        magicJS.done({body});
      }
      catch(err){
        magicJS.log(`解锁SVIP失败，异常信息${err}`);
        magicJS.done();
      }
    }
    if (RIGHTS_REGEX.test(magicJS.request.url)){
      let body = JSON.stringify(RIGHTS);
      magicJS.done({body});
    }
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
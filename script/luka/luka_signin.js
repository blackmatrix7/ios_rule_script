const scriptName = "Luka阅读养成";
const getCookieRegex = /^https?:\/\/luka\-graphql\.ling\.cn\/graphql\/mobile\?operation=UserInfoWithPendingRobotQuery/;
const lukaCookieKey = "luka_checkin_cookie";
const lukaAuthKey = "luka_signin_auth";
let magicJS = MagicJS(scriptName, "INFO");
magicJS.unifiedPushUrl = magicJS.read("luka_unified_push_url") || magicJS.read("magicjs_unified_push_url");

// 每日签到
function Signin(cookie, authorization) {
  return new Promise((resolve, reject) => {
    let checkinOptions = {
      url: "https://luka-graphql.ling.cn/graphql/mobile?operation=SignInEarnCoinsEventMutation",
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh_CN",
        "Authorization": authorization,
        "Content-Type": "application/json",
        "Cookie": cookie,
        "Host": "luka-graphql.ling.cn",
        "User-Agent": "Luka2.0/6898 CFNetwork/1206 Darwin/20.1.0",
        "X-App-Timezone": "Asia/Shanghai",
        "X-App-Version": "2.15.0",
        "X-App-VersionCode": "6898",
        "X-Device-Type": "ios",
      },
      body: {
        query: "mutation signInEarnCoinsEvent {\n  signInEarnCoinsEvent {\n    __typename\n    date\n    coins\n    status\n  }\n}",
        variables: null,
      },
    };
    magicJS.post(checkinOptions, (err, resp, data) => {
      if (err) {
        magicJS.logError(`签到失败，请求异常：${err}`);
        reject("❌签到失败，请求异常，请查阅日志！");
      } else {
        try {
          magicJS.logDebug(`Luka签到响应结果：${data}`);
          let obj = typeof data === "string" ? JSON.parse(data) : data;
          if (obj.data.signInEarnCoinsEvent.status === true) {
            resolve(obj.data.signInEarnCoinsEvent.coins);
          } else {
            magicJS.logError(`签到失败，响应异常：${data}`);
            reject("❌签到失败，响应异常，请查阅日志！");
          }
        } catch (err) {
          magicJS.logError(`签到失败，执行异常：${err}，接口响应：${data}`);
          reject("❌签到失败，执行异常，请查阅日志！");
        }
      }
    });
  });
}

function SigninHomePage(cookie, authorization) {
  return new Promise((resolve, reject) => {
    let checkinOptions = {
      url: "https://luka-graphql.ling.cn/graphql/mobile?operation=PointsSystemHomepageCompositeApiQuery",
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh_CN",
        "Authorization": authorization,
        "Content-Type": "application/json",
        "Cookie": cookie,
        "Host": "luka-graphql.ling.cn",
        "User-Agent": "Luka2.0/6898 CFNetwork/1206 Darwin/20.1.0",
        "X-App-Timezone": "Asia/Shanghai",
        "X-App-Version": "2.15.0",
        "X-App-VersionCode": "6898",
        "X-Device-Type": "ios",
      },
      body: {
        query:
          "query PointsSystemHomepageCompositeAPI($first: Int, $after: String = null) {\n  user {\n    __typename\n    coinsAccount {\n      __typename\n      ...CoinsAccountFragment\n    }\n  }\n  signInActivityStatus {\n    __typename\n    date\n    coins\n    status\n  }\n  earnCoinsActivities(number: 4) {\n    __typename\n    id\n    icon\n    name\n    totalCoins: coins\n    currentCoins: completedCoins\n    style: progressStyle\n    button {\n      __typename\n      name\n      status\n      event {\n        __typename\n        ...EventButtonFragment\n      }\n    }\n  }\n  home(first: $first, after: $after, type: COINS) {\n    __typename\n    totalCount\n    pageInfo {\n      __typename\n      ...PageInfoFragment\n    }\n    nodes {\n      __typename\n      id\n      name\n      type\n      title\n      subtitle\n      more\n      blocks {\n        __typename\n        ...DMFunctionalAreaBlockBaseInfoFragment\n        ...BannerActivitiesFragment\n        ...GoodsFragment\n      }\n    }\n  }\n}fragment CoinsAccountFragment on CoinsAccount {\n  __typename\n  lukaCoinBalance: coins\n  lukaCoinIncomeOfToday: todayIncomeCoins\n  lukaCoinOutcomeOfToday: todayPaymentCoins\n}fragment EventButtonFragment on EventButton {\n  __typename\n  ... on EventRedirect {\n    id\n    uri: url\n  }\n  ... on EventSetting {\n    id\n    message\n  }\n  ... on EventPopup {\n    id\n    title\n    content\n    uri: url\n  }\n}fragment PageInfoFragment on PageInfo {\n  __typename\n  startCursor\n  endCursor\n  hasPreviousPage\n  hasNextPage\n}fragment DMFunctionalAreaBlockBaseInfoFragment on FunctionalAreaBlock {\n  __typename\n  id\n  type\n  title\n  subtitle\n  coverUrl\n  link\n  status\n  sourceFrom\n  category\n}fragment BannerActivitiesFragment on LargeImageWithTextBelowBlock {\n  __typename\n  id\n  type\n  coverUrl\n  link\n}fragment GoodsFragment on GoodsImageBlock {\n  __typename\n  id\n  type\n  title\n  subtitle\n  coverUrl\n  link\n  status\n  sourceFrom\n  originalCoins\n  originalCash: originalPrice\n  discountCoins\n  discountCash: discountPrice\n  goodsLabels: paymentLabel\n}",
        variables: {
          after: null,
          first: 15,
        },
      },
    };
    magicJS.post(checkinOptions, (err, resp, data) => {
      if (err) {
        magicJS.logError(`获取签到天数失败，请求异常：${err}`);
        resolve();
      } else {
        try {
          magicJS.logDebug(`获取签到天数响应结果：${data}`);
          let obj = typeof data === "string" ? JSON.parse(data) : data;
          if (obj.data.hasOwnProperty("user") && obj.data.hasOwnProperty("signInActivityStatus")) {
            let signinDays = 0;
            obj.data.signInActivityStatus.forEach((element) => {
              if (element.status === true) {
                signinDays += 1;
              }
            });
            let coins = obj.data.user.coinsAccount.lukaCoinBalance;
            let coinIncome = obj.data.user.coinsAccount.lukaCoinIncomeOfToday;
            let coinOutcome = obj.data.user.coinsAccount.lukaCoinOutcomeOfToday;
            resolve([signinDays, coins, coinIncome, coinOutcome]);
          } else {
            magicJS.logError(`获取签到天数失败，响应异常：${data}`);
            resolve();
          }
        } catch (err) {
          magicJS.logError(`获取签到天数，执行异常：${err}，接口响应：${data}`);
          resolve();
        }
      }
    });
  });
}

(async () => {
  if (magicJS.isRequest && getCookieRegex.test(magicJS.request.url)) {
    let auth = magicJS.request.headers["Authorization"];
    magicJS.logDebug(`获取到的Cookie：\n${auth}`);
    let hisAuth = magicJS.read(lukaCookieKey);
    magicJS.logDebug(`存储的Cookie：\n${hisAuth}`);
    // 只存储 Bearer Token
    if (auth.toLowerCase().indexOf("bearer") >= 0 && auth !== hisAuth) {
      magicJS.write(lukaAuthKey, auth);
      magicJS.write(lukaCookieKey, magicJS.request.headers["Cookie"]);
      magicJS.logInfo(`旧的Auth：\n${hisAuth}\n新的Auth：\n${auth}\nAuth不同，写入新的Auth成功！`);
      magicJS.notify("🎈Cookie写入成功");
    } else {
      magicJS.logInfo("Cookie没有变化，无需更新");
    }
  } else {
    let subTitle = "";
    let content = "";
    let cookie = magicJS.read(lukaCookieKey);
    let auth = magicJS.read(lukaAuthKey);
    if (!!!cookie || !!!auth) {
      magicJS.logWarning("没有读取到Cookie，请先从App中获取一次Cookie！");
      magicJS.notify("❓没有读取到Cookie，请先从App中获取!!");
    } else {
      let [signinErr, signinCoins = null] = await magicJS.attempt(Signin(cookie, auth));
      if (signinErr) {
        subTitle = signinErr;
      } else if (signinCoins) {
        subTitle = `🎉今日签到获得${signinCoins}个Luka币`;
        // let [signinDays, coins, coinIncome, coinOutcome] = await SigninHomePage(cookie, auth);
        // content = `本周期已签到${signinDays}天\n当前账户共${coins}个Luka币\n本日共收入${coinIncome}个，支出${coinOutcome}个Luka币`;
      } else {
        subTitle = "❌今日签到出现未知异常";
      }
      // 通知
      magicJS.notify(scriptName, subTitle, content);
    }
  }
  magicJS.done();
})();

// prettier-ignore
function MagicJS(scriptName="MagicJS",logLevel="INFO"){return new class{constructor(){if(this.version="2.2.3.3",this.scriptName=scriptName,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=logLevel,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(err){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(url){this._barkUrl=url.replace(/\/+$/g,"")}set logLevel(level){this._logLevel="string"==typeof level?level.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"!=typeof $request?$request:void 0}get response(){return"undefined"!=typeof $response?($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response):void 0}get platform(){return this.isSurge?"Surge":this.isQuanX?"Quantumult X":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"Unknown"}read(key,session=""){let val="";this.isSurge||this.isLoon?val=$persistentStore.read(key):this.isQuanX?val=$prefs.valueForKey(key):this.isNode?val=this.node.data:this.isJSBox&&(val=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(val=val[key]),this.isJSBox&&(val=JSON.parse(val)[key]),session&&("string"==typeof val&&(val=JSON.parse(val)),val=val&&"object"==typeof val?val[session]:null)}catch(err){this.logError(err),val=session?{}:null,this.del(key)}void 0===val&&(val=null);try{val&&"string"==typeof val&&(val=JSON.parse(val))}catch(err){}return this.logDebug(`READ DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`),val}write(key,val,session=""){let data=session?{}:"";if(session&&(this.isSurge||this.isLoon)?data=$persistentStore.read(key):session&&this.isQuanX?data=$prefs.valueForKey(key):this.isNode?data=this.node.data:this.isJSBox&&(data=JSON.parse($file.read("drive://MagicJS/magic.json").string)),session){try{"string"==typeof data&&(data=JSON.parse(data)),data="object"==typeof data&&data?data:{}}catch(err){this.logError(err),this.del(key),data={}}this.isJSBox||this.isNode?(data[key]&&"object"==typeof data[key]||(data[key]={}),data[key].hasOwnProperty(session)||(data[key][session]=null),void 0===val?delete data[key][session]:data[key][session]=val):void 0===val?delete data[session]:data[session]=val}else this.isNode||this.isJSBox?void 0===val?delete data[key]:data[key]=val:data=void 0===val?null:val;"object"==typeof data&&(data=JSON.stringify(data)),this.isSurge||this.isLoon?$persistentStore.write(data,key):this.isQuanX?$prefs.setValueForKey(data,key):this.isNode?this.node.fs.writeFileSync("./magic.json",data):this.isJSBox&&$file.write({data:$data({string:data}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`)}del(key,session=""){this.logDebug(`DELETE KEY [${key}]${session?`[${session}]`:""}`),this.write(key,null,session)}notify(title=this.scriptName,subTitle="",body="",opts=""){let convertOptions;if(opts=(_opts=>{let newOpts={};if("string"==typeof _opts)this.isLoon?newOpts={openUrl:_opts}:this.isQuanX?newOpts={"open-url":_opts}:this.isSurge&&(newOpts={url:_opts});else if("object"==typeof _opts)if(this.isLoon)newOpts.openUrl=_opts["open-url"]?_opts["open-url"]:"",newOpts.mediaUrl=_opts["media-url"]?_opts["media-url"]:"";else if(this.isQuanX)newOpts=_opts["open-url"]||_opts["media-url"]?_opts:{};else if(this.isSurge){let openUrl=_opts["open-url"]||_opts.openUrl;newOpts=openUrl?{url:openUrl}:{}}return newOpts})(opts),1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.logNotify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${"object"==typeof opts?JSON.stringify(opts):opts}`),this.isSurge)$notification.post(title,subTitle,body,opts);else if(this.isLoon)opts?$notification.post(title,subTitle,body,opts):$notification.post(title,subTitle,body);else if(this.isQuanX)$notify(title,subTitle,body,opts);else if(this.isNode){if(this._barkUrl){let content=encodeURI(`${title}/${subTitle}\n${body}`);this.get(`${this._barkUrl}/${content}`,()=>{})}}else if(this.isJSBox){let push={title:title,body:subTitle?`${subTitle}\n${body}`:body};$push.schedule(push)}}notifyDebug(title=this.scriptName,subTitle="",body="",opts=""){"DEBUG"===this.logLevel&&(1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.notify(title,subTitle,body,opts))}log(msg,level="INFO"){this.logLevels[this._logLevel]<this.logLevels[level.toUpperCase()]||console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)}logDebug(msg){this.log(msg,"DEBUG")}logInfo(msg){this.log(msg,"INFO")}logNotify(msg){this.log(msg,"NOTIFY")}logWarning(msg){this.log(msg,"WARNING")}logError(msg){this.log(msg,"ERROR")}logRetry(msg){this.log(msg,"RETRY")}adapterHttpOptions(options,method){let _options="object"==typeof options?Object.assign({},options):{url:options,headers:{}};_options.hasOwnProperty("header")&&!_options.hasOwnProperty("headers")&&(_options.headers=_options.header,delete _options.header);const headersMap={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};if("object"==typeof _options.headers)for(let key in _options.headers)headersMap[key]&&(_options.headers[headersMap[key]]=_options.headers[key],delete _options.headers[key]);_options.headers&&"object"==typeof _options.headers&&_options.headers["User-Agent"]||(_options.headers&&"object"==typeof _options.headers||(_options.headers={}),this.isNode?_options.headers["User-Agent"]=this.pcUserAgent:_options.headers["User-Agent"]=this.iOSUserAgent);let skipScripting=!1;if(("object"==typeof _options.opts&&(!0===_options.opts.hints||!0===_options.opts["Skip-Scripting"])||"object"==typeof _options.headers&&!0===_options.headers["X-Surge-Skip-Scripting"])&&(skipScripting=!0),skipScripting||(this.isSurge?_options.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?_options.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof _options.opts&&(_options.opts={}),_options.opts.hints=!1)),this.isSurge&&!skipScripting||delete _options.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts,this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts["Skip-Scripting"],"GET"===method&&!this.isNode&&_options.body){let qs=Object.keys(_options.body).map(key=>void 0===_options.body?"":`${encodeURIComponent(key)}=${encodeURIComponent(_options.body[key])}`).join("&");_options.url.indexOf("?")<0&&(_options.url+="?"),_options.url.lastIndexOf("&")+1!=_options.url.length&&_options.url.lastIndexOf("?")+1!=_options.url.length&&(_options.url+="&"),_options.url+=qs,delete _options.body}return this.isQuanX?(_options.hasOwnProperty("body")&&"string"!=typeof _options.body&&(_options.body=JSON.stringify(_options.body)),_options.method=method):this.isNode?(delete _options.headers["Accept-Encoding"],"object"==typeof _options.body&&("GET"===method?(_options.qs=_options.body,delete _options.body):"POST"===method&&(_options.json=!0,_options.body=_options.body))):this.isJSBox&&(_options.header=_options.headers,delete _options.headers),_options}adapterHttpResponse(resp){let _resp={body:resp.body,headers:resp.headers,json:()=>JSON.parse(_resp.body)};return resp.hasOwnProperty("statusCode")&&resp.statusCode&&(_resp.status=resp.statusCode),_resp}get(options,callback){let _options=this.adapterHttpOptions(options,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon?$httpClient.get(_options,callback):this.isQuanX?$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>callback(reason.error,null,null)):this.isNode?this.node.request.get(_options,(err,resp,data)=>{resp=this.adapterHttpResponse(resp),callback(err,resp,data)}):this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.get(_options))}getPromise(options){return new Promise((resolve,reject)=>{magicJS.get(options,(err,resp)=>{err?reject(err):resolve(resp)})})}post(options,callback){let _options=this.adapterHttpOptions(options,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon)$httpClient.post(_options,callback);else if(this.isQuanX)$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>{callback(reason.error,null,null)});else if(this.isNode){let resp=this.node.request.post(_options,callback);resp.status=resp.statusCode,delete resp.statusCode}else this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.post(_options))}get http(){return{get:this.getPromise,post:this.post}}done(value={}){"undefined"!=typeof $done&&$done(value)}isToday(day){if(null==day)return!1;{let today=new Date;return"string"==typeof day&&(day=new Date(day)),today.getFullYear()==day.getFullYear()&&today.getMonth()==day.getMonth()&&today.getDay()==day.getDay()}}isNumber(val){return"NaN"!==parseFloat(val).toString()}attempt(promise,defaultValue=null){return promise.then(args=>[null,args]).catch(ex=>(this.logError(ex),[ex,defaultValue]))}retry(fn,retries=5,interval=0,callback=null){return(...args)=>new Promise((resolve,reject)=>{function _retry(...args){Promise.resolve().then(()=>fn.apply(this,args)).then(result=>{"function"==typeof callback?Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{retries>=1?interval>0?setTimeout(()=>_retry.apply(this,args),interval):_retry.apply(this,args):reject(ex),retries--}):resolve(result)}).catch(ex=>{this.logRetry(ex),retries>=1&&interval>0?setTimeout(()=>_retry.apply(this,args),interval):retries>=1?_retry.apply(this,args):reject(ex),retries--})}_retry.apply(this,args)})}formatTime(time,fmt="yyyy-MM-dd hh:mm:ss"){var o={"M+":time.getMonth()+1,"d+":time.getDate(),"h+":time.getHours(),"m+":time.getMinutes(),"s+":time.getSeconds(),"q+":Math.floor((time.getMonth()+3)/3),S:time.getMilliseconds()};/(y+)/.test(fmt)&&(fmt=fmt.replace(RegExp.$1,(time.getFullYear()+"").substr(4-RegExp.$1.length)));for(let k in o)new RegExp("("+k+")").test(fmt)&&(fmt=fmt.replace(RegExp.$1,1==RegExp.$1.length?o[k]:("00"+o[k]).substr((""+o[k]).length)));return fmt}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(time){return new Promise(resolve=>setTimeout(resolve,time))}}(scriptName)}

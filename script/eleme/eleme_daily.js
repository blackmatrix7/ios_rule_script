const scriptName = '饿了么';
const getCookieRegex = /^https?:\/\/h5\.ele\.me\/restapi\/svip_biz\/v1\/supervip\/query_mission_list\?longitude=([^&]*).*latitude=([^&]*)/;
const elemeCookieKey = 'eleme_app_cookie';
const elemeLongitudeKey = 'eleme_app_longitude';
const elemeLatitudeKey = 'eleme_app_latitude';
let magicJS = MagicJS(scriptName, "INFO");

// 获取超级会员任务列表
function GetSuperVipMissions(cookie, longitude, latitude){
  return new Promise((resolve, reject)=>{
    let options = {
      url: `https://h5.ele.me/restapi/svip_biz/v1/supervip/query_mission_list?longitude=${longitude}&latitude=${latitude}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "h5.ele.me",
        "Referer": "https://h5.ele.me/svip/home?entryStat=profile",
        "User-Agent": "Rajax/1 Apple/iPhone10,3 iOS/14.2 Eleme/9.3.8",
        "f-pTraceId": "WVNet_WV_2-3-30",
        "f-refer": "wv_h5",
        "x-shard": `loc=${longitude},${latitude}`
      }
    }
    magicJS.get(options, (err, resp, data)=>{
      if (err){
        magicJS.logError(`获取会员任务失败，请求异常：${err}`);
        reject('❌获取会员任务失败，请求异常，请查阅日志！');
      }
      else{
        try{
          magicJS.logDebug(`获取会员任务，接口响应：${data}`);
          let obj = typeof data === 'string'? JSON.parse(data) : data;
          if (obj){
            let result = [];
            obj.missions.forEach(element => {
              result.push(element.mission_id);
            });
            resolve(result);
          }
          else{
            magicJS.logWarning(`没有可领取的会员任务，接口响应：${data}`);
            reject('❌没有可领取的会员任务，请查阅日志！');
          }
        }
        catch(err){
          magicJS.logError(`获取会员任务失败，执行异常：${err}，接口响应：${data}`);
          reject('❌获取会员任务失败，执行异常，请查阅日志！');
        }
      }
    })
  })
}

// 接收超级会员任务列表中的任务
function AcceptMission(cookie, longitude, latitude, mission_id){
  return new Promise((resolve, reject)=>{
    let options = {
      url: `https://h5.ele.me/restapi/svip_biz/v1/supervip/accept_mission?type=0&mission_id=${mission_id}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=utf-8",
        "Cookie": cookie,
        "Host": "h5.ele.me",
        "Origin": "https://h5.ele.me",
        "Referer": "https://h5.ele.me/svip/home?entryStat=profile",
        "User-Agent": "Rajax/1 Apple/iPhone10,3 iOS/14.2 Eleme/9.3.8",
        "f-pTraceId": "WVNet_WV_2-3-79",
        "f-refer": "wv_h5",
        "x-shard": `loc=${longitude},${latitude}`
      },
      body: JSON.stringify({
        "longitude": longitude,
        "latitude": latitude
      })
    }
    magicJS.post(options, (err, resp, data)=>{
      if (err){
        magicJS.logError(`领取会员任务失败，请求异常：${err}`);
        reject('领取会员任务失败，请求异常，请查阅日志！');
      }
      else{
        try{
          let obj = typeof data === 'string'? JSON.parse(data) : data;
          if (obj.success === true){
            magicJS.logInfo(`领取会员任务成功：${obj.mission.checkout_description}`);
            resolve(obj.mission.checkout_description);
          }
          else{
            magicJS.logError(`领取会员任务失败，响应异常：${data}`);
            reject('领取会员任务失败，响应异常，请查阅日志！');
          }
        }
        catch(err){
          magicJS.logError(`领取会员任务失败，执行异常：${err}，接口响应：${data}`);
          reject('领取会员任务失败，执行异常，请查阅日志！');
        }
      }
    })
  })
}

// 获取待领取的吃货豆列表
function GetPeaList(cookie, longitude, latitude){
  return new Promise((resolve, reject)=>{
    let options = {
      url: `https://h5.ele.me/restapi/biz.svip_core/v1/foodie/homepage?longitude=${longitude}&latitude=${latitude}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "h5.ele.me",
        "Referer": "https://h5.ele.me/svip/home?entryStat=profile",
        "User-Agent": "Rajax/1 Apple/iPhone10,3 iOS/14.2 Eleme/9.3.8",
        "f-pTraceId": "WVNet_WV_2-3-74",
        "f-refer": "wv_h5",
        "x-shard": `loc=${longitude},${latitude}`
      }
    }
    magicJS.get(options, (err, resp, data)=>{
      if (err){
        magicJS.logError(`获取待领取的吃货豆失败，请求异常：${err}`);
        reject('获取待领取的吃货豆失败，请求异常，请查阅日志！');
      }
      else{
        try{
          magicJS.logDebug(`获取待领取吃货豆列表响应结果：${data}`);
          let obj = typeof data === 'string'? JSON.parse(data) : data;
          if (obj.success === true){
            let peaList = [];
            obj.foodiePeaBlock.peaList.forEach(element => {
              peaList.push({'id': element.id, 'count': element.count, 'description': element.description});
            });
            magicJS.logInfo(`获取待领取的吃货豆成功：${JSON.stringify(peaList)}`);
            resolve(peaList);
          }
          else{
            magicJS.logError(`获取待领取的吃货豆失败，响应异常：${data}`);
            reject('获取待领取的吃货豆失败，响应异常，请查阅日志！');
          }
        }
        catch(err){
          magicJS.logError(`获取待领取的吃货豆失败，执行异常：${err}，接口响应：${data}`);
          reject('获取待领取的吃货豆失败，执行异常，请查阅日志！');
        }
      }
    })
  })
}

// 领取吃货豆
function DrawPea(cookie, peaId, longitude, latitude){
  return new Promise((resolve, reject)=>{
    let options = {
      url: `https://h5.ele.me/restapi/biz.svip_bonus/v1/users/supervip/pea/draw?peaId=${peaId}`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=utf-8",
        "Cookie": cookie,
        "Host": "h5.ele.me",
        "Origin": "https://h5.ele.me",
        "Referer": "https://h5.ele.me/svip/home?entryStat=profile",
        "User-Agent": "Rajax/1 Apple/iPhone10,3 iOS/14.2 Eleme/9.3.8",
        "f-pTraceId": "WVNet_WV_2-3-73",
        "f-refer": "wv_h5",
        "x-shard": `loc=${longitude},${latitude}`
      },
      body: JSON.stringify({
        "longitude": longitude,
        "latitude": latitude
      })
    }
    magicJS.post(options, (err, resp, data)=>{
      if (err){
        magicJS.logError(`领取吃货豆失败，请求异常：${err}`);
        reject('领取吃货豆失败，请求异常，请查阅日志！');
      }
      else{
        try{
          magicJS.logDebug(`领取吃货豆响应结果：${data}`);
          let obj = typeof data === 'string'? JSON.parse(data) : data;
          if (obj.success === true){
            magicJS.logInfo(`领取吃货豆成功：${data}`);
            resolve(true);
          }
          else{
            magicJS.logError(`领取吃货豆失败，响应异常：${data}`);
            reject('领取吃货豆失败，响应异常，请查阅日志！');
          }
        }
        catch(err){
          magicJS.logError(`领取吃货豆失败，执行异常：${err}，接口响应：${data}`);
          reject('领取吃货豆失败，执行异常，请查阅日志！');
        }
      }
    })
  })
}

;(async()=>{
  if (magicJS.isRequest){
    if (getCookieRegex.test(magicJS.request.url) && magicJS.request.method == "GET"){
      let cookie = magicJS.request.headers.Cookie;
      let arr = magicJS.request.url.match(getCookieRegex);
      let longitude = arr[1];
      let latitude = arr[2];
      let hisCookie = magicJS.read(elemeCookieKey);
      magicJS.write(elemeLongitudeKey, longitude);
      magicJS.write(elemeLatitudeKey, latitude);
      if (cookie !== hisCookie){
        magicJS.write(elemeCookieKey, cookie);
        magicJS.logInfo(`旧的Cookie：${hisCookie}\n新的Cookie：${cookie}\nCookie不同，写入新的Cookie成功！`);
        magicJS.notify('Cookie写入成功！！');
      }
      else{
        magicJS.logInfo('Cookie没有变化，无需更新');
      }
    }
  }
  else{
    let subTitle = "";
    let content = "";
    let cookie = magicJS.read(elemeCookieKey);
    let longitude = magicJS.read(elemeLongitudeKey);
    let latitude = magicJS.read(elemeLatitudeKey);
    if (!!!cookie){
      magicJS.logWarning('没有读取到Cookie，请先从App中获取一次Cookie！');
      content = '❓没有读取到有效Cookie，请先从App中获取Cookie!!';
    }
    else{
      // 领取会员任务
      let [getMissionErr, missions] = await magicJS.attempt(magicJS.retry(GetSuperVipMissions, 3, 2000)(cookie, longitude, latitude));
      if (getMissionErr){
        subTitle = getMissionErr;
      }
      else{
        content = '会员任务领取结果：';
        for (let i=0;i<missions.length;i++){
          let result = await AcceptMission(cookie, longitude, latitude, missions[i]);
          content += `\n${result}`;
        }
      }
      // 获取待领取的吃货豆
      let [getPeaListErr, peaList] = await magicJS.attempt(GetPeaList(cookie, longitude, latitude), []);
      if (getPeaListErr){
        content += '\n获取待领取的吃货豆异常，请查阅日志';
      }
      else if (peaList.length == 0){
        content += '\n没有发现待领取的吃货豆';
      }
      else{
        let peaCount = 0;
        let drawPeaContent = '';
        for (let j=0;j<peaList.length;j++){
          let [drawPeaErr, result] = await magicJS.attempt(DrawPea(cookie, peaList[j].id, longitude, latitude), false);
          if (drawPeaErr || result === false){
            drawPeaContent += `\n${peaList[j].description}-${peaList[j].count}吃货豆-领取失败`;
          }
          else{
            peaCount += peaList[j].count;
            drawPeaContent += `\n${peaList[j].description}-${peaList[j].count}吃货豆-领取成功`;
          }
          await magicJS.sleep(1000);
        }
        content += `\n本次共领取吃货豆${peaCount}个${drawPeaContent}`;
      }
    }
    // 通知
    magicJS.notify(scriptName, subTitle, content);
  }
  magicJS.done();
})();

function MagicJS(a="MagicJS",b="INFO"){const c={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){if(this.version="2.2.3.2",this.scriptName=a,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.platform=this.getPlatform(),this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=b,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(a){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(a){this._barkUrl=a.replace(/\/+$/g,"")}set logLevel(a){this._logLevel="string"==typeof a?a.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"==typeof $request?void 0:$request}get response(){return"undefined"==typeof $response?void 0:($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response)}getPlatform(){return this.isSurge?"Surge":this.isQuanX?"QuantumultX":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"unknown"}read(a,b=""){let c="";this.isSurge||this.isLoon?c=$persistentStore.read(a):this.isQuanX?c=$prefs.valueForKey(a):this.isNode?c=this.node.data:this.isJSBox&&(c=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(c=c[a]),this.isJSBox&&(c=JSON.parse(c)[a]),!b||("string"==typeof c&&(c=JSON.parse(c)),c=c&&"object"==typeof c?c[b]:null)}catch(d){this.logError(d),c=b?{}:null,this.del(a)}"undefined"==typeof c&&(c=null);try{!c||"string"!=typeof c||(c=JSON.parse(c))}catch(a){}return this.logDebug(`READ DATA [${a}]${b?`[${b}]`:""}(${typeof c})\n${JSON.stringify(c)}`),c}write(a,b,c=""){let d=c?{}:"";if(!!c&&(this.isSurge||this.isLoon)?d=$persistentStore.read(a):!!c&&this.isQuanX?d=$prefs.valueForKey(a):this.isNode?d=this.node.data:this.isJSBox&&(d=JSON.parse($file.read("drive://MagicJS/magic.json").string)),!!c){try{"string"==typeof d&&(d=JSON.parse(d)),d="object"==typeof d&&d?d:{}}catch(b){this.logError(b),this.del(a),d={}}this.isJSBox||this.isNode?((!d.hasOwnProperty(a)||"object"!=typeof d[a]||null===d[a])&&(d[a]={}),!d[a].hasOwnProperty(c)&&(d[a][c]=null),"undefined"==typeof b?delete d[a][c]:d[a][c]=b):"undefined"==typeof b?delete d[c]:d[c]=b}else this.isNode||this.isJSBox?"undefined"==typeof b?delete d[a]:d[a]=b:"undefined"==typeof b?d=null:d=b;"object"==typeof d&&(d=JSON.stringify(d)),this.isSurge||this.isLoon?$persistentStore.write(d,a):this.isQuanX?$prefs.setValueForKey(d,a):this.isNode?this.node.fs.writeFileSync("./magic.json",d):this.isJSBox&&$file.write({data:$data({string:d}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${a}]${c?`[${c}]`:""}(${typeof b})\n${JSON.stringify(b)}`)}del(a,b=""){this.logDebug(`DELETE KEY [${a}]${!b?"":`[${b}]`}`),this.write(a,null,b)}notify(a=this.scriptName,b="",c="",d=""){if(d=(a=>{let b={};if(this.isSurge||this.isQuanX||this.isLoon)if("string"==typeof a)this.isLoon?b={openUrl:a}:this.isQuanX?b={"open-url":a}:this.isSurge&&(b={url:a});else if("object"==typeof a){let c={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}},d=Object.keys(a);for(let e=0;e<d.length;e++)c[this.platform][d[e]]?b[c[this.platform][d[e]]]=a[d[e]]:b[d[e]]=a[d[e]]}return b})(d),this.logNotify(`title:${a}\nsubTitle:${b}\nbody:${c}\noptions:${"object"==typeof d?JSON.stringify(d):d}`),1==arguments.length&&(a=this.scriptName,b="",c=arguments[0]),this.isSurge||this.isLoon)$notification.post(a,b,c,d);else if(this.isQuanX)$notify(a,b,c,d);else if(this.isNode){if(!!this._barkUrl){let d=encodeURI(`${a}/${b}\n${c}`);this.get(`${this._barkUrl}/${d}`,()=>{})}}else if(this.isJSBox){let d={title:a,body:b?`${b}\n${c}`:c};$push.schedule(d)}}log(a,b="INFO"){this.logLevels[this._logLevel]<this.logLevels[b.toUpperCase()]||console.log(`[${b}] [${this.scriptName}]\n${a}\n`)}logDebug(a){this.log(a,"DEBUG")}logInfo(a){this.log(a,"INFO")}logNotify(a){this.log(a,"NOTIFY")}logWarning(a){this.log(a,"WARNING")}logError(a){this.log(a,"ERROR")}adapterHttpOptions(a,b){let d="object"==typeof a?Object.assign({},a):{url:a,headers:{}};if(d.hasOwnProperty("header")&&!d.hasOwnProperty("headers")&&(d.headers=d.header,delete d.header),"object"==typeof d.headers&&!0)for(let a in d.headers)c[a]&&(d.headers[c[a]]=d.headers[a],delete d.headers[a]);!!d.headers&&"object"==typeof d.headers&&!!d.headers["User-Agent"]||((!!!d.headers||"object"!=typeof d.headers)&&(d.headers={}),d.headers["User-Agent"]=this.isNode?this.pcUserAgent:this.iOSUserAgent);let e=!1;if(("object"==typeof d.opts&&(!0===d.opts.hints||!0===d.opts["Skip-Scripting"])||"object"==typeof d.headers&&!0===d.headers["X-Surge-Skip-Scripting"])&&(e=!0),e||(this.isSurge?d.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?d.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof d.opts&&(d.opts={}),d.opts.hints=!1)),(!this.isSurge||e)&&delete d.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&d.hasOwnProperty("opts")&&delete d.opts,this.isQuanX&&d.hasOwnProperty("opts")&&delete d.opts["Skip-Scripting"],"GET"===b&&!this.isNode&&!!d.body){let a=Object.keys(d.body).map(a=>"undefined"==typeof d.body?"":`${encodeURIComponent(a)}=${encodeURIComponent(d.body[a])}`).join("&");0>d.url.indexOf("?")&&(d.url+="?"),d.url.lastIndexOf("&")+1!=d.url.length&&d.url.lastIndexOf("?")+1!=d.url.length&&(d.url+="&"),d.url+=a,delete d.body}return this.isQuanX?(d.hasOwnProperty("body")&&"string"!=typeof d.body&&(d.body=JSON.stringify(d.body)),d.method=b):this.isNode?(delete d.headers["Accept-Encoding"],"object"==typeof d.body&&("GET"===b?(d.qs=d.body,delete d.body):"POST"==b&&(d.json=!0,d.body=d.body))):this.isJSBox&&(d.header=d.headers,delete d.headers),d}get(a,b){let c=this.adapterHttpOptions(a,"GET");if(this.logDebug(`HTTP GET: ${JSON.stringify(c)}`),this.isSurge||this.isLoon)$httpClient.get(c,b);else if(this.isQuanX)$task.fetch(c).then(a=>{a.status=a.statusCode,b(null,a,a.body)},a=>b(a.error,null,null));else{if(this.isNode)return this.node.request.get(c,b);this.isJSBox&&(c.handler=a=>{let c=a.error?JSON.stringify(a.error):void 0,d="object"==typeof a.data?JSON.stringify(a.data):a.data;b(c,a.response,d)},$http.get(c))}}post(a,b){let c=this.adapterHttpOptions(a,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(c)}`),this.isSurge||this.isLoon)$httpClient.post(c,b);else if(this.isQuanX)$task.fetch(c).then(a=>{a.status=a.statusCode,b(null,a,a.body)},a=>{b(a.error,null,null)});else{if(this.isNode)return this.node.request.post(c,b);this.isJSBox&&(c.handler=a=>{let c=a.error?JSON.stringify(a.error):void 0,d="object"==typeof a.data?JSON.stringify(a.data):a.data;b(c,a.response,d)},$http.post(c))}}done(a={}){"undefined"!=typeof $done&&$done(a)}isToday(a){if(null==a)return!1;else{let b=new Date;return"string"==typeof a&&(a=new Date(a)),b.getFullYear()==a.getFullYear()&&b.getMonth()==a.getMonth()&&b.getDay()==a.getDay()}}isNumber(a){return"NaN"!==parseFloat(a).toString()}attempt(a,b=null){return a.then(a=>[null,a]).catch(a=>(this.logError(a),[a,b]))}retry(a,b=5,c=0,d=null){return(...e)=>new Promise((f,g)=>{function h(...e){Promise.resolve().then(()=>a.apply(this,e)).then(a=>{"function"==typeof d?Promise.resolve().then(()=>d(a)).then(()=>{f(a)}).catch(a=>{this.logError(a),1<=b&&0<c?setTimeout(()=>h.apply(this,e),c):1<=b?h.apply(this,e):g(a),b--}):f(a)}).catch(a=>{this.logError(a),1<=b&&0<c?setTimeout(()=>h.apply(this,e),c):1<=b?h.apply(this,e):g(a),b--})}h.apply(this,e)})}formatTime(a,b="yyyy-MM-dd hh:mm:ss"){var c={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),S:a.getMilliseconds()};for(let d in /(y+)/.test(b)&&(b=b.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length))),c)new RegExp("("+d+")").test(b)&&(b=b.replace(RegExp.$1,1==RegExp.$1.length?c[d]:("00"+c[d]).substr((""+c[d]).length)));return b}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(a){return new Promise(b=>setTimeout(b,a))}}(a)}
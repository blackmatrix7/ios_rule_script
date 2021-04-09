const zhiyouRegex = /^https?:\/\/zhiyou\.smzdm\.com\/user$/;
const smzdmCookieKey = 'smzdm_cookie';
const smzdmSessionKey = 'smzdm_session';
const scriptName = '什么值得买';

let magicJS = MagicJS(scriptName, "INFO");
magicJS.unifiedPushUrl = magicJS.read('smzdm_unified_push_url') || magicJS.read('magicjs_unified_push_url');


function randomStr(){
  let len = 17;
  let char = '0123456789';
  let str = ''
  for (i = 0; i < len; i++) {
    str += char.charAt(Math.floor(Math.random() * char.length));
  }
  return str;
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

// Web端签到
function WebSignin(cookie) {
  return new Promise((resolve, reject) => {
    let ts = Date.parse(new Date());
    let options = {
      url : `https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=jQuery11240${randomStr()}_${ts}&_=${ts+3}`,
      headers : {
        'Accept': '*/*',
        'Accept-Language': 'zh-cn',
        'Connection': 'keep-alive',
        'Host': 'zhiyou.smzdm.com',
        'Referer': 'https://www.smzdm.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15',
        'Cookie': cookie
      }
    };
    magicJS.get(options, (err, resp, data)=>{
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
              else if (checkin_obj['error_code'] == 99){
                magicJS.logWarning('Web端Cookie已过期');
                resolve([false, 'Web端Cookie已过期']);
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
          }
          else{
            magicJS.logWarning(`Web端签到出现异常，接口返回数据不存在：${data}`);
            reject('Web端签到异常');
          }
        }
        catch (err){
          magicJS.logWarning(`Web端签到出现异常，代码执行异常：${err}，接口返回：${data}`);
          reject('Web端执行异常');
        }
      }
    })
  })
}

// 获取用户信息，新版
function WebGetCurrentInfoNewVersion(smzdmCookie){
  return new Promise(resolve =>{
    let options ={
      url : 'https://zhiyou.smzdm.com/user/exp/',
      headers : {
        'Cookie': smzdmCookie
      },
      body: ''
    };
    magicJS.get(options, (err, resp, data)=>{
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
          magicJS.logWarning(`获取用户信息异常，Cookie过期或接口变化：${data}`);
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

;(async() =>{
  if (magicJS.isRequest && zhiyouRegex.test(magicJS.request.url) && magicJS.request.method == 'GET'){
    GetWebCookie();
  }
  else{
    // 通知信息
    let title = '';
    let subTitle = '';
    let content = '';
    // 获取Cookie
    let smzdmCookie = magicJS.read(smzdmCookieKey);

    if (!!smzdmCookie === false){
      magicJS.logWarning('没有读取到什么值得买有效cookie，请访问zhiyou.smzdm.com进行登录');
      magicJS.notify(scriptName, '', '❓没有获取到Web端Cookie，请先进行登录。');
    }
    else{
      try{
        // 查询签到前用户数据
        let [nickName, avatar, beforeVIPLevel, beforeHasCheckin, , beforeNotice, , ,beforePoint, beforeGold, beforeSilver] = await WebGetCurrentInfo(smzdmCookie);
        if (!nickName){
          magicJS.notify(scriptName, '', '❌Cookie过期或接口变化，请尝试重新登录');
          magicJS.done();
        }
        else{
          let [, , , beforeExp, , beforePrestige, ] = await WebGetCurrentInfoNewVersion(smzdmCookie);
          magicJS.logInfo(`昵称：${nickName}\nWeb端签到状态：${beforeHasCheckin}\n签到前等级${beforeVIPLevel}，积分${beforePoint}，经验${beforeExp}，金币${beforeGold}，碎银子${beforeSilver}， 未读消息${beforeNotice}`);
  
          // Web端签到及重试
          let webCheckinRetry = magicJS.retry(WebSignin, 5, 500);
          let [webCheckinErr,[webCheckinResult, webCheckinStr]] = await magicJS.attempt(webCheckinRetry(smzdmCookie), [false, 'Web端签到异常']);
          if (webCheckinErr){
            magicJS.logWarning('Web端签到异常：' + webCheckinErr);
            magicJS.notify(webCheckinErr);
          }
          else{
            subTitle = webCheckinStr;

            // 查询签到后用户数据
            await magicJS.sleep(3000); 
            let [, , afterVIPLevel, afterHasCheckin, afterCheckinNum, afterNotice, , , afterPoint, afterGold, afterSilver] = await WebGetCurrentInfo(smzdmCookie);
            let [, afteruserPointList, , afterExp, ,afterPrestige, ] = await WebGetCurrentInfoNewVersion(smzdmCookie);
            magicJS.logInfo(`昵称：${nickName}\nWeb端签到状态：${afterHasCheckin}\n签到后等级${afterVIPLevel}，积分${afterPoint}，经验${afterExp}，金币${afterGold}，碎银子${afterSilver}，未读消息${afterNotice}`);

            if (beforeHasCheckin && afterHasCheckin){
              webCheckinStr = 'Web端重复签到';
            }

            if (!!afterCheckinNum) subTitle += ` 已签${afterCheckinNum}天`;

            // 通知内容
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
            title = `${scriptName} - ${nickName} V${afterVIPLevel}`;
            magicJS.notify(title, subTitle, content, {'media-url': avatar});
          }
        }
      }
      catch(err){
        magicJS.logError(`签到出现异常：${err}`);
        magicJS.notify(scriptName, '', '❌签到出现异常，请查阅日志');
      }
    }
  }
  magicJS.done();
})();

function MagicJS(e="MagicJS",t="INFO"){const s={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){this.version="2.2.3.3";this.scriptName=e;this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};this.isLoon=typeof $loon!=="undefined";this.isQuanX=typeof $task!=="undefined";this.isJSBox=typeof $drive!=="undefined";this.isNode=typeof module!=="undefined"&&!this.isJSBox;this.isSurge=typeof $httpClient!=="undefined"&&!this.isLoon;this.platform=this.getPlatform();this.node={request:undefined,fs:undefined,data:{}};this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";this.logLevel=t;this._unifiedPushUrl="";if(this.isNode){this.node.fs=require("fs");this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(e){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else if(this.isJSBox){if(!$file.exists("drive://MagicJS")){$file.mkdir("drive://MagicJS")}if(!$file.exists("drive://MagicJS/magic.json")){$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"})}}}set unifiedPushUrl(e){this._unifiedPushUrl=!!e?e.replace(/\/+$/g,""):""}set logLevel(e){this._logLevel=typeof e==="string"?e.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}getPlatform(){if(this.isSurge)return"Surge";else if(this.isQuanX)return"QuantumultX";else if(this.isLoon)return"Loon";else if(this.isJSBox)return"JSBox";else if(this.isNode)return"Node.js";else return"unknown"}read(e,t=""){let s="";if(this.isSurge||this.isLoon){s=$persistentStore.read(e)}else if(this.isQuanX){s=$prefs.valueForKey(e)}else if(this.isNode){s=this.node.data}else if(this.isJSBox){s=$file.read("drive://MagicJS/magic.json").string}try{if(this.isNode)s=s[e];if(this.isJSBox)s=JSON.parse(s)[e];if(!!t){if(typeof s==="string")s=JSON.parse(s);s=!!s&&typeof s==="object"?s[t]:null}}catch(i){this.logError(i);s=!!t?{}:null;this.del(e)}if(typeof s==="undefined")s=null;try{if(!!s&&typeof s==="string")s=JSON.parse(s)}catch(e){}this.logDebug(`READ DATA [${e}]${!!t?`[${t}]`:""}(${typeof s})\n${JSON.stringify(s)}`);return s}write(e,t,s=""){let i=!!s?{}:"";if(!!s&&(this.isSurge||this.isLoon)){i=$persistentStore.read(e)}else if(!!s&&this.isQuanX){i=$prefs.valueForKey(e)}else if(this.isNode){i=this.node.data}else if(this.isJSBox){i=JSON.parse($file.read("drive://MagicJS/magic.json").string)}if(!!s){try{if(typeof i==="string")i=JSON.parse(i);i=typeof i==="object"&&!!i?i:{}}catch(t){this.logError(t);this.del(e);i={}}if(this.isJSBox||this.isNode){if(!i.hasOwnProperty(e)||typeof i[e]!=="object"||i[e]===null){i[e]={}}if(!i[e].hasOwnProperty(s)){i[e][s]=null}if(typeof t==="undefined"){delete i[e][s]}else{i[e][s]=t}}else{if(typeof t==="undefined"){delete i[s]}else{i[s]=t}}}else{if(this.isNode||this.isJSBox){if(typeof t==="undefined"){delete i[e]}else{i[e]=t}}else{if(typeof t==="undefined"){i=null}else{i=t}}}if(typeof i==="object")i=JSON.stringify(i);if(this.isSurge||this.isLoon){$persistentStore.write(i,e)}else if(this.isQuanX){$prefs.setValueForKey(i,e)}else if(this.isNode){this.node.fs.writeFileSync("./magic.json",i)}else if(this.isJSBox){$file.write({data:$data({string:i}),path:"drive://MagicJS/magic.json"})}this.logDebug(`WRITE DATA [${e}]${!!s?`[${s}]`:""}(${typeof t})\n${JSON.stringify(t)}`)}del(e,t=""){this.logDebug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`);this.write(e,null,t)}notify(e=this.scriptName,t="",s="",i=""){let o=e=>{let t={};if(this.isSurge||this.isQuanX||this.isLoon){if(typeof e==="string"){if(this.isLoon)t={openUrl:e};else if(this.isQuanX)t={"open-url":e};else if(this.isSurge)t={url:e}}else if(typeof e==="object"){let s={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}};let i=Object.keys(e);for(let o=0;o<i.length;o++){if(!!s[this.platform][i[o]]){t[s[this.platform][i[o]]]=e[i[o]]}else{t[i[o]]=e[i[o]]}}}}return t};i=o(i);this.logNotify(`title:${e}\nsubTitle:${t}\nbody:${s}\noptions:${typeof i==="object"?JSON.stringify(i):i}`);if(arguments.length==1){e=this.scriptName;t="",s=arguments[0]}if(!!this._unifiedPushUrl){let i=encodeURI(`${e}/${t}${!!t?"\n":""}${s}`);this.get(`${this._unifiedPushUrl}/${i}`,()=>{})}if(this.isSurge||this.isLoon){$notification.post(e,t,s,i)}else if(this.isQuanX){$notify(e,t,s,i)}else if(this.isJSBox){let i={title:e,body:!!t?`${t}\n${s}`:s};$push.schedule(i)}}log(e,t="INFO"){if(!(this.logLevels[this._logLevel]<this.logLevels[t.toUpperCase()]))console.log(`[${t}] [${this.scriptName}]\n${e}\n`)}logDebug(e){this.log(e,"DEBUG")}logInfo(e){this.log(e,"INFO")}logNotify(e){this.log(e,"NOTIFY")}logWarning(e){this.log(e,"WARNING")}logError(e){this.log(e,"ERROR")}adapterHttpOptions(e,t){let i=typeof e==="object"?Object.assign({},e):{url:e,headers:{}};if(i.hasOwnProperty("header")&&!i.hasOwnProperty("headers")){i["headers"]=i["header"];delete i["header"]}if(typeof i.headers==="object"&&!!s){for(let e in i.headers){if(s[e]){i.headers[s[e]]=i.headers[e];delete i.headers[e]}}}if(!!!i.headers||typeof i.headers!=="object"||!!!i.headers["User-Agent"]){if(!!!i.headers||typeof i.headers!=="object")i.headers={};if(this.isNode)i.headers["User-Agent"]=this.pcUserAgent;else i.headers["User-Agent"]=this.iOSUserAgent}let o=false;if(typeof i["opts"]==="object"&&(i["opts"]["hints"]===true||i["opts"]["Skip-Scripting"]===true)||typeof i["headers"]==="object"&&i["headers"]["X-Surge-Skip-Scripting"]===true){o=true}if(!o){if(this.isSurge)i.headers["X-Surge-Skip-Scripting"]=false;else if(this.isLoon)i.headers["X-Requested-With"]="XMLHttpRequest";else if(this.isQuanX){if(typeof i["opts"]!=="object")i.opts={};i.opts["hints"]=false}}if(!this.isSurge||o)delete i.headers["X-Surge-Skip-Scripting"];if(!this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"];if(this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"]["Skip-Scripting"];if(t==="GET"&&!this.isNode&&!!i.body){let e=Object.keys(i.body).map(e=>{if(typeof i.body==="undefined")return"";return`${encodeURIComponent(e)}=${encodeURIComponent(i.body[e])}`}).join("&");if(i.url.indexOf("?")<0)i.url+="?";if(i.url.lastIndexOf("&")+1!=i.url.length&&i.url.lastIndexOf("?")+1!=i.url.length)i.url+="&";i.url+=e;delete i.body}if(this.isQuanX){if(i.hasOwnProperty("body")&&typeof i["body"]!=="string")i["body"]=JSON.stringify(i["body"]);i["method"]=t}else if(this.isNode){delete i.headers["Accept-Encoding"];if(typeof i.body==="object"){if(t==="GET"){i.qs=i.body;delete i.body}else if(t==="POST"){i["json"]=true;i.body=i.body}}}else if(this.isJSBox){i["header"]=i["headers"];delete i["headers"]}return i}get(e,t){let s=this.adapterHttpOptions(e,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.get(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>t(e.error,null,null))}else if(this.isNode){return this.node.request.get(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.get(s)}}post(e,t){let s=this.adapterHttpOptions(e,"POST");this.logDebug(`HTTP POST: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.post(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>{t(e.error,null,null)})}else if(this.isNode){return this.node.request.post(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.post(s)}}done(e={}){if(typeof $done!=="undefined"){$done(e)}}isToday(e){if(e==null){return false}else{let t=new Date;if(typeof e=="string"){e=new Date(e)}if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()&&t.getDay()==e.getDay()){return true}else{return false}}}isNumber(e){return parseFloat(e).toString()==="NaN"?false:true}attempt(e,t=null){return e.then(e=>{return[null,e]}).catch(e=>{this.logError(e);return[e,t]})}retry(e,t=5,s=0,i=null){return(...o)=>{return new Promise((r,n)=>{function a(...o){Promise.resolve().then(()=>e.apply(this,o)).then(e=>{if(typeof i==="function"){Promise.resolve().then(()=>i(e)).then(()=>{r(e)}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}else{r(e)}}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}a.apply(this,o)})}}formatTime(e,t="yyyy-MM-dd hh:mm:ss"){var s={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in s)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?s[e]:("00"+s[e]).substr((""+s[e]).length));return t}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(e){return new Promise(t=>setTimeout(t,e))}}(e)}
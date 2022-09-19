/*
百度贴吧签到，增加重试机制，减少签到失败的情况。
脚本为串行执行，通过设定batchSize的值<int>，实现每批多少个贴吧并行签到一次。
*/
const scriptName = "百度贴吧";
const batchSize = 20;
const retries = 10; // 签到失败重试次数
const interval = 5000; // 每次重试间隔
const tiebaCookieKey = "tieba_signin_cookie";
const tiebeGetCookieRegex1 =
  /https?:\/\/(c\.tieba\.baidu\.com|180\.97\.\d+\.\d+)\/c\/s\/login/;
const tiebeGetCookieRegex2 =
  /^https?:\/\/c\.tieba\.baidu\.com\/c\/s\/channelIconConfig/;
const tiebeGetCookieRegex3 =
  /https?:\/\/tiebac\.baidu\.com\/c\/u\/follow\/getFoldedMessageUserInfo/;

const $ = MagicJS(scriptName, "INFO");
let currentCookie = "";

function addCookie(config) {
  config.headers["Cookie"] = currentCookie;
  return config;
}
$.http.interceptors.request.use(addCookie);

function getTieBaList() {
  return new Promise((resolve, reject) => {
    $.http
      .get({
        url: "https://tieba.baidu.com/mo/q/newmoindex",
        headers: {
          "Content-Type": "application/octet-stream",
          Referer: "https://tieba.baidu.com/index/tbwise/forum",
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16A366",
        },
        body: "",
      })
      .then((resp) => {
        const obj = resp.body;
        if (obj.error === "success") {
          $.logger.info(
            `获取贴吧列表成功，共关注${obj.data.like_forum.length}个贴吧`
          );
          resolve([obj.data.tbs, obj.data.like_forum]);
        }
      })
      .catch((err) => {
        const errMsg = `获取贴吧列表失败，${err}`;
        $.logger.error();
        $.notification.post("获取贴吧列表失败，请查阅日志");
        reject(errMsg);
      });
  });
}

function tiebaSignIn(tbs, tieba) {
  const kw = tieba["forum_name"];
  return new Promise((resolve, reject) => {
    if (tieba["is_sign"] === 1) {
      resolve(`[${kw}] 重复签到`);
    } else {
      let msg = "";
      const body = `tbs=${tbs}&kw=${kw}&ie=utf-8`;
      $.http
        .post({
          url: "https://tieba.baidu.com/sign/add",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip,deflate,br",
            "Accept-Language":
              "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Connection: "keep-alive",
            Host: "tieba.baidu.com",
            Referer: "https://tieba.baidu.com/",
            "x-requested-with": "XMLHttpRequest",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 Edg/84.0.522.63",
          },
          body: body,
        })
        .then((resp) => {
          const obj = resp.body;
          if (
            obj.data.errmsg === "success" &&
            obj.data.errno === 0 &&
            obj.data.uinfo.is_sign_in === 1
          ) {
            msg = `[${kw}] 签到成功 排名 ${obj.data.uinfo.user_sign_rank} 积分 ${obj.data.uinfo.cont_sign_num}`;
            $.logger.info(msg);
            resolve(msg);
          } else {
            if (obj.no === 2150040) {
              msg = `[${kw}] 签到失败，need vcode`;
            } else if (obj.no === 1011) {
              msg = `[${kw}] 未加入此吧或等级不够`;
            } else if (obj.no === 1102) {
              msg = `[${kw}] 签到过快`;
            } else if (obj.no === 1101) {
              msg = `[${kw}] 重复签到`;
            } else if (obj.no === 1010) {
              msg = `[${kw}] 目录出错`;
            } else {
              msg = `[${kw}] 签到失败`;
            }
            $.logger.warning(`${msg}\n${JSON.stringify(obj)}`);
            reject(msg);
          }
        })
        .catch((err) => {
          msg = `[${kw}] 签到异常`;
          $.logger.warning(`${kw} 签到异常\n${err}`);
          reject(msg);
        });
    }
  });
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    $.http
      .get({
        url: "https://tieba.baidu.com/mo/q/sync",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          Connection: "keep-alive",
          Host: "tieba.baidu.com",
          Referer: "https://tieba.baidu.com/home/main",
        },
      })
      .then((resp) => {
        if (resp.body.no === 0 && resp.body.error === "success") {
          resolve(resp.body.data.user_id);
        }
      })
      .catch((err) => {
        $.logger.error(`获取用户信息出现出现异常，${err}`);
        reject(err);
      });
  });
}

async function multiUsersSignIn() {
  const allSessionskey = $.data.allSessions(tiebaCookieKey);
  if (allSessionskey.length === 0) {
    $.logger.error(`没有需要签到的Cookie，请先登录百度贴吧`);
    $.notification.post(`没有需要签到的Cookie，请先登录百度贴吧`);
    $.done();
  }
  $.logger.info(`本次一共需要签到 ${allSessionskey.length} 个Cookies`);
  for (let [index, sessionKey] of allSessionskey.entries()) {
    currentCookie = $.data.read(tiebaCookieKey, null, sessionKey);
    if (!currentCookie) {
      continue;
    } else {
      $.logger.info(`当前正在进行第 ${index + 1} 个Cookie签到`);
      let content = "🥺很遗憾，以下贴吧签到失败：";
      let success = 0;
      let failure = 0;
      const [tbs, tiebaList] = await $.utils.retry(
        getTieBaList,
        retries,
        interval
      )();
      const tiebaCount = tiebaList.length;
      const cycleNumber = Math.ceil(tiebaList.length / batchSize);
      for (let i = 0; i < cycleNumber; i++) {
        let batchTiebaPromise = [];
        const batchTiebaList = tiebaList.splice(0, batchSize);
        for (let tieba of batchTiebaList) {
          batchTiebaPromise.push(
            $.utils.retry(tiebaSignIn, retries, interval)(tbs, tieba)
          );
        }
        await Promise.all(batchTiebaPromise).then((result) => {
          result.forEach((element) => {
            if (
              element.indexOf("签到成功") < 0 &&
              element.indexOf("重复签到") < 0
            ) {
              failure += 1;
              content += `\n${element}`;
            } else {
              success += 1;
            }
          });
        });
      }
      $.notification.post(
        scriptName,
        `签到${tiebaCount}个，成功${success}个，失败${failure}个！`,
        !!failure > 0 ? content : "🎉恭喜，所有贴吧签到成功！！"
      );
      $.logger.info(`第 ${index + 1} 个Cookie签到完毕`);
    }
  }
}

(async () => {
  try{
  // 获取百度贴吧Cookie
  if (
    $.isRequest &&
    (tiebeGetCookieRegex1.test($.request.url) ||
      tiebeGetCookieRegex2.test($.request.url) ||
      tiebeGetCookieRegex3.test($.request.url))
  ) {
    try {
      const cookie = $.request.headers.Cookie;
      currentCookie = cookie;
      $.logger.info(`获取百度贴吧Cookies(请勿泄露):\n${cookie}`);
      if (!!cookie) {
        const userId = await getUserInfo();
        if (!userId) {
          userId = "default";
        }
        $.logger.info(`获取用户Id:${userId}`);
        const result = $.data.update(tiebaCookieKey, cookie, userId);
        if (result) {
          const msg = "🎈获取百度贴吧Cookie成功";
          $.notification.post(msg);
          $.logger.info(msg);
        } else {
          $.logger.info("Cookie没有变化，无需更新");
        }
        const syncQinglong = $.data.read("tieba_sync_qinglong", false);
        $.logger.info(
          `${syncQinglong === true ? "" : "不"}同步Cookie到青龙面板`
        );
        if (syncQinglong === true) {
          const msg = "🎈百度贴吧Cookie同步到青龙面板成功";
          const result = await $.qinglong.update(
            tiebaCookieKey,
            cookie,
            userId
          );
          if (result) {
            $.notification.post(msg);
            $.notification.post(
              `${scriptName} - ${userId}`,
              "",
              `已将您的信息同步至青龙面板：\n${$.qinglong.url}\n如上述地址不是您所配置，则信息已泄露！\n请立即停用脚本，更改密码！\n检查青龙面板配置是否被篡改！`
            );
            $.logger.info(msg);
          }
        }
      }
    } catch (err) {
      $.logger.error(err);
    }
  }
  // 签到
  else {
    await multiUsersSignIn();
  }
  $.done();
}
catch(err){
  console.log("出错了" + err);
}finally{$.done()}})();

/**
 *
 * $$\      $$\                     $$\             $$$$$\  $$$$$$\         $$$$$$\
 * $$$\    $$$ |                    \__|            \__$$ |$$  __$$\       $$ ___$$\
 * $$$$\  $$$$ | $$$$$$\   $$$$$$\  $$\  $$$$$$$\      $$ |$$ /  \__|      \_/   $$ |
 * $$\$$\$$ $$ | \____$$\ $$  __$$\ $$ |$$  _____|     $$ |\$$$$$$\          $$$$$ /
 * $$ \$$$  $$ | $$$$$$$ |$$ /  $$ |$$ |$$ /     $$\   $$ | \____$$\         \___$$\
 * $$ |\$  /$$ |$$  __$$ |$$ |  $$ |$$ |$$ |     $$ |  $$ |$$\   $$ |      $$\   $$ |
 * $$ | \_/ $$ |\$$$$$$$ |\$$$$$$$ |$$ |\$$$$$$$\\$$$$$$  |\$$$$$$  |      \$$$$$$  |
 * \__|     \__| \_______| \____$$ |\__| \_______|\______/  \______/        \______/
 *                        $$\   $$ |
 *                        \$$$$$$  |
 *                         \______/
 *
 */
// prettier-ignore
function MagicJS(e="MagicJS",t="INFO"){const i=()=>{const e=typeof $loon!=="undefined";const t=typeof $task!=="undefined";const n=typeof module!=="undefined";const i=typeof $httpClient!=="undefined"&&!e;const s=typeof $storm!=="undefined";const r=typeof $environment!=="undefined"&&typeof $environment["stash-build"]!=="undefined";const o=i||e||s||r;const u=typeof importModule!=="undefined";return{isLoon:e,isQuanX:t,isNode:n,isSurge:i,isStorm:s,isStash:r,isSurgeLike:o,isScriptable:u,get name(){if(e){return"Loon"}else if(t){return"QuantumultX"}else if(n){return"NodeJS"}else if(i){return"Surge"}else if(u){return"Scriptable"}else{return"unknown"}},get build(){if(i){return $environment["surge-build"]}else if(r){return $environment["stash-build"]}else if(s){return $storm.buildVersion}},get language(){if(i||r){return $environment["language"]}},get version(){if(i){return $environment["surge-version"]}else if(r){return $environment["stash-version"]}else if(s){return $storm.appVersion}else if(n){return process.version}},get system(){if(i){return $environment["system"]}else if(n){return process.platform}},get systemVersion(){if(s){return $storm.systemVersion}},get deviceName(){if(s){return $storm.deviceName}}}};const s=(n,e="INFO")=>{let i=e;const s={SNIFFER:6,DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};const r={SNIFFER:"",DEBUG:"",INFO:"",NOTIFY:"",WARNING:"❗ ",ERROR:"❌ ",CRITICAL:"❌ ",NONE:""};const t=(e,t="INFO")=>{if(!(s[i]<s[t.toUpperCase()]))console.log(`[${t}] [${n}]\n${r[t.toUpperCase()]}${e}\n`)};const o=e=>{i=e};return{setLevel:o,sniffer:e=>{t(e,"SNIFFER")},debug:e=>{t(e,"DEBUG")},info:e=>{t(e,"INFO")},notify:e=>{t(e,"NOTIFY")},warning:e=>{t(e,"WARNING")},error:e=>{t(e,"ERROR")},retry:e=>{t(e,"RETRY")}}};return new class{constructor(e,t){this._startTime=Date.now();this.version="3.0.0";this.scriptName=e;this.env=i();this.logger=s(e,t);this.http=typeof MagicHttp==="function"?MagicHttp(this.env,this.logger):undefined;this.data=typeof MagicData==="function"?MagicData(this.env,this.logger):undefined;this.notification=typeof MagicNotification==="function"?MagicNotification(this.scriptName,this.env,this.logger):undefined;this.utils=typeof MagicUtils==="function"?MagicUtils(this.env,this.logger):undefined;this.qinglong=typeof MagicQingLong==="function"?MagicQingLong(this.env,this.data,this.logger):undefined;if(typeof this.data!=="undefined"){let e=this.data.read("magic_loglevel");const n=this.data.read("magic_bark_url");if(e){this.logger.setLevel(e.toUpperCase())}if(n){this.notification.setBark(n)}}}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get isDebug(){return this.logger.level==="DEBUG"}get request(){if(typeof $request!=="undefined"){this.logger.sniffer(`RESPONSE:\n${JSON.stringify($request)}`);return $request}}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];this.logger.sniffer(`RESPONSE:\n${JSON.stringify($response)}`);return $response}else{return undefined}}done=(e={})=>{this._endTime=Date.now();let t=(this._endTime-this._startTime)/1e3;this.logger.info(`SCRIPT COMPLETED: ${t} S.`);if(typeof $done!=="undefined"){$done(e)}}}(e,t)}
// prettier-ignore
function MagicData(l,f){let u={fs:undefined,data:{}};if(l.isNode){u.fs=require("fs");try{u.fs.accessSync("./magic.json",u.fs.constants.R_OK|u.fs.constants.W_OK)}catch(e){u.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}u.data=require("./magic.json")}const o=(e,t)=>{if(typeof t==="object"){return false}else{return e===t}};const a=e=>{if(e==="true"){return true}else if(e==="false"){return false}else if(typeof e==="undefined"){return null}else{return e}};const c=(e,t,r,s)=>{if(r){try{if(typeof e==="string")e=JSON.parse(e);if(e["magic_session"]===true){e=e[r]}else{e=null}}catch{e=null}}if(typeof e==="string"&&e!=="null"){try{e=JSON.parse(e)}catch{}}if(s===false&&!!e&&e["magic_session"]===true){e=null}if((e===null||typeof e==="undefined")&&t!==null&&typeof t!=="undefined"){e=t}e=a(e);return e};const i=t=>{if(typeof t==="string"){let e={};try{e=JSON.parse(t);const r=typeof e;if(r!=="object"||e instanceof Array||r==="bool"||e===null){e={}}}catch{}return e}else if(t instanceof Array||t===null||typeof t==="undefined"||t!==t||typeof t==="boolean"){return{}}else{return t}};const y=(e,t=null,r="",s=false,n=null)=>{let i=n||u.data;if(!!i&&typeof i[e]!=="undefined"&&i[e]!==null){val=i[e]}else{val=!!r?{}:null}val=c(val,t,r,s);return val};const d=(e,t=null,r="",s=false,n=null)=>{let i="";if(n||l.isNode){i=y(e,t,r,s,n)}else{if(l.isSurgeLike){i=$persistentStore.read(e)}else if(l.isQuanX){i=$prefs.valueForKey(e)}i=c(i,t,r,s)}f.debug(`READ DATA [${e}]${!!r?`[${r}]`:""} <${typeof i}>\n${JSON.stringify(i)}`);return i};const p=(t,r,s="",e=null)=>{let n=e||u.data;n=i(n);if(!!s){let e=i(n[t]);e["magic_session"]=true;e[s]=r;n[t]=e}else{n[t]=r}if(e!==null){e=n}return n};const g=(e,t,r="",s=null)=>{if(typeof t==="undefined"||t!==t){return false}if(!l.isNode&&(typeof t==="boolean"||typeof t==="number")){t=String(t)}let n="";if(s||l.isNode){n=p(e,t,r,s)}else{if(!r){n=t}else{if(l.isSurgeLike){n=!!$persistentStore.read(e)?$persistentStore.read(e):n}else if(l.isQuanX){n=!!$prefs.valueForKey(e)?$prefs.valueForKey(e):n}n=i(n);n["magic_session"]=true;n[r]=t}}if(!!n&&typeof n==="object"){n=JSON.stringify(n,"","\t")}f.debug(`WRITE DATA [${e}]${r?`[${r}]`:""} <${typeof t}>\n${JSON.stringify(t)}`);if(!s){if(l.isSurgeLike){return $persistentStore.write(n,e)}else if(l.isQuanX){return $prefs.setValueForKey(n,e)}else if(l.isNode){try{u.fs.writeFileSync("./magic.json",n);return true}catch(e){f.error(e);return false}}}return true};const e=(t,r,s,n=o,i=null)=>{r=a(r);const e=d(t,null,s,false,i);if(n(e,r)===true){return false}else{const l=g(t,r,s,i);let e=d(t,null,s,false,i);if(n===o&&typeof e==="object"){return l}return n(r,e)}};const S=(e,t,r)=>{let s=r||u.data;s=i(s);if(!!t){obj=i(s[e]);delete obj[t];s[e]=obj}else{delete s[e]}if(!!r){r=s}return s};const t=(e,t="",r=null)=>{let s={};if(r||l.isNode){s=S(e,t,r);if(!r){u.fs.writeFileSync("./magic.json",JSON.stringify(s))}else{r=s}}else{if(!t){if(l.isStorm){return $persistentStore.remove(e)}else if(l.isSurgeLike){return $persistentStore.write(null,e)}else if(l.isQuanX){return $prefs.removeValueForKey(e)}}else{if(l.isSurgeLike){s=$persistentStore.read(e)}else if(l.isQuanX){s=$prefs.valueForKey(e)}s=i(s);delete s[t];const n=JSON.stringify(s);g(e,n)}}f.debug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`)};const r=(e,t=null)=>{let r=[];let s=d(e,null,null,true,t);s=i(s);if(s["magic_session"]!==true){r=[]}else{r=Object.keys(s).filter(e=>e!=="magic_session")}f.debug(`READ ALL SESSIONS [${e}] <${typeof r}>\n${JSON.stringify(r)}`);return r};return{read:d,write:g,del:t,update:e,allSessions:r,defaultValueComparator:o,convertToObject:i}}
// prettier-ignore
function MagicHttp(l,u){const t="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";const r="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";let f;if(l.isNode){const a=require("axios");f=a.create()}class e{constructor(e=true){this.handlers=[];this.isRequest=e}use(e,t,r){this.handlers.push({fulfilled:e,rejected:t,synchronous:r?r.synchronous:false,runWhen:r?r.runWhen:null});return this.handlers.length-1}eject(e){if(this.handlers[e]){this.handlers[e]=null}}forEach(t){this.handlers.forEach(e=>{if(e!==null){t(e)}})}}function n(e){let r={...e};if(!!r.params){if(!l.isNode){let e=Object.keys(r.params).map(e=>{const t=encodeURIComponent(e);r.url=r.url.replace(new RegExp(`${e}=[^&]*`,"ig"),"");r.url=r.url.replace(new RegExp(`${t}=[^&]*`,"ig"),"");return`${t}=${encodeURIComponent(r.params[e])}`}).join("&");if(r.url.indexOf("?")<0)r.url+="?";if(!/(&|\?)$/g.test(r.url)){r.url+="&"}r.url+=e;delete r.params;u.debug(`Params to QueryString: ${r.url}`)}}return r}const d=(e,t)=>{let r=typeof t==="object"?{headers:{},...t}:{url:t,headers:{}};if(!r.method){r["method"]=e}r=n(r);if(r["rewrite"]===true){if(l.isSurge){r.headers["X-Surge-Skip-Scripting"]=false;delete r["rewrite"]}else if(l.isQuanX){r["hints"]=false;delete r["rewrite"]}}if(l.isSurge){if(r["method"]!=="GET"&&typeof r.headers["Content-Type"]==="string"&&r.headers["Content-Type"].indexOf("application/json")>=0&&r.body instanceof Array){r.body=JSON.stringify(r.body);u.debug(`Convert Array object to String: ${r.body}`)}}else if(l.isQuanX){if(r.hasOwnProperty("body")&&typeof r["body"]!=="string")r["body"]=JSON.stringify(r["body"]);r["method"]=e}else if(l.isNode){if(e==="POST"||e==="PUT"||e==="PATCH"||e==="DELETE"){r.data=r.data||r.body}else if(e==="GET"){r.params=r.params||r.body}delete r.body}return r};const h=(t,r=null)=>{if(t){let e={...t,config:t.config||r,status:t.statusCode||t.status,body:t.body||t.data||"",headers:t.headers||t.header};if(typeof e.body==="string"){try{e.body=JSON.parse(e.body)}catch{}}delete t.data;return e}else{let e={config:r,status:null,body:"",headers:{}};return e}};const o=n=>{if(!!n){delete n["Content-Length"];let e=new Set(["Accept","Accept-CH","Accept-Charset","Accept-Features","Accept-Encoding","Accept-Language","Accept-Ranges","Access-Control-Allow-Credentials","Access-Control-Allow-Origin","Access-Control-Allow-Methods","Access-Control-Allow-Headers","Access-Control-Max-Age","Access-Control-Expose-Headers","Access-Control-Request-Method","Access-Control-Request-Headers","Age","Allow","Alternates","Authorization","Cache-Control","Connection","Content-Encoding","Content-Language","ontent-Length","Content-Location","Content-Range","Content-Security-Policy","Content-Type","Cookie","DNT","Date","ETag","Expect","Expires","From","Host","If-Match","If-Modified-Since","If-None-Match","If-Range","If-Unmodified-Since","Last-Event-ID","Last-Modified","Link","Location","Max-Forwards","Negotiate","Origin","Pragma","Proxy-Authenticate","Proxy-Authorization","Range","Referer","Retry-After","Sec-Websocket-Extensions","Sec-Websocket-Key","Sec-Websocket-Origin","Sec-Websocket-Protocol","Sec-Websocket-Version","Server","Set-Cookie","Set-Cookie2","Strict-Transport-Security","TCN","TE","Trailer","Transfer-Encoding","Upgrade","User-Agent","Variant-Vary","Vary","Via","Warning","WWW-Authenticate","X-Content-Duration","X-Content-Security-Policy","X-DNSPrefetch-Control","X-Frame-Options","X-Requested-With"]);for(let r of Object.keys(n)){if(!e.has(r)){for(let t of e){let e=r.replace(new RegExp(t,"ig"),t);if(r!==e){n[e]=n[r];delete n[r];break}}}}if(!n["User-Agent"]){if(l.isNode){n["User-Agent"]=r}else{n["User-Agent"]=t}}return n}return n};const p=(t,r=null)=>{if(!!t&&t.status>=400){u.debug(`Raise exception when status code is ${t.status}`);let e={name:"RequestException",message:`Request failed with status code ${t.status}`,config:r||t.config,response:t};return e}};const s={request:new e,response:new e(false)};let y=[];let g=[];let m=true;function A(e){if(typeof e==="object"&&e["modify"]!==false){e["headers"]=o(e["headers"])}e=n(e);return e}function C(e){try{e=!!e?h(e):e;u.sniffer(`HTTP ${e.config["method"].toUpperCase()}:\n${JSON.stringify(e.config)}\nSTATUS CODE:\n${e.status}\nRESPONSE:\n${typeof e.body==="object"?JSON.stringify(e.body):e.body}`);const t=p(e);if(!!t){return Promise.reject(t)}return e}catch(t){u.error(t);return e}}const b=t=>{try{y=[];g=[];s.request.forEach(e=>{if(typeof e.runWhen==="function"&&e.runWhen(t)===false){return}m=m&&e.synchronous;y.unshift(e.fulfilled,e.rejected)});s.response.forEach(e=>{g.push(e.fulfilled,e.rejected)})}catch(e){u.error(`failed to register interceptors: ${e}`)}};const i=(e,n)=>{let o;const t=e.toUpperCase();n=d(t,n);if(l.isNode){o=f}else{if(l.isSurgeLike){o=s=>{return new Promise((n,o)=>{$httpClient[e.toLowerCase()](s,(t,r,e)=>{if(t){let e={name:t.name||t,message:t.message||t,stack:t.stack||t,config:s,response:h(r)};o(e)}else{r.config=s;r.body=e;n(r)}})})}}else{o=o=>{return new Promise((r,n)=>{$task.fetch(o).then(e=>{e=h(e,o);const t=p(e,o);if(t){return Promise.reject(t)}r(e)}).catch(e=>{let t={name:e.message||e.error,message:e.message||e.error,stack:e.error,config:o,response:!!e.response?h(e.response):null};n(t)})})}}}let s;b(n);const i=[A,undefined];const a=[C,undefined];if(!m){u.debug("Interceptors are executed in asynchronous mode");let r=[o,undefined];Array.prototype.unshift.apply(r,i);Array.prototype.unshift.apply(r,y);Array.prototype.unshift.apply(r,i);r=r.concat(a);r=r.concat(g);s=Promise.resolve(n);while(r.length){try{let e=r.shift();let t=r.shift();if(!l.isNode&&n["timeout"]&&e===o){s=c(n)}else{s=s.then(e,t)}}catch(e){u.error(`request exception: ${e}`)}}return s}else{u.debug("Interceptors are executed in synchronous mode");Array.prototype.unshift.apply(y,i);y=y.concat([A,undefined]);while(y.length){let e=y.shift();let t=y.shift();try{n=e(n)}catch(e){t(e);break}}try{if(!l.isNode&&n["timeout"]){s=c(n)}else{s=o(n)}}catch(e){return Promise.reject(e)}Array.prototype.unshift.apply(g,a);while(g.length){s=s.then(g.shift(),g.shift())}return s}function c(r){try{const e=new Promise((e,t)=>{setTimeout(()=>{let e={message:`timeout of ${r["timeout"]}ms exceeded`,config:r};t(e)},r["timeout"])});return Promise.race([o(r),e])}catch(e){u.error(`Request Timeout exception: ${e}`)}}};return{request:i,interceptors:s,modifyHeaders:o,modifyResponse:h,get:e=>{return i("GET",e)},post:e=>{return i("POST",e)},put:e=>{return i("PUT",e)},patch:e=>{return i("PATCH",e)},delete:e=>{return i("DELETE",e)},head:e=>{return i("HEAD",e)},options:e=>{return i("OPTIONS",e)}}}
// prettier-ignore
function MagicNotification(r,f,l){let s=null;let u=null;const c=typeof MagicHttp==="function"?MagicHttp(f,l):undefined;const e=t=>{try{let e=t.replace(/\/+$/g,"");s=`${/^https?:\/\/([^/]*)/.exec(e)[0]}/push`;u=/\/([^\/]+)\/?$/.exec(e)[1]}catch(e){l.error(`Bark url error: ${e}.`)}};function t(e=r,t="",i="",o=""){const n=i=>{try{let t={};if(typeof i==="string"){if(f.isLoon)t={openUrl:i};else if(f.isQuanX)t={"open-url":i};else if(f.isSurge)t={url:i}}else if(typeof i==="object"){if(f.isLoon){t["openUrl"]=!!i["open-url"]?i["open-url"]:"";t["mediaUrl"]=!!i["media-url"]?i["media-url"]:""}else if(f.isQuanX){t=!!i["open-url"]||!!i["media-url"]?i:{}}else if(f.isSurge){let e=i["open-url"]||i["openUrl"];t=e?{url:e}:{}}}return t}catch(e){l.error(`Failed to convert notification option, ${e}`)}return i};o=n(o);if(arguments.length==1){e=r;t="",i=arguments[0]}l.notify(`title:${e}\nsubTitle:${t}\nbody:${i}\noptions:${typeof o==="object"?JSON.stringify(o):o}`);if(f.isSurge){$notification.post(e,t,i,o)}else if(f.isLoon){if(!!o)$notification.post(e,t,i,o);else $notification.post(e,t,i)}else if(f.isQuanX){$notify(e,t,i,o)}if(s&&u&&typeof c!=="undefined"){p(e,t,i)}}function i(e=r,t="",i="",o=""){if(l.level==="DEBUG"){if(arguments.length==1){e=r;t="",i=arguments[0]}this.notify(e,t,i,o)}}function p(e=r,t="",i="",o=""){if(typeof c==="undefined"||typeof c.post==="undefined"){throw"Bark notification needs to import MagicHttp module."}let n={url:s,headers:{"Content-Type":"application/json; charset=utf-8"},body:{title:e,body:t?`${t}\n${i}`:i,device_key:u}};c.post(n).catch(e=>{l.error(`Bark notify error: ${e}`)})}return{post:t,debug:i,bark:p,setBark:e}}
// prettier-ignore
function MagicUtils(r,h){const e=(o,i=5,l=0,a=null)=>{return(...e)=>{return new Promise((s,r)=>{function n(...t){Promise.resolve().then(()=>o.apply(this,t)).then(e=>{if(typeof a==="function"){Promise.resolve().then(()=>a(e)).then(()=>{s(e)}).catch(e=>{if(i>=1){if(l>0)setTimeout(()=>n.apply(this,t),l);else n.apply(this,t)}else{r(e)}i--})}else{s(e)}}).catch(e=>{h.error(e);if(i>=1&&l>0){setTimeout(()=>n.apply(this,t),l)}else if(i>=1){n.apply(this,t)}else{r(e)}i--})}n.apply(this,e)})}};const t=(e,t="yyyy-MM-dd hh:mm:ss")=>{let s={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in s)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?s[e]:("00"+s[e]).substr((""+s[e]).length));return t};const s=()=>{return t(new Date,"yyyy-MM-dd hh:mm:ss")};const n=()=>{return t(new Date,"yyyy-MM-dd")};const o=t=>{return new Promise(e=>setTimeout(e,t))};const i=(e,t=null)=>{if(r.isNode){const s=require("assert");if(t)s(e,t);else s(e)}else{if(e!==true){let e=`AssertionError: ${t||"The expression evaluated to a falsy value"}`;h.error(e)}}};return{retry:e,formatTime:t,now:s,today:n,sleep:o,assert:i}}
// prettier-ignore
function MagicQingLong(e,s,r){let i="";let o="";let l="";let c="";let d="";let n="";const u="magic.json";const t=3e3;const p=MagicHttp(e,r);const a=(e,n,t,a,r)=>{i=e;l=n;c=t;o=a;d=r};function g(e){i=i||s.read("magic_qlurl");n=n||s.read("magic_qltoken");return e}function f(e){if(!i){i=s.read("magic_qlurl")}if(e.url.indexOf(i)<0){e.url=`${i}${e.url}`}return{...e,timeout:t}}function y(e){e.params={...e.params,t:Date.now()};return e}function h(e){n=n||s.read("magic_qltoken");if(n){e.headers["Authorization"]=`Bearer ${n}`}return e}function m(e){l=l||s.read("magic_qlclient");if(!!l){e.url=e.url.replace("/api/","/open/")}return e}async function b(e){try{const n=e.message||e.error||JSON.stringify(e);if((n.indexOf("NSURLErrorDomain")>=0&&n.indexOf("-1012")>=0||!!e.response&&e.response.status===401)&&!!e.config&&e.config.refreshToken!==true){r.warning(`Qinglong panel token has expired`);await v();e.config["refreshToken"]=true;return await p.request(e.config.method,e.config)}else{return Promise.reject(e)}}catch(e){return Promise.reject(e)}}p.interceptors.request.use(g,undefined);p.interceptors.request.use(f,undefined);p.interceptors.request.use(m,undefined,{runWhen:e=>{return e.url.indexOf("api/user/login")<0&&e.url.indexOf("open/auth/token")<0}});p.interceptors.request.use(h,undefined,{runWhen:e=>{return e.url.indexOf("api/user/login")<0&&e.url.indexOf("open/auth/token")<0}});p.interceptors.request.use(y,undefined,{runWhen:e=>{return e.url.indexOf("open/auth/token")<0&&e.url.indexOf("t=")<0}});p.interceptors.response.use(undefined,b);async function v(){l=l||s.read("magic_qlclient");c=c||s.read("magic_qlsecrt");o=o||s.read("magic_qlname");d=d||s.read("magic_qlpwd");if(i&&l&&c){await p.get({url:`/open/auth/token`,headers:{"Content-Type":"application/json"},params:{client_id:l,client_secret:c}}).then(e=>{r.info("Log in to Qinglong panel successfully");n=e.body.data.token;s.update("magic_qltoken",n);return n}).catch(e=>{r.error(`Failed to log in to Qinglong panel.\n${e.message}`)})}else if(i&&o&&d){await p.post({url:`/api/user/login`,headers:{"Content-Type":"application/json"},body:{username:o,password:d}}).then(e=>{r.info("Log in to Qinglong panel successfully");n=e.body.data.token;s.update("magic_qltoken",n);return n}).catch(e=>{r.error(`Failed to log in to Qinglong panel.\n${e.message}`)})}}async function N(n,t,a=null){i=i||s.read("magic_qlurl");if(a===null){let e=await $([{name:n,value:t}]);if(!!e&&e.length===1){return e[0]}}else{p.put({url:`/api/envs`,headers:{"Content-Type":"application/json"},body:{name:n,value:t,id:a}}).then(e=>{if(e.body.code===200){r.debug(`QINGLONG UPDATE ENV ${n} <${typeof t}> (${a})\n${JSON.stringify(t)}`);return true}else{r.error(`Failed to update Qinglong panel environment variable.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to update Qinglong panel environment variable.\n${e.message}`);return false})}}async function $(e){let n=[];await p.post({url:`/api/envs`,headers:{"Content-Type":"application/json"},body:e}).then(e=>{if(e.body.code===200){e.body.data.forEach(e=>{r.debug(`QINGLONG ADD ENV ${e.name} <${typeof e.value}> (${e.id})\n${JSON.stringify(e)}`);n.push(e.id)})}else{r.error(`Failed to add Qinglong panel environment variable.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to add Qinglong panel environment variable.\n${e.message}`)});return n}async function O(n){return await p.delete({url:`/api/envs`,headers:{Accept:"application/json","Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",Connection:"keep-alive","Content-Type":"application/json;charset=UTF-8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){r.debug(`QINGLONG DELETE ENV IDS: ${n}`);return true}else{r.error(`Failed to delete QingLong envs.\n${JSON.stringify(e)}`);return false}}).catch(e=>{r.error(`Failed to delete QingLong envs.\n${e.message}`)})}async function S(t=null,e=""){let a=[];await p.get({url:`/api/envs`,headers:{"Content-Type":"application/json"},params:{searchValue:e}}).then(e=>{if(e.body.code===200){const n=e.body.data;if(!!t){let e=[];for(const e of n){if(e.name===t){a.push(e)}}a=e}a=n}else{r.error(`Failed to get environment variables from Qinglong panel.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to get environment variables from Qinglong panel.\n${JSON.stringify(e)}`)});return a}async function q(e){let n=null;const t=await S();for(const a of t){if(a.id===e){n=a;break}}return n}async function w(n){let t=false;await p.put({url:`/api/envs/disable`,headers:{Accept:"application/json","Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",Connection:"keep-alive","Content-Type":"application/json;charset=UTF-8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){r.debug(`QINGLONG DISABLED ENV IDS: ${n}`);t=true}else{r.error(`Failed to disable QingLong envs.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to disable QingLong envs.\n${e.message}`)});return t}async function Q(n){let t=false;await p.put({url:`/api/envs/enable`,headers:{Accept:"application/json","Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",Connection:"keep-alive","Content-Type":"application/json;charset=UTF-8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){r.debug(`QINGLONG ENABLED ENV IDS: ${n}`);t=true}else{r.error(`Failed to enable QingLong envs.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to enable QingLong envs.\n${e.message}`)});return t}async function T(e,n="",t=""){let a=false;await p.post({url:`/api/scripts`,headers:{"Content-Type":"application/json"},body:{filename:e,path:n,content:t}}).then(e=>{if(e.body.code===200){a=true}else{r.error(`Failed to add script content from Qinglong panel.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to add script content from Qinglong panel.\n${e.message}`)});return a}async function F(e,n=""){let t="";await p.get({url:`/api/scripts/${e}`,params:{path:n}}).then(e=>{if(e.body.code===200){t=e.body.data}else{r.error(`Failed to read script content from Qinglong panel.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to read script content from Qinglong panel.\n${e.message}`)});return t}async function k(e,n="",t=""){let a=false;await p.put({url:`/api/scripts`,headers:{"Content-Type":"application/json"},body:{filename:e,path:n,content:t}}).then(e=>{if(e.body.code===200){a=true}else{r.error(`Failed to read script content from Qinglong panel.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to read script content from Qinglong panel.\n${e.message}`)});return a}async function E(e,n=""){let t=false;await p.delete({url:`/api/scripts`,headers:{"Content-Type":"application/json"},body:{filename:e,path:n}}).then(e=>{if(e.body.code===200){t=true}else{r.error(`Failed to read script content from Qinglong panel.\n${JSON.stringify(e)}`)}}).catch(e=>{r.error(`Failed to read script content from Qinglong panel.\n${e.message}`)});return t}async function L(e,n,t=""){let a=await F(u,"");let r=s.convertToObject(a);let i=s.write(e,n,t,r);a=JSON.stringify(r,"","\t");let o=await k(u,"",a);return o&&i}async function j(e,n,t,a=s.defaultValueComparator){let r=await F(u,"");let i=s.convertToObject(r);const o=s.update(e,n,t,a,i);let l=false;if(o===true){r=JSON.stringify(i,"","\t");l=await k(u,"",r)}return o&&l}async function C(e,n,t=""){let a=await F(u,"");let r=s.convertToObject(a);const i=s.read(e,n,t,false,r);return i}async function _(e,n=""){let t=await F(u,"");let a=s.convertToObject(t);const r=s.del(e,n,a);t=JSON.stringify(a,"","\t");const i=await k(u,"",t);return r&&i}async function A(e){let n=await F(u,"");let t=s.convertToObject(n);const a=s.allSessions(e,t);return a}return{init:a,getToken:v,setEnv:N,setEnvs:$,getEnv:q,getEnvs:S,delEnvs:O,disableEnvs:w,enbleEnvs:Q,addScript:T,getScript:F,editScript:k,delScript:E,write:L,read:C,del:_,update:j,allSessions:A,url:i||s.read("magic_qlurl"),clientId:l||s.read("magic_qlclient"),userName:o||s.read("magic_magic_qlname")}}

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
            `获取贴吧列表成功，共关注${obj.data["like_forum"].length}个贴吧`
          );
          resolve([obj.data["tbs"], obj.data["like_forum"]]);
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
            obj.data["errmsg"] === "success" &&
            obj.data.errno === 0 &&
            obj.data["uinfo"]["is_sign_in"] === 1
          ) {
            msg = `[${kw}] 签到成功 排名 ${obj.data["uinfo"]["user_sign_rank"]} 积分 ${obj.data["uinfo"]["cont_sign_num"]}`;
            $.logger.info(msg);
            resolve(msg);
          } else {
            if (obj["no"] === 2150040) {
              msg = `[${kw}] 签到失败，need vcode`;
            } else if (obj["no"] === 1011) {
              msg = `[${kw}] 未加入此吧或等级不够`;
            } else if (obj["no"] === 1102) {
              msg = `[${kw}] 签到过快`;
            } else if (obj["no"] === 1101) {
              msg = `[${kw}] 重复签到`;
            } else if (obj["no"] === 1010) {
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
        if (resp.body["no"] === 0 && resp.body.error === "success") {
          resolve(resp.body.data["user_id"]);
        }
      })
      .catch((err) => {
        $.logger.error(`获取用户信息出现出现异常，${err}`);
        reject(err);
      });
  });
}

async function multiUsersSignIn() {
  const allSessionNames = $.data.allSessionNames(tiebaCookieKey);
  if (allSessionNames.length === 0) {
    $.logger.error(`没有需要签到的Cookie，请先登录百度贴吧`);
    $.notification.post(`没有需要签到的Cookie，请先登录百度贴吧`);
    $.done();
  }
  $.logger.info(`本次一共需要签到 ${allSessionNames.length} 个Cookies`);
  for (let [index, sessionKey] of allSessionNames.entries()) {
    currentCookie = $.data.read(tiebaCookieKey, null, sessionKey);
    if (!currentCookie) {
      $.logger.error(`Cookie ${sessionKey} 不存在`);
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
      const cookie = $.request.headers.Cookie || $.request.headers.cookie;
      currentCookie = cookie;
      $.logger.info(`获取百度贴吧Cookies(请勿泄露):\n${cookie}`);
      if (!!cookie) {
        let userId = await getUserInfo();
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
// @formatter:off
function MagicJS(e="MagicJS",t="INFO"){const i=()=>{const e=typeof $loon!=="undefined";const t=typeof $task!=="undefined";const n=typeof module!=="undefined";const i=typeof $httpClient!=="undefined"&&!e;const s=typeof $storm!=="undefined";const r=typeof $environment!=="undefined"&&typeof $environment["stash-build"]!=="undefined";const o=i||e||s||r;const u=typeof importModule!=="undefined";return{isLoon:e,isQuanX:t,isNode:n,isSurge:i,isStorm:s,isStash:r,isSurgeLike:o,isScriptable:u,get name(){if(e){return"Loon"}else if(t){return"QuantumultX"}else if(n){return"NodeJS"}else if(i){return"Surge"}else if(u){return"Scriptable"}else{return"unknown"}},get build(){if(i){return $environment["surge-build"]}else if(r){return $environment["stash-build"]}else if(s){return $storm.buildVersion}},get language(){if(i||r){return $environment["language"]}},get version(){if(i){return $environment["surge-version"]}else if(r){return $environment["stash-version"]}else if(s){return $storm.appVersion}else if(n){return process.version}},get system(){if(i){return $environment["system"]}else if(n){return process.platform}},get systemVersion(){if(s){return $storm.systemVersion}},get deviceName(){if(s){return $storm.deviceName}}}};const s=(n,e="INFO")=>{let i=e;const s={SNIFFER:6,DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};const r={SNIFFER:"",DEBUG:"",INFO:"",NOTIFY:"",WARNING:"❗ ",ERROR:"❌ ",CRITICAL:"❌ ",NONE:""};const t=(e,t="INFO")=>{if(!(s[i]<s[t.toUpperCase()]))console.log(`[${t}] [${n}]\n${r[t.toUpperCase()]}${e}\n`)};const o=e=>{i=e};return{setLevel:o,sniffer:e=>{t(e,"SNIFFER")},debug:e=>{t(e,"DEBUG")},info:e=>{t(e,"INFO")},notify:e=>{t(e,"NOTIFY")},warning:e=>{t(e,"WARNING")},error:e=>{t(e,"ERROR")},retry:e=>{t(e,"RETRY")}}};return new class{constructor(e,t){this._startTime=Date.now();this.version="3.0.0";this.scriptName=e;this.env=i();this.logger=s(e,t);this.http=typeof MagicHttp==="function"?MagicHttp(this.env,this.logger):undefined;this.data=typeof MagicData==="function"?MagicData(this.env,this.logger):undefined;this.notification=typeof MagicNotification==="function"?MagicNotification(this.scriptName,this.env,this.logger):undefined;this.utils=typeof MagicUtils==="function"?MagicUtils(this.env,this.logger):undefined;this.qinglong=typeof MagicQingLong==="function"?MagicQingLong(this.env,this.data,this.logger):undefined;if(typeof this.data!=="undefined"){let e=this.data.read("magic_loglevel");const n=this.data.read("magic_bark_url");if(e){this.logger.setLevel(e.toUpperCase())}if(n){this.notification.setBark(n)}}}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get isDebug(){return this.logger.level==="DEBUG"}get request(){if(typeof $request!=="undefined"){this.logger.sniffer(`RESPONSE:\n${JSON.stringify($request)}`);return $request}}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];this.logger.sniffer(`RESPONSE:\n${JSON.stringify($response)}`);return $response}else{return undefined}}done=(e={})=>{this._endTime=Date.now();let t=(this._endTime-this._startTime)/1e3;this.logger.info(`SCRIPT COMPLETED: ${t} S.`);if(typeof $done!=="undefined"){$done(e)}}}(e,t)}
function MagicHttp(c,l){const e="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";const t="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";let r;if(c.isNode){const S=require("axios");r=S.create()}class s{constructor(e=true){this.handlers=[];this.isRequest=e}use(e,t,r){this.handlers.push({fulfilled:e,rejected:t,synchronous:r?r.synchronous:false,runWhen:r?r.runWhen:null});return this.handlers.length-1}eject(e){if(this.handlers[e]){this.handlers[e]=null}}forEach(t){this.handlers.forEach(e=>{if(e!==null){t(e)}})}}function n(e){let r={...e};if(!!r.params){if(!c.isNode){let e=Object.keys(r.params).map(e=>{const t=encodeURIComponent(e);r.url=r.url.replace(new RegExp(`${e}=[^&]*`,"ig"),"");r.url=r.url.replace(new RegExp(`${t}=[^&]*`,"ig"),"");return`${t}=${encodeURIComponent(r.params[e])}`}).join("&");if(r.url.indexOf("?")<0)r.url+="?";if(!/(&|\?)$/g.test(r.url)){r.url+="&"}r.url+=e;delete r.params;l.debug(`Params to QueryString: ${r.url}`)}}return r}const d=(e,t)=>{let r=typeof t==="object"?{headers:{},...t}:{url:t,headers:{}};if(!r.method){r["method"]=e}r=n(r);if(r["rewrite"]===true){if(c.isSurge){r.headers["X-Surge-Skip-Scripting"]=false;delete r["rewrite"]}else if(c.isQuanX){r["hints"]=false;delete r["rewrite"]}}if(c.isSurge){if(r["method"]!=="GET"&&r.headers["Content-Type"].indexOf("application/json")>=0&&r.body instanceof Array){r.body=JSON.stringify(r.body);l.debug(`Convert Array object to String: ${r.body}`)}}else if(c.isQuanX){if(r.hasOwnProperty("body")&&typeof r["body"]!=="string")r["body"]=JSON.stringify(r["body"]);r["method"]=e}else if(c.isNode){if(e==="POST"||e==="PUT"||e==="PATCH"||e==="DELETE"){r.data=r.data||r.body}else if(e==="GET"){r.params=r.params||r.body}delete r.body}return r};const f=(t,r=null)=>{if(t){let e={...t,config:t.config||r,status:t.statusCode||t.status,body:t.body||t.data,headers:t.headers||t.header};if(typeof e.body==="string"){try{e.body=JSON.parse(e.body)}catch{}}delete t.data;return e}else{return t}};const o=r=>{return Object.keys(r).reduce((e,t)=>{e[t.toLowerCase()]=r[t];return e},{})};const i=s=>{return Object.keys(s).reduce((e,t)=>{const r=t.split("-").map(e=>e[0].toUpperCase()+e.slice(1)).join("-");e[r]=s[t];return e},{})};const h=(t,r=null)=>{if(!!t&&t.status>=400){l.debug(`Raise exception when status code is ${t.status}`);let e={name:"RequestException",message:`Request failed with status code ${t.status}`,config:r||t.config,response:t};return e}};const a={request:new s,response:new s(false)};let p=[];let y=[];let g=true;function m(e){e=n(e);l.debug(`HTTP ${e["method"].toUpperCase()}:\n${JSON.stringify(e)}`);return e}function b(e){try{e=!!e?f(e):e;l.sniffer(`HTTP ${e.config["method"].toUpperCase()}:\n${JSON.stringify(e.config)}\nSTATUS CODE:\n${e.status}\nRESPONSE:\n${typeof e.body==="object"?JSON.stringify(e.body):e.body}`);const t=h(e);if(!!t){return Promise.reject(t)}return e}catch(t){l.error(t);return e}}const T=t=>{try{p=[];y=[];a.request.forEach(e=>{if(typeof e.runWhen==="function"&&e.runWhen(t)===false){return}g=g&&e.synchronous;p.unshift(e.fulfilled,e.rejected)});a.response.forEach(e=>{y.push(e.fulfilled,e.rejected)})}catch(e){l.error(`Failed to register interceptors: ${e}.`)}};const u=(e,s)=>{let n;const t=e.toUpperCase();s=d(t,s);if(c.isNode){n=r}else{if(c.isSurgeLike){n=o=>{return new Promise((s,n)=>{$httpClient[e.toLowerCase()](o,(t,r,e)=>{if(t){let e={name:t.name||t,message:t.message||t,stack:t.stack||t,config:o,response:f(r)};n(e)}else{r.config=o;r.body=e;s(r)}})})}}else{n=n=>{return new Promise((r,s)=>{$task.fetch(n).then(e=>{e=f(e,n);const t=h(e,n);if(t){return Promise.reject(t)}r(e)}).catch(e=>{let t={name:e.message||e.error,message:e.message||e.error,stack:e.error,config:n,response:!!e.response?f(e.response):null};s(t)})})}}}let o;T(s);const i=[m,undefined];const a=[b,undefined];if(!g){l.debug("Interceptors are executed in asynchronous mode.");let r=[n,undefined];Array.prototype.unshift.apply(r,i);Array.prototype.unshift.apply(r,p);r=r.concat(a);r=r.concat(y);o=Promise.resolve(s);while(r.length){try{let e=r.shift();let t=r.shift();if(!c.isNode&&s["timeout"]&&e===n){o=u(s)}else{o=o.then(e,t)}}catch(e){l.error(`request exception: ${e}`)}}return o}else{l.debug("Interceptors are executed in synchronous mode.");Array.prototype.unshift.apply(p,i);p=p.concat([m,undefined]);while(p.length){let e=p.shift();let t=p.shift();try{s=e(s)}catch(e){t(e);break}}try{if(!c.isNode&&s["timeout"]){o=u(s)}else{o=n(s)}}catch(e){return Promise.reject(e)}Array.prototype.unshift.apply(y,a);while(y.length){o=o.then(y.shift(),y.shift())}return o}function u(r){try{const e=new Promise((e,t)=>{setTimeout(()=>{let e={message:`timeout of ${r["timeout"]}ms exceeded.`,config:r};t(e)},r["timeout"])});return Promise.race([n(r),e])}catch(e){l.error(`Request Timeout exception: ${e}.`)}}};return{request:u,interceptors:a,convertHeadersToLowerCase:o,convertHeadersToCamelCase:i,modifyResponse:f,get:e=>{return u("GET",e)},post:e=>{return u("POST",e)},put:e=>{return u("PUT",e)},patch:e=>{return u("PATCH",e)},delete:e=>{return u("DELETE",e)},head:e=>{return u("HEAD",e)},options:e=>{return u("OPTIONS",e)}}}
function MagicData(i,u){let f={fs:undefined,data:{}};if(i.isNode){f.fs=require("fs");try{f.fs.accessSync("./magic.json",f.fs.constants.R_OK|f.fs.constants.W_OK)}catch(e){f.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}f.data=require("./magic.json")}const o=(e,t)=>{if(typeof t==="object"){return false}else{return e===t}};const a=e=>{if(e==="true"){return true}else if(e==="false"){return false}else if(typeof e==="undefined"){return null}else{return e}};const c=(e,t,s,n)=>{if(s){try{if(typeof e==="string")e=JSON.parse(e);if(e["magic_session"]===true){e=e[s]}else{e=null}}catch{e=null}}if(typeof e==="string"&&e!=="null"){try{e=JSON.parse(e)}catch{}}if(n===false&&!!e&&e["magic_session"]===true){e=null}if((e===null||typeof e==="undefined")&&t!==null&&typeof t!=="undefined"){e=t}e=a(e);return e};const l=t=>{if(typeof t==="string"){let e={};try{e=JSON.parse(t);const s=typeof e;if(s!=="object"||e instanceof Array||s==="bool"||e===null){e={}}}catch{}return e}else if(t instanceof Array||t===null||typeof t==="undefined"||t!==t||typeof t==="boolean"){return{}}else{return t}};const y=(e,t=null,s="",n=false,r=null)=>{let l=r||f.data;if(!!l&&typeof l[e]!=="undefined"&&l[e]!==null){val=l[e]}else{val=!!s?{}:null}val=c(val,t,s,n);return val};const d=(e,t=null,s="",n=false,r=null)=>{let l="";if(r||i.isNode){l=y(e,t,s,n,r)}else{if(i.isSurgeLike){l=$persistentStore.read(e)}else if(i.isQuanX){l=$prefs.valueForKey(e)}l=c(l,t,s,n)}u.debug(`READ DATA [${e}]${!!s?`[${s}]`:""} <${typeof l}>\n${JSON.stringify(l)}`);return l};const p=(t,s,n="",e=null)=>{let r=e||f.data;r=l(r);if(!!n){let e=l(r[t]);e["magic_session"]=true;e[n]=s;r[t]=e}else{r[t]=s}if(e!==null){e=r}return r};const S=(e,t,s="",n=null)=>{if(typeof t==="undefined"||t!==t){return false}if(!i.isNode&&(typeof t==="boolean"||typeof t==="number")){t=String(t)}let r="";if(n||i.isNode){r=p(e,t,s,n)}else{if(!s){r=t}else{if(i.isSurgeLike){r=!!$persistentStore.read(e)?$persistentStore.read(e):r}else if(i.isQuanX){r=!!$prefs.valueForKey(e)?$prefs.valueForKey(e):r}r=l(r);r["magic_session"]=true;r[s]=t}}if(!!r&&typeof r==="object"){r=JSON.stringify(r,null,4)}u.debug(`WRITE DATA [${e}]${s?`[${s}]`:""} <${typeof t}>\n${JSON.stringify(t)}`);if(!n){if(i.isSurgeLike){return $persistentStore.write(r,e)}else if(i.isQuanX){return $prefs.setValueForKey(r,e)}else if(i.isNode){try{f.fs.writeFileSync("./magic.json",r);return true}catch(e){u.error(e);return false}}}return true};const e=(t,s,n,r=o,l=null)=>{s=a(s);const e=d(t,null,n,false,l);if(r(e,s)===true){return false}else{const i=S(t,s,n,l);let e=d(t,null,n,false,l);if(r===o&&typeof e==="object"){return i}return r(s,e)}};const g=(e,t,s)=>{let n=s||f.data;n=l(n);if(!!t){obj=l(n[e]);delete obj[t];n[e]=obj}else{delete n[e]}if(!!s){s=n}return n};const t=(e,t="",s=null)=>{let n={};if(s||i.isNode){n=g(e,t,s);if(!s){f.fs.writeFileSync("./magic.json",JSON.stringify(n,null,4))}else{s=n}}else{if(!t){if(i.isStorm){return $persistentStore.remove(e)}else if(i.isSurgeLike){return $persistentStore.write(null,e)}else if(i.isQuanX){return $prefs.removeValueForKey(e)}}else{if(i.isSurgeLike){n=$persistentStore.read(e)}else if(i.isQuanX){n=$prefs.valueForKey(e)}n=l(n);delete n[t];const r=JSON.stringify(n,null,4);S(e,r)}}u.debug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`)};const s=(e,t=null)=>{let s=[];let n=d(e,null,null,true,t);n=l(n);if(n["magic_session"]!==true){s=[]}else{s=Object.keys(n).filter(e=>e!=="magic_session")}u.debug(`READ ALL SESSIONS [${e}] <${typeof s}>\n${JSON.stringify(s,null,4)}`);return s};const n=(e,t=null)=>{let s={};let n=d(e,null,null,true,t);n=l(n);if(n["magic_session"]===true){s={...n};delete s["magic_session"]}u.debug(`READ ALL SESSIONS [${e}] <${typeof s}>\n${JSON.stringify(s,null,4)}`);return s};return{read:d,write:S,del:t,update:e,allSessions:n,allSessionNames:s,defaultValueComparator:o,convertToObject:l}}
function MagicNotification(r,f,l){let s=null;let u=null;const c=typeof MagicHttp==="function"?MagicHttp(f,l):undefined;const e=t=>{try{let e=t.replace(/\/+$/g,"");s=`${/^https?:\/\/([^/]*)/.exec(e)[0]}/push`;u=/\/([^\/]+)\/?$/.exec(e)[1]}catch(e){l.error(`Bark url error: ${e}.`)}};function t(e=r,t="",i="",o=""){const n=i=>{try{let t={};if(typeof i==="string"){if(f.isLoon)t={openUrl:i};else if(f.isQuanX)t={"open-url":i};else if(f.isSurge)t={url:i}}else if(typeof i==="object"){if(f.isLoon){t["openUrl"]=!!i["open-url"]?i["open-url"]:"";t["mediaUrl"]=!!i["media-url"]?i["media-url"]:""}else if(f.isQuanX){t=!!i["open-url"]||!!i["media-url"]?i:{}}else if(f.isSurge){let e=i["open-url"]||i["openUrl"];t=e?{url:e}:{}}}return t}catch(e){l.error(`Failed to convert notification option, ${e}`)}return i};o=n(o);if(arguments.length==1){e=r;t="",i=arguments[0]}l.notify(`title:${e}\nsubTitle:${t}\nbody:${i}\noptions:${typeof o==="object"?JSON.stringify(o):o}`);if(f.isSurge){$notification.post(e,t,i,o)}else if(f.isLoon){if(!!o)$notification.post(e,t,i,o);else $notification.post(e,t,i)}else if(f.isQuanX){$notify(e,t,i,o)}if(s&&u&&typeof c!=="undefined"){p(e,t,i)}}function i(e=r,t="",i="",o=""){if(l.level==="DEBUG"){if(arguments.length==1){e=r;t="",i=arguments[0]}this.notify(e,t,i,o)}}function p(e=r,t="",i="",o=""){if(typeof c==="undefined"||typeof c.post==="undefined"){throw"Bark notification needs to import MagicHttp module."}let n={url:s,headers:{"Content-Type":"application/json; charset=utf-8"},body:{title:e,body:t?`${t}\n${i}`:i,device_key:u}};c.post(n).catch(e=>{l.error(`Bark notify error: ${e}`)})}return{post:t,debug:i,bark:p,setBark:e}}
function MagicUtils(r,h){const e=(o,i=5,l=0,a=null)=>{return(...e)=>{return new Promise((s,r)=>{function n(...t){Promise.resolve().then(()=>o.apply(this,t)).then(e=>{if(typeof a==="function"){Promise.resolve().then(()=>a(e)).then(()=>{s(e)}).catch(e=>{if(i>=1){if(l>0)setTimeout(()=>n.apply(this,t),l);else n.apply(this,t)}else{r(e)}i--})}else{s(e)}}).catch(e=>{h.error(e);if(i>=1&&l>0){setTimeout(()=>n.apply(this,t),l)}else if(i>=1){n.apply(this,t)}else{r(e)}i--})}n.apply(this,e)})}};const t=(e,t="yyyy-MM-dd hh:mm:ss")=>{let s={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in s)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?s[e]:("00"+s[e]).substr((""+s[e]).length));return t};const s=()=>{return t(new Date,"yyyy-MM-dd hh:mm:ss")};const n=()=>{return t(new Date,"yyyy-MM-dd")};const o=t=>{return new Promise(e=>setTimeout(e,t))};const i=(e,t=null)=>{if(r.isNode){const s=require("assert");if(t)s(e,t);else s(e)}else{if(e!==true){let e=`AssertionError: ${t||"The expression evaluated to a falsy value"}`;h.error(e)}}};return{retry:e,formatTime:t,now:s,today:n,sleep:o,assert:i}}
function MagicQingLong(e,s,o){let i="";let l="";let c="";let u="";let d="";let n="";const g="magic.json";const r=3e3;const f=MagicHttp(e,o);const t=(e,n,r,t,a)=>{i=e;c=n;u=r;l=t;d=a};function a(e){i=i||s.read("magic_qlurl");n=n||s.read("magic_qltoken");return e}function p(e){if(!i){i=s.read("magic_qlurl")}if(e.url.indexOf(i)<0){e.url=`${i}${e.url}`}return{...e,timeout:r}}function y(e){e.params={...e.params,t:Date.now()};return e}function m(e){n=n||s.read("magic_qltoken");if(n){e.headers["authorization"]=`Bearer ${n}`}return e}function h(e){c=c||s.read("magic_qlclient");if(!!c){e.url=e.url.replace("/api/","/open/")}return e}async function b(e){try{const n=e.message||e.error||JSON.stringify(e);if((n.indexOf("NSURLErrorDomain")>=0&&n.indexOf("-1012")>=0||!!e.response&&e.response.status===401)&&!!e.config&&e.config.refreshToken!==true){o.warning(`Qinglong Panel token has expired.`);await v();e.config["refreshToken"]=true;return await f.request(e.config.method,e.config)}else{return Promise.reject(e)}}catch(e){return Promise.reject(e)}}f.interceptors.request.use(a,undefined);f.interceptors.request.use(p,undefined);f.interceptors.request.use(h,undefined,{runWhen:e=>{return e.url.indexOf("api/user/login")<0&&e.url.indexOf("open/auth/token")<0}});f.interceptors.request.use(m,undefined,{runWhen:e=>{return e.url.indexOf("api/user/login")<0&&e.url.indexOf("open/auth/token")<0}});f.interceptors.request.use(y,undefined,{runWhen:e=>{return e.url.indexOf("open/auth/token")<0&&e.url.indexOf("t=")<0}});f.interceptors.response.use(undefined,b);async function v(){c=c||s.read("magic_qlclient");u=u||s.read("magic_qlsecrt");l=l||s.read("magic_qlname");d=d||s.read("magic_qlpwd");if(i&&c&&u){await f.get({url:`/open/auth/token`,headers:{"content-type":"application/json"},params:{client_id:c,client_secret:u}}).then(e=>{if(Object.keys(e.body).length>0&&e.body.data&&e.body.data.token){o.info("Successfully logged in to Qinglong Panel");n=e.body.data.token;s.update("magic_qltoken",n);return n}else{throw new Error("Get Qinglong Panel token failed.")}}).catch(e=>{o.error(`Error logging in to Qinglong Panel.\n${e.message}`)})}else if(i&&l&&d){await f.post({url:`/api/user/login`,headers:{"content-type":"application/json"},body:{username:l,password:d}}).then(e=>{o.info("Successfully logged in to Qinglong Panel");n=e.body.data.token;s.update("magic_qltoken",n);return n}).catch(e=>{o.error(`Error logging in to Qinglong Panel.\n${e.message}`)})}}async function w(n,r,t=null){i=i||s.read("magic_qlurl");if(t===null){let e=await E([{name:n,value:r}]);if(!!e&&e.length===1){return e[0]}}else{f.put({url:`/api/envs`,headers:{"content-type":"application/json"},body:{name:n,value:r,id:t}}).then(e=>{if(e.body.code===200){o.debug(`QINGLONG UPDATE ENV ${n} <${typeof r}> (${t})\n${JSON.stringify(r)}`);return true}else{o.error(`Error updating environment variable from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error updating environment variable from Qinglong Panel.\n${e.message}`);return false})}}async function E(e){let n=[];await f.post({url:`/api/envs`,headers:{"content-type":"application/json"},body:e}).then(e=>{if(e.body.code===200){e.body.data.forEach(e=>{o.debug(`QINGLONG ADD ENV ${e.name} <${typeof e.value}> (${e.id})\n${JSON.stringify(e)}`);n.push(e.id)})}else{o.error(`Error adding environment variable from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error adding environment variable from Qinglong Panel.\n${e.message}`)});return n}async function N(n){return await f.delete({url:`/api/envs`,headers:{accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",connection:"keep-alive","content-type":"application/json;charset=UTF-8","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){o.debug(`QINGLONG DELETE ENV IDS: ${n}`);return true}else{o.error(`Error deleting environment variable from Qinglong Panel.\n${JSON.stringify(e)}`);return false}}).catch(e=>{o.error(`Error deleting environment variable from Qinglong Panel.\n${e.message}`)})}async function O(t=null,a="",i=0){if(i<=3){let r=[];await f.get({url:`/api/envs`,headers:{"content-type":"application/json"},params:{searchValue:a}}).then(e=>{if(e.body.code===200){const n=e.body.data;if(!!t){let e=[];for(const e of n){if(e.name===t){r.push(e)}}r=e}r=n}else{o.error(`Error reading environment variable from Qinglong Panel.\n${JSON.stringify(e)}`);b();i+=1;O(t,a,i)}}).catch(e=>{o.error(`Error reading environment variable from Qinglong Panel.\n${JSON.stringify(e)}`);b();i+=1;O(t,a,i)});return r}else{throw new Error("An error occurred while reading environment variable from Qinglong Panel.")}}async function S(e){let n=null;const r=await O();for(const t of r){if(t.id===e){n=t;break}}return n}async function $(n){let r=false;await f.put({url:`/api/envs/disable`,headers:{accept:"application/json","accept-Language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",connection:"keep-alive","content-type":"application/json;charset=UTF-8","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){o.debug(`QINGLONG DISABLED ENV IDS: ${n}`);r=true}else{o.error(`Error disabling environment variable from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error disabling environment variable from Qinglong Panel.\n${e.message}`)});return r}async function Q(n){let r=false;await f.put({url:`/api/envs/enable`,headers:{accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",connection:"keep-alive","content-type":"application/json;charset=UTF-8","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){o.debug(`QINGLONG ENABLED ENV IDS: ${n}`);r=true}else{o.error(`Error enabling environment variable from Qilong panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error enabling environment variable from Qilong panel.\n${e.message}`)});return r}async function q(e,n="",r=""){let t=false;await f.post({url:`/api/scripts`,headers:{"content-type":"application/json"},body:{filename:e,path:n,content:r}}).then(e=>{if(e.body.code===200){t=true}else{o.error(`Error reading data from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error reading data from Qinglong Panel.\n${e.message}`)});return t}async function P(r,t="",a=0){if(a<=3){let n="";await f.get({url:`/api/scripts/${r}`,params:{path:t}}).then(async e=>{if(e.body.code===200){n=e.body.data}else{o.error(`Error reading data from Qinglong Panel.\n${JSON.stringify(e)}`);await b();a+=1;return await P(r,t,a)}}).catch(async e=>{o.error(`Error reading data from Qinglong Panel.\n${e.message?e.message:e}`);await b();a+=1;return await P(r,t,a)});return n}else{throw new Error("An error occurred while reading the data from Qinglong Panel.")}}async function j(e,n="",r=""){let t=false;await f.put({url:`/api/scripts`,headers:{"content-type":"application/json"},body:{filename:e,path:n,content:r}}).then(e=>{if(e.body.code===200){t=true}else{o.error(`Error reading data from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error reading data from Qinglong Panel.\n${e.message}`)});return t}async function k(e,n=""){let r=false;await f.delete({url:`/api/scripts`,headers:{"content-type":"application/json"},body:{filename:e,path:n}}).then(e=>{if(e.body.code===200){r=true}else{o.error(`Error reading data from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error reading data from Qinglong Panel.\n${e.message}`)});return r}async function T(e,n,r=""){let t=await P(g,"");let a=s.convertToObject(t);let i=s.write(e,n,r,a);t=JSON.stringify(a,null,4);let o=await j(g,"",t);return o&&i}async function J(...n){let e=await P(g,"");let r=s.convertToObject(e);for(let e of n){s.write(e[0],e[1],typeof e[2]!=="undefined"?e[2]:"",r)}e=JSON.stringify(r,null,4);return await j(g,"",e)}async function G(e,n,r,t=s.defaultValueComparator){let a=await P(g,"");let i=s.convertToObject(a);const o=s.update(e,n,r,t,i);let l=false;if(o===true){a=JSON.stringify(i,null,4);l=await j(g,"",a)}return o&&l}async function _(...n){let e=await P(g,"");let r=s.convertToObject(e);for(let e of n){s.update(e[0],e[1],typeof e[2]!=="undefined"?e[2]:"",typeof e[3]!=="undefined"?e["comparator"]:s.defaultValueComparator,r)}e=JSON.stringify(r,null,4);return await j(g,"",e)}async function L(e,n,r="",t=false){let a=await P(g,"");let i=s.convertToObject(a);return s.read(e,n,r,t,i)}async function x(...n){let e=await P(g,"");let r=s.convertToObject(e);let t=[];for(let e of n){const a=s.read(e[0],e[1],typeof e[2]!=="undefined"?e[2]:"",typeof e[3]==="boolean"?e[3]:false,r);t.push(a)}return t}async function D(e,n=""){let r=await P(g,"");let t=s.convertToObject(r);const a=s.del(e,n,t);r=JSON.stringify(t,null,4);const i=await j(g,"",r);return a&&i}async function W(...n){let e=await P(g,"");let r=s.convertToObject(e);for(let e of n){s.del(e[0],typeof e[1]!=="undefined"?e[1]:"",r)}e=JSON.stringify(r,null,4);return await j(g,"",e)}async function z(e){let n=await P(g,"");let r=s.convertToObject(n);return s.allSessionNames(e,r)}async function A(e){let n=await P(g,"");let r=s.convertToObject(n);return s.allSessions(e,r)}return{url:i||s.read("magic_qlurl"),init:t,getToken:v,setEnv:w,setEnvs:E,getEnv:S,getEnvs:O,delEnvs:N,disableEnvs:$,enableEnvs:Q,addScript:q,getScript:P,editScript:j,delScript:k,write:T,read:L,del:D,update:G,batchWrite:J,batchRead:x,batchUpdate:_,batchDel:W,allSessions:A,allSessionNames:z}}
// @formatter:on
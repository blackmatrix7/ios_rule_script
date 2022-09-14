const SCRIPT_NAME = "AppleStore";
const APPLESTORE_MODEL_KEY = "applestore_goods_model";
const APPLESTORE_REGION_KEY = "applestore_region";
const APPLESTORE_STOCK_KEY = "applestore_goods_stock";
const APPLESTORE_RUN_FOREVER_KEY = "applestore_run_forever";
const APPLESTORE_WATCH_INTERVAL = "applestore_watch_interval";

const $ = MagicJS(SCRIPT_NAME);

function getGoodsStock(parts, location, option = "") {
  return new Promise((resolve) => {
    let url = "";
    if (option != "") {
      url = encodeURI(`https://www.apple.com.cn/shop/fulfillment-messages?pl=true&mt=compact&parts.0=${parts}&location=${location}&option.0=${option}&_=${new Date().getTime()}`);
    } else {
      url = encodeURI(`https://www.apple.com.cn/shop/fulfillment-messages?pl=true&mt=compact&parts.0=${parts}&location=${location}&_=${new Date().getTime()}`);
    }
    $.http.get(url).then(resp => {
      const obj = resp.body;
      let stores = obj["body"]["content"]["pickupMessage"]["stores"];
      if (stores) {
        resolve(stores);
      } else {
        $.logger.error("查询库存失败，请检查配置是否正确。");
        resolve([]);
      }
    }).catch(err => {
      $.logger.error(`查询库存出现异常，${err}`);
    })
  });
}

async function watchStock(goods_models, applestore_region) {
  let stock = $.data.read(APPLESTORE_STOCK_KEY);
  stock = stock || {};
  let len = goods_models.length;
  let tasks = [];

  for (let i = 0; i < len; i++) {
    const wrap = async () => {
      let partsConfig = goods_models[i].split("#");
      let parts = partsConfig[0];
      let option = partsConfig.length >= 2 ? partsConfig[1] : "";
      let name = partsConfig.length == 3 ? partsConfig[2] : "";
      let subObj = { watch: 0, pickup: 0, soldout: 0, changed: 0 };
      let availability = await getGoodsStock(parts, applestore_region, option);

      if (availability && availability.length > 0) {
        // 获取AppleStore取货信息
        for (let store of availability) {
          let storeNumber = store["storeNumber"];
          if (!stock.hasOwnProperty(parts)) {
            stock[parts] = { title: store["partsAvailability"][parts]["storePickupProductTitle"], stores: {} };
          }
          if (!stock[parts]["stores"][storeNumber]) {
            stock[parts]["stores"][storeNumber] = { notify: false, pickup: false, msg: "等待查询", city: store["city"], name: store["storeName"] };
          }
          if (stock[parts]["stores"][storeNumber]["msg"] != store["partsAvailability"][parts]["pickupSearchQuote"]) {
            // 更新库存情况
            stock[parts]["stores"][storeNumber]["msg"] = store["partsAvailability"][parts]["pickupSearchQuote"];
            stock[parts]["stores"][storeNumber]["pickup"] = store["partsAvailability"][parts]["pickupDisplay"] != "unavailable";
            // 库存变化推送通知
            stock[parts]["stores"][storeNumber]["notify"] = true;
          } else {
            // 库存未变化不推送
            stock[parts]["stores"][storeNumber]["notify"] = false;
          }
        }

        let now = new Date();
        if (!stock[parts]["title"] && !name) {
          name = "未命名商品";
        }
        let logStr = `${name}\n`;
        let title = `${name} - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        let watchResult = "全部售罄";
        let stockInContent = ""; // 有库存的型号与店铺
        let soldOutContent = ""; // 售罄的型号与店铺
        let unchangContent = ""; // 没有变化的型号与店铺
        let content = "";

        // 整理通知内容
        for (let storeStock of Object.values(stock[parts]["stores"])) {
          subObj["watch"] += 1;
          // 有货
          if (storeStock["pickup"]) {
            subObj["pickup"] += 1;
            if (watchResult == "全部售罄") watchResult = `${storeStock["city"]} ${storeStock["name"]}`;
            if (storeStock["notify"] === true) {
              subObj["changed"] += 1;
              if (!!stockInContent) stockInContent += "\n";
              stockInContent += `🔆 ${storeStock["name"]} - ${storeStock["msg"]}↑`;
            } else {
              if (!!unchangContent) unchangContent += "\n";
              unchangContent += `🔆 ${storeStock["name"]} - ${storeStock["msg"]}● `;
            }
            logStr += `${storeStock["name"]} - ${storeStock["msg"]}\n`;
          }

          // 售罄
          else {
            subObj["soldout"] += 1;
            if (storeStock["notify"] === true) {
              subObj["changed"] += 1;
              if (!!soldOutContent) soldOutContent += "\n";
              soldOutContent += `🚫 ${storeStock["name"]} - ${storeStock["msg"]}↓`;
            } else {
              if (!!unchangContent) unchangContent += "\n";
              unchangContent += `🚫 ${storeStock["name"]} - ${storeStock["msg"]}○`;
            }
            logStr += `${storeStock["name"]} - ${storeStock["msg"]}\n`;
          }
        }
        if (!!stockInContent) {
          content = stockInContent;
        }
        // 配置为无货通知且存在无货情况时
        if ($.data.read("applestore_settings_notify_soldout") == true) {
          content = !!stockInContent ? stockInContent + `\n${soldOutContent}\n${unchangContent}` : !!soldOutContent ? `${soldOutContent}\n${unchangContent}` : unchangContent;
        }
        if (!!content) {
          let subTitle = `监控: ${subObj.watch} 售罄: ${subObj.soldout} 有货: ${subObj.pickup} ${watchResult}`;
          $.notification.post(title, subTitle, content, "applestore://");
        }
        $.logger.info(logStr);
      }
    }
    tasks.push(wrap());
  }

  await Promise.all(tasks);
  // 存储本次库存检查结果
  $.data.write(APPLESTORE_STOCK_KEY, stock);
}

(async () => {
  let goods_model = $.data.read(APPLESTORE_MODEL_KEY).trim();
  let applestore_region = $.data.read(APPLESTORE_REGION_KEY).trim();

  if (!goods_model || !applestore_region) {
    let msg = "请先在BoxJS中配置心仪的商品型号及购买地区";
    $.logger.warning(msg);
    $.notification.post(msg);
    return;
  }

  let goods_models = goods_model.split(";");

  // 监控库存
  await watchStock(goods_models, applestore_region);

  // NodeJS环境只运行一次或无限监控库存
  if ($.env.isNode) {
    let interval = Number($.data.read(APPLESTORE_WATCH_INTERVAL, 5000));
    interval = interval <= 2000? 5000: interval;
    const runForever = $.data.read(APPLESTORE_RUN_FOREVER_KEY, false);
    while (runForever === true) {
      let hours = new Date().getHours()
      if (hours <= 1 || hours >= 6) {
        await watchStock(goods_models, applestore_region);
      }
      await $.utils.sleep(interval);
    }
  }

  $.done();
})();


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
function MagicJS(e="MagicJS",t="INFO"){const r=()=>{const e=typeof $loon!=="undefined";const t=typeof $task!=="undefined";const n=typeof module!=="undefined";const r=typeof $httpClient!=="undefined"&&!e;const s=typeof $storm!=="undefined";const i=typeof $environment!=="undefined"&&typeof $environment["stash-build"]!=="undefined";const o=r||e||s||i;const l=typeof importModule!=="undefined";return{isLoon:e,isQuanX:t,isNode:n,isSurge:r,isStorm:s,isStash:i,isSurgeLike:o,isScriptable:l,get name(){if(e){return"Loon"}else if(t){return"QuantumultX"}else if(n){return"NodeJS"}else if(r){return"Surge"}else if(l){return"Scriptable"}else{return"unknown"}},get build(){if(r){return $environment["surge-build"]}else if(i){return $environment["stash-build"]}else if(s){return $storm.buildVersion}},get language(){if(r||i){return $environment["language"]}},get version(){if(r){return $environment["surge-version"]}else if(i){return $environment["stash-version"]}else if(s){return $storm.appVersion}else if(n){return process.version}},get system(){if(r){return $environment["system"]}else if(n){return process.platform}},get systemVersion(){if(s){return $storm.systemVersion}},get deviceName(){if(s){return $storm.deviceName}}}};const s=(n,e="INFO")=>{let r=e;const s={SNIFFER:6,DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};const i={SNIFFER:"",DEBUG:"",INFO:"",NOTIFY:"",WARNING:"❗ ",ERROR:"❌ ",CRITICAL:"❌ ",NONE:""};const t=(e,t="INFO")=>{if(!(s[r]<s[t.toUpperCase()]))console.log(`[${t}] [${n}]\n${i[t.toUpperCase()]}${e}\n`)};const o=e=>{r=e};return{setLevel:o,sniffer:e=>{t(e,"SNIFFER")},debug:e=>{t(e,"DEBUG")},info:e=>{t(e,"INFO")},notify:e=>{t(e,"NOTIFY")},warning:e=>{t(e,"WARNING")},error:e=>{t(e,"ERROR")},retry:e=>{t(e,"RETRY")}}};return new class{constructor(e,t){this._startTime=Date.now();this.version="3.0.0";this.scriptName=e;this.env=r();this.logger=s(e,t);this.http=typeof MagicHttp==="function"?MagicHttp(this.env,this.logger):undefined;this.data=typeof MagicData==="function"?MagicData(this.env,this.logger):undefined;this.notification=typeof MagicNotification==="function"?MagicNotification(this.scriptName,this.env,this.logger,this.http):undefined;this.utils=typeof MagicUtils==="function"?MagicUtils(this.env,this.logger):undefined;this.qinglong=typeof MagicQingLong==="function"?MagicQingLong(this.env,this.data,this.logger):undefined;if(typeof this.data!=="undefined"){let e=this.data.read("magic_loglevel");const n=this.data.read("magic_bark_url");if(e){this.logger.setLevel(e.toUpperCase())}if(n){this.notification.setBark(n)}}}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get isDebug(){return this.logger.level==="DEBUG"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}done=(e={})=>{this._endTime=Date.now();let t=(this._endTime-this._startTime)/1e3;this.logger.info(`SCRIPT COMPLETED: ${t} S.`);if(typeof $done!=="undefined"){$done(e)}}}(e,t)}function MagicHttp(u,f){const t="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";const n="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";let c;if(u.isNode){const l=require("axios");c=l.create()}class e{constructor(e=true){this.handlers=[];this.isRequest=e}use(e,t,n){this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:false,runWhen:n?n.runWhen:null});return this.handlers.length-1}eject(e){if(this.handlers[e]){this.handlers[e]=null}}forEach(t){this.handlers.forEach(e=>{if(e!==null){t(e)}})}}function r(e){let n={...e};if(!!n.params){if(!u.isNode){let e=Object.keys(n.params).map(e=>{const t=encodeURIComponent(e);n.url=n.url.replace(new RegExp(`${e}=[^&]*`,"ig"),"");n.url=n.url.replace(new RegExp(`${t}=[^&]*`,"ig"),"");return`${t}=${encodeURIComponent(n.params[e])}`}).join("&");if(n.url.indexOf("?")<0)n.url+="?";if(!/(&|\?)$/g.test(n.url)){n.url+="&"}n.url+=e;delete n.params;f.debug(`Params to QueryString: ${n.url}`)}}return n}const d=(e,t)=>{let n=typeof t==="object"?{headers:{},...t}:{url:t,headers:{}};if(!n.method){n["method"]=e}n=r(n);if(n["rewrite"]===true){if(u.isSurge){n.headers["X-Surge-Skip-Scripting"]=false;delete n["rewrite"]}else if(u.isQuanX){n["hints"]=false;delete n["rewrite"]}}if(u.isSurge){if(n["method"]!=="GET"&&n.headers["Content-Type"].indexOf("application/json")>=0&&n.body instanceof Array){n.body=JSON.stringify(n.body);f.debug(`Convert Array object to String: ${n.body}`)}}else if(u.isQuanX){if(n.hasOwnProperty("body")&&typeof n["body"]!=="string")n["body"]=JSON.stringify(n["body"]);n["method"]=e}else if(u.isNode){if(e==="POST"||e==="PUT"||e==="PATCH"||e==="DELETE"){n.data=n.data||n.body}else if(e==="GET"){n.params=n.params||n.body}delete n.body}return n};const p=(t,n=null)=>{if(t){let e={...t,config:t.config||n,status:t.statusCode||t.status,body:t.body||t.data,headers:t.headers||t.header};if(typeof e.body==="string"){try{e.body=JSON.parse(e.body)}catch{}}delete t.data;return e}else{return t}};const s=r=>{if(!!r){delete r["Content-Length"];let e=new Set(["Accept","Accept-CH","Accept-Charset","Accept-Features","Accept-Encoding","Accept-Language","Accept-Ranges","Access-Control-Allow-Credentials","Access-Control-Allow-Origin","Access-Control-Allow-Methods","Access-Control-Allow-Headers","Access-Control-Max-Age","Access-Control-Expose-Headers","Access-Control-Request-Method","Access-Control-Request-Headers","Age","Allow","Alternates","Authorization","Cache-Control","Connection","Content-Encoding","Content-Language","ontent-Length","Content-Location","Content-Range","Content-Security-Policy","Content-Type","Cookie","DNT","Date","ETag","Expect","Expires","From","Host","If-Match","If-Modified-Since","If-None-Match","If-Range","If-Unmodified-Since","Last-Event-ID","Last-Modified","Link","Location","Max-Forwards","Negotiate","Origin","Pragma","Proxy-Authenticate","Proxy-Authorization","Range","Referer","Retry-After","Sec-Websocket-Extensions","Sec-Websocket-Key","Sec-Websocket-Origin","Sec-Websocket-Protocol","Sec-Websocket-Version","Server","Set-Cookie","Set-Cookie2","Strict-Transport-Security","TCN","TE","Trailer","Transfer-Encoding","Upgrade","User-Agent","Variant-Vary","Vary","Via","Warning","WWW-Authenticate","X-Content-Duration","X-Content-Security-Policy","X-DNSPrefetch-Control","X-Frame-Options","X-Requested-With"]);for(let n of Object.keys(r)){if(!e.has(n)){for(let t of e){let e=n.replace(new RegExp(t,"ig"),t);if(n!==e){r[e]=r[n];delete r[n];break}}}}if(!r["User-Agent"]){if(u.isNode){r["User-Agent"]=n}else{r["User-Agent"]=t}}return r}return r};const g=(t,n=null)=>{if(!!t&&t.status>=400){f.debug(`Raise exception when status code is ${t.status}`);let e={name:"RequestException",message:`Request failed with status code ${t.status}`,config:n||t.config,response:t};return e}};const i={request:new e,response:new e(false)};let y=[];let h=[];let m=true;function $(e){if(typeof e==="object"&&e["modify"]!==false){e["headers"]=s(e["headers"])}e=r(e);return e}function S(e){try{e=!!e?p(e):e;f.sniffer(`HTTP ${e.config["method"].toUpperCase()}:\n${JSON.stringify(e.config)}\nSTATUS CODE:\n${e.status}\nRESPONSE:\n${typeof e.body==="object"?JSON.stringify(e.body):e.body}`);const t=g(e);if(!!t){return Promise.reject(t)}return e}catch(t){f.error(t);return e}}const b=t=>{try{y=[];h=[];i.request.forEach(e=>{if(typeof e.runWhen==="function"&&e.runWhen(t)===false){return}m=m&&e.synchronous;y.unshift(e.fulfilled,e.rejected)});i.response.forEach(e=>{h.push(e.fulfilled,e.rejected)})}catch(e){f.error(`failed to register interceptors: ${e}`)}};const o=(e,r)=>{let s;const t=e.toUpperCase();r=d(t,r);if(u.isNode){s=c}else{if(u.isSurgeLike){s=i=>{return new Promise((r,s)=>{$httpClient[e.toLowerCase()](i,(t,n,e)=>{if(t){let e={name:t.name||t,message:t.message||t,stack:t.stack||t,config:i,response:p(n)};s(e)}else{n.config=i;n.body=e;r(n)}})})}}else{s=s=>{return new Promise((n,r)=>{$task.fetch(s).then(e=>{e=p(e,s);const t=g(e,s);if(t){return Promise.reject(t)}n(e)}).catch(e=>{let t={name:e.message||e.error,message:e.message||e.error,stack:e.error,config:s,response:!!e.response?p(e.response):null};r(t)})})}}}let i;b(r);const o=[$,undefined];const l=[S,undefined];if(!m){f.debug("Interceptors are executed in asynchronous mode");let n=[s,undefined];Array.prototype.unshift.apply(n,o);Array.prototype.unshift.apply(n,y);Array.prototype.unshift.apply(n,o);n=n.concat(l);n=n.concat(h);i=Promise.resolve(r);while(n.length){try{let e=n.shift();let t=n.shift();if(!u.isNode&&r["timeout"]&&e===s){i=a(r)}else{i=i.then(e,t)}}catch(e){f.error(`request exception: ${e}`)}}return i}else{f.debug("Interceptors are executed in synchronous mode");Array.prototype.unshift.apply(y,o);y=y.concat([$,undefined]);while(y.length){let e=y.shift();let t=y.shift();try{r=e(r)}catch(e){t(e);break}}try{if(!u.isNode&&r["timeout"]){i=a(r)}else{i=s(r)}}catch(e){return Promise.reject(e)}Array.prototype.unshift.apply(h,l);while(h.length){i=i.then(h.shift(),h.shift())}return i}function a(n){try{const e=new Promise((e,t)=>{setTimeout(()=>{let e={message:`timeout of ${n["timeout"]}ms exceeded`,config:n};t(e)},n["timeout"])});return Promise.race([s(n),e])}catch(e){f.error(`Request Timeout exception: ${e}`)}}};return{request:o,interceptors:i,modifyHeaders:s,modifyResponse:p,get:e=>{return o("GET",e)},post:e=>{return o("POST",e)},put:e=>{return o("PUT",e)},patch:e=>{return o("PATCH",e)},delete:e=>{return o("DELETE",e)},head:e=>{return o("HEAD",e)},options:e=>{return o("OPTIONS",e)}}}function MagicNotification(i,o,l,a){let u=null;let f=null;const e=t=>{try{let e=t.replace(/\/+$/g,"");u=`${/^https?:\/\/([^/]*)/.exec(e)[0]}/push`;f=/\/([^\/]+)\/?$/.exec(e)[1]}catch(e){l.error(`Bark url error: ${e}.`)}};function t(e=i,t="",n="",r=""){const s=n=>{try{let t={};if(typeof n==="string"){if(o.isLoon)t={openUrl:n};else if(o.isQuanX)t={"open-url":n};else if(o.isSurge)t={url:n}}else if(typeof n==="object"){if(o.isLoon){t["openUrl"]=!!n["open-url"]?n["open-url"]:"";t["mediaUrl"]=!!n["media-url"]?n["media-url"]:""}else if(o.isQuanX){t=!!n["open-url"]||!!n["media-url"]?n:{}}else if(o.isSurge){let e=n["open-url"]||n["openUrl"];t=e?{url:e}:{}}}return t}catch(e){l.error(`Failed to convert notification option, ${e}`)}return n};r=s(r);if(arguments.length==1){e=i;t="",n=arguments[0]}l.notify(`title:${e}\nsubTitle:${t}\nbody:${n}\noptions:${typeof r==="object"?JSON.stringify(r):r}`);if(o.isSurge){$notification.post(e,t,n,r)}else if(o.isLoon){if(!!r)$notification.post(e,t,n,r);else $notification.post(e,t,n)}else if(o.isQuanX){$notify(e,t,n,r)}if(u&&f){c(e,t,n)}}function n(e=i,t="",n="",r=""){if(l.level==="DEBUG"){if(arguments.length==1){e=i;t="",n=arguments[0]}this.notify(e,t,n,r)}}function c(e=i,t="",n="",r=""){if(typeof a==="undefined"||typeof a.post==="undefined"){throw"Bark notification needs to import MagicHttp module."}let s={url:u,headers:{"Content-Type":"application/json; charset=utf-8"},body:{title:e,body:t?`${t}\n${n}`:n,device_key:f}};a.post(s).catch(e=>{l.error(`Bark notify error: ${e}`)})}return{post:t,debug:n,bark:c,setBark:e}}function MagicData(o,l){let a={fs:undefined,data:{}};if(o.isNode){a.fs=require("fs");try{a.fs.accessSync("./magic.json",a.fs.constants.R_OK|a.fs.constants.W_OK)}catch(e){a.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}a.data=require("./magic.json")}const u=(e,t)=>{if(typeof t==="object"){return false}else{return e===t}};const f=e=>{if(e==="true"){return true}else if(e==="false"){return false}else if(typeof e==="undefined"){return null}else{return e}};const c=(e,t,n,r)=>{if(n){try{if(typeof e==="string")e=JSON.parse(e);if(e["magic_session"]===true){e=e[n]}else{e=null}}catch{e=null}}if(typeof e==="string"&&e!=="null"){try{e=JSON.parse(e)}catch{}}if(r===false&&!!e&&e["magic_session"]===true){e=null}if((e===null||typeof e==="undefined")&&t!==null&&typeof t!=="undefined"){e=t}e=f(e);return e};const i=t=>{if(typeof t==="string"){let e={};try{e=JSON.parse(t);const n=typeof e;if(n!=="object"||e instanceof Array||n==="bool"||e===null){e={}}}catch{}return e}else if(t instanceof Array||t===null||typeof t==="undefined"||t!==t||typeof t==="boolean"){return{}}else{return t}};const d=(e,t=null,n="",r=false,s=null)=>{let i=s||a.data;if(!!i&&typeof i[e]!=="undefined"&&i[e]!==null){val=i[e]}else{val=!!n?{}:null}val=c(val,t,n,r);return val};const p=(e,t=null,n="",r=false,s=null)=>{let i="";if(s||o.isNode){i=d(e,t,n,r,s)}else{if(o.isSurgeLike){i=$persistentStore.read(e)}else if(o.isQuanX){i=$prefs.valueForKey(e)}i=c(i,t,n,r)}l.debug(`READ DATA [${e}]${!!n?`[${n}]`:""} <${typeof i}>\n${JSON.stringify(i)}`);return i};const g=(t,n,r="",e=null)=>{let s=e||a.data;s=i(s);if(!!r){let e=i(s[t]);e["magic_session"]=true;e[r]=n;s[t]=e}else{s[t]=n}if(e!==null){e=s}return s};const y=(e,t,n="",r=null)=>{if(typeof t==="undefined"||t!==t){return false}if(!o.isNode&&(typeof t==="boolean"||typeof t==="number")){t=String(t)}let s="";if(r||o.isNode){s=g(e,t,n,r)}else{if(!n){s=t}else{if(o.isSurgeLike){s=!!$persistentStore.read(e)?$persistentStore.read(e):s}else if(o.isQuanX){s=!!$prefs.valueForKey(e)?$prefs.valueForKey(e):s}s=i(s);s["magic_session"]=true;s[n]=t}}if(!!s&&typeof s==="object"){s=JSON.stringify(s,"","\t")}l.debug(`WRITE DATA [${e}]${n?`[${n}]`:""} <${typeof t}>\n${JSON.stringify(t)}`);if(!r){if(o.isSurgeLike){return $persistentStore.write(s,e)}else if(o.isQuanX){return $prefs.setValueForKey(s,e)}else if(o.isNode){try{a.fs.writeFileSync("./magic.json",s);return true}catch(e){l.error(e);return false}}}return true};const e=(t,n,r,s=u,i=null)=>{n=f(n);const e=p(t,null,r,false,i);if(s(e,n)===true){return false}else{const o=y(t,n,r,i);let e=p(t,null,r,false,i);if(s===u&&typeof e==="object"){return o}return s(n,e)}};const h=(e,t,n)=>{let r=n||a.data;r=i(r);if(!!t){obj=i(r[e]);delete obj[t];r[e]=obj}else{delete r[e]}if(!!n){n=r}return r};const t=(e,t="",n=null)=>{let r={};if(n||o.isNode){r=h(e,t,n);if(!n){a.fs.writeFileSync("./magic.json",JSON.stringify(r))}else{n=r}}else{if(!t){if(o.isStorm){return $persistentStore.remove(e)}else if(o.isSurgeLike){return $persistentStore.write(null,e)}else if(o.isQuanX){return $prefs.removeValueForKey(e)}}else{if(o.isSurgeLike){r=$persistentStore.read(e)}else if(o.isQuanX){r=$prefs.valueForKey(e)}r=i(r);delete r[t];const s=JSON.stringify(r);y(e,s)}}l.debug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`)};const n=(e,t=null)=>{let n=[];let r=p(e,null,null,true,t);r=i(r);if(r["magic_session"]!==true){n=[]}else{n=Object.keys(r).filter(e=>e!=="magic_session")}l.debug(`READ ALL SESSIONS [${e}] <${typeof n}>\n${JSON.stringify(n)}`);return n};return{read:p,write:y,del:t,update:e,allSessions:n,defaultValueComparator:u,convertToObject:i}}function MagicUtils(r,u){const e=(i,o=5,l=0,a=null)=>{return(...e)=>{return new Promise((n,r)=>{function s(...t){Promise.resolve().then(()=>i.apply(this,t)).then(e=>{if(typeof a==="function"){Promise.resolve().then(()=>a(e)).then(()=>{n(e)}).catch(e=>{if(o>=1){if(l>0)setTimeout(()=>s.apply(this,t),l);else s.apply(this,t)}else{r(e)}o--})}else{n(e)}}).catch(e=>{u.error(e);if(o>=1&&l>0){setTimeout(()=>s.apply(this,t),l)}else if(o>=1){s.apply(this,t)}else{r(e)}o--})}s.apply(this,e)})}};const t=(e,t="yyyy-MM-dd hh:mm:ss")=>{let n={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in n)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?n[e]:("00"+n[e]).substr((""+n[e]).length));return t};const n=()=>{return t(new Date,"yyyy-MM-dd hh:mm:ss")};const s=()=>{return t(new Date,"yyyy-MM-dd")};const i=t=>{return new Promise(e=>setTimeout(e,t))};const o=(e,t=null)=>{if(r.isNode){const n=require("assert");if(t)n(e,t);else n(e)}else{if(e!==true){let e=`AssertionError: ${t||"The expression evaluated to a falsy value"}`;u.error(e)}}};return{retry:e,formatTime:t,now:n,today:s,sleep:i,assert:o}}
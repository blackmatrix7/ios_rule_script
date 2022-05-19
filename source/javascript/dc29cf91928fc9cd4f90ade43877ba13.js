const scriptName = "BiliBili";
const storyAidKey = "bilibili_story_aid";
const blackKey = "bilibili_feed_black";
let magicJS = MagicJS(scriptName, "INFO");

//Customize blacklist
let blacklist = [];
if (magicJS.read(blackKey)) {
  blacklist = magicJS.read(blackKey).split(";");
} else {
  const defaultList = "";
  magicJS.write(blackKey, defaultList);
  blacklist = defaultList.split(";");
}

(() => {
  let body = null;
  if (magicJS.isResponse) {
    switch (true) {
      // 推荐去广告，最后问号不能去掉，以免匹配到story模式
      case /^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\?/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          let items = [];
          for (let item of obj["data"]["items"]) {
            if (item.hasOwnProperty("banner_item")) {
              let bannerItems = [];
              for (let banner of item["banner_item"]) {
                if (banner["type"] === "ad") {
                  continue;
                } else if (banner["static_banner"] && banner["static_banner"]["is_ad_loc"] != true) {
                  bannerItems.push(banner);
                }
              }
              // 去除广告后，如果banner大于等于1个才添加到响应体
              if (bannerItems.length >= 1) {
                item["banner_item"] = bannerItems;
                items.push(item);
              }
            } else if (
              !item.hasOwnProperty("ad_info") &&
              !blacklist.includes(item["args"]["up_name"]) &&
              item.card_goto.indexOf("ad") === -1 &&
              (item["card_type"] === "small_cover_v2" || item["card_type"] === "large_cover_v1")
            ) {
              items.push(item);
            }
          }
          obj["data"]["items"] = items;
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`推荐去广告出现异常：${err}`);
        }
        break;
      // 匹配story模式，用于记录Story的aid
      case /^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story\?/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          let lastItem = obj["data"]["items"].pop();
          let aid = lastItem["stat"]["aid"].toString();
          magicJS.write(storyAidKey, aid);
        } catch (err) {
          magicJS.logError(`记录Story的aid出现异常：${err}`);
        }
        break;
      // 开屏广告处理
      case /^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          obj["data"]["max_time"] = 0;
          obj["data"]["min_interval"] = 31536000;
          obj["data"]["pull_interval"] = 31536000;
          for (let i = 0; i < obj["data"]["list"].length; i++) {
            obj["data"]["list"][i]["duration"] = 0;
            obj["data"]["list"][i]["begin_time"] = 1915027200;
            obj["data"]["list"][i]["end_time"] = 1924272000;
          }
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`开屏广告处理出现异常：${err}`);
        }
        break;
      // 标签页处理，如去除会员购等等
      case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test(magicJS.request.url):
        try {
          // 545 首页追番tab，442 开始为概念版id 适配港澳台代理模式
          const tabList = new Set([39, 40, 41, 545, 151, 442, 99, 100, 101, 554, 556]);
          // 尝试使用tab name直观修改
          const tabNameList = new Set(["直播", "推荐", "热门", "追番", "影视"]);
          // 107 概念版游戏中心，获取修改为Story模式
          const topList = new Set([176, 222, 107]);
          // 102 开始为概念版id
          const bottomList = new Set([177, 178, 179, 181, 102, 103, 104, 105, 106]);
          let obj = JSON.parse(magicJS.response.body);
          if (obj["data"]["tab"]) {
            let tab = obj["data"]["tab"].filter((e) => {
              return tabNameList.has(e.name);
            });
            obj["data"]["tab"] = tab;
          }
          // 将 id（222 & 107）调整为Story功能按钮
          let storyAid = magicJS.read(storyAidKey);
          if (!storyAid) {
            storyAid = "246834163";
          }
          if (obj["data"]["top"]) {
            let top = obj["data"]["top"].filter((e) => {
              if (e.id === 222 || e.id === 107) {
                e.uri = `bilibili://story/${storyAid}`;
                e.icon = "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_icon.png";
                e.tab_id = "Story_Top";
                e.name = "Story";
              }
              return topList.has(e.id);
            });
            obj["data"]["top"] = top;
          }
          if (obj["data"]["bottom"]) {
            let bottom = obj["data"]["bottom"].filter((e) => {
              return bottomList.has(e.id);
            });
            obj["data"]["bottom"] = bottom;
          }
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`标签页处理出现异常：${err}`);
        }
        break;
      // 我的页面处理，去除一些推广按钮
      case /^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          // 622 为会员购中心, 425 开始为概念版id
          const itemList = new Set([396, 397, 398, 399, 171, 172, 534, 8, 4, 428, 352, 1, 405, 402, 404, 544, 407, 410, 622, 425, 426, 427, 428, 171, 430, 431, 432]);
          obj["data"]["sections_v2"].forEach((element, index) => {
            element["items"].forEach((e) => {
              if (e["id"] === 622) {
                e["title"] = "会员购";
                e["uri"] = "bilibili://mall/home";
              }
            });
            let items = element["items"].filter((e) => {
              return itemList.has(e.id);
            });
            obj["data"]["sections_v2"][index].button = {};
            delete obj["data"]["sections_v2"][index].be_up_title;
            delete obj["data"]["sections_v2"][index].tip_icon;
            delete obj["data"]["sections_v2"][index].tip_title;
            obj["data"]["sections_v2"][index]["items"] = items;
          });
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`我的页面处理出现异常：${err}`);
        }
        break;
      // 直播去广告
      case /^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          obj["data"]["activity_banner_info"] = null;
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`直播去广告出现异常：${err}`);
        }
        break;
      // 追番去广告
      case /^https?:\/\/api\.bilibili\.com\/pgc\/page\/bangumi/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          obj.result.modules.forEach((module) => {
            // 头部banner
            if (module.style.startsWith("banner")) {
              module.items = module.items.filter((i) => !(i.source_content && i.source_content.ad_content));
            }
          });
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`追番去广告出现异常：${err}`);
        }
        break;
      // 动态去广告
      case /^https?:\/\/api\.vc\.bilibili\.com\/dynamic_svr\/v1\/dynamic_svr\/dynamic_(history|new)\?/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          let cards = [];
          obj.data.cards.forEach((element) => {
            if (element.hasOwnProperty("display") && element.card.indexOf("ad_ctx") <= 0) {
              // 解决number类型精度问题导致B站动态中图片无法打开的问题
              element["desc"]["dynamic_id"] = element["desc"]["dynamic_id_str"];
              element["desc"]["pre_dy_id"] = element["desc"]["pre_dy_id_str"];
              element["desc"]["orig_dy_id"] = element["desc"]["orig_dy_id_str"];
              element["desc"]["rid"] = element["desc"]["rid_str"];
              cards.push(element);
            }
          });
          obj.data.cards = cards;
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`动态去广告出现异常：${err}`);
        }
        break;
      // 去除统一设置的皮肤
      case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\?/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          if (obj && obj.hasOwnProperty("data")) {
            obj["data"]["common_equip"] = {};
          }
          body = JSON.stringify(obj);
        } catch (err) {
          magicJS.logError(`去除强制设置的皮肤出现异常：${err}`);
        }
        break;
      default:
        magicJS.logWarning("触发意外的请求处理，请确认脚本或复写配置正常。");
        break;
    }
  } else {
    magicJS.logWarning("触发意外的请求处理，请确认脚本或复写配置正常。");
  }
  if (body) {
    magicJS.done({ body });
  } else {
    magicJS.done();
  }
})();

// prettier-ignore
function MagicJS(scriptName="MagicJS",logLevel="INFO"){return new class{constructor(){if(this.version="2.2.3.3",this.scriptName=scriptName,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=logLevel,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(err){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(url){this._barkUrl=url.replace(/\/+$/g,"")}set logLevel(level){this._logLevel="string"==typeof level?level.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"!=typeof $request?$request:void 0}get response(){return"undefined"!=typeof $response?($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response):void 0}get platform(){return this.isSurge?"Surge":this.isQuanX?"Quantumult X":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"Unknown"}read(key,session=""){let val="";this.isSurge||this.isLoon?val=$persistentStore.read(key):this.isQuanX?val=$prefs.valueForKey(key):this.isNode?val=this.node.data:this.isJSBox&&(val=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(val=val[key]),this.isJSBox&&(val=JSON.parse(val)[key]),session&&("string"==typeof val&&(val=JSON.parse(val)),val=val&&"object"==typeof val?val[session]:null)}catch(err){this.logError(err),val=session?{}:null,this.del(key)}void 0===val&&(val=null);try{val&&"string"==typeof val&&(val=JSON.parse(val))}catch(err){}return this.logDebug(`READ DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`),val}write(key,val,session=""){let data=session?{}:"";if(session&&(this.isSurge||this.isLoon)?data=$persistentStore.read(key):session&&this.isQuanX?data=$prefs.valueForKey(key):this.isNode?data=this.node.data:this.isJSBox&&(data=JSON.parse($file.read("drive://MagicJS/magic.json").string)),session){try{"string"==typeof data&&(data=JSON.parse(data)),data="object"==typeof data&&data?data:{}}catch(err){this.logError(err),this.del(key),data={}}this.isJSBox||this.isNode?(data[key]&&"object"==typeof data[key]||(data[key]={}),data[key].hasOwnProperty(session)||(data[key][session]=null),void 0===val?delete data[key][session]:data[key][session]=val):void 0===val?delete data[session]:data[session]=val}else this.isNode||this.isJSBox?void 0===val?delete data[key]:data[key]=val:data=void 0===val?null:val;"object"==typeof data&&(data=JSON.stringify(data)),this.isSurge||this.isLoon?$persistentStore.write(data,key):this.isQuanX?$prefs.setValueForKey(data,key):this.isNode?this.node.fs.writeFileSync("./magic.json",data):this.isJSBox&&$file.write({data:$data({string:data}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`)}del(key,session=""){this.logDebug(`DELETE KEY [${key}]${session?`[${session}]`:""}`),this.write(key,null,session)}notify(title=this.scriptName,subTitle="",body="",opts=""){let convertOptions;if(opts=(_opts=>{let newOpts={};if("string"==typeof _opts)this.isLoon?newOpts={openUrl:_opts}:this.isQuanX?newOpts={"open-url":_opts}:this.isSurge&&(newOpts={url:_opts});else if("object"==typeof _opts)if(this.isLoon)newOpts.openUrl=_opts["open-url"]?_opts["open-url"]:"",newOpts.mediaUrl=_opts["media-url"]?_opts["media-url"]:"";else if(this.isQuanX)newOpts=_opts["open-url"]||_opts["media-url"]?_opts:{};else if(this.isSurge){let openUrl=_opts["open-url"]||_opts.openUrl;newOpts=openUrl?{url:openUrl}:{}}return newOpts})(opts),1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.logNotify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${"object"==typeof opts?JSON.stringify(opts):opts}`),this.isSurge)$notification.post(title,subTitle,body,opts);else if(this.isLoon)opts?$notification.post(title,subTitle,body,opts):$notification.post(title,subTitle,body);else if(this.isQuanX)$notify(title,subTitle,body,opts);else if(this.isNode){if(this._barkUrl){let content=encodeURI(`${title}/${subTitle}\n${body}`);this.get(`${this._barkUrl}/${content}`,()=>{})}}else if(this.isJSBox){let push={title:title,body:subTitle?`${subTitle}\n${body}`:body};$push.schedule(push)}}notifyDebug(title=this.scriptName,subTitle="",body="",opts=""){"DEBUG"===this.logLevel&&(1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.notify(title,subTitle,body,opts))}log(msg,level="INFO"){this.logLevels[this._logLevel]<this.logLevels[level.toUpperCase()]||console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)}logDebug(msg){this.log(msg,"DEBUG")}logInfo(msg){this.log(msg,"INFO")}logNotify(msg){this.log(msg,"NOTIFY")}logWarning(msg){this.log(msg,"WARNING")}logError(msg){this.log(msg,"ERROR")}logRetry(msg){this.log(msg,"RETRY")}adapterHttpOptions(options,method){let _options="object"==typeof options?Object.assign({},options):{url:options,headers:{}};_options.hasOwnProperty("header")&&!_options.hasOwnProperty("headers")&&(_options.headers=_options.header,delete _options.header);const headersMap={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};if("object"==typeof _options.headers)for(let key in _options.headers)headersMap[key]&&(_options.headers[headersMap[key]]=_options.headers[key],delete _options.headers[key]);_options.headers&&"object"==typeof _options.headers&&_options.headers["User-Agent"]||(_options.headers&&"object"==typeof _options.headers||(_options.headers={}),this.isNode?_options.headers["User-Agent"]=this.pcUserAgent:_options.headers["User-Agent"]=this.iOSUserAgent);let skipScripting=!1;if(("object"==typeof _options.opts&&(!0===_options.opts.hints||!0===_options.opts["Skip-Scripting"])||"object"==typeof _options.headers&&!0===_options.headers["X-Surge-Skip-Scripting"])&&(skipScripting=!0),skipScripting||(this.isSurge?_options.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?_options.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof _options.opts&&(_options.opts={}),_options.opts.hints=!1)),this.isSurge&&!skipScripting||delete _options.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts,this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts["Skip-Scripting"],"GET"===method&&!this.isNode&&_options.body){let qs=Object.keys(_options.body).map(key=>void 0===_options.body?"":`${encodeURIComponent(key)}=${encodeURIComponent(_options.body[key])}`).join("&");_options.url.indexOf("?")<0&&(_options.url+="?"),_options.url.lastIndexOf("&")+1!=_options.url.length&&_options.url.lastIndexOf("?")+1!=_options.url.length&&(_options.url+="&"),_options.url+=qs,delete _options.body}return this.isQuanX?(_options.hasOwnProperty("body")&&"string"!=typeof _options.body&&(_options.body=JSON.stringify(_options.body)),_options.method=method):this.isNode?(delete _options.headers["Accept-Encoding"],"object"==typeof _options.body&&("GET"===method?(_options.qs=_options.body,delete _options.body):"POST"===method&&(_options.json=!0,_options.body=_options.body))):this.isJSBox&&(_options.header=_options.headers,delete _options.headers),_options}adapterHttpResponse(resp){let _resp={body:resp.body,headers:resp.headers,json:()=>JSON.parse(_resp.body)};return resp.hasOwnProperty("statusCode")&&resp.statusCode&&(_resp.status=resp.statusCode),_resp}get(options,callback){let _options=this.adapterHttpOptions(options,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon?$httpClient.get(_options,callback):this.isQuanX?$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>callback(reason.error,null,null)):this.isNode?this.node.request.get(_options,(err,resp,data)=>{resp=this.adapterHttpResponse(resp),callback(err,resp,data)}):this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.get(_options))}getPromise(options){return new Promise((resolve,reject)=>{magicJS.get(options,(err,resp)=>{err?reject(err):resolve(resp)})})}post(options,callback){let _options=this.adapterHttpOptions(options,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon)$httpClient.post(_options,callback);else if(this.isQuanX)$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>{callback(reason.error,null,null)});else if(this.isNode){let resp=this.node.request.post(_options,callback);resp.status=resp.statusCode,delete resp.statusCode}else this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.post(_options))}get http(){return{get:this.getPromise,post:this.post}}done(value={}){"undefined"!=typeof $done&&$done(value)}isToday(day){if(null==day)return!1;{let today=new Date;return"string"==typeof day&&(day=new Date(day)),today.getFullYear()==day.getFullYear()&&today.getMonth()==day.getMonth()&&today.getDay()==day.getDay()}}isNumber(val){return"NaN"!==parseFloat(val).toString()}attempt(promise,defaultValue=null){return promise.then(args=>[null,args]).catch(ex=>(this.logError(ex),[ex,defaultValue]))}retry(fn,retries=5,interval=0,callback=null){return(...args)=>new Promise((resolve,reject)=>{function _retry(...args){Promise.resolve().then(()=>fn.apply(this,args)).then(result=>{"function"==typeof callback?Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{retries>=1?interval>0?setTimeout(()=>_retry.apply(this,args),interval):_retry.apply(this,args):reject(ex),retries--}):resolve(result)}).catch(ex=>{this.logRetry(ex),retries>=1&&interval>0?setTimeout(()=>_retry.apply(this,args),interval):retries>=1?_retry.apply(this,args):reject(ex),retries--})}_retry.apply(this,args)})}formatTime(time,fmt="yyyy-MM-dd hh:mm:ss"){var o={"M+":time.getMonth()+1,"d+":time.getDate(),"h+":time.getHours(),"m+":time.getMinutes(),"s+":time.getSeconds(),"q+":Math.floor((time.getMonth()+3)/3),S:time.getMilliseconds()};/(y+)/.test(fmt)&&(fmt=fmt.replace(RegExp.$1,(time.getFullYear()+"").substr(4-RegExp.$1.length)));for(let k in o)new RegExp("("+k+")").test(fmt)&&(fmt=fmt.replace(RegExp.$1,1==RegExp.$1.length?o[k]:("00"+o[k]).substr((""+o[k]).length)));return fmt}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(time){return new Promise(resolve=>setTimeout(resolve,time))}}(scriptName)}

const SCRIPT_NAME = "AppleStore";
const APPLESTORE_MODEL_KEY = "goods_model";
const APPLESTORE_REGION_KEY = "applestore_region";
const APPLESTORE_STOCK_KEY = "goods_stock";

let magicJS = MagicJS(SCRIPT_NAME);
magicJS.barkUrl = magicJS.read("applestore_bark_url") || magicJS.read("magicjs_bark_url");

function getGoodsStock(parts, location, option = "") {
  return new Promise((resolve) => {
    let url = "";
    if (option != "") {
      url = encodeURI(`https://www.apple.com.cn/shop/fulfillment-messages?pl=true&mt=compact&parts.0=${parts}&location=${location}&option.0=${option}&_=${new Date().getTime()}`);
    } else {
      url = encodeURI(`https://www.apple.com.cn/shop/fulfillment-messages?pl=true&mt=compact&parts.0=${parts}&location=${location}&_=${new Date().getTime()}`);
    }
    magicJS.get(url, (err, resp, data) => {
      try{
        let obj = JSON.parse(data);
        let stores = obj["body"]["content"]["pickupMessage"]["stores"];
        if (stores) {
          resolve(stores);
        } else {
          magicJS.notify("查询库存失败，请检查配置是否正确。");
          resolve([]);
        }
      }
      catch (err){
        magicJS.logError(`解析库存数据失败，异常信息：${err}`);
        resolve([]);
      }
    });
  });
}

async function watchStock(goods_models, applestore_region) {
  let stock = magicJS.read(APPLESTORE_STOCK_KEY);
  stock = !!stock ? stock : {};
  let len = goods_models.length;
  let tasks = [];

  for (let i = 0; i < len; i++) {
    const wrap = async () =>{
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
        if (magicJS.read("applestore_settings_notify_soldout") == true) {
          content = !!stockInContent ? stockInContent + `\n${soldOutContent}\n${unchangContent}` : !!soldOutContent ? `${soldOutContent}\n${unchangContent}` : unchangContent;
        }
        if (!!content) {
          let subTitle = `监控: ${subObj.watch} 售罄: ${subObj.soldout} 有货: ${subObj.pickup} ${watchResult}`;
          magicJS.notify(title, subTitle, content, "applestore://");
        }
        magicJS.logInfo(logStr);
      }
    }
    tasks.push(wrap());
  }

  await Promise.all(tasks);
  // 存储本次库存检查结果
  magicJS.write(APPLESTORE_STOCK_KEY, stock);
}

(async () => {
  let goods_model = magicJS.read(APPLESTORE_MODEL_KEY).trim();
  let applestore_region = magicJS.read(APPLESTORE_REGION_KEY).trim();

  if (!goods_model || !applestore_region) {
    let msg = "请先在BoxJS中配置心仪的商品型号及购买地区";
    magicJS.logWarning(msg);
    magicJS.notify(msg);
    return;
  }

  let goods_models = goods_model.split(";");

  // 监控库存
  await watchStock(goods_models, applestore_region);

  while (magicJS.isNode) {
    let hours = new Date().getHours()
    if (hours <= 1 || hours >= 6){
      await watchStock(goods_models, applestore_region);
    }
    await magicJS.sleep(5000);
  }

  magicJS.done();
})();

// prettier-ignore
function MagicJS(scriptName="MagicJS",logLevel="INFO"){return new class{constructor(){if(this._startTime=Date.now(),this.version="2.2.3.6",this.scriptName=scriptName,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this._logLevel="INFO",this.logLevel=logLevel,this._barkUrl="",this._barkKey="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(err){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(url){try{let _url=url.replace(/\/+$/g,"");this._barkUrl=`${/^https?:\/\/([^/]*)/.exec(_url)[0]}/push`,this._barkKey=/\/([^\/]+)\/?$/.exec(_url)[1]}catch(err){this.logDebug("Bark config error.")}}set logLevel(level){let magic_loglevel=this.read("magicjs_loglevel");this._logLevel=magic_loglevel||level.toUpperCase()}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get isDebug(){return"DEBUG"===this.logLevel}get request(){return"undefined"!=typeof $request?$request:void 0}get response(){return"undefined"!=typeof $response?($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response):void 0}get platform(){return this.isSurge?"Surge":this.isQuanX?"Quantumult X":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"Unknown"}read(key,session=""){let val="";this.isSurge||this.isLoon?val=$persistentStore.read(key):this.isQuanX?val=$prefs.valueForKey(key):this.isNode?val=this.node.data:this.isJSBox&&(val=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(val=val[key]),this.isJSBox&&(val=JSON.parse(val)[key]),session&&("string"==typeof val&&(val=JSON.parse(val)),val=val&&"object"==typeof val?val[session]:null)}catch(err){this.logError(err),val=session?{}:null,this.del(key)}void 0===val&&(val=null);try{val&&"string"==typeof val&&(val=JSON.parse(val))}catch(err){}return this.logDebug(`READ DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`),val}write(key,val,session=""){let data=session?{}:"";if(session&&(this.isSurge||this.isLoon)?data=$persistentStore.read(key):session&&this.isQuanX?data=$prefs.valueForKey(key):this.isNode?data=this.node.data:this.isJSBox&&(data=JSON.parse($file.read("drive://MagicJS/magic.json").string)),session){try{"string"==typeof data&&(data=JSON.parse(data)),data="object"==typeof data&&data?data:{}}catch(err){this.logError(err),this.del(key),data={}}this.isJSBox||this.isNode?(data[key]&&"object"==typeof data[key]||(data[key]={}),data[key].hasOwnProperty(session)||(data[key][session]=null),void 0===val?delete data[key][session]:data[key][session]=val):void 0===val?delete data[session]:data[session]=val}else this.isNode||this.isJSBox?void 0===val?delete data[key]:data[key]=val:data=void 0===val?null:val;"object"==typeof data&&(data=JSON.stringify(data)),this.isSurge||this.isLoon?$persistentStore.write(data,key):this.isQuanX?$prefs.setValueForKey(data,key):this.isNode?this.node.fs.writeFileSync("./magic.json",data):this.isJSBox&&$file.write({data:$data({string:data}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`)}del(key,session=""){this.logDebug(`DELETE KEY [${key}]${session?`[${session}]`:""}`),this.write(key,null,session)}notify(title=this.scriptName,subTitle="",body="",opts=""){let convertOptions;if(opts=(_opts=>{let newOpts={};if("string"==typeof _opts)this.isLoon?newOpts={openUrl:_opts}:this.isQuanX?newOpts={"open-url":_opts}:this.isSurge&&(newOpts={url:_opts});else if("object"==typeof _opts)if(this.isLoon)newOpts.openUrl=_opts["open-url"]?_opts["open-url"]:"",newOpts.mediaUrl=_opts["media-url"]?_opts["media-url"]:"";else if(this.isQuanX)newOpts=_opts["open-url"]||_opts["media-url"]?_opts:{};else if(this.isSurge){let openUrl=_opts["open-url"]||_opts.openUrl;newOpts=openUrl?{url:openUrl}:{}}return newOpts})(opts),1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.logNotify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${"object"==typeof opts?JSON.stringify(opts):opts}`),this.isSurge)$notification.post(title,subTitle,body,opts);else if(this.isLoon)opts?$notification.post(title,subTitle,body,opts):$notification.post(title,subTitle,body);else if(this.isQuanX)$notify(title,subTitle,body,opts);else if(this.isJSBox){let push={title:title,body:subTitle?`${subTitle}\n${body}`:body};$push.schedule(push)}this._barkUrl&&this._barkKey&&this.notifyBark(title,subTitle,body)}notifyDebug(title=this.scriptName,subTitle="",body="",opts=""){"DEBUG"===this.logLevel&&(1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.notify(title,subTitle,body,opts))}notifyBark(title=this.scriptName,subTitle="",body="",opts=""){let options={url:this._barkUrl,headers:{"Content-Type":"application/json; charset=utf-8"},body:{title:title,body:subTitle?`${subTitle}\n${body}`:body,device_key:this._barkKey}};this.post(options,err=>{})}log(msg,level="INFO"){this.logLevels[this._logLevel]<this.logLevels[level.toUpperCase()]||console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)}logDebug(msg){this.log(msg,"DEBUG")}logInfo(msg){this.log(msg,"INFO")}logNotify(msg){this.log(msg,"NOTIFY")}logWarning(msg){this.log(msg,"WARNING")}logError(msg){this.log(msg,"ERROR")}logRetry(msg){this.log(msg,"RETRY")}adapterHttpOptions(options,method){let _options="object"==typeof options?Object.assign({},options):{url:options,headers:{}};_options.hasOwnProperty("header")&&!_options.hasOwnProperty("headers")&&(_options.headers=_options.header,delete _options.header),_options.headers&&"object"==typeof _options.headers&&_options.headers["User-Agent"]||(_options.headers&&"object"==typeof _options.headers||(_options.headers={}),this.isNode?_options.headers["User-Agent"]=this.pcUserAgent:_options.headers["User-Agent"]=this.iOSUserAgent);let skipScripting=!1;if(("object"==typeof _options.opts&&(!0===_options.opts.hints||!0===_options.opts["Skip-Scripting"])||"object"==typeof _options.headers&&!0===_options.headers["X-Surge-Skip-Scripting"])&&(skipScripting=!0),skipScripting||(this.isSurge?_options.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?_options.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof _options.opts&&(_options.opts={}),_options.opts.hints=!1)),this.isSurge&&!skipScripting||delete _options.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts,this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts["Skip-Scripting"],"GET"===method&&!this.isNode&&_options.body){let qs=Object.keys(_options.body).map(key=>void 0===_options.body?"":`${encodeURIComponent(key)}=${encodeURIComponent(_options.body[key])}`).join("&");_options.url.indexOf("?")<0&&(_options.url+="?"),_options.url.lastIndexOf("&")+1!=_options.url.length&&_options.url.lastIndexOf("?")+1!=_options.url.length&&(_options.url+="&"),_options.url+=qs,delete _options.body}return this.isQuanX?(_options.hasOwnProperty("body")&&"string"!=typeof _options.body&&(_options.body=JSON.stringify(_options.body)),_options.method=method):this.isNode?(delete _options.headers["Accept-Encoding"],"object"==typeof _options.body&&("GET"===method?(_options.qs=_options.body,delete _options.body):"POST"===method&&(_options.json=!0,_options.body=_options.body))):this.isJSBox&&(_options.header=_options.headers,delete _options.headers),_options}adapterHttpResponse(resp){let _resp={body:resp.body,headers:resp.headers,json:()=>JSON.parse(_resp.body)};return resp.hasOwnProperty("statusCode")&&resp.statusCode&&(_resp.status=resp.statusCode),_resp}get(options,callback){let _options=this.adapterHttpOptions(options,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon?$httpClient.get(_options,callback):this.isQuanX?$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>callback(reason.error,null,null)):this.isNode?this.node.request.get(_options,(err,resp,data)=>{resp=this.adapterHttpResponse(resp),callback(err,resp,data)}):this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.get(_options))}getPromise(options){return new Promise((resolve,reject)=>{magicJS.get(options,(err,resp)=>{err?reject(err):resolve(resp)})})}post(options,callback){let _options=this.adapterHttpOptions(options,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon)$httpClient.post(_options,callback);else if(this.isQuanX)$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>{callback(reason.error,null,null)});else if(this.isNode){let resp=this.node.request.post(_options,callback);resp.status=resp.statusCode,delete resp.statusCode}else this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.post(_options,{}))}done(value={}){this._endTime=Date.now();let span=(this._endTime-this._startTime)/1e3;magicJS.logDebug(`SCRIPT COMPLETED: ${span}S.`),"undefined"!=typeof $done&&$done(value)}isToday(day){if(null==day)return!1;{let today=new Date;return"string"==typeof day&&(day=new Date(day)),today.getFullYear()==day.getFullYear()&&today.getMonth()==day.getMonth()&&today.getDay()==day.getDay()}}isNumber(val){return"NaN"!==parseFloat(val).toString()}attempt(promise,defaultValue=null){return promise.then(args=>[null,args]).catch(ex=>(this.logError(ex),[ex,defaultValue]))}retry(fn,retries=5,interval=0,callback=null){return(...args)=>new Promise((resolve,reject)=>{function _retry(...args){Promise.resolve().then(()=>fn.apply(this,args)).then(result=>{"function"==typeof callback?Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{retries>=1?interval>0?setTimeout(()=>_retry.apply(this,args),interval):_retry.apply(this,args):reject(ex),retries--}):resolve(result)}).catch(ex=>{this.logRetry(ex),retries>=1&&interval>0?setTimeout(()=>_retry.apply(this,args),interval):retries>=1?_retry.apply(this,args):reject(ex),retries--})}_retry.apply(this,args)})}formatTime(time,fmt="yyyy-MM-dd hh:mm:ss"){var o={"M+":time.getMonth()+1,"d+":time.getDate(),"h+":time.getHours(),"m+":time.getMinutes(),"s+":time.getSeconds(),"q+":Math.floor((time.getMonth()+3)/3),S:time.getMilliseconds()};/(y+)/.test(fmt)&&(fmt=fmt.replace(RegExp.$1,(time.getFullYear()+"").substr(4-RegExp.$1.length)));for(let k in o)new RegExp("("+k+")").test(fmt)&&(fmt=fmt.replace(RegExp.$1,1==RegExp.$1.length?o[k]:("00"+o[k]).substr((""+o[k]).length)));return fmt}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(time){return new Promise(resolve=>setTimeout(resolve,time))}}(scriptName)}


const scriptName = "FindMy";
const getDeviceIdRegex = /^https:\/\/p222-fmipmobile\.icloud\.com\.cn\/fmipservice\/device\/\d+\/remove$/;
const getClientListRegex = /^https?:\/\/p222-fmipmobile\.icloud\.com\.cn\/fmipservice\/device\/\d+\/(initClient|refreshClient)$/;
const deviceDiscoveryIdKey = "find_my_device_discovery_id";

const $ = MagicJS(scriptName, "INFO");

(() => {
  let response = null;
  if ($.isRequest && getDeviceIdRegex.test($.request.url)) {
      const deviceDiscoveryId = $.data.read(deviceDiscoveryIdKey, "");
      // 以;分割的设备id
      const deviceIds = deviceDiscoveryId.split(";");
      // 获取当前请求的设备id
      const payload = JSON.parse($.request.body);
      const deviceId = payload["device"];
      // 如果deviceDiscoveryId不在设备列表中，则添加
      if (!deviceIds.includes(deviceId)) {
        deviceIds.push(deviceId);
      }
      $.data.write(deviceDiscoveryIdKey, deviceIds.join(";"));
      $.logger.info(`添加被移除的设备ID：${deviceId}`);
      $.notification.post(`添加被移除的设备ID：${deviceId}`);
  }
  else if ($.isResponse && getClientListRegex.test($.request.url)) {
    try{
      const body = JSON.parse($.response.body);
      const deviceDiscoveryId = $.data.read(deviceDiscoveryIdKey, "");
      // 以;分割的设备id
      const deviceIds = deviceDiscoveryId.split(";");
      // 如果deviceDiscoveryId在设备列表中，则进行过滤
      if (body && body.content) {
        body.content = body.content.filter((item) => {
          if (item["id"] && deviceIds.includes(item["id"])) {
            $.logger.info(`移除已经发现的设备：${item["name"]}`);
            $.logger.info(`移除已经发现的设备：${item["id"]}`);
            return false;
          }
          $.logger.info(`未被移除的设备：${item["name"]}`);
          $.logger.info(`未被移除的设备ID：${item["id"]}`);
          return true;
        });

      }
      response = {
        body: JSON.stringify(body)
      };
    }
    catch(e){
      $.logger.error(`移除无效设备失败：${e}`)
    }
  } else {
    $.logger.warning(`触发意外的请求处理，请确认脚本或复写配置正常。\n
    请求地址：${$.request.url}\n请求类型：${$.request.method}\n请求头部：${JSON.stringify($.request.headers)}\n请求正文：${$.request.body}`);
  }
  if (response) {
    $.done(response);
  } else {
    $.done();
  }
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
// @formatter:off
function MagicJS(scriptName="MagicJS",logLevel="INFO"){const MagicEnvironment=()=>{const isLoon=typeof $loon!=="undefined";const isQuanX=typeof $task!=="undefined";const isNode=typeof module!=="undefined";const isSurge=typeof $httpClient!=="undefined"&&!isLoon;const isStorm=typeof $storm!=="undefined";const isStash=typeof $environment!=="undefined"&&typeof $environment["stash-build"]!=="undefined";const isSurgeLike=isSurge||isLoon||isStorm||isStash;const isScriptable=typeof importModule!=="undefined";return{isLoon:isLoon,isQuanX:isQuanX,isNode:isNode,isSurge:isSurge,isStorm:isStorm,isStash:isStash,isSurgeLike:isSurgeLike,isScriptable:isScriptable,get name(){if(isLoon){return"Loon"}else if(isQuanX){return"QuantumultX"}else if(isNode){return"NodeJS"}else if(isSurge){return"Surge"}else if(isScriptable){return"Scriptable"}else{return"unknown"}},get build(){if(isSurge){return $environment["surge-build"]}else if(isStash){return $environment["stash-build"]}else if(isStorm){return $storm.buildVersion}},get language(){if(isSurge||isStash){return $environment["language"]}},get version(){if(isSurge){return $environment["surge-version"]}else if(isStash){return $environment["stash-version"]}else if(isStorm){return $storm.appVersion}else if(isNode){return process.version}},get system(){if(isSurge){return $environment["system"]}else if(isNode){return process.platform}},get systemVersion(){if(isStorm){return $storm.systemVersion}},get deviceName(){if(isStorm){return $storm.deviceName}}}};const MagicLogger=(scriptName,logLevel="INFO")=>{let _level=logLevel;const logLevels={SNIFFER:6,DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};const logEmoji={SNIFFER:"",DEBUG:"",INFO:"",NOTIFY:"",WARNING:"❗ ",ERROR:"❌ ",CRITICAL:"❌ ",NONE:""};const _log=(msg,level="INFO")=>{if(!(logLevels[_level]<logLevels[level.toUpperCase()]))console.log(`[${level}] [${scriptName}]\n${logEmoji[level.toUpperCase()]}${msg}\n`)};const setLevel=logLevel=>{_level=logLevel};return{getLevel:()=>{return _level},setLevel:setLevel,sniffer:msg=>{_log(msg,"SNIFFER")},debug:msg=>{_log(msg,"DEBUG")},info:msg=>{_log(msg,"INFO")},notify:msg=>{_log(msg,"NOTIFY")},warning:msg=>{_log(msg,"WARNING")},error:msg=>{_log(msg,"ERROR")},retry:msg=>{_log(msg,"RETRY")}}};return new class{constructor(scriptName,logLevel){this._startTime=Date.now();this.version="3.0.0";this.scriptName=scriptName;this.env=MagicEnvironment();this.logger=MagicLogger(scriptName,logLevel);this.http=typeof MagicHttp==="function"?MagicHttp(this.env,this.logger):undefined;this.data=typeof MagicData==="function"?MagicData(this.env,this.logger):undefined;this.notification=typeof MagicNotification==="function"?MagicNotification(this.scriptName,this.env,this.logger,this.http):undefined;this.utils=typeof MagicUtils==="function"?MagicUtils(this.env,this.logger):undefined;this.qinglong=typeof MagicQingLong==="function"?MagicQingLong(this.env,this.data,this.logger):undefined;if(typeof this.data!=="undefined"){let magicLoglevel=this.data.read("magic_loglevel");const barkUrl=this.data.read("magic_bark_url");if(magicLoglevel){this.logger.setLevel(magicLoglevel.toUpperCase())}if(barkUrl){this.notification.setBark(barkUrl)}}}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get isDebug(){return this.logger.level==="DEBUG"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}done=(value={})=>{this._endTime=Date.now();let span=(this._endTime-this._startTime)/1e3;this.logger.info(`SCRIPT COMPLETED: ${span} S.`);if(typeof $done!=="undefined"){$done(value)}}}(scriptName,logLevel)}
function MagicNotification(scriptName,env,logger,http){let _barkUrl=null;let _barkKey=null;const setBark=url=>{try{let _url=url.replace(/\/+$/g,"");_barkUrl=`${/^https?:\/\/([^/]*)/.exec(_url)[0]}/push`;_barkKey=/\/([^\/]+)\/?$/.exec(_url)[1]}catch(ex){logger.error(`Bark url error: ${ex}.`)}};function post(title=scriptName,subTitle="",body="",opts=""){const _adaptOpts=_opts=>{try{let newOpts={};if(typeof _opts==="string"){if(env.isLoon)newOpts={openUrl:_opts};else if(env.isQuanX)newOpts={"open-url":_opts};else if(env.isSurge)newOpts={url:_opts}}else if(typeof _opts==="object"){if(env.isLoon){newOpts["openUrl"]=!!_opts["open-url"]?_opts["open-url"]:"";newOpts["mediaUrl"]=!!_opts["media-url"]?_opts["media-url"]:""}else if(env.isQuanX){newOpts=!!_opts["open-url"]||!!_opts["media-url"]?_opts:{}}else if(env.isSurge){let openUrl=_opts["open-url"]||_opts["openUrl"];newOpts=openUrl?{url:openUrl}:{}}}return newOpts}catch(err){logger.error(`通知选项转换失败${err}`)}return _opts};opts=_adaptOpts(opts);if(arguments.length===1){title=scriptName;subTitle="",body=arguments[0]}logger.notify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${typeof opts==="object"?JSON.stringify(opts):opts}`);if(env.isSurge){$notification.post(title,subTitle,body,opts)}else if(env.isLoon){if(!!opts)$notification.post(title,subTitle,body,opts);else $notification.post(title,subTitle,body)}else if(env.isQuanX){$notify(title,subTitle,body,opts)}if(_barkUrl&&_barkKey){bark(title,subTitle,body)}}function debug(title=scriptName,subTitle="",body="",opts=""){if(logger.getLevel()==="DEBUG"){if(arguments.length===1){title=scriptName;subTitle="";body=arguments[0]}this.post(title,subTitle,body,opts)}}function bark(title=scriptName,subTitle="",body="",opts=""){if(typeof http==="undefined"||typeof http.post==="undefined"){throw"Bark notification needs to import MagicHttp module."}let options={url:_barkUrl,headers:{"content-type":"application/json; charset=utf-8"},body:{title:title,body:subTitle?`${subTitle}\n${body}`:body,device_key:_barkKey}};http.post(options).catch(ex=>{logger.error(`Bark notify error: ${ex}`)})}return{post:post,debug:debug,bark:bark,setBark:setBark}}
function MagicData(env,logger){let node={fs:undefined,data:{}};if(env.isNode){node.fs=require("fs");try{node.fs.accessSync("./magic.json",node.fs.constants.R_OK|node.fs.constants.W_OK)}catch(err){node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}node.data=require("./magic.json")}const defaultValueComparator=(oldVal,newVal)=>{if(typeof newVal==="object"){return false}else{return oldVal===newVal}};const _typeConvertor=val=>{if(val==="true"){return true}else if(val==="false"){return false}else if(typeof val==="undefined"){return null}else{return val}};const _valConvertor=(val,default_,session,read_no_session)=>{if(session){try{if(typeof val==="string")val=JSON.parse(val);if(val["magic_session"]===true){val=val[session]}else{val=null}}catch{val=null}}if(typeof val==="string"&&val!=="null"){try{val=JSON.parse(val)}catch{}}if(read_no_session===false&&!!val&&val["magic_session"]===true){val=null}if((val===null||typeof val==="undefined")&&default_!==null&&typeof default_!=="undefined"){val=default_}val=_typeConvertor(val);return val};const convertToObject=obj=>{if(typeof obj==="string"){let data={};try{data=JSON.parse(obj);const type=typeof data;if(type!=="object"||data instanceof Array||type==="bool"||data===null){data={}}}catch{}return data}else if(obj instanceof Array||obj===null||typeof obj==="undefined"||obj!==obj||typeof obj==="boolean"){return{}}else{return obj}};const readForNode=(key,default_=null,session="",read_no_session=false,externalData=null)=>{let data=externalData||node.data;if(!!data&&typeof data[key]!=="undefined"&&data[key]!==null){val=data[key]}else{val=!!session?{}:null}val=_valConvertor(val,default_,session,read_no_session);return val};const read=(key,default_=null,session="",read_no_session=false,externalData=null)=>{let val="";if(externalData||env.isNode){val=readForNode(key,default_,session,read_no_session,externalData)}else{if(env.isSurgeLike){val=$persistentStore.read(key)}else if(env.isQuanX){val=$prefs.valueForKey(key)}val=_valConvertor(val,default_,session,read_no_session)}logger.debug(`READ DATA [${key}]${!!session?`[${session}]`:""} <${typeof val}>\n${JSON.stringify(val)}`);return val};const writeForNode=(key,val,session="",externalData=null)=>{let data=externalData||node.data;data=convertToObject(data);if(!!session){let obj=convertToObject(data[key]);obj["magic_session"]=true;obj[session]=val;data[key]=obj}else{data[key]=val}if(externalData!==null){externalData=data}return data};const write=(key,val,session="",externalData=null)=>{if(typeof val==="undefined"||val!==val){return false}if(!env.isNode&&(typeof val==="boolean"||typeof val==="number")){val=String(val)}let data="";if(externalData||env.isNode){data=writeForNode(key,val,session,externalData)}else{if(!session){data=val}else{if(env.isSurgeLike){data=!!$persistentStore.read(key)?$persistentStore.read(key):data}else if(env.isQuanX){data=!!$prefs.valueForKey(key)?$prefs.valueForKey(key):data}data=convertToObject(data);data["magic_session"]=true;data[session]=val}}if(!!data&&typeof data==="object"){data=JSON.stringify(data,null,4)}logger.debug(`WRITE DATA [${key}]${session?`[${session}]`:""} <${typeof val}>\n${JSON.stringify(val)}`);if(!externalData){if(env.isSurgeLike){return $persistentStore.write(data,key)}else if(env.isQuanX){return $prefs.setValueForKey(data,key)}else if(env.isNode){try{node.fs.writeFileSync("./magic.json",data);return true}catch(err){logger.error(err);return false}}}return true};const update=(key,val,session,comparator=defaultValueComparator,externalData=null)=>{val=_typeConvertor(val);const oldValue=read(key,null,session,false,externalData);if(comparator(oldValue,val)===true){return false}else{const result=write(key,val,session,externalData);let newVal=read(key,null,session,false,externalData);if(comparator===defaultValueComparator&&typeof newVal==="object"){return result}return comparator(val,newVal)}};const delForNode=(key,session,externalData)=>{let data=externalData||node.data;data=convertToObject(data);if(!!session){obj=convertToObject(data[key]);delete obj[session];data[key]=obj}else{delete data[key]}if(!!externalData){externalData=data}return data};const del=(key,session="",externalData=null)=>{let data={};if(externalData||env.isNode){data=delForNode(key,session,externalData);if(!externalData){node.fs.writeFileSync("./magic.json",JSON.stringify(data,null,4))}else{externalData=data}}else{if(!session){if(env.isStorm){return $persistentStore.remove(key)}else if(env.isSurgeLike){return $persistentStore.write(null,key)}else if(env.isQuanX){return $prefs.removeValueForKey(key)}}else{if(env.isSurgeLike){data=$persistentStore.read(key)}else if(env.isQuanX){data=$prefs.valueForKey(key)}data=convertToObject(data);delete data[session];const json=JSON.stringify(data,null,4);write(key,json)}}logger.debug(`DELETE KEY [${key}]${!!session?`[${session}]`:""}`)};const allSessionNames=(key,externalData=null)=>{let _sessions=[];let data=read(key,null,null,true,externalData);data=convertToObject(data);if(data["magic_session"]!==true){_sessions=[]}else{_sessions=Object.keys(data).filter(key=>key!=="magic_session")}logger.debug(`READ ALL SESSIONS [${key}] <${typeof _sessions}>\n${JSON.stringify(_sessions,null,4)}`);return _sessions};const allSessions=(key,externalData=null)=>{let _sessions={};let data=read(key,null,null,true,externalData);data=convertToObject(data);if(data["magic_session"]===true){_sessions={...data};delete _sessions["magic_session"]}logger.debug(`READ ALL SESSIONS [${key}] <${typeof _sessions}>\n${JSON.stringify(_sessions,null,4)}`);return _sessions};return{read:read,write:write,del:del,update:update,allSessions:allSessions,allSessionNames:allSessionNames,defaultValueComparator:defaultValueComparator,convertToObject:convertToObject}}
// @formatter:on
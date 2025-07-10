const scriptName = "去除APP启动广告";
const $ = MagicJS(scriptName, "INFO");

(() => {
  let response = null;
  if ($.isResponse) {
    switch (true) {
      // 爱奇艺
      case /^https?:\/\/\w*\.cupid\.iqiyi\.com\/mixer\?/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          delete obj["adSlots"];
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          $.logger.error(`爱奇艺开屏去广告出现异常：${err}`);
        }
        break;
      // BiliBili
      case /^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          obj["data"]["max_time"] = 0;
          obj["data"]["min_interval"] = 31536000;
          obj["data"]["pull_interval"] = 31536000;
          // for (let i = 0; i < obj["data"]["show"].length; i++) {
          //   obj["data"]["show"][i]["begin_time"] = 1915027200;
          //   obj["data"]["show"][i]["end_time"] = 1924272000;
          // }
          obj["data"]["list"]["show"] = [];
          for (let i = 0; i < obj["data"]["list"].length; i++) {
            obj["data"]["list"][i]["duration"] = 0;
            obj["data"]["list"][i]["begin_time"] = 1915027200;
            obj["data"]["list"][i]["end_time"] = 1924272000;
          }
          body = JSON.stringify(obj);
        } catch (err) {
          $.logger.error(`BiliBili开屏去广告出现异常：${err}`);
        }
        break;
      // Fa米家
      case /^https?:\/\/fmapp\.chinafamilymart\.com\.cn\/api\/app\/market\/start\/ad/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          if (obj.code === "200") {
            obj.data.relayDisplayUrl = "";
          }
          obj.data = {};
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          $.logger.error(`Fa米家开屏去广告出现异常：${err}`);
        }
      // 嘀嗒出行
      case /^https?:\/\/capis(-?\w*)?\.didapinche\.com\/ad\/cx\/startup\?/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          if (obj.hasOwnProperty("startupPages") === true) {
            obj.show_time = 1;
            obj.full_screen = 0;
            let startupPages = [];
            obj.startupPages.forEach((element) => {
              element["width"] = 1;
              element["height"] = 1;
              element["page_url"] = "#";
              element["create_time"] = "20990101000000";
              element["start_time"] = "20990101000000";
              element["end_time"] = "20990101000000";
              startupPages.push(element);
            });
            obj.startupPages = startupPages;
            response = { body: JSON.stringify(obj) };
          }
        } catch (err) {
          $.logger.error(`嘀嗒出行开屏去广告出现异常：${err}`);
        }
        break;
      // 美团外卖
      case /^https?:\/\/wmapi\.meituan\.com\/api\/v\d+\/loadInfo?/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          if (obj.data.startpicture.hasOwnProperty("ad")) {
            obj.data.startpicture.ad = [];
          } else if (obj.data.startpicture.hasOwnProperty("mk")) {
            obj.data.startpicture.mk = [];
          } else {
            obj.data.startpicture = [];
          }
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          $.logger.error(`美团外卖开屏去广告出现异常：${err}`);
        }
        break;
      // 小爱音箱
      case /^https?:\/\/hd\.mina\.mi\.com\/splashscreen\/alert/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          let data = [];
          for (let i = 0; i < obj.data.length; i++) {
            let ad = obj.data[i];
            ad.start = "1924272000000";
            ad.end = "1924358400000";
            ad.stay = 1;
            ad.maxTimes = 1;
            data.push(ad);
          }
          obj.data = data;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          $.logger.error(`小爱音箱开屏去广告出现异常：${err}`);
        }
        break;
      // 京东
      case /^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=start/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          for (let i = 0; i < obj.images.length; i++) {
            for (let j = 0; j < obj.images[i].length; j++) {
              if (obj.images[i][j].showTimes) {
                obj.images[i][j].showTimes = 0;
                obj.images[i][j].onlineTime = "2030-12-24 00:00:00";
                obj.images[i][j].referralsTime = "2030-12-25 00:00:00";
                obj.images[i][j].time = 0;
              }
            }
          }
          obj.countdown = 100;
          obj.showTimesDaily = 0;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          $.logger.error(`京东开屏去广告出现异常：${err}`);
        }
        break;
      // 联享家
      case /^https?:\/\/mi\.gdt\.qq\.com\/gdt_mview.fcg/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          obj.seq = "0";
          obj.reqinterval = 0;
          delete obj["last_ads"];
          delete obj.data;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          $.logger.error(`联享家开屏去广告出现异常：${err}`);
        }
        break;
      // 多点
      case /^https?:\/\/cmsapi\.dmall\.com\/app\/home\/homepageStartUpPic/.test($.request.url):
        try {
          let obj = JSON.parse($.response.body);
          for (let i = 0; i < obj["data"]["welcomePage"].length; i++) {
            obj["data"]["welcomePage"][i]["onlineTime"] = 1915027200000;
            obj["data"]["welcomePage"][i]["offlineTime"] = 1924272000000;
          }
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          $.logger.error(`多点开屏广告处理出现异常：${err}`);
        }
        break;
      // 轻牛健康
      case /^https?:\/\/gw\.yolanda\.hk\/api\/servlets\?endpoint=banners\/show_launch_banner/.test($.request.url):
        try {
            let obj = {
              "code": "200",
              "msg": "ok",
              "data": {
                "present_flag": 1,
                "banner": {
                  "banner_id": "1861064161258799417",
                  "image": "http://qnplus-banner.glb.qnniu.com/banner_1636700135",
                  "image_type": 1,
                  "jump_link": "https://app-h5.yolanda.hk/redirect_center.html?type=fascia_gun",
                  "jump_type": 1,
                  "duration": 5,
                  "frequency": 1,
                  "updated_at": 1638157314
                }
              }
            }
            response = { body: JSON.stringify(obj) };
        } catch (err) {
          $.logger.error(`轻牛健康开屏广告处理出现异常：${err}`);
        }
        break;
      default:
        $.logger.warning(`触发意外的请求处理，请确认脚本或复写配置正常。URL:\n${$.request.url}`);
        break;
    }
  } else {
    $.logger.warning(`触发意外的请求处理，请确认脚本或复写配置正常。URL:\n${$.request.url}`);
  }
  if (response) {
    $.done(response);
  } else {
    $.done();
  }
})();

// prettier-ignore
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
function MagicJS(scriptName="MagicJS",logLevel="INFO"){const MagicEnvironment=()=>{const isLoon=typeof $loon!=="undefined";const isQuanX=typeof $task!=="undefined";const isNode=typeof module!=="undefined";const isSurge=typeof $httpClient!=="undefined"&&!isLoon;const isStorm=typeof $storm!=="undefined";const isStash=typeof $environment!=="undefined"&&typeof $environment["stash-build"]!=="undefined";const isSurgeLike=isSurge||isLoon||isStorm||isStash;const isScriptable=typeof importModule!=="undefined";return{isLoon:isLoon,isQuanX:isQuanX,isNode:isNode,isSurge:isSurge,isStorm:isStorm,isStash:isStash,isSurgeLike:isSurgeLike,isScriptable:isScriptable,get name(){if(isLoon){return"Loon"}else if(isQuanX){return"QuantumultX"}else if(isNode){return"NodeJS"}else if(isSurge){return"Surge"}else if(isScriptable){return"Scriptable"}else{return"unknown"}},get build(){if(isSurge){return $environment["surge-build"]}else if(isStash){return $environment["stash-build"]}else if(isStorm){return $storm.buildVersion}},get language(){if(isSurge||isStash){return $environment["language"]}},get version(){if(isSurge){return $environment["surge-version"]}else if(isStash){return $environment["stash-version"]}else if(isStorm){return $storm.appVersion}else if(isNode){return process.version}},get system(){if(isSurge){return $environment["system"]}else if(isNode){return process.platform}},get systemVersion(){if(isStorm){return $storm.systemVersion}},get deviceName(){if(isStorm){return $storm.deviceName}}}};const MagicLogger=(scriptName,logLevel="INFO")=>{let _level=logLevel;const logLevels={SNIFFER:6,DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};const logEmoji={SNIFFER:"",DEBUG:"",INFO:"",NOTIFY:"",WARNING:"❗ ",ERROR:"❌ ",CRITICAL:"❌ ",NONE:""};const _log=(msg,level="INFO")=>{if(!(logLevels[_level]<logLevels[level.toUpperCase()]))console.log(`[${level}] [${scriptName}]\n${logEmoji[level.toUpperCase()]}${msg}\n`)};const setLevel=logLevel=>{_level=logLevel};return{getLevel:()=>{return _level},setLevel:setLevel,sniffer:msg=>{_log(msg,"SNIFFER")},debug:msg=>{_log(msg,"DEBUG")},info:msg=>{_log(msg,"INFO")},notify:msg=>{_log(msg,"NOTIFY")},warning:msg=>{_log(msg,"WARNING")},error:msg=>{_log(msg,"ERROR")},retry:msg=>{_log(msg,"RETRY")}}};return new class{constructor(scriptName,logLevel){this._startTime=Date.now();this.version="3.0.0";this.scriptName=scriptName;this.env=MagicEnvironment();this.logger=MagicLogger(scriptName,logLevel);this.http=typeof MagicHttp==="function"?MagicHttp(this.env,this.logger):undefined;this.data=typeof MagicData==="function"?MagicData(this.env,this.logger):undefined;this.notification=typeof MagicNotification==="function"?MagicNotification(this.scriptName,this.env,this.logger,this.http):undefined;this.utils=typeof MagicUtils==="function"?MagicUtils(this.env,this.logger):undefined;this.qinglong=typeof MagicQingLong==="function"?MagicQingLong(this.env,this.data,this.logger):undefined;if(typeof this.data!=="undefined"){let magicLoglevel=this.data.read("magic_loglevel");const barkUrl=this.data.read("magic_bark_url");if(magicLoglevel){this.logger.setLevel(magicLoglevel.toUpperCase())}if(barkUrl){this.notification.setBark(barkUrl)}}}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get isDebug(){return this.logger.level==="DEBUG"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}done=(value={})=>{this._endTime=Date.now();let span=(this._endTime-this._startTime)/1e3;this.logger.info(`SCRIPT COMPLETED: ${span} S.`);if(typeof $done!=="undefined"){$done(value)}}}(scriptName,logLevel)}

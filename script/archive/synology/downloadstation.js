const scriptName = "Download Station";
const synoUrlKey = "syno_https_url";
const synoAccountKey = "syno_account";
const synoPasswdKey = "syno_passwd";
const synoSidKey = "syno_sid";
let subDirs = [];
let magicJS = MagicJS(scriptName, "INFO");

function SynoAuth(synoUrl, account, passwd) {
  return new Promise((resolve, reject) => {
    let options = {
      url: `${synoUrl}/webapi/entry.cgi?api=SYNO.API.Auth&version=6&method=login&account=${account}&passwd=${passwd}`,
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    };
    magicJS.get(options, (err, resp, data) => {
      if (err) {
        magicJS.logError(`登录DownloadStation失败，请求异常：${err}`);
        reject("❌登录DownloadStation失败，请求异常，请查阅日志！");
      } else {
        try {
          magicJS.logDebug(`接口响应数据：${data}`);
          let obj = typeof data === "string" ? JSON.parse(data) : data;
          if (obj.success === true) {
            magicJS.logDebug(`登录获取的sid：${obj.data.sid}`);
            resolve(obj.data.sid);
          } else {
            magicJS.logWarning(`登录DownloadStation失败，接口响应：${data}`);
            reject(data);
          }
        } catch (err) {
          magicJS.logError(`登录DownloadStation失败，执行异常：${err}，接口响应：${data}`);
          reject(data);
        }
      }
    });
  });
}

function AddTask(synoUrl, sid, uri, destination) {
  return new Promise((resolve) => {
    let options = {
      url: `${synoUrl}/webapi/DownloadStation/task.cgi`,
      body: `_sid=${sid}&api=SYNO.DownloadStation.Task&version=1&method=create&destination=${destination}&uri=${uri}`,
    };
    magicJS.post(options, (err, resp, data) => {
      if (err) {
        magicJS.logError(`添加下载任务失败，请求异常：${err}`);
        resolve(false);
      } else {
        try {
          let obj = typeof data === "string" ? JSON.parse(data) : data;
          if (obj.success === true) {
            resolve(true);
          } else {
            magicJS.logWarning(`添加下载任务失败，接口响应：${data}`);
            resolve(false);
          }
        } catch (err) {
          magicJS.logError(`添加下载任务失败，执行异常：${err}，接口响应：${data}`);
          resolve(false);
        }
      }
    });
  });
}

/**
 * 获取DownloadStation下载位置
 * @param {*} synoUrl
 * @param {*} sid
 * @returns
 */
function GetLocation(synoUrl, sid) {
  return new Promise((resolve) => {
    let options = {
      url: `${synoUrl}/webapi/DownloadStation/entry.cgi`,
      body: `_sid=${sid}&api=SYNO.DownloadStation2.Settings.Location&version=1&method=get`,
    };
    magicJS.post(options, (err, resp, data) => {
      if (err) {
        magicJS.logError(`添加下载任务失败，请求异常：${err}`);
        resolve(false);
      } else {
        try {
          let obj = typeof data === "string" ? JSON.parse(data) : data;
          if (obj.success === true) {
            resolve(obj.data.default_destination);
          } else {
            magicJS.logWarning(`添加下载任务失败，接口响应：${data}`);
            resolve("");
          }
        } catch (err) {
          magicJS.logError(`添加下载任务失败，执行异常：${err}，接口响应：${data}`);
          resolve("");
        }
      }
    });
  });
}

/**
 * 创建下载目录
 * @param {*} synoUrl
 * @param {*} sid
 * @param {*} folderPath
 * @param {*} folderName
 * @returns
 */
function CreateFolder(synoUrl, sid, folderPath, folderName) {
  magicJS.logInfo(`创建下载目录，路径: ${folderPath}/${folderName}`);
  return new Promise((resolve, reject) => {
    let options = {
      url: encodeURI(`${synoUrl}/webapi/entry.cgi?_sid=${sid}&api=SYNO.FileStation.CreateFolder&force_parent=true&version=2&method=create&folder_path=["${folderPath}"]&name=["${folderName}"]`),
    };
    magicJS.get(options, (err, resp, data) => {
      if (err) {
        magicJS.logError(`创建文件目录失败，请求异常：${err}`);
        reject(false);
      } else {
        try {
          let obj = typeof data === "string" ? JSON.parse(data) : data;
          if (obj.success === true) {
            resolve(true);
          } else if (obj.error.code === "119") {
            magicJS.logWarning(`SID not found，接口响应：${data}`);
            magicJS.write(synoSidKey, "");
            reject(data);
          } else {
            magicJS.logWarning(`创建文件目录失败，接口响应：${data}`);
            reject(data);
          }
        } catch (err) {
          magicJS.logError(`创建文件目录失败，执行异常：${err}，接口响应：${data}`);
          reject(data);
        }
      }
    });
  });
}

async function CreateTasks(media, synoSid, synoUrl, synoAccount, synoPasswd, appName, subDirs) {
  let decodeMedia = [];
  let synoDestination = "";
  for (let i = 0; i < media.length; i++) {
    decodeMedia.push(encodeURIComponent(media[i]));
  }

  // 获取sid
  if (!!!synoSid) {
    await SynoAuth(synoUrl, synoAccount, synoPasswd)
      .then((value) => {
        synoSid = value;
        magicJS.write(synoSidKey, synoSid);
      })
      .catch((err) => magicJS.notify(`登录失败，异常信息：${err}`));
  }

  // 获取DownloadStation默认目录
  await GetLocation(synoUrl, synoSid).then((value) => {
    synoDestination = value;
    magicJS.logInfo(`当前下载目录：${synoDestination}`);
  });

  // 创建多层级目录
  let folderPath = `/${synoDestination}/${appName}`;
  for (let i = 0; i < subDirs.length; i++) {
    await magicJS
      .retry(CreateFolder, 1, 100)(synoUrl, synoSid, folderPath, subDirs[i])
      .then((value) => {
        if (value === true) {
          let msg = "创建下载目录成功";
          magicJS.logInfo(msg);
        }
      })
      .catch((err) => {
        let errMsg = `在群晖上创建目录失败，异常信息：${err}`;
        magicJS.logError(errMsg);
        magicJS.notify(errMsg);
      });
    folderPath = `${folderPath}/${subDirs[i]}`;
  }

  // 添加下载任务
  let uri = decodeMedia.join(",");
  // 必须删除路径 /donwloads 前面的第一个 /，否则群晖接口会返回目录不存在
  let downloadDir = folderPath.slice(1);
  let result = await AddTask(synoUrl, synoSid, uri, downloadDir);
  return result;
}

(async () => {
  // 群晖 Download Station 配置检查
  let synoUrl = magicJS.read(synoUrlKey);
  let synoAccount = magicJS.read(synoAccountKey);
  let synoPasswd = magicJS.read(synoPasswdKey);
  let synoSid = magicJS.read(synoSidKey);
  let media = {};
  let appName = "";
  if (!synoUrl || !synoAccount || !synoPasswd) {
    magicJS.logWarning("请先在BoxJS中配置DownloadStation");
    magicJS.notify("请先在BoxJS中配置DownloadStation");
    return;
  }

  if (magicJS.isResponse) {
    // Twitter 收藏下载
    if (/^https?:\/\/api\.twitter\.com\/[0-9.]*\/favorites\/create.json/.test(magicJS.request.url) === true) {
      appName = "twitter";
      let body = JSON.parse(magicJS.response.body);
      media = downloadTwitterMedia(body);

      // 网易云课堂 课程下载
    } else if (/^https?:\/\/ke\.study\.youdao\.com\/course\/app\/detail.json/.test(magicJS.request.url) === true) {
      appName = "163study";
      let body = JSON.parse(magicJS.response.body);
      media = download163StudyMedia(body);
      subDirs = [replaceName(body.data.courseTitle)];
    }

    // 提交给群晖DownloadStation离线下载
    if (media) {
      let mediaLength = media.length;
      let success = 0;
      let failure = 0;
      for (let i = 0; i < mediaLength; i++) {
        try {
          let result = await CreateTasks(media[i].url, synoSid, synoUrl, synoAccount, synoPasswd, appName, subDirs.concat(media[i].title));
          if (result === true) {
            success += 1;
            magicJS.notify(`${scriptName}`, `添加成功 ${success}/${failure}/${success + failure}/${mediaLength}`, `${media[i].url.join("\n")}`);
          } else if (media[i]) {
            failure += 1;
            magicJS.notify(scriptName, `添加失败 ${success}/${failure}/${success + failure}/${mediaLength}`, `${media[i].url.join("\n")}`);
          } else {
            failure += 1;
            magicJS.notify(scriptName, `添加失败 ${success}/${failure}/${success + failure}/${mediaLength}`);
          }
        } catch (err) {
          let errMsg = `添加任务失败，异常信息：${err}`;
          magicJS.logError(errMsg);
          magicJS.notify(errMsg);
        }
        // 休息一会
        magicJS.sleep(0.1);
      }
      if (success + failure > 1){
        magicJS.notify(scriptName, "任务添加完毕", `计划添加任务${mediaLength}个，成功${success}个，失败${failure}个，实际执行${success + failure}个。`);
      }
    }
  } else {
    await SynoAuth(synoUrl, synoAccount, synoPasswd)
      .then((value) => {
        let msg = `登录成功，获取Sid：${value}`;
        magicJS.notify(msg);
        magicJS.logInfo(msg);
        synoSid = value;
        magicJS.write(synoSidKey, synoSid);
      })
      .catch((err) => {
        magicJS.notify(`登录失败，异常信息：${err}`);
      });
  }
  magicJS.done();
})();

function replaceName(name) {
  return name
    .replace(" ", "")
    .replace("/", "_")
    .replace("\\", "_")
    .replace("(", "")
    .replace("（", "")
    .replace("【", "")
    .replace(")", "_")
    .replace("）", "_")
    .replace("】", "_")
    .replace(":", "_")
    .replace("*", "_")
    .replace("?", "_")
    .replace('"', "_")
    .replace("<", "_")
    .replace(">", "_")
    .replace("|", "_")
    .replace("·", "_");
}

/**
 * 推特收藏图片和视频下载
 *
 * @param {*} obj
 * @return {*}
 */
function downloadTwitterMedia(obj) {
  try {
    let media = { title: "", url: [] };
    // 获取媒体url
    if (obj.extended_entities && obj.extended_entities.media) {
      obj.extended_entities.media.forEach((element) => {
        // 使用推文作者名称作为子目录名
        userName = obj.user.screen_name.replace(/[^a-zA-Z0-9]+/, "");
        media["title"] = userName;
        magicJS.logDebug(`当前推文的用户：${userName}`);
        if (element.type == "photo") {
          media['url'].push(element.media_url);
        } else if (element.type == "video") {
          let maxBitrate = 0;
          let videoUrl = "";
          element.video_info.variants.forEach((video) => {
            if (video.bitrate && video.bitrate > maxBitrate) {
              maxBitrate = video.bitrate;
              videoUrl = video.url;
            }
          });
          media['url'].push(videoUrl);
        }
      });
    }
    return [media];
  } catch (err) {
    magicJS.logError(`添加下载任务失败，异常信息：${err}`);
    magicJS.notify("添加下载任务失败，请查阅日志");
  }
  return media;
}

/**
 * 网易云课堂课程下载
 *
 * @param {*} body
 * @return {*}
 */
function download163StudyMedia(body) {
  try {
    if (body.data && body.data.schedule) {
      let downlodaFiles = [];
      body.data.schedule.forEach((element) => {
        element.list.forEach((item) => {
          if (item.hasOwnProperty("list")) {
            item.list.forEach((media) => {
              if (media.hasOwnProperty("videoDuration")) {
                // 替换某些不能当文件夹或文件名的字符
                let title = replaceName(media.downloadTitle);
                downlodaFiles.push({
                  title: title,
                  url: [media.video.downloadUrl],
                });
              }
            });
          }
        });
      });
      magicJS.logInfo(JSON.stringify(downlodaFiles));
      magicJS.notify(`共发现${downlodaFiles.length}个课程视频，添加任务期间可能造成网易云课堂阻塞，请耐心等待。`);
      return downlodaFiles;
    } else {
      magicJS.logError("网易云课堂接口返回数据错误。");
      magicJS.notify("获取课程视频失败，网易云课堂接口返回数据错误。");
    }
  } catch (err) {
    magicJS.logError(`下载网易云课堂视频失败，异常信息：${err}`);
    magicJS.notifyDebug("下载网易云课堂视频失败，请查阅日志。");
  }
}

// prettier-ignore
function MagicJS(scriptName="MagicJS",logLevel="INFO"){return new class{constructor(){if(this._startTime=Date.now(),this.version="2.2.3.6",this.scriptName=scriptName,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this._logLevel="INFO",this.logLevel=logLevel,this._barkUrl="",this._barkKey="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(err){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(url){try{let _url=url.replace(/\/+$/g,"");this._barkUrl=`${/^https?:\/\/([^/]*)/.exec(_url)[0]}/push`,this._barkKey=/\/([^\/]+)\/?$/.exec(_url)[1]}catch(err){this.logDebug("Bark config error.")}}set logLevel(level){let magic_loglevel=this.read("magicjs_loglevel");this._logLevel=magic_loglevel||level.toUpperCase()}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get isDebug(){return"DEBUG"===this.logLevel}get request(){return"undefined"!=typeof $request?$request:void 0}get response(){return"undefined"!=typeof $response?($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response):void 0}get platform(){return this.isSurge?"Surge":this.isQuanX?"Quantumult X":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"Unknown"}read(key,session=""){let val="";this.isSurge||this.isLoon?val=$persistentStore.read(key):this.isQuanX?val=$prefs.valueForKey(key):this.isNode?val=this.node.data:this.isJSBox&&(val=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(val=val[key]),this.isJSBox&&(val=JSON.parse(val)[key]),session&&("string"==typeof val&&(val=JSON.parse(val)),val=val&&"object"==typeof val?val[session]:null)}catch(err){this.logError(err),val=session?{}:null,this.del(key)}void 0===val&&(val=null);try{val&&"string"==typeof val&&(val=JSON.parse(val))}catch(err){}return this.logDebug(`READ DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`),val}write(key,val,session=""){let data=session?{}:"";if(session&&(this.isSurge||this.isLoon)?data=$persistentStore.read(key):session&&this.isQuanX?data=$prefs.valueForKey(key):this.isNode?data=this.node.data:this.isJSBox&&(data=JSON.parse($file.read("drive://MagicJS/magic.json").string)),session){try{"string"==typeof data&&(data=JSON.parse(data)),data="object"==typeof data&&data?data:{}}catch(err){this.logError(err),this.del(key),data={}}this.isJSBox||this.isNode?(data[key]&&"object"==typeof data[key]||(data[key]={}),data[key].hasOwnProperty(session)||(data[key][session]=null),void 0===val?delete data[key][session]:data[key][session]=val):void 0===val?delete data[session]:data[session]=val}else this.isNode||this.isJSBox?void 0===val?delete data[key]:data[key]=val:data=void 0===val?null:val;"object"==typeof data&&(data=JSON.stringify(data)),this.isSurge||this.isLoon?$persistentStore.write(data,key):this.isQuanX?$prefs.setValueForKey(data,key):this.isNode?this.node.fs.writeFileSync("./magic.json",data):this.isJSBox&&$file.write({data:$data({string:data}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`)}del(key,session=""){this.logDebug(`DELETE KEY [${key}]${session?`[${session}]`:""}`),this.write(key,null,session)}notify(title=this.scriptName,subTitle="",body="",opts=""){let convertOptions;if(opts=(_opts=>{let newOpts={};if("string"==typeof _opts)this.isLoon?newOpts={openUrl:_opts}:this.isQuanX?newOpts={"open-url":_opts}:this.isSurge&&(newOpts={url:_opts});else if("object"==typeof _opts)if(this.isLoon)newOpts.openUrl=_opts["open-url"]?_opts["open-url"]:"",newOpts.mediaUrl=_opts["media-url"]?_opts["media-url"]:"";else if(this.isQuanX)newOpts=_opts["open-url"]||_opts["media-url"]?_opts:{};else if(this.isSurge){let openUrl=_opts["open-url"]||_opts.openUrl;newOpts=openUrl?{url:openUrl}:{}}return newOpts})(opts),1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.logNotify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${"object"==typeof opts?JSON.stringify(opts):opts}`),this.isSurge)$notification.post(title,subTitle,body,opts);else if(this.isLoon)opts?$notification.post(title,subTitle,body,opts):$notification.post(title,subTitle,body);else if(this.isQuanX)$notify(title,subTitle,body,opts);else if(this.isJSBox){let push={title:title,body:subTitle?`${subTitle}\n${body}`:body};$push.schedule(push)}this._barkUrl&&this._barkKey&&this.notifyBark(title,subTitle,body)}notifyDebug(title=this.scriptName,subTitle="",body="",opts=""){"DEBUG"===this.logLevel&&(1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.notify(title,subTitle,body,opts))}notifyBark(title=this.scriptName,subTitle="",body="",opts=""){let options={url:this._barkUrl,headers:{"Content-Type":"application/json; charset=utf-8"},body:{title:title,body:subTitle?`${subTitle}\n${body}`:body,device_key:this._barkKey}};this.post(options,err=>{})}log(msg,level="INFO"){this.logLevels[this._logLevel]<this.logLevels[level.toUpperCase()]||console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)}logDebug(msg){this.log(msg,"DEBUG")}logInfo(msg){this.log(msg,"INFO")}logNotify(msg){this.log(msg,"NOTIFY")}logWarning(msg){this.log(msg,"WARNING")}logError(msg){this.log(msg,"ERROR")}logRetry(msg){this.log(msg,"RETRY")}adapterHttpOptions(options,method){let _options="object"==typeof options?Object.assign({},options):{url:options,headers:{}};_options.hasOwnProperty("header")&&!_options.hasOwnProperty("headers")&&(_options.headers=_options.header,delete _options.header),_options.headers&&"object"==typeof _options.headers&&_options.headers["User-Agent"]||(_options.headers&&"object"==typeof _options.headers||(_options.headers={}),this.isNode?_options.headers["User-Agent"]=this.pcUserAgent:_options.headers["User-Agent"]=this.iOSUserAgent);let skipScripting=!1;if(("object"==typeof _options.opts&&(!0===_options.opts.hints||!0===_options.opts["Skip-Scripting"])||"object"==typeof _options.headers&&!0===_options.headers["X-Surge-Skip-Scripting"])&&(skipScripting=!0),skipScripting||(this.isSurge?_options.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?_options.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof _options.opts&&(_options.opts={}),_options.opts.hints=!1)),this.isSurge&&!skipScripting||delete _options.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts,this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts["Skip-Scripting"],"GET"===method&&!this.isNode&&_options.body){let qs=Object.keys(_options.body).map(key=>void 0===_options.body?"":`${encodeURIComponent(key)}=${encodeURIComponent(_options.body[key])}`).join("&");_options.url.indexOf("?")<0&&(_options.url+="?"),_options.url.lastIndexOf("&")+1!=_options.url.length&&_options.url.lastIndexOf("?")+1!=_options.url.length&&(_options.url+="&"),_options.url+=qs,delete _options.body}return this.isQuanX?(_options.hasOwnProperty("body")&&"string"!=typeof _options.body&&(_options.body=JSON.stringify(_options.body)),_options.method=method):this.isNode?(delete _options.headers["Accept-Encoding"],"object"==typeof _options.body&&("GET"===method?(_options.qs=_options.body,delete _options.body):"POST"===method&&(_options.json=!0,_options.body=_options.body))):this.isJSBox&&(_options.header=_options.headers,delete _options.headers),_options}adapterHttpResponse(resp){let _resp={body:resp.body,headers:resp.headers,json:()=>JSON.parse(_resp.body)};return resp.hasOwnProperty("statusCode")&&resp.statusCode&&(_resp.status=resp.statusCode),_resp}get(options,callback){let _options=this.adapterHttpOptions(options,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon?$httpClient.get(_options,callback):this.isQuanX?$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>callback(reason.error,null,null)):this.isNode?this.node.request.get(_options,(err,resp,data)=>{resp=this.adapterHttpResponse(resp),callback(err,resp,data)}):this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.get(_options))}getPromise(options){return new Promise((resolve,reject)=>{magicJS.get(options,(err,resp)=>{err?reject(err):resolve(resp)})})}post(options,callback){let _options=this.adapterHttpOptions(options,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon)$httpClient.post(_options,callback);else if(this.isQuanX)$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>{callback(reason.error,null,null)});else if(this.isNode){let resp=this.node.request.post(_options,callback);resp.status=resp.statusCode,delete resp.statusCode}else this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.post(_options,{}))}done(value={}){this._endTime=Date.now();let span=(this._endTime-this._startTime)/1e3;magicJS.logDebug(`SCRIPT COMPLETED: ${span}S.`),"undefined"!=typeof $done&&$done(value)}isToday(day){if(null==day)return!1;{let today=new Date;return"string"==typeof day&&(day=new Date(day)),today.getFullYear()==day.getFullYear()&&today.getMonth()==day.getMonth()&&today.getDay()==day.getDay()}}isNumber(val){return"NaN"!==parseFloat(val).toString()}attempt(promise,defaultValue=null){return promise.then(args=>[null,args]).catch(ex=>(this.logError(ex),[ex,defaultValue]))}retry(fn,retries=5,interval=0,callback=null){return(...args)=>new Promise((resolve,reject)=>{function _retry(...args){Promise.resolve().then(()=>fn.apply(this,args)).then(result=>{"function"==typeof callback?Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{retries>=1?interval>0?setTimeout(()=>_retry.apply(this,args),interval):_retry.apply(this,args):reject(ex),retries--}):resolve(result)}).catch(ex=>{this.logRetry(ex),retries>=1&&interval>0?setTimeout(()=>_retry.apply(this,args),interval):retries>=1?_retry.apply(this,args):reject(ex),retries--})}_retry.apply(this,args)})}formatTime(time,fmt="yyyy-MM-dd hh:mm:ss"){var o={"M+":time.getMonth()+1,"d+":time.getDate(),"h+":time.getHours(),"m+":time.getMinutes(),"s+":time.getSeconds(),"q+":Math.floor((time.getMonth()+3)/3),S:time.getMilliseconds()};/(y+)/.test(fmt)&&(fmt=fmt.replace(RegExp.$1,(time.getFullYear()+"").substr(4-RegExp.$1.length)));for(let k in o)new RegExp("("+k+")").test(fmt)&&(fmt=fmt.replace(RegExp.$1,1==RegExp.$1.length?o[k]:("00"+o[k]).substr((""+o[k]).length)));return fmt}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(time){return new Promise(resolve=>setTimeout(resolve,time))}}(scriptName)}

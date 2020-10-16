const scriptName = '滴滴出行';
const didiTokenKey = 'didi_token';
const didiCityIdKey = 'didi_city_id';
const didiLidKey = 'didi_lid';
const didiMySourceIdKey = 'didi_my_source_id';
const didiActivityIdKey = 'didi_activity_id';
const didiChannelIdKey = 'didi_channel_id';
const getTokenRegex = /^https?:\/\/api\.didialift\.com\/beatles\/userapi\/user\/user\/getuserinfo?.*city_id=(\d+).*&token=([^&]*)/;
const getTokenRegex2 = /^https?:\/\/as\.xiaojukeji\.com\/ep\/as\/toggles\?.*location_cityid=(\d+).*&ticket=([^&]*)/;
const getLidRegex = /^https?:\/\/bosp-api\.xiaojukeji\.com\/bosp-api\/lottery\/info?.*lid=([^&]*)/;
const getActivityIdRegex = /^https?:\/\/manhattan\.webapp\.xiaojukeji\.com\/marvel\/api\/manhattan\-signin\-task\/signIn\/execute/;
let sourceIdList = ['7mO4XP93fb84VMSC8Xk5vg%3D%3D', 'pDmWW7HoWUkNu2nmJ3HJEQ%3D%3D'];
let magicJS = MagicJS(scriptName, "INFO");


function CheckIn(token, cityId, source_id=''){
  return new Promise((resolve, reject) =>{
    let url = '';
    if (source_id){
      url = `https://bosp-api.xiaojukeji.com/wechat/benefit/public/index?city_id=${cityId}&share_source_id=${source_id}&share_date=${magicJS.today()}`;
    }
    else{
      url = `https://bosp-api.xiaojukeji.com/wechat/benefit/public/index?city_id=${cityId}&share_date=${magicJS.today()}`;
    }
    magicJS.logInfo(`当前使用的source_id：${source_id}`);
    let options = {
      url: url,
      headers: {
        'Didi-Ticket': token
      },
      body: ''
    }
    magicJS.get(options, (err, resp, data)=>{
      if (err){
        magicJS.logError(`滴滴出行签到失败，请求异常：${err}`);
        reject('签到失败，请求异常');
      }
      else{
        try{
          magicJS.logDebug(`滴滴签到接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.errno == 0){
            if (obj.data.hasOwnProperty('share') && obj.data.share.hasOwnProperty('source_id')){
              magicJS.write(didiMySourceIdKey, obj.data.share.source_id);
              magicJS.logDebug(`您的source_id：${obj.data.share.source_id}`);
            }
            if (obj.data.sign.sign){
              let subsidy = Number(obj.data.sign.sign.subsidy_state.subsidy_amount + obj.data.sign.sign.subsidy_state.extra_subsidy_amount);
              resolve(['🚕本日签到成功！', subsidy, obj.data.welfare.balance, obj.data.notification.reverse()]);
            }
            else{
              resolve(['🚕今天已经签到过了，不要重复签到哦！！', 0, 0, []]);
            }
          }
          else if(obj.errno === 101){
            reject(`签到失败，${obj.errmsg}`);
          }
          else{
            magicJS.logError(`签到失败，接口响应异常：${data}`);
            reject('签到失败，响应异常，请查阅日志！');
          }
        }
        catch(err){
          magicJS.logError(`滴滴出行签到失败，执行异常：${err}，接口返回：${data}`);
          reject('签到失败，执行异常！');
        }
      }
    })
  });
}

function GetOrderList(token){
  return new Promise((resolve) =>{
    let url = `https://api.udache.com/gulfstream/passenger/v2/other/pListReward?token=${token}`;
    magicJS.get(url, (err, resp, data)=>{
      if (err){
        magicJS.logError(`获取待领取的福利金失败，请求异常：${err}`);
        resolve([]);
      }
      else{
        magicJS.logDebug(`获取待领取的福利金，接口响应：${data}`);
        let obj = JSON.parse(data);
        if (obj.errno == 0){
          resolve(typeof obj.data === 'undefined'? []: obj.data);
        }
        else{
          magicJS.logWarning(`没有获取到待领取的福利金，响应异常：${data}`);
          resolve([]);
        }
      }
    })
  })
}

function GetRewards(orderId, token){
  return new Promise((resolve) =>{
    let url = `https://api.udache.com/gulfstream/passenger/v2/otherpGetRewards?order_id=${orderId}&token=${token}`;
    magicJS.get(url, (err, resp, data)=>{
      if (err){
        magicJS.logError(`领取福利金失败，请求异常：${err}`);
        resolve(0);
      }
      else{
        magicJS.logInfo(`领取福利金，接口响应：${data}`);
        let obj = JSON.parse(data);
        if (obj.errno == 0){
          resolve(0);
        }
        else{
          magicJS.logWarning(`没有获取到待领取的福利金，响应异常：${data}`);
          resolve(0);
        }
      }
    })
  })
}

function GetDrawAmount(lid, token){
  return new Promise((resolve) =>{
    try{
      let url = `https://bosp-api.xiaojukeji.com/bosp-api/lottery/info?lid=${lid}&token=${token}&lucky_users=0`;
      magicJS.get(url, (err, resp, data)=>{
        if (err){
          magicJS.logError(`获取福利金抽奖次数失败，请求异常：${err}`);
          resolve(0);
        }
        else{
          magicJS.logDebug(`福利金抽奖，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.code == 0){
            magicJS.logInfo(`福利金抽奖次数：${obj.data.eliminate_info.base_share_amount}`);
            resolve(obj.data.eliminate_info.base_share_amount);
          }
          else if (obj.code == 20008){
            magicJS.logWarning('获取福利金抽奖次数失败');
            magicJS.logWarning(obj.message);
            resolve(0);
          }
          else{
            magicJS.logWarning(`获取福利金抽奖次数失败，响应异常：${data}`);
            resolve(0);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`获取福利金抽奖次数失败，异常信息：${err}`);
      resolve(0);
    }
  });
}

// 福利金抽奖
function LotteryDraw(lid, token){
  return new Promise((resolve) =>{
    try{
      let url = `https://bosp-api.xiaojukeji.com/bosp-api/lottery/draw?lid=${lid}&token=${token}`;
      magicJS.get(url, (err, resp, data)=>{
        if (err){
          magicJS.logError(`福利金抽奖失败，请求异常：${err}`);
          resolve();
        }
        else{
          magicJS.logDebug(`福利金抽奖，接口响应：${data}`);
          let obj = JSON.parse(data);
          if (obj.code === 0){
            magicJS.logInfo(`本次抽奖结果：${obj.data.prize.name}`);
            resolve(obj.data.prize.name);
          }
          else if(obj.code === 20003){
            magicJS.logWarning(`福利金抽奖出现异常：${data}`);
            resolve(obj.message);
          }
          else if(obj.code === 20010){
            magicJS.logWarning(`福利金抽奖福利金不足：${data}`);
            resolve(obj.message);
          }
          else{
            magicJS.logWarning(`福利金抽奖，响应异常：${data}`);
            resolve(obj.message);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`福利金抽奖失败，异常信息：${err}`);
      resolve();
    }
  });
}

// 随机获取SourceId
function getSourceId(){
  let mySourceId = magicJS.read(didiMySourceIdKey);
  if (!!mySourceId){
    sourceIdList = sourceIdList.filter((value) =>{
      return value !== mySourceId;
    })
  }
  if (mySourceId !== '7mO4XP93fb84VMSC8Xk5vg%3D%3D' && mySourceId !== 'pDmWW7HoWUkNu2nmJ3HJEQ%3D%3D'){
    sourceIdList = ['7mO4XP93fb84VMSC8Xk5vg%3D%3D'];
  }
  return sourceIdList[Math.round(Math.random() * (sourceIdList.length - 1))]; 
}

// 天天有奖
function DailyLotteryDraw(token, cityId, channelId, activityId, clientId=1){
  return new Promise((resolve) =>{
    try{
      let options = {
        url: 'https://manhattan.webapp.xiaojukeji.com/marvel/api/manhattan-signin-task/signIn/execute',
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-Hans;q=1",
          "Content-Type": "application/json",
          "X-Surge-Skip-Scripting": true
        },
        body: magicJS.isNode? {'token': token, 'channelId': channelId, 'activityId': activityId, 'clientId': clientId} : JSON.stringify({'token': token, 'channelId': channelId, 'activityId': activityId, 'clientId': clientId})
      }
      magicJS.post(options, (err, resp, data)=>{
        if (err){
          magicJS.logError(`天天有奖失败，请求异常：${err}`);
          resolve([null, []]);
        }
        else{
          let obj = typeof data === 'string'? JSON.parse(data) : data;
          magicJS.logDebug(`天天有奖，接口响应：${data}`);
          let giftList = [];
          if (obj.errorCode === 0){
            obj.data.giftDetail.forEach(gift => {
              magicJS.logInfo(`天天有奖签到结果：${gift.displayJson.displayName} ${gift.displayValue} ${gift.displayUnit}`);
              giftList.push({'name': gift.displayJson.displayName, 'value': gift.displayValue, 'unit': gift.displayUnit, 'endDate':gift.giftEndDate});
            });
            resolve([`🎁天天有奖连续签到${obj.data.serialSignInTimes}天`, giftList]);
          }
          else if(obj.errorCode === 500000){
            resolve([`🎁天天有奖今天已经签到过了`, []]);
          }
          else{
            magicJS.logWarning(`天天有奖，响应异常：${data}`);
            resolve([null, []]);
          }
        }
      })
    }
    catch (err){
      magicJS.logError(`天天有奖失败，异常信息：${err}`);
      resolve([null, []]);
    }
  });
}

async function Main(){
  if (magicJS.isRequest){
    if (getTokenRegex.test(magicJS.request.url) || getTokenRegex2.test(magicJS.request.url)){
      try{
        let arr = magicJS.request.url.match(getTokenRegex);
        // 使用备用匹配
        if (arr === null){
          arr = magicJS.request.url.match(getTokenRegex2);
        }
        let cityId = arr[1];
        let token = arr[2];
        let hisToken = magicJS.read(didiTokenKey);
        magicJS.logDebug(`city：${cityId}，token：${token}`);
        magicJS.write(didiCityIdKey, cityId);
        if (token !== hisToken){
          magicJS.write(didiTokenKey, token);
          magicJS.logInfo(`新的Token：\n${token}，旧的Token：\n${hisToken}，Token已更新。`);
          magicJS.notify('🎉滴滴出行写入Token成功！！');
        }
        else{
          magicJS.logInfo(`新的Token：\n${token}，旧的Token：\n${hisToken}，滴滴出行Token没有变化，无需更新。`);
        }
      }
      catch(err){
        magicJS.logError(`滴滴出行写入Token失败，执行异常：${err}。`);
        magicJS.notify('❌滴滴出行写入Token失败，请查阅日志');
      }
    }
    else if (getLidRegex.test(magicJS.request.url)){
      try{
        let arr = magicJS.request.url.match(getLidRegex);
        let lid = arr[1];
        let hisLid = magicJS.read(didiLidKey);
        magicJS.logDebug(`新的lid：${lid}，旧的lid：${hisLid}`);
        if (lid !== hisLid)
        {
          magicJS.write(didiLidKey, lid);
          magicJS.notify('🎉滴滴出行写入lid成功！！');
        }
        else{
          magicJS.logInfo(`滴滴出行lid没有变化，无需更新。lid：${lid}`);
        }
      }
      catch (err){
        magicJS.logError(`滴滴出行写入lid失败，执行异常：${err}。`);
        magicJS.notify('❌滴滴出行写入lid失败，请查阅日志');
      }
    }
    else if (getActivityIdRegex.test(magicJS.request.url)){
      try{
        let obj = JSON.parse(magicJS.request.body);
        magicJS.write(didiActivityIdKey, obj.activityId);
        magicJS.write(didiChannelIdKey, obj.channelId);
        magicJS.logInfo(`获取天天有奖ActivityId和ChannelId成功：${obj.activityId}，${obj.channelId}`);
        magicJS.notify('获取天天有奖ActivityId和ChannelId成功');
      }
      catch(err){
        magicJS.logError(`获取天天有奖ActivityId异常：${err}`);
      }
    }
  }
  else{
    let subTitle = '';
    let content = '';
    let cityId = magicJS.read(didiCityIdKey);
    let token = magicJS.read(didiTokenKey);
    let lid = magicJS.read(didiLidKey);
    let channelId = magicJS.read(didiChannelIdKey) || '5286158810015504';
    let activityId = magicJS.read(didiActivityIdKey) || '140737579736652';

    // 签到
    if (token && cityId){
      let source_id = getSourceId();
      let [checkInErr, [checkInStr, subsidy, balance, notification]] = await magicJS.attempt(CheckIn(token, cityId, source_id));
      if (checkInErr){
        subTitle = checkInErr;
      }
      else{
        subTitle = checkInStr;
        if (subsidy > 0){
          subTitle += `获取${subsidy}福利金！`;
        }
        if (balance) content = `账户共${balance}福利金，可抵扣${balance/100}元。`;
        // 系统通知
        notification.forEach(element => {
          if (content) content += '\n';
          content += element + '。';
        });
      }

      // 福利金抽奖
      if (lid) {
        let drawCount = await GetDrawAmount(lid, token);
        if (drawCount > 0){
          if (content) content += '\n';
          content = `福利金抽奖${drawCount}次：`;
          for (let i=0;i<drawCount;i++){
            // 避免抽奖太频繁
            await magicJS.sleep(5000);
            let drawResult = await LotteryDraw(lid, token);
            if (drawResult){
              content += `\n第${i+1}次：${drawResult}`;
            }
          }
        }
      }

      if (channelId && activityId){
        // 天天有奖
        let [serialSignInTimes, giftList] = await DailyLotteryDraw(token, cityId, channelId, activityId);
        if (serialSignInTimes !== null){
          if (content) content += '\n';
          content += serialSignInTimes;
        }
        if (giftList.length > 0){
          content += '，奖励：';
          for(let i=0;i<giftList.length;i++){
            content += `\n${giftList[i].name} ${giftList[i].value} ${giftList[i].unit} 过期 ${giftList[i].endDate}`;
          }
        }
        else{
          content += '。';
        }
      }

      // 领取福利金
      let orderList = await GetOrderList(token);
      magicJS.logInfo(`当前获取的订单信息：${JSON.stringify(orderList)}`);
      let rewardList = [];
      let total = 0;
      orderList.forEach(element => {
        total += Number(element.bonus_info.amount);
        rewardList.push(GetRewards(element.oid, token));
      });

      await Promise.all(rewardList);

      if (total > 0){
        if (content) content += '\n';
        content += `\n本日领取福利金${total}。`
      }
    }
    else{
      content = '❓请先获取滴滴出行Token再进行签到。';
    }

    // 通知
    magicJS.notify(scriptName, subTitle, content);
  }
  magicJS.done();
};

Main();

function MagicJS(a="MagicJS",b="INFO"){const c={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){if(this.version="2.2.3.2",this.scriptName=a,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.platform=this.getPlatform(),this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=b,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(a){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(a){this._barkUrl=a.replace(/\/+$/g,"")}set logLevel(a){this._logLevel="string"==typeof a?a.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"==typeof $request?void 0:$request}get response(){return"undefined"==typeof $response?void 0:($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response)}getPlatform(){return this.isSurge?"Surge":this.isQuanX?"QuantumultX":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"unknown"}read(a,b=""){let c="";this.isSurge||this.isLoon?c=$persistentStore.read(a):this.isQuanX?c=$prefs.valueForKey(a):this.isNode?c=this.node.data:this.isJSBox&&(c=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(c=c[a]),this.isJSBox&&(c=JSON.parse(c)[a]),!b||("string"==typeof c&&(c=JSON.parse(c)),c=c&&"object"==typeof c?c[b]:null)}catch(d){this.logError(d),c=b?{}:null,this.del(a)}"undefined"==typeof c&&(c=null);try{!c||"string"!=typeof c||(c=JSON.parse(c))}catch(a){}return this.logDebug(`READ DATA [${a}]${b?`[${b}]`:""}(${typeof c})\n${JSON.stringify(c)}`),c}write(a,b,c=""){let d=c?{}:"";if(!!c&&(this.isSurge||this.isLoon)?d=$persistentStore.read(a):!!c&&this.isQuanX?d=$prefs.valueForKey(a):this.isNode?d=this.node.data:this.isJSBox&&(d=JSON.parse($file.read("drive://MagicJS/magic.json").string)),!!c){try{"string"==typeof d&&(d=JSON.parse(d)),d="object"==typeof d&&d?d:{}}catch(b){this.logError(b),this.del(a),d={}}this.isJSBox||this.isNode?((!d.hasOwnProperty(a)||"object"!=typeof d[a]||null===d[a])&&(d[a]={}),!d[a].hasOwnProperty(c)&&(d[a][c]=null),"undefined"==typeof b?delete d[a][c]:d[a][c]=b):"undefined"==typeof b?delete d[c]:d[c]=b}else this.isNode||this.isJSBox?"undefined"==typeof b?delete d[a]:d[a]=b:"undefined"==typeof b?d=null:d=b;"object"==typeof d&&(d=JSON.stringify(d)),this.isSurge||this.isLoon?$persistentStore.write(d,a):this.isQuanX?$prefs.setValueForKey(d,a):this.isNode?this.node.fs.writeFileSync("./magic.json",d):this.isJSBox&&$file.write({data:$data({string:d}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${a}]${c?`[${c}]`:""}(${typeof b})\n${JSON.stringify(b)}`)}del(a,b=""){this.logDebug(`DELETE KEY [${a}]${!b?"":`[${b}]`}`),this.write(a,null,b)}notify(a=this.scriptName,b="",c="",d=""){if(d=(a=>{let b={};if(this.isSurge||this.isQuanX||this.isLoon)if("string"==typeof a)this.isLoon?b={openUrl:a}:this.isQuanX?b={"open-url":a}:this.isSurge&&(b={url:a});else if("object"==typeof a){let c={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}},d=Object.keys(a);for(let e=0;e<d.length;e++)c[this.platform][d[e]]?b[c[this.platform][d[e]]]=a[d[e]]:b[d[e]]=a[d[e]]}return b})(d),this.logNotify(`title:${a}\nsubTitle:${b}\nbody:${c}\noptions:${"object"==typeof d?JSON.stringify(d):d}`),1==arguments.length&&(a=this.scriptName,b="",c=arguments[0]),this.isSurge||this.isLoon)$notification.post(a,b,c,d);else if(this.isQuanX)$notify(a,b,c,d);else if(this.isNode){if(!!this._barkUrl){let d=encodeURI(`${a}/${b}\n${c}`);this.get(`${this._barkUrl}/${d}`,()=>{})}}else if(this.isJSBox){let d={title:a,body:b?`${b}\n${c}`:c};$push.schedule(d)}}log(a,b="INFO"){this.logLevels[this._logLevel]<this.logLevels[b.toUpperCase()]||console.log(`[${b}] [${this.scriptName}]\n${a}\n`)}logDebug(a){this.log(a,"DEBUG")}logInfo(a){this.log(a,"INFO")}logNotify(a){this.log(a,"NOTIFY")}logWarning(a){this.log(a,"WARNING")}logError(a){this.log(a,"ERROR")}adapterHttpOptions(a,b){let d="object"==typeof a?Object.assign({},a):{url:a,headers:{}};if(d.hasOwnProperty("header")&&!d.hasOwnProperty("headers")&&(d.headers=d.header,delete d.header),"object"==typeof d.headers&&!0)for(let a in d.headers)c[a]&&(d.headers[c[a]]=d.headers[a],delete d.headers[a]);!!d.headers&&"object"==typeof d.headers&&!!d.headers["User-Agent"]||((!!!d.headers||"object"!=typeof d.headers)&&(d.headers={}),d.headers["User-Agent"]=this.isNode?this.pcUserAgent:this.iOSUserAgent);let e=!1;if(("object"==typeof d.opts&&(!0===d.opts.hints||!0===d.opts["Skip-Scripting"])||"object"==typeof d.headers&&!0===d.headers["X-Surge-Skip-Scripting"])&&(e=!0),e||(this.isSurge?d.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?d.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof d.opts&&(d.opts={}),d.opts.hints=!1)),(!this.isSurge||e)&&delete d.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&d.hasOwnProperty("opts")&&delete d.opts,this.isQuanX&&d.hasOwnProperty("opts")&&delete d.opts["Skip-Scripting"],"GET"===b&&!this.isNode&&!!d.body){let a=Object.keys(d.body).map(a=>"undefined"==typeof d.body?"":`${encodeURIComponent(a)}=${encodeURIComponent(d.body[a])}`).join("&");0>d.url.indexOf("?")&&(d.url+="?"),d.url.lastIndexOf("&")+1!=d.url.length&&d.url.lastIndexOf("?")+1!=d.url.length&&(d.url+="&"),d.url+=a,delete d.body}return this.isQuanX?(d.hasOwnProperty("body")&&"string"!=typeof d.body&&(d.body=JSON.stringify(d.body)),d.method=b):this.isNode?(delete d.headers["Accept-Encoding"],"object"==typeof d.body&&("GET"===b?(d.qs=d.body,delete d.body):"POST"==b&&(d.json=!0,d.body=d.body))):this.isJSBox&&(d.header=d.headers,delete d.headers),d}get(a,b){let c=this.adapterHttpOptions(a,"GET");if(this.logDebug(`HTTP GET: ${JSON.stringify(c)}`),this.isSurge||this.isLoon)$httpClient.get(c,b);else if(this.isQuanX)$task.fetch(c).then(a=>{a.status=a.statusCode,b(null,a,a.body)},a=>b(a.error,null,null));else{if(this.isNode)return this.node.request.get(c,b);this.isJSBox&&(c.handler=a=>{let c=a.error?JSON.stringify(a.error):void 0,d="object"==typeof a.data?JSON.stringify(a.data):a.data;b(c,a.response,d)},$http.get(c))}}post(a,b){let c=this.adapterHttpOptions(a,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(c)}`),this.isSurge||this.isLoon)$httpClient.post(c,b);else if(this.isQuanX)$task.fetch(c).then(a=>{a.status=a.statusCode,b(null,a,a.body)},a=>{b(a.error,null,null)});else{if(this.isNode)return this.node.request.post(c,b);this.isJSBox&&(c.handler=a=>{let c=a.error?JSON.stringify(a.error):void 0,d="object"==typeof a.data?JSON.stringify(a.data):a.data;b(c,a.response,d)},$http.post(c))}}done(a={}){"undefined"!=typeof $done&&$done(a)}isToday(a){if(null==a)return!1;else{let b=new Date;return"string"==typeof a&&(a=new Date(a)),b.getFullYear()==a.getFullYear()&&b.getMonth()==a.getMonth()&&b.getDay()==a.getDay()}}isNumber(a){return"NaN"!==parseFloat(a).toString()}attempt(a,b=null){return a.then(a=>[null,a]).catch(a=>(this.logError(a),[a,b]))}retry(a,b=5,c=0,d=null){return(...e)=>new Promise((f,g)=>{function h(...e){Promise.resolve().then(()=>a.apply(this,e)).then(a=>{"function"==typeof d?Promise.resolve().then(()=>d(a)).then(()=>{f(a)}).catch(a=>{this.logError(a),1<=b&&0<c?setTimeout(()=>h.apply(this,e),c):1<=b?h.apply(this,e):g(a),b--}):f(a)}).catch(a=>{this.logError(a),1<=b&&0<c?setTimeout(()=>h.apply(this,e),c):1<=b?h.apply(this,e):g(a),b--})}h.apply(this,e)})}formatTime(a,b="yyyy-MM-dd hh:mm:ss"){var c={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),S:a.getMilliseconds()};for(let d in /(y+)/.test(b)&&(b=b.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length))),c)new RegExp("("+d+")").test(b)&&(b=b.replace(RegExp.$1,1==RegExp.$1.length?c[d]:("00"+c[d]).substr((""+c[d]).length)));return b}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(a){return new Promise(b=>setTimeout(b,a))}}(a)}
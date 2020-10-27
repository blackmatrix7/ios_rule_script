/*
[MITM]
m.client.10010.com

[Script]
联通_获取cookie = type=http-request,pattern=^https?:\/\/m\.client\.10010\.com\/dailylottery\/static\/(integral|doubleball)\/firstpage,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/10010/unicom_checkin.js,
联通_签到与抽奖 = script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/10010/unicom_checkin.js,type=cron,cronexp=10 0 * * *
*/
const getLotteryCookieRegex = /^https?:\/\/m\.client\.10010\.com\/dailylottery\/static\/(integral|doubleball)\/firstpage/;
const unicomCookieKey = 'unicom_user_cookie';
const mobileKey = 'unicom_mobile'
const encryptMobileKey = 'unicom_encrypt_mobile'
const cityCodeKey = 'city_code'
const scriptName = '中国联通';

let magicJS = MagicJS(scriptName);
magicJS.unifiedPushUrl = magicJS.read('unicom_unified_push_url') || magicJS.read('magicjs_unified_push_url');

let userLoginOptions = {
  url: "http://m.client.10010.com/dailylottery/static/textdl/userLogin?flag=1",
  headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "Cookie": "",
    "Host": "m.client.10010.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 unicom{version:iphone_c@6.0201}{systemVersion:dis}",
    "savedata": "false"
  }
}

let daySingOptions = {
  url: "https://act.10010.com/SigninApp/signin/daySign?vesion=0.3044332648335779",
  headers: {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Cookie": null,
    "Host": "act.10010.com",
    "Origin": "https://act.10010.com",
    "Referer": "https://act.10010.com/SigninApp/signin/querySigninActivity.htm?version=iphone_c@6.0201",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest",
    "savedata": "false"
  },
  body: ''
}

let daySingNewVersionOptions = {
  url: "https://act.10010.com/SigninApp/signin/todaySign?vesion=0.5630763707346611",
  headers: {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "Cookie": null,
    "Host": "act.10010.com",
    "Origin": "https://act.10010.com",
    "Referer": "https://act.10010.com/SigninApp/signin/querySigninActivity.htm",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 unicom{version:iphone_c@7.0402}{systemVersion:dis}{yw_code:}",
    "savedata": "false"
  },
  body: ''
}

let getContinueCountOptions = {
  url: "https://act.10010.com/SigninApp/signin/getContinuCount?vesion=0.35425159102265746",
  headers: {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Cookie": null,
    "Host": "act.10010.com",
    "Origin": "https://act.10010.com",
    "Referer": "https://act.10010.com/SigninApp/signin/querySigninActivity.htm?version=iphone_c@6.0201",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest",
    "savedata": "false"
  },
  body: ''
}

let getScoreTotalOptions = {
  url: "https://act.10010.com/SigninApp/signin/getIntegral?vesion=0.9157830014621342",
  headers: {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Cookie": null,
    "Host": "act.10010.com",
    "Origin": "https://act.10010.com",
    "Referer": "https://act.10010.com/SigninApp/signin/querySigninActivity.htm?version=iphone_c@6.0201",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest",
    "savedata": "false"
  },
  body: ''
}

let getGoldTotalOptions = {
  url: "https://act.10010.com/SigninApp/signin/getGoldTotal?vesion=0.7865317639339587",
  headers: {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Cookie": null,
    "Host": "act.10010.com",
    "Origin": "https://act.10010.com",
    "Referer": "https://act.10010.com/SigninApp/signin/querySigninActivity.htm?version=iphone_c@6.0201",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest",
    "savedata": "false"
  },
  body: ''
}

let getUserInfoOptions = {
  url: "https://m.client.10010.com/mobileService/home/queryUserInfoSeven.htm?version=iphone_c@7.0402&desmobiel=&showType=3",
  headers: {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "Cookie": "",
    "Host": "m.client.10010.com",
    "User-Agent": "ChinaUnicom4.x/240 CFNetwork/1121.2.2 Darwin/19.3.0"
  }
}

let getLotteryCountOptions = {
  url: "http://m.client.10010.com/dailylottery/static/active/findActivityInfojifen?areaCode=031&groupByType=&mobile=",
  headers: {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "Cookie": null,
    "Host": "m.client.10010.com",
    "Origin": "https://m.client.10010.com",
    "Referer": "http://m.client.10010.com/dailylottery/static/integral/firstpage?encryptmobile=",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest",
    "savedata": "false"
  },
  body: ''
}

let getLotteryCountNewVersionOptions = {
  url: "http://m.client.10010.com/dailylottery/static/active/findActivityInfo?areaCode=031&groupByType=&mobile=",
  headers: {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "Cookie": null,
    "Host": "m.client.10010.com",
    "Origin": "https://m.client.10010.com",
    "Referer": "http://m.client.10010.com/dailylottery/static/integral/firstpage?encryptmobile=",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest",
    "savedata": "false"
  },
  body: ''
}

let dailyLotteryOptions = {
  url: "http://m.client.10010.com/dailylottery/static/integral/choujiang?usernumberofjsp=",
  headers: {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    "Cookie": null,
    "Host": "m.client.10010.com",
    "Origin": "https://m.client.10010.com",
    "Referer": "http://m.client.10010.com/dailylottery/static/integral/firstpage?encryptmobile=",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest",
    "savedata": "false"
  },
  body: ''
}

let dailyLotteryNewVersionOptions = {
  url: "https://m.client.10010.com/dailylottery/static/doubleball/choujiang?usernumberofjsp=",
  headers: {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    "Cookie": null,
    "Host": "m.client.10010.com",
    "Origin": "https://m.client.10010.com",
    "Referer": "http://m.client.10010.com/dailylottery/static/integral/firstpage?encryptmobile=",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest",
    "savedata": "false"
  },
  body: ''
}

let meituanCouponOptions = {
  url: 'https://m.client.10010.com/welfare-mall-front/mobile/api/bj2402/v1?reqdata=%7B%22saleTypes%22%3A%22TY%22%2C%22amount%22%3A0%2C%22goodsId%22%3A%228a29ac8a72be05a70172c067722600b8%22%2C%22sourceChannel%22%3A%22955000300%22%2C%22payWay%22%3A%22%22%2C%22imei%22%3A%22%22%2C%22proFlag%22%3A%22%22%2C%22points%22%3A0%2C%22scene%22%3A%22%22%2C%22promoterCode%22%3A%22%22%7D',
  headers: {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Cookie": "",
    "Host": "m.client.10010.com",
    "Origin": "https://img.client.10010.com",
    "Referer": "https://img.client.10010.com/jifenshangcheng/meituan?whetherFriday=YES&from=955000006&from=955000006&idx=1&idx=1",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 unicom{version:iphone_c@7.0402}{systemVersion:dis}{yw_code:}"
  }
}

// 用户登录
function UserLogin(){
  // 联通App签到
  return new Promise((resolve) =>{
    let cookie = magicJS.read(unicomCookieKey, 'default');
    if (cookie){
      userLoginOptions.headers['Cookie'] = cookie;
      magicJS.get(userLoginOptions, (err, resp, data) =>{
        if (err){
          magicJS.log('用户登录失败，http请求异常：' + err);
          resolve([false, '用户登录失败']);
        }
        else{
          if (data.indexOf('天天抽奖') >= 0){
            magicJS.log('用户登录成功');
            resolve([true, '用户登录成功'])
          }
          else if (data.indexOf('请稍后重试') >= 0){
            magicJS.log('用户登录失败');
            resolve([false, '用户登录失败']);
          }
          else{
            magicJS.log('用户登录失败，接口响应不合法：' + data);
            resolve([false, '用户登录失败']);
          }
        }
      });
    }
    else{
      resolve([false, '请先获取token再登录']);
      magicJS.log('请先获取cookie再刷新token');
    }
  });
}

// 旧版签到
function AppCheckin(){
  // 联通App签到
  return new Promise((resolve, reject) =>{
    let unicomCookie = magicJS.read(unicomCookieKey, 'default');
    daySingOptions.headers['Cookie'] = unicomCookie;
    magicJS.post(daySingOptions, (err, resp, data) => {
      if (err){
        magicJS.log('签到失败，http请求异常：' + err);
        magicJS.notify(scriptName, '', '❌签到失败，http请求异常！！');
        reject('签到失败');
      }
      else {
        magicJS.log('联通签到，接口响应数据：' + data);
        let obj = {};
        try{
          obj = JSON.parse(data);
          if (obj.status == "0000"){
            magicJS.log('签到成功');
            resolve([true, '签到成功', obj.prizeCount, obj.growthV, obj.flowerCount]);
          }
          else if (data == '{}' || obj.status == '0002'){
            magicJS.log('重复签到');
            resolve([true, '重复签到', null,null,null]);
          }
          else if (obj.hasOwnProperty('toLogin')){
            magicJS.log('未登录');
            resolve([false, '未登录', null,null,null]);
          }
          else{
            reject('接口返回异常');
          }
        }
        catch (err){
          magicJS.log('签到异常，代码执行错误：' + err);
          reject('执行错误');
        }
      }
    })
  });
}

// 新版签到
function AppCheckinNewVersion(){
  // 联通App签到
  return new Promise((resolve, reject) =>{
    let unicomCookie = magicJS.read(unicomCookieKey, 'default');
    daySingNewVersionOptions.headers['Cookie'] = unicomCookie;
    magicJS.post(daySingNewVersionOptions, (err, resp, data) => {
      if (err){
        magicJS.log('新版签到失败，http请求异常：' + err);
        magicJS.notify(scriptName, '', '❌签到失败，http请求异常！！');
        reject('签到失败');
      }
      else {
        let obj = {};
        try{
          obj = JSON.parse(data);
          if (obj.hasOwnProperty('msgCode') && obj['msgCode'] == '0000'){
            magicJS.log('新版签到成功');
            resolve([true, '签到成功', obj.prizeCount, obj.growValue, bj.flowerCount]);
          }
          else if (obj.hasOwnProperty('msgCode') && obj['msgCode'] == '8888'){
            magicJS.log('新版重复签到');
            resolve([true, '重复签到',obj.prizeCount,obj.growValue,obj.flowerCount]);
          }
          else if (obj.hasOwnProperty('toLogin')){
            magicJS.log('新版未登录');
            resolve([false, '未登录', null,null,null]);
          }
          else{
            magicJS.log('新版签到异常，接口返回数据不合法。' + data);
            reject('签到异常');
          }
        }
        catch (err){
          magicJS.log('新版签到异常，代码执行错误：' + err);
          reject('执行错误');
        }
      }
    })
  });
}

// 获取连续签到天数
function GetContinueCount(){
  return new Promise((resolve, reject) =>{
    let unicomCookie = magicJS.read(unicomCookieKey, 'default');
    getContinueCountOptions.headers['Cookie'] = unicomCookie;
    magicJS.post(getContinueCountOptions, (err, resp, data) => {
      if (err){
        magicJS.log('获取连续签到次数失败，http请求异常：' + err);
        reject('?');
      }
      else {
        // magicJS.log('获取连续签到次数，接口响应数据：' + data);
        if (data){
          let number = '?';
          if (/^\d+$/.test(data)){
            number = data;
          }
          else{
            magicJS.log('获取连续签到次数失败，接口响应不合法。' + data);
          }
          resolve(number);
        }
        else{
          magicJS.log('获取连续签到次数异常，没有获取到响应体。' );
          reject('?');
        }
      }
    })
  });
}

// 获取当前积分(弃用)
function GetScoreTotal(){
  return new Promise((resolve) =>{
    let unicomCookie =  magicJS.read(unicomCookieKey, 'default');
    getScoreTotalOptions.headers['Cookie'] = unicomCookie;
    magicJS.post(getScoreTotalOptions, (err, resp, data) => {
      if (err){
        magicJS.log('获取积分失败，http请求异常：' + err);
        resolve('未知');
      }
      else {
        magicJS.log('获取积分，接口响应数据：' + data);
        let obj = JSON.parse(data);
        if (obj.hasOwnProperty('integralTotal')){
          resolve(obj['integralTotal']);
        }
        else{
          magicJS.log('获取积分异常，接口响应不合法：' + data);
          resolve('未知');
        }
      }
    })
  });
}

// 获取当前金币(弃用)
function GetGoldTotal(){
  return new Promise((resolve) =>{
    let unicomCookie = magicJS.read(unicomCookieKey, 'default');
    getGoldTotalOptions.headers['Cookie'] = unicomCookie;
    magicJS.post(getGoldTotalOptions, (err, resp, data) => {
      if (err){
        magicJS.log('获取金币失败，http请求异常：' + err);
        resolve('未知');
      }
      else {
        magicJS.log('获取金币，接口响应数据：' + data);
        let obj = JSON.parse(data);
        if (obj.hasOwnProperty('goldTotal')){
          resolve(obj['goldTotal']);
        }
        else{
          magicJS.log('获取金币异常，接口响应不合法：' + data);
          resolve('未知');
        }
      }
    })
  });
}

// 获取用户信息
function GetUserInfo(){
  return new Promise((resolve, reject) =>{
    let unicomCookie = magicJS.read(unicomCookieKey, 'default');
    if (unicomCookie){
      let mobile = magicJS.read(mobileKey, 'default');
      getUserInfoOptions.headers['Cookie'] = unicomCookie;
      getUserInfoOptions.url = getUserInfoOptions.url.replace(/desmobiel=[0-9a-zA-Z]*/, `desmobiel=${mobile}`);
      magicJS.get(getUserInfoOptions, (err, resp, data) => {
        if (err){
          magicJS.log('获取用户信息失败，http请求异常：' + err);
          reject({});
        }
        else {
          let result = {}
          try{
            let obj = JSON.parse(data);
            if (obj.hasOwnProperty('data') && obj['data'].hasOwnProperty('dataList')){
              obj['data']['dataList'].forEach(element => {
                if ('flow,fee,voice,point'.indexOf(element['type'])>=0){
                  if (element['number'] != '-'){
                    result[element['type']] = `${element['remainTitle']}${element['number']}${element['unit']}`
                  }
                  else{
                    magicJS.log('获取用户信息异常：' + data);
                    reject('获取用户信息异常');
                  }
                }
              });
              magicJS.log('获取用户信息：' + JSON.stringify(result));
              resolve(result);
            }
            else{
              magicJS.log('获取用户信息异常，接口响应不合法：' + data);
              reject('获取用户信息接口响应异常');
            }
          }
          catch (err){
            magicJS.log(`获取用户信息失败，代码执行异常：${err}，接口返回：${data}`);
            reject('获取用户信息执行异常');
          }
        }
      })
    }
    else{
      resolve({});
    }
  });
}

// 获取抽奖次数
function GetLotteryCount(){
  return new Promise((resolve) =>{
    let unicomCookie = magicJS.read(unicomCookieKey, 'default');
    let encryptMobile = magicJS.read(encryptMobileKey, 'default');
    let areaCode = magicJS.read(cityCodeKey, 'default');
    getLotteryCountOptions.headers['Cookie'] = unicomCookie;
    getLotteryCountOptions.headers['Referer'] = getLotteryCountOptions.headers['Referer'].replace(/encryptmobile=.*/, `encryptmobile=${encryptMobile}`);
    getLotteryCountOptions.url = getLotteryCountOptions.url.replace(/mobile=[0-9a-zA-Z]*/, `mobile=${encryptMobile}`).replace(/areaCode=[0-9]*/, `areaCode=${areaCode}`);
    if (unicomCookie && encryptMobile){
      magicJS.get(getLotteryCountOptions, (err, resp, data) => {
        if (err){
          magicJS.log('获取抽奖次数失败，http请求异常：' + err);
          resolve(0);
        }
        else {
          try{
            let obj = JSON.parse(data);
            if (obj.hasOwnProperty('acFrequency')){
              let lotteryCount = Number(obj['acFrequency']['totalAcFreq']);
              magicJS.log('获取抽奖次数：' + lotteryCount);
              resolve(lotteryCount);
            }
            else{
              magicJS.log('获取抽奖次数异常，接口响应不合法：' + data);
              resolve(0);
            }
          }
          catch(err){
            magicJS.log(`获取抽奖次数异常，代码执行异常：${err}，接口响应：${data}`);
            resolve(0);
          }
        }
      })
    }
  });
}

// 新版获取抽奖次数
function GetLotteryCountNewVersion(){
  return new Promise((resolve) =>{
    let unicomCookie = magicJS.read(unicomCookieKey, 'default');
    let encryptMobile = magicJS.read(encryptMobileKey, 'default');
    let areaCode = magicJS.read(cityCodeKey, 'default');
    getLotteryCountNewVersionOptions.headers['Cookie'] = unicomCookie;
    getLotteryCountNewVersionOptions.headers['Referer'] = getLotteryCountNewVersionOptions.headers['Referer'].replace(/encryptmobile=.*/, `encryptmobile=${encryptMobile}`);
    getLotteryCountNewVersionOptions.url = getLotteryCountNewVersionOptions.url.replace(/mobile=.*/, `mobile=${encryptMobile}`).replace(/areaCode=[0-9]*/, `areaCode=${areaCode}`);;
    if (unicomCookie && encryptMobile){
      magicJS.get(getLotteryCountNewVersionOptions, (err, resp, data) => {
        if (err){
          magicJS.log('获取新版抽奖次数失败，http请求异常：' + err);
          resolve(0);
        }
        else {
          let obj = JSON.parse(data);
          if (obj.hasOwnProperty('acFrequency')){
            let lotteryCount = Number(obj['acFrequency']['totalAcFreq']);
            magicJS.log('获取新版抽奖次数：' + lotteryCount);
            resolve(lotteryCount);
          }
          else{
            magicJS.log('获取新版抽奖次数异常，接口响应不合法：' + data);
            resolve(0);
          }
        }
      })
    }
  });
}

// 单次免费抽奖
function DailyLottery(){
  return new Promise((resolve) =>{
    // 签到的cookie就可以用
    let lotteryCookie = magicJS.read(unicomCookieKey, 'default');
    let encryptMobile = magicJS.read(encryptMobileKey, 'default');
    if (lotteryCookie && encryptMobile){
      dailyLotteryOptions.headers['Cookie'] = lotteryCookie;
      dailyLotteryOptions.headers['Referer'] = dailyLotteryOptions.headers['Referer'].replace(/encryptmobile=.*/, `encryptmobile=${encryptMobile}`);
      dailyLotteryOptions.url = dailyLotteryOptions.url.replace(/usernumberofjsp=.*/, `usernumberofjsp=${encryptMobile}`);
      magicJS.post(dailyLotteryOptions, (err, resp, data) => {
        if (err){
          magicJS.log('每日免费抽奖，http请求异常：' + err);
          resolve('请求异常');
        }
        else {
          magicJS.log('每日免费抽奖，接口响应数据：' + data);
          let obj = JSON.parse(data);
          if (obj.hasOwnProperty('Rsptype') && obj['Rsptype'] == '6666'){
            resolve('次数不足');
          }
          else if (obj.hasOwnProperty('Rsptype') && obj['Rsptype'] == '3333'){
            resolve('请求无效');
          }
          else if (obj.hasOwnProperty('RspMsg')){
            resolve(obj['RspMsg']);
          }
          else{
            magicJS.log('每日免费抽奖，接口响应不合法：' + data);
            resolve('接口响应不合法');
          }
        }
      });
    }
    else{
      magicJS.log('每日免费抽奖，获取登录信息失败，请重新访问一次抽奖页面。');
      magicJS.notify(scriptName, '', '每日免费抽奖，❌获取登录信息失败！！')
      resolve('未登录');
    }
  });
}

// 新版单次免费抽奖
function DailyLotteryNewVersion(){
  return new Promise((resolve) =>{
    // 签到的cookie就可以用
    let lotteryCookie = magicJS.read(unicomCookieKey, 'default');
    let encryptMobile = magicJS.read(encryptMobileKey, 'default');
    if (lotteryCookie && encryptMobile){
      dailyLotteryNewVersionOptions.headers['Cookie'] = lotteryCookie;
      dailyLotteryNewVersionOptions.headers['Referer'] = dailyLotteryNewVersionOptions.headers['Referer'].replace(/encryptmobile=.*/, `encryptmobile=${encryptMobile}`);
      dailyLotteryNewVersionOptions.url = dailyLotteryNewVersionOptions.url.replace(/usernumberofjsp=.*/, `usernumberofjsp=${encryptMobile}`);
      magicJS.post(dailyLotteryNewVersionOptions, (err, resp, data) => {
        if (err){
          magicJS.log('新版每日免费抽奖，http请求异常：' + err);
          resolve('请求异常');
        }
        else {
          magicJS.log('新版每日免费抽奖，接口响应数据：' + data);
          let obj = JSON.parse(data);
          if (obj.hasOwnProperty('Rsptype') && obj['Rsptype'] == '6666'){
            resolve('次数不足');
          }
          else if (obj.hasOwnProperty('Rsptype') && obj['Rsptype'] == '3333'){
            resolve('请求无效');
          }
          else if (obj.hasOwnProperty('RspMsg')){
            resolve(obj['RspMsg']);
          }
          else{
            magicJS.log('新版每日免费抽奖，接口响应不合法：' + data);
            resolve('接口响应不合法');
          }
        }
      });
    }
    else{
      magicJS.log('每日免费抽奖，获取登录信息失败，请重新访问一次抽奖页面。');
      magicJS.notify(scriptName, '', '每日免费抽奖，❌获取登录信息失败！！')
      resolve('未登录');
    }
  });
}

// 批量免费抽奖
async function StartDailyLottery(){
  let lotteryCount = await GetLotteryCount();
  let lotteryList = '';
  if (lotteryCount > 0){
    for (let i=0;i<lotteryCount;i++){
      // 开始抽奖
      magicJS.log(`第${i+1}次免费抽奖开始`);
      if (lotteryList){
        lotteryList += '\n';
      }
      lotteryList += `第${i+1}次抽奖：${await DailyLottery()}`;
    }
  }
  return [lotteryCount,lotteryList];
}

// 批量新版免费抽奖
async function StartDailyLotteryNewVersion(lotteryCount){
  let lotteryNewVersionCount = await GetLotteryCountNewVersion();
  let lotteryNewVersionList = '';
  if (lotteryNewVersionCount > 0){
    for (let i=0;i<lotteryNewVersionCount;i++){
      // 开始抽奖
      magicJS.log(`新版第${i+1}次免费抽奖开始`);
      if (lotteryNewVersionList){
        lotteryNewVersionList += '\n';
      }
      lotteryNewVersionList += `第${lotteryCount+i+1}次抽奖：${await DailyLotteryNewVersion()}`;
    }
  }
  return [lotteryNewVersionCount,lotteryNewVersionList];
}

// 美团外卖优惠券
function GetMeituanCoupon(){
  return new Promise((resolve, reject) =>{
    // 签到的cookie就可以用
    let meituanCookie = magicJS.read(unicomCookieKey, 'default');
    if (meituanCookie){
      meituanCouponOptions.headers['Cookie'] = meituanCookie;
      magicJS.get(meituanCouponOptions, (err, resp, data) => {
        if (err){
          magicJS.log('领取美团外卖优惠券异常，http请求异常：' + err);
          reject('美团外卖优惠券:请求异常');
        }
        else {
          let obj = {};
          try{
            obj = JSON.parse(data);
            if (obj.hasOwnProperty('code')){
              if (obj['code'] == '0' && obj['msg'] == '下单成功'){
                magicJS.log('领取美团外卖优惠券，领取成功');
                resolve('美团外卖优惠券：领取成功');
              }
              else if (obj['code'] == '1'){
                magicJS.log('领取美团外卖优惠券，达到领取上限');
                resolve('美团外卖优惠券：达到领取上限');
              }
              else{
                magicJS.log('领取美团外卖优惠券，接口响应不合法：' + data);
                reject('接口响应不合法');
              }
            } 
            else{
              magicJS.log('领取美团外卖优惠券，接口响应不合法：' + data);
              reject('美团外卖优惠券：接口响应不合法');
            }
          }
          catch (err){
            magicJS.log('领取美团外卖优惠券，代码执行异常：' + err);
            reject('美团外卖优惠券：代码执行异常');
          }
        }
      });
    }
    else{
      magicJS.log('领取美团外卖优惠券失败，请重新访问一次领取优惠券页面。');
      magicJS.notify(scriptName, '', '❌领取美团外卖优惠券，获取登录信息失败！！')
      resolve('美团外卖优惠券：登录信息无效');
    }
  });
}

async function Main(){
  if (magicJS.isRequest){
    if(getLotteryCookieRegex.test(magicJS.request.url) && magicJS.request.headers.hasOwnProperty('savedata') == false){
      // 获取cookie
      let cookie = magicJS.request.headers['Cookie'];
      let hisCookie = magicJS.read(unicomCookieKey, 'default');
      // 获取手机号
      let mobile = /c_mobile=([0-9]{11})/.exec(cookie)[1];
      let hisMobile = magicJS.read(mobileKey, 'default');
      // 获取加密手机号
      let encryptMobile = /encryptmobile=([a-zA-Z0-9]*)/.exec(magicJS.request.url)[1];
      let hisEncryptMobile = magicJS.read(encryptMobileKey, 'default');
      let cityCode = /city=([0-9]*)/.exec(magicJS.request.headers['Cookie'])[1]
      // 获取城市代码
      let hisCityCode = magicJS.read(cityCodeKey, 'default');
      let notifyContent = '';
      magicJS.log(`新的cookie：${cookie}\n\n旧的cookie：${hisCookie}`);
      magicJS.log(`新的手机号：${mobile}\n旧的手机号：${hisMobile}`);
      magicJS.log(`新的手机号密文：${encryptMobile}\n旧的手机号密文：${hisEncryptMobile}`);
      magicJS.log(`新的城市代码：${cityCode}\n旧的城市代码：${hisCityCode}`);
      // cookie
      if (cookie != hisCookie){
        magicJS.write(unicomCookieKey, cookie, 'default');
        if (!hisCookie){
          magicJS.log('首次获取联通cookie成功：' + cookie);
          notifyContent += '🍩联通cookie:获取成功';
        }
        else{
          magicJS.log('更新联通cookie成功：' + cookie);
          notifyContent += '🍩联通cookie:更新成功';
        }
      }
      else{
        magicJS.log('联通cookie没有变化，无需更新');
        notifyContent += '🍩联通cookie:没有变化';
      }
      // 手机号
      if (mobile != hisMobile){
        magicJS.write(mobileKey, mobile, 'default');
        if (!hisMobile){
          notifyContent += ' 📱手机号:获取成功';
        }
        else{
          notifyContent += ' 📱手机号:更新成功';
        }
      }
      else{
        magicJS.log('手机号码密文没有变化，无需更新');
        notifyContent += ' 📱手机号:没有变化';
      }
      // 手机号密文
      if (hisEncryptMobile != encryptMobile){
        magicJS.write(encryptMobileKey, encryptMobile, 'default');
        if (!hisEncryptMobile){
          notifyContent += '\n🗳手机号密文:获取成功';
        }
        else{
          notifyContent += '\n🗳手机号密文:更新成功';
        }
      }
      else{
        magicJS.log('手机号码密文没有变化，无需更新');
        notifyContent += '\n🗳手机号密文:没有变化';
      }
      if (cityCode != hisCityCode){
        magicJS.write(cityCodeKey, cityCode, 'default');
        if (!hisCityCode){
          magicJS.log('首次获取联通城市代码成功：' + cityCode);
          notifyContent += ' 🌃城市:获取成功';
        }
        else{
          magicJS.log('更新联通城市代码成功：' + cityCode);
          notifyContent += ' 🌃城市:更新成功';
        }
      }
      else{
        magicJS.log('城市代码没有变化，无需更新');
        notifyContent += ' 🌃城市:没有变化';
      }
      magicJS.notify(scriptName, '', notifyContent);
    }
    magicJS.done();
  }
  else{
    magicJS.log('签到与抽奖开始执行！');
    // 生成签到结果的通知
    let notifySubTtile = '';
    // 通知内容
    let notifyContent = '';
    let checkinResult,checkinResultStr,prizeCount,growthV,flowerCount;
    // 连续签到天数
    let contineCount = '?'

    await (async ()=>{

      // 抽奖前用户登录
      let [errUserLogin, [loginResult, loginStr]] = await magicJS.attempt(UserLogin(), [false, '用户登录失败']);

      // 旧版签到，如果失败就用新版的再试试
      let AppCheckinPromise = magicJS.retry(AppCheckin, 3, 5000)();
      [,[checkinResult,checkinResultStr,prizeCount,growthV,flowerCount]] = await magicJS.attempt(AppCheckinPromise, [false,'签到异常',null,null,null]);
      if (!checkinResult){
        let AppCheckinNewVersionPromise = magicJS.retry(AppCheckinNewVersion, 3, 5000)();
        [,[checkinResult,checkinResultStr,prizeCount,growthV,flowerCount]] = await magicJS.attempt(AppCheckinNewVersionPromise, [false,'签到异常',null,null,null]);
      }
      if (!!prizeCount && !!growthV && !!flowerCount){
        notifySubTtile = `🧱积分+${prizeCount} 🎈成长值+${growthV} 💐鲜花+${flowerCount}`
      }

      // 查询连续签到天数
      let genContinueCountPromise = magicJS.retry(GetContinueCount, 3, 3000)();
      [,contineCount] = await magicJS.attempt(genContinueCountPromise);

      // 查询用户信息
      let getUserInfoPromise = magicJS.retry(GetUserInfo, 3, 5000)();
      let [,userInfo] = await magicJS.attempt(getUserInfoPromise);
      if (userInfo && userInfo.hasOwnProperty('flow') && userInfo.hasOwnProperty('fee')){
        notifyContent += `${userInfo['flow']} ${userInfo['fee']}\n${userInfo['voice']} ${userInfo['point']}`
      }

      // 领取美团外卖优惠券
      let getMeituanCouponRetry = magicJS.retry(GetMeituanCoupon, 3, 2000);
      let getMeituanCouponPromise = getMeituanCouponRetry();
      let [,meituanResult] = await magicJS.attempt(getMeituanCouponPromise);
      if (meituanResult){
        notifyContent += notifyContent ? `\n${meituanResult}` : meituanResult;
      }

      if (errUserLogin){
        magicJS.log('用户登录失败，异常信息：' + errUserLogin);
      }
      else if (loginResult){
        // 旧版抽奖
        let [errLottery, [lotteryCount, lotteryResult]] = await magicJS.attempt(StartDailyLottery(), [null,null]);
        if (errLottery) magicJS.log('旧版抽奖出现异常：' + errLottery);
        // 新版抽奖
        let [errLotteryNewVersion, [lotteryNewVersionCount, lotteryNewVersionResult]] = await magicJS.attempt(StartDailyLotteryNewVersion(lotteryCount), [null,null]);
        if (errLotteryNewVersion) magicJS.log('新版抽奖出现异常：' + errLotteryNewVersion);
        if (lotteryResult){
          notifyContent += notifyContent ? `\n${lotteryResult}` : lotteryResult;
        }
        if (lotteryNewVersionResult){
          notifyContent +=  notifyContent ? `\n${lotteryNewVersionResult}` : lotteryNewVersionResult;
        }
      }
      else {
        magicJS.log('用户登录结果：' + loginStr);
      }
    })();

    magicJS.log('签到与抽奖执行完毕！');
    // 通知签到和抽奖结果
    magicJS.notify(`${scriptName} ${checkinResultStr}，连续签到${contineCount}天`, notifySubTtile, notifyContent);
    magicJS.done();
  }
}

Main();

function MagicJS(e="MagicJS",t="INFO"){const s={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){this.version="2.2.3.3";this.scriptName=e;this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};this.isLoon=typeof $loon!=="undefined";this.isQuanX=typeof $task!=="undefined";this.isJSBox=typeof $drive!=="undefined";this.isNode=typeof module!=="undefined"&&!this.isJSBox;this.isSurge=typeof $httpClient!=="undefined"&&!this.isLoon;this.platform=this.getPlatform();this.node={request:undefined,fs:undefined,data:{}};this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";this.logLevel=t;this._unifiedPushUrl="";if(this.isNode){this.node.fs=require("fs");this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(e){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else if(this.isJSBox){if(!$file.exists("drive://MagicJS")){$file.mkdir("drive://MagicJS")}if(!$file.exists("drive://MagicJS/magic.json")){$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"})}}}set unifiedPushUrl(e){this._unifiedPushUrl=!!e?e.replace(/\/+$/g,""):""}set logLevel(e){this._logLevel=typeof e==="string"?e.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}getPlatform(){if(this.isSurge)return"Surge";else if(this.isQuanX)return"QuantumultX";else if(this.isLoon)return"Loon";else if(this.isJSBox)return"JSBox";else if(this.isNode)return"Node.js";else return"unknown"}read(e,t=""){let s="";if(this.isSurge||this.isLoon){s=$persistentStore.read(e)}else if(this.isQuanX){s=$prefs.valueForKey(e)}else if(this.isNode){s=this.node.data}else if(this.isJSBox){s=$file.read("drive://MagicJS/magic.json").string}try{if(this.isNode)s=s[e];if(this.isJSBox)s=JSON.parse(s)[e];if(!!t){if(typeof s==="string")s=JSON.parse(s);s=!!s&&typeof s==="object"?s[t]:null}}catch(i){this.logError(i);s=!!t?{}:null;this.del(e)}if(typeof s==="undefined")s=null;try{if(!!s&&typeof s==="string")s=JSON.parse(s)}catch(e){}this.logDebug(`READ DATA [${e}]${!!t?`[${t}]`:""}(${typeof s})\n${JSON.stringify(s)}`);return s}write(e,t,s=""){let i=!!s?{}:"";if(!!s&&(this.isSurge||this.isLoon)){i=$persistentStore.read(e)}else if(!!s&&this.isQuanX){i=$prefs.valueForKey(e)}else if(this.isNode){i=this.node.data}else if(this.isJSBox){i=JSON.parse($file.read("drive://MagicJS/magic.json").string)}if(!!s){try{if(typeof i==="string")i=JSON.parse(i);i=typeof i==="object"&&!!i?i:{}}catch(t){this.logError(t);this.del(e);i={}}if(this.isJSBox||this.isNode){if(!i.hasOwnProperty(e)||typeof i[e]!=="object"||i[e]===null){i[e]={}}if(!i[e].hasOwnProperty(s)){i[e][s]=null}if(typeof t==="undefined"){delete i[e][s]}else{i[e][s]=t}}else{if(typeof t==="undefined"){delete i[s]}else{i[s]=t}}}else{if(this.isNode||this.isJSBox){if(typeof t==="undefined"){delete i[e]}else{i[e]=t}}else{if(typeof t==="undefined"){i=null}else{i=t}}}if(typeof i==="object")i=JSON.stringify(i);if(this.isSurge||this.isLoon){$persistentStore.write(i,e)}else if(this.isQuanX){$prefs.setValueForKey(i,e)}else if(this.isNode){this.node.fs.writeFileSync("./magic.json",i)}else if(this.isJSBox){$file.write({data:$data({string:i}),path:"drive://MagicJS/magic.json"})}this.logDebug(`WRITE DATA [${e}]${!!s?`[${s}]`:""}(${typeof t})\n${JSON.stringify(t)}`)}del(e,t=""){this.logDebug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`);this.write(e,null,t)}notify(e=this.scriptName,t="",s="",i=""){let o=e=>{let t={};if(this.isSurge||this.isQuanX||this.isLoon){if(typeof e==="string"){if(this.isLoon)t={openUrl:e};else if(this.isQuanX)t={"open-url":e};else if(this.isSurge)t={url:e}}else if(typeof e==="object"){let s={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}};let i=Object.keys(e);for(let o=0;o<i.length;o++){if(!!s[this.platform][i[o]]){t[s[this.platform][i[o]]]=e[i[o]]}else{t[i[o]]=e[i[o]]}}}}return t};i=o(i);this.logNotify(`title:${e}\nsubTitle:${t}\nbody:${s}\noptions:${typeof i==="object"?JSON.stringify(i):i}`);if(arguments.length==1){e=this.scriptName;t="",s=arguments[0]}if(!!this._unifiedPushUrl){let i=encodeURI(`${e}/${t}${!!t?"\n":""}${s}`);this.get(`${this._unifiedPushUrl}/${i}`,()=>{})}if(this.isSurge||this.isLoon){$notification.post(e,t,s,i)}else if(this.isQuanX){$notify(e,t,s,i)}else if(this.isJSBox){let i={title:e,body:!!t?`${t}\n${s}`:s};$push.schedule(i)}}log(e,t="INFO"){if(!(this.logLevels[this._logLevel]<this.logLevels[t.toUpperCase()]))console.log(`[${t}] [${this.scriptName}]\n${e}\n`)}logDebug(e){this.log(e,"DEBUG")}logInfo(e){this.log(e,"INFO")}logNotify(e){this.log(e,"NOTIFY")}logWarning(e){this.log(e,"WARNING")}logError(e){this.log(e,"ERROR")}adapterHttpOptions(e,t){let i=typeof e==="object"?Object.assign({},e):{url:e,headers:{}};if(i.hasOwnProperty("header")&&!i.hasOwnProperty("headers")){i["headers"]=i["header"];delete i["header"]}if(typeof i.headers==="object"&&!!s){for(let e in i.headers){if(s[e]){i.headers[s[e]]=i.headers[e];delete i.headers[e]}}}if(!!!i.headers||typeof i.headers!=="object"||!!!i.headers["User-Agent"]){if(!!!i.headers||typeof i.headers!=="object")i.headers={};if(this.isNode)i.headers["User-Agent"]=this.pcUserAgent;else i.headers["User-Agent"]=this.iOSUserAgent}let o=false;if(typeof i["opts"]==="object"&&(i["opts"]["hints"]===true||i["opts"]["Skip-Scripting"]===true)||typeof i["headers"]==="object"&&i["headers"]["X-Surge-Skip-Scripting"]===true){o=true}if(!o){if(this.isSurge)i.headers["X-Surge-Skip-Scripting"]=false;else if(this.isLoon)i.headers["X-Requested-With"]="XMLHttpRequest";else if(this.isQuanX){if(typeof i["opts"]!=="object")i.opts={};i.opts["hints"]=false}}if(!this.isSurge||o)delete i.headers["X-Surge-Skip-Scripting"];if(!this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"];if(this.isQuanX&&i.hasOwnProperty("opts"))delete i["opts"]["Skip-Scripting"];if(t==="GET"&&!this.isNode&&!!i.body){let e=Object.keys(i.body).map(e=>{if(typeof i.body==="undefined")return"";return`${encodeURIComponent(e)}=${encodeURIComponent(i.body[e])}`}).join("&");if(i.url.indexOf("?")<0)i.url+="?";if(i.url.lastIndexOf("&")+1!=i.url.length&&i.url.lastIndexOf("?")+1!=i.url.length)i.url+="&";i.url+=e;delete i.body}if(this.isQuanX){if(i.hasOwnProperty("body")&&typeof i["body"]!=="string")i["body"]=JSON.stringify(i["body"]);i["method"]=t}else if(this.isNode){delete i.headers["Accept-Encoding"];if(typeof i.body==="object"){if(t==="GET"){i.qs=i.body;delete i.body}else if(t==="POST"){i["json"]=true;i.body=i.body}}}else if(this.isJSBox){i["header"]=i["headers"];delete i["headers"]}return i}get(e,t){let s=this.adapterHttpOptions(e,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.get(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>t(e.error,null,null))}else if(this.isNode){return this.node.request.get(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.get(s)}}post(e,t){let s=this.adapterHttpOptions(e,"POST");this.logDebug(`HTTP POST: ${JSON.stringify(s)}`);if(this.isSurge||this.isLoon){$httpClient.post(s,t)}else if(this.isQuanX){$task.fetch(s).then(e=>{e["status"]=e.statusCode;t(null,e,e.body)},e=>{t(e.error,null,null)})}else if(this.isNode){return this.node.request.post(s,t)}else if(this.isJSBox){s["handler"]=(e=>{let s=e.error?JSON.stringify(e.error):undefined;let i=typeof e.data==="object"?JSON.stringify(e.data):e.data;t(s,e.response,i)});$http.post(s)}}done(e={}){if(typeof $done!=="undefined"){$done(e)}}isToday(e){if(e==null){return false}else{let t=new Date;if(typeof e=="string"){e=new Date(e)}if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()&&t.getDay()==e.getDay()){return true}else{return false}}}isNumber(e){return parseFloat(e).toString()==="NaN"?false:true}attempt(e,t=null){return e.then(e=>{return[null,e]}).catch(e=>{this.logError(e);return[e,t]})}retry(e,t=5,s=0,i=null){return(...o)=>{return new Promise((r,n)=>{function a(...o){Promise.resolve().then(()=>e.apply(this,o)).then(e=>{if(typeof i==="function"){Promise.resolve().then(()=>i(e)).then(()=>{r(e)}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}else{r(e)}}).catch(e=>{this.logError(e);if(t>=1&&s>0){setTimeout(()=>a.apply(this,o),s)}else if(t>=1){a.apply(this,o)}else{n(e)}t--})}a.apply(this,o)})}}formatTime(e,t="yyyy-MM-dd hh:mm:ss"){var s={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in s)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?s[e]:("00"+s[e]).substr((""+s[e]).length));return t}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(e){return new Promise(t=>setTimeout(t,e))}}(e)}
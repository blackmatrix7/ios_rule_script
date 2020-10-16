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

function MagicJS(scriptName='MagicJS', logLevel='INFO'){

  return new class{
    constructor(){
      this.scriptName = scriptName;
      this.logLevel = this.getLogLevels(logLevel.toUpperCase());
      this.node = {'request': undefined, 'fs': undefined, 'data': {}};
      if (this.isNode){
        this.node.fs = require('fs');
        this.node.request = require('request');
        try{
          this.node.fs.accessSync('./magic.json');
        }
        catch(err){
          this.logError(err);
          this.node.fs.writeFileSync('./magic.json', '{}')
        }
        this.node.data = require('./magic.json');
      }
      if (this.isJSBox){
        if (!$file.exists('drive://MagicJS')){
          $file.mkdir('drive://MagicJS');
        }
        if (!$file.exists('drive://MagicJS/magic.json')){
          $file.write({
            data: $data({string: '{}'}),
            path: 'drive://MagicJS/magic.json'
          })
        }
      }
    }
    
    get version() { return 'v2.1.4' };
    get isSurge() { return typeof $httpClient !== 'undefined' && !this.isLoon };
    get isQuanX() { return typeof $task !== 'undefined' };
    get isLoon() { return typeof $loon !== 'undefined' };
    get isJSBox() { return typeof $drive !== 'undefined'};
    get isNode() { return typeof module !== 'undefined' && !this.isJSBox };
    get isRequest() { return (typeof $request !== 'undefined') && (typeof $response === 'undefined')}
    get isResponse() { return typeof $response !== 'undefined' }
    get request() { return (typeof $request !== 'undefined') ? $request : undefined }
    get response() { 
      if (typeof $response !== 'undefined'){
        if ($response.hasOwnProperty('status')) $response['statusCode'] = $response['status']
        if ($response.hasOwnProperty('statusCode')) $response['status'] = $response['statusCode']
        return $response;
      }
      else{
        return undefined;
      }
    }

    get logLevels(){
      return {
        DEBUG: 4,
        INFO: 3,
        WARNING: 2,
        ERROR: 1,
        CRITICAL: 0
      };
    } 

    getLogLevels(level){
      try{
        if (this.isNumber(level)){
          return level;
        }
        else{
          let levelNum = this.logLevels[level];
          if (typeof levelNum === 'undefined'){
            this.logError(`获取MagicJS日志级别错误，已强制设置为DEBUG级别。传入日志级别：${level}。`)
            return this.logLevels.DEBUG;
          }
          else{
            return levelNum;
          }
        }
      }
      catch(err){
        this.logError(`获取MagicJS日志级别错误，已强制设置为DEBUG级别。传入日志级别：${level}，异常信息：${err}。`)
        return this.logLevels.DEBUG;
      }
    }

    read(key, session=''){
      let val = '';
      // 读取原始数据
      if (this.isSurge || this.isLoon) {
        val = $persistentStore.read(key);
      }
      else if (this.isQuanX) {
        val = $prefs.valueForKey(key);
      }
      else if (this.isNode){
        val = this.node.data;
      }
      else if (this.isJSBox){
        val = $file.read('drive://MagicJS/magic.json').string;
      }
      try {
        // Node 和 JSBox数据处理
        if (this.isNode) val = val[key]
        if (this.isJSBox) val = JSON.parse(val)[key];
        // 带Session的情况
        if (!!session){
          if(typeof val === 'string') val = JSON.parse(val);
          val = !!val && typeof val === 'object' ? val[session]: null;
        }
      } 
      catch (err){ 
        this.logError(`raise exception: ${err}`);
        val = !!session? {} : null;
        this.del(key);
      }
      if (typeof val === 'undefined') val = null;
      try {if(!!val && typeof val === 'string') val = JSON.parse(val)} catch(err) {}
      this.logDebug(`read data [${key}]${!!session? `[${session}]`: ''}(${typeof val})\n${JSON.stringify(val)}`);
      return val;
    };

    write(key, val, session=''){
      let data = !!session ? {} : '';
      // 读取原先存储的JSON格式数据
      if (!!session && (this.isSurge || this.isLoon)) {
        data = $persistentStore.read(key);
      }
      else if (!!session && this.isQuanX) {
        data = $prefs.valueForKey(key);
      }
      else if (this.isNode){
        data = this.node.data;
      }
      else if (this.isJSBox){
        data = JSON.parse($file.read('drive://MagicJS/magic.json').string);
      }
      if (!!session){
        // 有Session，要求所有数据都是Object
        try {
          if (typeof data === 'string') data = JSON.parse(data)
          data = typeof data === 'object' && !!data ? data : {};
        }
        catch(err){
          this.logError(`raise exception: ${err}`);
          this.del(key); 
          data = {};
        };
        if (this.isJSBox || this.isNode){
          // 构造数据
          if (!data.hasOwnProperty(key) || typeof data[key] != 'object'){
            data[key] = {};
          }
          if (!data[key].hasOwnProperty(session)){
            data[key][session] = null;
          }
          // 写入或删除数据
          if (typeof val === 'undefined'){
            delete data[key][session];
          }
          else{
            data[key][session] = val;
          }
        }
        else {
          // 写入或删除数据      
          if (typeof val === 'undefined'){
            delete data[session];
          }
          else{
            data[session] = val;
          }
        }
      }
      // 没有Session时
      else{
        if (this.isNode || this.isJSBox){
          // 删除数据
          if (typeof val === 'undefined'){
            delete data[key];
          }
          else{
            data[key] = val;
          }
        }        
        else{    
          // 删除数据      
          if (typeof val === 'undefined'){
            data = null;
          }
          else{
            data = val;
          }
        }
      }
      // 数据回写
      if (typeof data === 'object') data = JSON.stringify(data);
      if (this.isSurge || this.isLoon) {
        $persistentStore.write(data, key);
      }
      else if (this.isQuanX) {
        $prefs.setValueForKey(data, key);
      }
      else if (this.isNode){
        this.node.fs.writeFileSync('./magic.json', data)
      }
      else if (this.isJSBox){
        $file.write({data: $data({string: data}), path: 'drive://MagicJS/magic.json'});
      }
      this.logDebug(`write data [${key}]${!!session? `[${session}]`: ''}(${typeof val})\n${JSON.stringify(val)}`);
    };

    del(key, session=''){
      this.logDebug(`delete key [${key}]${!!session ? `[${session}]`:''}`);
      this.write(key, undefined, session);
    }

    /**
     * iOS系统通知
     * @param {*} title 通知标题
     * @param {*} subTitle 通知副标题
     * @param {*} body 通知内容
     * @param {*} options 通知选项，目前支持传入超链接或Object
     * Surge不支持通知选项，Loon仅支持打开URL，QuantumultX支持打开URL和多媒体通知
     * options "applestore://" 打开Apple Store
     * options "https://www.apple.com.cn/" 打开Apple.com.cn
     * options {'open-url': 'https://www.apple.com.cn/'} 打开Apple.com.cn
     * options {'open-url': 'https://www.apple.com.cn/', 'media-url': 'https://raw.githubusercontent.com/Orz-3/mini/master/Apple.png'} 打开Apple.com.cn，显示一个苹果Logo
     */ 
    notify(title=this.scriptName, subTitle='', body='', options=''){
      let convertOptions = (_options) =>{
        let newOptions = '';
        if (typeof _options === 'string'){
          if (this.isLoon) newOptions = _options;
          else if (this.isQuanX) newOptions = {'open-url': _options};
        }
        else if (typeof _options === 'object'){
          if (this.isLoon) newOptions = !!_options['open-url'] ? _options['open-url'] : '';
          else if (this.isQuanX) newOptions = !!_options['open-url'] || !!_options['media-url'] ? _options : {};
        }
        return newOptions;
      }
      options = convertOptions(options);
      // 支持单个参数通知
      if (arguments.length == 1){
        title = this.scriptName;
        subTitle = '',
        body = arguments[0];
      }
      if (this.isSurge){
        $notification.post(title, subTitle, body);
      }
      else if (this.isLoon){
        // 2020.08.11 Loon2.1.3(194)TF 如果不加这个log，在跑测试用例连续6次通知，会漏掉一些通知，已反馈给作者。
        this.logInfo(`title: ${title}, subTitle：${subTitle}, body：${body}, options：${options}`);
        if (!!options) $notification.post(title, subTitle, body, options);
        else $notification.post(title, subTitle, body);
      }
      else if (this.isQuanX) {
         $notify(title, subTitle, body, options);
      }
      else if (this.isNode) {
        this.log(`${title} ${subTitle}\n${body}`);
      }
      else if (this.isJSBox){
        let push = {
          title: title,
          body: !!subTitle ? `${subTitle}\n${body}` : body,
        }
        $push.schedule(push);
      } 
    }
    
    log(msg, level="INFO"){
      if (this.logLevel >= this.getLogLevels(level.toUpperCase())) console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)
    }

    logDebug(msg){
      this.log(msg, "DEBUG");
    }

    logInfo(msg){
      this.log(msg, "INFO");
    }

    logWarning(msg){
      this.log(msg, "WARNING");
    }

    logError(msg){
      this.log(msg, "ERROR");
    }
    
    get(options, callback){
      let _options = typeof options === 'object'? Object.assign({}, options): options;
      this.logDebug(`http get: ${JSON.stringify(_options)}`);
      if (this.isSurge || this.isLoon) {
        $httpClient.get(_options, callback);
      }
      else if (this.isQuanX) {
        if (typeof _options === 'string') _options = { url: _options }
        _options['method'] = 'GET'
        $task.fetch(_options).then(
          resp => {
            resp['status'] = resp.statusCode
            callback(null, resp, resp.body)
          },
          reason => callback(reason.error, null, null),
        )
      }
      else if(this.isNode){
        return this.node.request.get(_options, callback);
      }
      else if(this.isJSBox){
        _options = typeof _options === 'string'? {'url': _options} :_options;
        options['header'] = _options['headers'];
        delete _options['headers']
        _options['handler'] = (resp)=>{
          let err = resp.error? JSON.stringify(resp.error) : undefined;
          let data = typeof resp.data === 'object' ? JSON.stringify(resp.data) : resp.data;
          callback(err, resp.response, data);
        }
        $http.get(_options);
      }
    }

    post(options, callback){
      let _options = typeof options === 'object'? Object.assign({}, options): options;
      this.logDebug(`http post: ${JSON.stringify(_options)}`);
      if (this.isSurge || this.isLoon) {
        $httpClient.post(_options, callback);
      }
      else if (this.isQuanX) {
        if (typeof _options === 'string') _options = { url: _options }
        if (_options.hasOwnProperty('body') && typeof _options['body'] !== 'string') _options['body'] = JSON.stringify(_options['body']);
        _options['method'] = 'POST'
        $task.fetch(_options).then(
          resp => {
            resp['status'] = resp.statusCode
            callback(null, resp, resp.body)
          },
          reason => {callback(reason.error, null, null)}
        )
      }
      else if(this.isNode){
        if (typeof _options.body === 'object') _options.body = JSON.stringify(_options.body);
        return this.node.request.post(_options, callback);
      }
      else if(this.isJSBox){
        _options = typeof _options === 'string'? {'url': _options} : _options;
        _options['header'] = _options['headers'];
        delete _options['headers']
        _options['handler'] = (resp)=>{
          let err = resp.error? JSON.stringify(resp.error) : undefined;
          let data = typeof resp.data === 'object' ? JSON.stringify(resp.data) : resp.data;
          callback(err, resp.response, data);
        }
        $http.post(_options);
      }
    }

    done(value = {}){
      if (typeof $done !== 'undefined'){
        $done(value);
      }
    }

    isToday(day){
      if (day == null){
          return false;
      }
      else{
        let today = new Date();
        if (typeof day == 'string'){
            day = new Date(day);
        }
        if (today.getFullYear() == day.getFullYear() && today.getMonth() == day.getMonth() && today.getDay() == day.getDay()){
            return true;
        }
        else{
            return false;
        }
      }
    }

    isNumber(val) {
      return parseFloat(val).toString() === "NaN"? false: true;
    }

    /**
     * 对await执行中出现的异常进行捕获并返回，避免写过多的try catch语句
     * @param {*} promise Promise 对象
     * @param {*} defaultValue 出现异常时返回的默认值
     * @returns 返回两个值，第一个值为异常，第二个值为执行结果
     */
    attempt(promise, defaultValue=null){ return promise.then((args)=>{return [null, args]}).catch(ex=>{this.log('raise exception:' + ex); return [ex, defaultValue]})};

    /**
     * 重试方法
     * @param {*} fn 需要重试的函数
     * @param {number} [retries=5] 重试次数
     * @param {number} [interval=0] 每次重试间隔
     * @param {function} [callback=null] 函数没有异常时的回调，会将函数执行结果result传入callback，根据result的值进行判断，如果需要再次重试，在callback中throw一个异常，适用于函数本身没有异常但仍需重试的情况。
     * @returns 返回一个Promise对象
     */
    retry(fn, retries=5, interval=0, callback=null) {
      return (...args)=>{
        return new Promise((resolve, reject) =>{
          function _retry(...args){
            Promise.resolve().then(()=>fn.apply(this,args)).then(
              result => {
                if (typeof callback === 'function'){
                  Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{
                    if (retries >= 1 && interval > 0){
                      setTimeout(() => _retry.apply(this, args), interval);
                    }
                    else if (retries >= 1) {
                      _retry.apply(this, args);
                    }
                    else{
                      reject(ex);
                    }
                    retries --;
                  });
                }
                else{
                  resolve(result);
                }
              }
              ).catch(ex=>{
              if (retries >= 1 && interval > 0){
                setTimeout(() => _retry.apply(this, args), interval);
              }
              else if (retries >= 1) {
                _retry.apply(this, args);
              }
              else{
                reject(ex);
              }
              retries --;
            })
          }
          _retry.apply(this, args);
        });
      };
    }

    formatTime(time, fmt="yyyy-MM-dd hh:mm:ss") {
      var o = {
        "M+": time.getMonth() + 1,
        "d+": time.getDate(),
        "h+": time.getHours(),
        "m+": time.getMinutes(),
        "s+": time.getSeconds(),
        "q+": Math.floor((time.getMonth() + 3) / 3),
        "S": time.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    };

    now(){
      return this.formatTime(new Date(), "yyyy-MM-dd hh:mm:ss");
    }

    sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    
  }(scriptName);
}
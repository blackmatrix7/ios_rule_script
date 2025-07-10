const AppGetCookieRegex = /^https?:\/\/user-api\.smzdm\.com\/checkin$/;
const smzdmCookieKey = "smzdm_cookie";
const smzdmCookieIdKey = "smzdm_cookie_id";
const smzdmSigninKey = "smzdm_signin";
const smzdmMissionKey = "smzdm_mission";
const smzdmLotteryKey = "smzdm_lottery";
const smzdmCheckBlackRoom = "smzdm_blackroom";
const smzdmSyncQinglongKey = "smzdm_sync_qinglong";
const scriptName = "什么值得买";
const clickFavArticleMaxTimes = 7; // 好文收藏次数

const $ = MagicJS(scriptName, "INFO");
// md5
// @formatter:off
!function(n){function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16){i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h)}return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8){r+=String.fromCharCode(n[t>>5]>>>t%32&255)}return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1){r[t]=0}var e=8*n.length;for(t=0;t<e;t+=8){r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32}return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1){u[r]=909522486^o[r],c[r]=1549556828^o[r]}return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1){t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t)}return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
// @formatter:on

let currentCookie = "";

function randomStr(len = 18) {
  let char = "0123456789";
  let str = "";
  for (let i = 0; i < len; i++) {
    str += char.charAt(Math.floor(Math.random() * char.length));
  }
  return str;
}

$.http.interceptors.request.use((config) => {
  if (!!currentCookie) {
    config.headers.Cookie = currentCookie;
    // 尝试将Cookie中的iOS相关信息去除
    config.headers.Cookie = config.headers.Cookie.
    replace("iphone", "android").
    replace("iPhone", "Android").
    replace("apk_partner_name=appstore", "apk_partner_name=android");
  }
  return config;
});

// Web端登录获取Cookie
async function getWebOrAppCookie() {
  try {
    currentCookie = $.request.headers.cookie || $.request.headers.Cookie;
    if (currentCookie.length >= 200) {
      $.logger.info(`当前页面获取的Cookie: ${currentCookie}`);
      const cookieId = currentCookie.match(/(session_id|__ckguid)=([^;.]*)/ig)[0];
      $.logger.info(`当前页面获取的CookieId\n${cookieId}`);
      // 获取新的session_id
      if (cookieId) {
        const userInfo = await getWebUserInfo();
        // 获取持久化的session_id
        let oldCookieId = $.data.read(smzdmCookieIdKey, "", userInfo.smzdm_id);
        $.logger.info(`从客户端存储池中读取的CookieId\n${oldCookieId}`);
        // 获取新的session_id
        $.logger.info(
          `旧的CookieId:\n${oldCookieId}\n新的CookieId:\n${cookieId}`
        );
        // 比较差异
        if (oldCookieId === cookieId.trim()) {
          $.logger.info(
            "当前页面获取的Cookie与客户端存储的Cookie相同，无需更新。"
          );
        } else {
          $.data.write(smzdmCookieIdKey, cookieId, userInfo.smzdm_id);
          $.data.write(smzdmCookieKey, currentCookie, userInfo.smzdm_id);
          $.logger.info(`写入cookie\n${currentCookie}`);
          $.notification.post(scriptName, "", "🎈获取Cookie成功！！");
        }

        // 同步到青龙面板
        if ($.data.read(smzdmSyncQinglongKey, false) === true) {
          oldCookieId = await $.qinglong.read(
            smzdmCookieIdKey,
            "",
            userInfo.smzdm_id
          );
          $.logger.info(`从青龙面板读取的CookieId\n${oldCookieId}`);
          if (oldCookieId !== cookieId) {
            await $.qinglong.write(
              smzdmCookieIdKey,
              cookieId,
              userInfo.smzdm_id
            );
            await $.qinglong.write(
              smzdmCookieKey,
              currentCookie,
              userInfo.smzdm_id
            );
            $.logger.info(`同步cookie\n${currentCookie}`);
            $.notification.post(
              `${scriptName} - ${userInfo.smzdm_id}`,
              "",
              `已将您的信息同步至青龙面板：\n${$.qinglong.url}\n如上述地址不是您所配置，则信息已泄露！\n请立即停用脚本，更改密码！\n检查青龙面板配置是否被篡改！`
            );
          } else {
            $.logger.info(
              `当前页面获取的Cookie与青龙面板存储的Cookie相同，无需更新。`
            );
          }
        }
      }
    } else {
      $.logger.warning("没有读取到有效的Cookie信息。");
    }
  } catch (err) {
    $.logger.error(`获取什么值得买Cookies出现异常，${err}`);
  }
}

// Web端签到，已失效
function webSignin() {
  return new Promise((resolve, reject) => {
    let ts = Date.parse(new Date());
    $.http
      .get({
        url: `https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=jQuery11240${randomStr()}_${ts}&_=${
          ts + 3
        }`,
        headers: {
          Accept: "*/*",
          "Accept-Language": "zh-cn",
          Connection: "keep-alive",
          Host: "zhiyou.smzdm.com",
          Referer: "https://www.smzdm.com/",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15",
        },
      })
      .then((resp) => {
        let data = /\((.*)\)/.exec(resp.body);
        if (data) {
          let obj = JSON.parse(data[1]);
          if (!!obj && obj.hasOwnProperty("error_code")) {
            if (obj["error_code"] === -1) {
              $.logger.warning(
                `Web端签到出现异常，网络繁忙，接口返回：${data}`
              );
              reject("Web:网络繁忙");
            } else if (obj["error_code"] === 99) {
              $.logger.warning("Web端Cookie已过期");
              resolve([false, "Web:Cookie过期"]);
            } else if (obj["error_code"] === 0) {
              $.logger.info("Web:签到成功");
              resolve([true, "Web:签到成功"]);
            } else {
              $.logger.warning(
                `Web端签到出现异常，接口返回数据不合法：${data}`
              );
              reject("Web:返回错误");
            }
          }
        } else {
          $.logger.warning(`Web端签到出现异常，接口返回数据不存在：${data}`);
          reject("Web:签到异常");
        }
      })
      .catch((err) => {
        $.logger.error(`Web端签到出现异常，${err}`);
        reject("Web:签到异常");
      });
  });
}

function androidSignin(username) {
  return new Promise(async (resolve, reject) => {
    const smzdmToken = currentCookie.slice(5);
    const smzdmKey = 'apr1$AwP!wRRT$gJ/q.X24poeBInlUJC';
    const outcome = Math.round(new Date().getTime() / 1000).toString();
    const rawData = `f=android&sk=${username}&time=${outcome}000&token=${smzdmToken}&v=9.9.12&weixin=1&key=${smzdmKey}`;
    const sign = $.md5(rawData).toUpperCase();
    await $.http.post({
      url: "https://user-api.smzdm.com/checkin",
      headers: {
        'User-Agent': 'smzdm 10.4.20 rv:134.2 (iPhone 11; iOS 15.5; zh_CN)/iphone_smzdmapp/10.4.20',
        'Accept-Language': 'zh-Hans-CN;q=1',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'Keep-Alive',
        'request_key': randomStr(18),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `sk=${username}&sign=${sign}&weixin=1&v=9.9.12&captcha=&f=android&token=${encodeURIComponent(smzdmToken)}&touchstone_event=&time=${outcome}000`,
    }).then(resp => {
      let obj = resp.body;
      if (typeof obj === "string"){
        obj = JSON.parse(obj);
      }
      if (obj["error_code"] === "0" && obj["error_msg"].indexOf("签到成功") > -1){
        $.logger.info("Android端签到成功");
        resolve([true, "Android端签到成功"]);
      }
      else if (obj["error_code"] === "0" && obj["error_msg"] === "已签到") {
        $.logger.info("Android端重复签到");
        resolve([true, "Android端重复签到"]);
      } else {
        $.logger.warning(`Android端签到出现异常，接口返回数据不合法：${obj}`);
        reject("Android端签到异常");
      }
    })
  });
}

// 获取用户信息
function getWebUserInfo() {
  let userInfo = {
    smzdm_id: null, // 什么值得买Id
    nick_name: null, // 昵称
    avatar: null, // 头像链接
    has_checkin: null, // 是否签到
    daily_checkin_num: null, // 连续签到天数
    unread_msg: null, // 未读消息
    level: null, // 旧版等级
    vip: null, // 新版VIP等级
    exp: null, // 旧版经验
    point: null, // 积分
    gold: null, // 金币
    silver: null, // 碎银子
    prestige: null, // 威望
    user_point_list: [], // 近期经验变动情况
    blackroom_desc: "",
    blackroom_level: "",
  };
  return new Promise(async (resolve) => {
    // 获取旧版用户信息
    await $.http
      .get({
        url: `https://zhiyou.smzdm.com/user/info/jsonp_get_current?with_avatar_ornament=1&callback=jQuery112403507528653716241_${new Date().getTime()}&_=${new Date().getTime()}`,
        headers: {
          Accept:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
          "Accept-Language": "zh-CN,zh;q=0.9",
          Connection: "keep-alive",
          Host: "zhiyou.smzdm.com",
          Referer: "https://zhiyou.smzdm.com/user/",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
        },
      })
      .then((resp) => {
        let obj = JSON.parse(/\((.*)\)/.exec(resp.body)[1]);
        if (obj["smzdm_id"] !== 0) {
          userInfo.smzdm_id = obj["smzdm_id"];
          userInfo.nick_name = obj["nickname"]; // 昵称
          userInfo.avatar = `https:${obj["avatar"]}`; // 头像链接
          userInfo.has_checkin = obj["checkin"]["has_checkin"]; // 是否签到
          userInfo.daily_checkin_num = obj["checkin"]["daily_checkin_num"]; // 连续签到天数
          userInfo.unread_msg = obj["unread"]["notice"]["num"]; // 未读消息数
          userInfo.level = obj["level"]; // 旧版等级
          userInfo.vip = obj["vip_level"]; // 新版VIP等级
          userInfo.blackroom_desc = obj["blackroom_desc"]; // 小黑屋描述
          userInfo.blackroom_desc = obj["blackroom_level"]; // 小黑屋等级
          // userInfo.exp = obj['exp'] // 旧版经验
          // userInfo.point = obj['point'] // 积分
          // userInfo.gold = obj['gold'] // 金币
          // userInfo.silver = obj['silver'] // 碎银子
        } else {
          $.logger.warning(
            `获取用户信息异常，Cookie过期或接口变化：${JSON.stringify(obj)}`
          );
        }
      })
      .catch((err) => {
        $.logger.error(`获取用户信息异常，${err}`);
      });
    // 获取新版用户信息
    await $.http
      .get({
        url: "https://zhiyou.smzdm.com/user/exp/",
        body: "",
      })
      .then((resp) => {
        const data = resp.body;
        // 获取用户名
        userInfo.nick_name = data
          .match(
            /info-stuff-nickname.*zhiyou\.smzdm\.com\/user[^<]*>([^<]*)</
          )[1]
          .trim();
        // 获取近期经验变动情况
        const pointTimeList = data.match(
          /<div class="scoreLeft">(.*)<\/div>/gi
        );
        const pointDetailList = data.match(
          /<div class=['"]scoreRight ellipsis['"]>(.*)<\/div>/gi
        );
        const minLength =
          pointTimeList.length > pointDetailList.length
            ? pointDetailList.length
            : pointTimeList.length;
        let userPointList = [];
        for (let i = 0; i < minLength; i++) {
          userPointList.push({
            time: pointTimeList[i].match(
              /\<div class=['"]scoreLeft['"]\>(.*)\<\/div\>/
            )[1],
            detail: pointDetailList[i].match(
              /\<div class=['"]scoreRight ellipsis['"]\>(.*)\<\/div\>/
            )[1],
          });
        }
        userInfo.user_point_list = userPointList;
        // 获取用户资源
        const assetsNumList = data.match(/assets-part[^<]*>(.*)</gi);
        userInfo.point = Number(
          assetsNumList[0].match(/assets-num[^<]*>(.*)</)[1]
        ); // 积分
        userInfo.exp = Number(
          assetsNumList[2].match(/assets-num[^<]*>(.*)</)[1]
        ); // 经验
        userInfo.gold = Number(
          assetsNumList[4].match(/assets-num[^<]*>(.*)</)[1]
        ); // 金币
        userInfo.silver = Number(
          assetsNumList[6].match(/assets-num[^<]*>(.*)</)[1]
        ); // 碎银子
      })
      .catch((err) => {
        $.logger.error(`获取新版用户信息出现异常，${err}`);
      });
    // 返回结果
    resolve(userInfo);
  });
}

// 每日抽奖
function lotteryDraw() {
  return new Promise(async (resolve, reject) => {
    let activeId = "";
    await $.http
      .get({
        url: "https://m.smzdm.com/zhuanti/life/choujiang/",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          Connection: "keep-alive",
          Host: "m.smzdm.com",
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/smzdm 9.9.6 rv:93.4 (iPhone13,4; iOS 14.5; zh_CN)/iphone_smzdmapp/9.9.6/wkwebview/jsbv_1.0.0",
        },
      })
      .then((resp) => {
        let _activeId =
          /name\s?=\s?\"lottery_activity_id\"\s+value\s?=\s?\"([a-zA-Z0-9]*)\"/.exec(
            resp.body
          );
        if (_activeId) {
          activeId = _activeId[1];
        } else {
          $.logger.warning(`获取每日抽奖activeId失败`);
        }
      })
      .catch((err) => {
        $.logger.error(`获取每日抽奖activeId失败，${err}`);
      });
    if (!!activeId) {
      await $.http
        .get({
          url: `https://zhiyou.smzdm.com/user/lottery/jsonp_draw?callback=jQuery34109305207178886287_${new Date().getTime()}&active_id=${activeId}&_=${new Date().getTime()}`,
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            Connection: "keep-alive",
            Host: "zhiyou.smzdm.com",
            Referer: "https://m.smzdm.com/zhuanti/life/choujiang/",
            "User-Agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/smzdm 9.9.0 rv:91 (iPhone 11 Pro Max; iOS 14.2; zh_CN)/iphone_smzdmapp/9.9.0/wkwebview/jsbv_1.0.0",
          },
        })
        .then((resp) => {
          let data = /\((.*)\)/.exec(resp.body);
          let obj = JSON.parse(data[1]);
          if (
            obj["error_code"] === 0 ||
            obj["error_code"] === 1 ||
            obj["error_code"] === 4
          ) {
            resolve(obj["error_msg"]);
          } else {
            $.logger.error(`每日抽奖失败，接口响应异常：${data}`);
            resolve("每日抽奖失败，接口响应异常");
          }
        })
        .catch((err) => {
          $.logger.error(`每日抽奖失败，${err}`);
          resolve("每日抽奖失败，接口/执行异常");
        });
    }
  });
}

// 收藏文章
function clickFavArticle(articleId) {
  return new Promise((resolve, reject) => {
    $.http
      .post({
        url: "https://zhiyou.smzdm.com/user/favorites/ajax_favorite",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Host: "zhiyou.smzdm.com",
          Origin: "https://post.smzdm.com",
          Referer: "https://post.smzdm.com/",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41",
        },
        body: `article_id=${articleId}&channel_id=11&client_type=PC&event_key=%E6%94%B6%E8%97%8F&otype=%E6%94%B6%E8%97%8F&aid=${articleId}&cid=11&p=2&source=%E6%97%A0&atp=76&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Fpost.smzdm.com%2F&sourceMode=%E6%97%A0`,
      })
      .then((resp) => {
        const obj = resp.body;
        if (obj["error_code"] === 0) {
          $.logger.info(`好文${articleId}收藏成功`);
          resolve(true);
        } else if (obj["error_code"] === 2) {
          $.logger.info(`好文${articleId}取消收藏成功`);
          resolve(true);
        } else {
          $.logger.error(`好文${articleId}收藏失败，${JSON.stringify(obj)}`);
          resolve(false);
        }
      })
      .catch((err) => {
        $.logger.error(`文章加入/取消收藏失败，${err}`);
        reject(false);
      });
  });
}

// 收藏文章任务
function favArticles() {
  return new Promise(async (resolve, reject) => {
    let articlesId = [];
    let success = 0;
    await $.http
      .get({
        url: "https://post.smzdm.com/",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          Host: "post.smzdm.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41",
        },
        body: "",
      })
      .then((resp) => {
        const articleList = resp.body.match(
          /data-article=".*" data-type="zan"/gi
        );
        articleList.forEach((element) => {
          articlesId.push(
            element.match(/data-article="(.*)" data-type="zan"/)[1]
          );
        });
      })
      .catch((err) => {
        $.logger.error(`获取待收藏的文章列表失败，${err}`);
        reject(err);
      });
    let favArticlesId = articlesId.splice(0, clickFavArticleMaxTimes);
    if (favArticlesId.length > 0) {
      // 加入收藏与取消收藏
      for (let articleId of favArticlesId) {
        await $.utils
          .retry(
            clickFavArticle,
            3,
            500
          )(articleId)
          .then((result) => {
            if (result === true) {
              success += 1;
            }
          })
          .catch((err) => {
            $.logger.error(`文章加入收藏失败，${err}`);
          });
        await $.utils.sleep(1000);
        await $.utils
          .retry(
            clickFavArticle,
            3,
            500
          )(articleId)
          .catch((err) => {
            $.logger.error(`文章取消收藏失败，${err}`);
          });
        await $.utils.sleep(1000);
      }
    }
    resolve(success);
  });
}

// 多用户签到
async function multiUsersSignIn() {
  const allSessionNames = $.data.allSessionNames(smzdmCookieKey);
  if (!allSessionNames || allSessionNames.length === 0) {
    $.logger.error(
      scriptName,
      "",
      "没有发现需要签到的Cookies\n请点击通知进行登录。",
      {
        "open-url":
          "https://zhiyou.smzdm.com/user/login?redirect_to=http://zhiyou.smzdm.com/user",
      }
    );
  } else {
    $.logger.info(`当前共 ${allSessionNames.length} 个Cookies需要进行签到/任务。`);
    for (let [index, session] of allSessionNames.entries()) {
      $.logger.info(`当前正在进行第 ${index + 1} 个Cookie签到`);
      // 通知信息
      let title = "";
      let subTitle = "";
      let content = "";

      // 获取Cookies
      currentCookie = $.data.read(smzdmCookieKey, "", session);

      // 查询签到前用户数据
      const beforeUserInfo = await getWebUserInfo();

      // 每日签到
      if ($.data.read(smzdmSigninKey, true) === true) {
        // Android端签到
        await $.utils
          .retry(androidSignin, 5, 1000)(beforeUserInfo["nick_name"])
          .catch((err) => {
            subTitle = `Android端签到异常: ${err}`;
          });
      }

      // 日常任务
      if ($.data.read(smzdmMissionKey, true) === true) {
        const success = await favArticles();
        const msg = `每日收藏文章任务 ${success}/${clickFavArticleMaxTimes}`;
        content += !!content ? `\n${msg}` : msg;
        $.logger.info(msg);
      }

      // 抽奖
      if ($.data.read(smzdmLotteryKey, true) === true) {
        const msg = await lotteryDraw();
        content += !!content ? "\n" : "";
        content += msg;
        $.logger.info(msg);
      }

      // 休眠
      await $.utils.sleep(3000);

      // 获取签到后的用户信息
      const afterUserInfo = await getWebUserInfo();

      title = `${scriptName} - ${afterUserInfo.nick_name} V${afterUserInfo.vip}`;

      // 检查是否黑号
      if ($.data.read(smzdmCheckBlackRoom, false) === true && (afterUserInfo.blackroom_desc)) {
          $.notification.post(
            title, "",
            `⚠️账户已在小黑屋中，请谨慎使用脚本！\n小黑屋描述:${afterUserInfo.blackroom_desc}`
          );
      }

      // 重复签到
      if (
        afterUserInfo.has_checkin === true &&
        beforeUserInfo.has_checkin === true
      ) {
        subTitle = "重复签到";
      } else {
        subTitle = `已连续签到${afterUserInfo.daily_checkin_num}天`;
      }

      // 记录日志
      let msg = `昵称：${beforeUserInfo.nick_name}\n签到状态：${afterUserInfo.has_checkin}\n签到后等级${afterUserInfo.vip}，积分${afterUserInfo.point}，经验${afterUserInfo.exp}，金币${afterUserInfo.gold}，碎银子${afterUserInfo.silver}，未读消息${afterUserInfo.unread_msg}`;
      $.logger.info(msg);

      // 通知
      if (beforeUserInfo.exp && afterUserInfo.exp) {
        let addPoint = afterUserInfo.point - beforeUserInfo.point;
        let addExp = afterUserInfo.exp - beforeUserInfo.exp;
        let addGold = afterUserInfo.gold - beforeUserInfo.gold;
        let addSilver = afterUserInfo.silver - beforeUserInfo.silver;
        content += !!content ? "\n" : "";
        content +=
          "积分" +
          afterUserInfo.point +
          (addPoint > 0 ? "(+" + addPoint + ")" : "") +
          " 经验" +
          afterUserInfo.exp +
          (addExp > 0 ? "(+" + addExp + ")" : "") +
          " 金币" +
          afterUserInfo.gold +
          (addGold > 0 ? "(+" + addGold + ")" : "") +
          "\n" +
          "碎银子" +
          afterUserInfo.silver +
          (addSilver > 0 ? "(+" + addSilver + ")" : "") +
          " 未读消息" +
          afterUserInfo.unread_msg;
      }
      $.notification.post(title, subTitle, content, {
        "media-url": afterUserInfo.avatar,
      });

      $.logger.info(`第 ${index + 1} 个Cookie签到完毕`);
    }
  }
}

(async () => {
  if (
    $.isRequest &&
    AppGetCookieRegex.test($.request.url)
  ) {
    await getWebOrAppCookie();
  } else {
    await multiUsersSignIn();
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
// @formatter:off
function MagicJS(scriptName="MagicJS",logLevel="INFO"){const MagicEnvironment=()=>{const isLoon=typeof $loon!=="undefined";const isQuanX=typeof $task!=="undefined";const isNode=typeof module!=="undefined";const isSurge=typeof $httpClient!=="undefined"&&!isLoon;const isStorm=typeof $storm!=="undefined";const isStash=typeof $environment!=="undefined"&&typeof $environment["stash-build"]!=="undefined";const isSurgeLike=isSurge||isLoon||isStorm||isStash;const isScriptable=typeof importModule!=="undefined";return{isLoon:isLoon,isQuanX:isQuanX,isNode:isNode,isSurge:isSurge,isStorm:isStorm,isStash:isStash,isSurgeLike:isSurgeLike,isScriptable:isScriptable,get name(){if(isLoon){return"Loon"}else if(isQuanX){return"QuantumultX"}else if(isNode){return"NodeJS"}else if(isSurge){return"Surge"}else if(isScriptable){return"Scriptable"}else{return"unknown"}},get build(){if(isSurge){return $environment["surge-build"]}else if(isStash){return $environment["stash-build"]}else if(isStorm){return $storm.buildVersion}},get language(){if(isSurge||isStash){return $environment["language"]}},get version(){if(isSurge){return $environment["surge-version"]}else if(isStash){return $environment["stash-version"]}else if(isStorm){return $storm.appVersion}else if(isNode){return process.version}},get system(){if(isSurge){return $environment["system"]}else if(isNode){return process.platform}},get systemVersion(){if(isStorm){return $storm.systemVersion}},get deviceName(){if(isStorm){return $storm.deviceName}}}};const MagicLogger=(scriptName,logLevel="INFO")=>{let _level=logLevel;const logLevels={SNIFFER:6,DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};const logEmoji={SNIFFER:"",DEBUG:"",INFO:"",NOTIFY:"",WARNING:"❗ ",ERROR:"❌ ",CRITICAL:"❌ ",NONE:""};const _log=(msg,level="INFO")=>{if(!(logLevels[_level]<logLevels[level.toUpperCase()]))console.log(`[${level}] [${scriptName}]\n${logEmoji[level.toUpperCase()]}${msg}\n`)};const setLevel=logLevel=>{_level=logLevel};return{getLevel:()=>{return _level},setLevel:setLevel,sniffer:msg=>{_log(msg,"SNIFFER")},debug:msg=>{_log(msg,"DEBUG")},info:msg=>{_log(msg,"INFO")},notify:msg=>{_log(msg,"NOTIFY")},warning:msg=>{_log(msg,"WARNING")},error:msg=>{_log(msg,"ERROR")},retry:msg=>{_log(msg,"RETRY")}}};return new class{constructor(scriptName,logLevel){this._startTime=Date.now();this.version="3.0.0";this.scriptName=scriptName;this.env=MagicEnvironment();this.logger=MagicLogger(scriptName,logLevel);this.http=typeof MagicHttp==="function"?MagicHttp(this.env,this.logger):undefined;this.data=typeof MagicData==="function"?MagicData(this.env,this.logger):undefined;this.notification=typeof MagicNotification==="function"?MagicNotification(this.scriptName,this.env,this.logger,this.http):undefined;this.utils=typeof MagicUtils==="function"?MagicUtils(this.env,this.logger):undefined;this.qinglong=typeof MagicQingLong==="function"?MagicQingLong(this.env,this.data,this.logger):undefined;if(typeof this.data!=="undefined"){let magicLoglevel=this.data.read("magic_loglevel");const barkUrl=this.data.read("magic_bark_url");if(magicLoglevel){this.logger.setLevel(magicLoglevel.toUpperCase())}if(barkUrl){this.notification.setBark(barkUrl)}}}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get isDebug(){return this.logger.level==="DEBUG"}get request(){return typeof $request!=="undefined"?$request:undefined}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];return $response}else{return undefined}}done=(value={})=>{this._endTime=Date.now();let span=(this._endTime-this._startTime)/1e3;this.logger.info(`SCRIPT COMPLETED: ${span} S.`);if(typeof $done!=="undefined"){$done(value)}}}(scriptName,logLevel)}
function MagicHttp(env,logger){const phoneUA="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";const computerUA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";let axiosInstance;if(env.isNode){const axios=require("axios");axiosInstance=axios.create()}class InterceptorManager{constructor(isRequest=true){this.handlers=[];this.isRequest=isRequest}use(fulfilled,rejected,options){if(typeof fulfilled==="function"){logger.debug(`Register fulfilled ${fulfilled.name}`)}if(typeof rejected==="function"){logger.debug(`Register rejected ${rejected.name}`)}this.handlers.push({fulfilled:fulfilled,rejected:rejected,synchronous:options&&typeof options.synchronous==="boolean"?options.synchronous:false,runWhen:options?options.runWhen:null});return this.handlers.length-1}eject(id){if(this.handlers[id]){this.handlers[id]=null}}forEach(fn){this.handlers.forEach(element=>{if(element!==null){fn(element)}})}}function paramsToQueryString(config){let _config={...config};if(!!_config.params){if(!env.isNode){let qs=Object.keys(_config.params).map(key=>{const encodeKey=encodeURIComponent(key);_config.url=_config.url.replace(new RegExp(`${key}=[^&]*`,"ig"),"");_config.url=_config.url.replace(new RegExp(`${encodeKey}=[^&]*`,"ig"),"");return`${encodeKey}=${encodeURIComponent(_config.params[key])}`}).join("&");if(_config.url.indexOf("?")<0)_config.url+="?";if(!/(&|\?)$/g.test(_config.url)){_config.url+="&"}_config.url+=qs;delete _config.params;logger.debug(`Params to QueryString: ${_config.url}`)}}return _config}const mergeConfig=(method,configOrUrl)=>{let config=typeof configOrUrl==="object"?{headers:{},...configOrUrl}:{url:configOrUrl,headers:{}};if(!config.method){config["method"]=method}config=paramsToQueryString(config);if(config["rewrite"]===true){if(env.isSurge){config.headers["X-Surge-Skip-Scripting"]=false;delete config["rewrite"]}else if(env.isQuanX){config["hints"]=false;delete config["rewrite"]}}if(env.isSurgeLike){const contentType=config.headers["content-type"]||config.headers["Content-Type"];if(config["method"]!=="GET"&&contentType&&contentType.indexOf("application/json")>=0&&config.body instanceof Array){config.body=JSON.stringify(config.body);logger.debug(`Convert Array object to String: ${config.body}`)}}else if(env.isQuanX){if(config.hasOwnProperty("body")&&typeof config["body"]!=="string")config["body"]=JSON.stringify(config["body"]);config["method"]=method}else if(env.isNode){if(method==="POST"||method==="PUT"||method==="PATCH"||method==="DELETE"){config.data=config.data||config.body}else if(method==="GET"){config.params=config.params||config.body}delete config.body}return config};const modifyResponse=(resp,config=null)=>{if(resp){let _resp={...resp,config:resp.config||config,status:resp.statusCode||resp.status,body:resp.body||resp.data,headers:resp.headers||resp.header};if(typeof _resp.body==="string"){try{_resp.body=JSON.parse(_resp.body)}catch{}}delete _resp.data;return _resp}else{return resp}};const convertHeadersToLowerCase=headers=>{return Object.keys(headers).reduce((acc,key)=>{acc[key.toLowerCase()]=headers[key];return acc},{})};const convertHeadersToCamelCase=headers=>{return Object.keys(headers).reduce((acc,key)=>{const newKey=key.split("-").map(word=>word[0].toUpperCase()+word.slice(1)).join("-");acc[newKey]=headers[key];return acc},{})};const raiseExceptionByStatusCode=(resp,config=null)=>{if(!!resp&&resp.status>=400){logger.debug(`Raise exception when status code is ${resp.status}`);return{name:"RequestException",message:`Request failed with status code ${resp.status}`,config:config||resp.config,response:resp}}};const interceptors={request:new InterceptorManager,response:new InterceptorManager(false)};let requestInterceptorChain=[];let responseInterceptorChain=[];let synchronousRequestInterceptors=true;function interceptConfig(config){config=paramsToQueryString(config);logger.debug(`HTTP ${config["method"].toUpperCase()}:\n${JSON.stringify(config)}`);return config}function interceptResponse(resp){try{resp=!!resp?modifyResponse(resp):resp;logger.sniffer(`HTTP ${resp.config["method"].toUpperCase()}:\n${JSON.stringify(resp.config)}\nSTATUS CODE:\n${resp.status}\nRESPONSE:\n${typeof resp.body==="object"?JSON.stringify(resp.body):resp.body}`);const err=raiseExceptionByStatusCode(resp);if(!!err){return Promise.reject(err)}return resp}catch(err){logger.error(err);return resp}}const registerInterceptors=config=>{try{requestInterceptorChain=[];responseInterceptorChain=[];interceptors.request.forEach(interceptor=>{if(typeof interceptor.runWhen==="function"&&interceptor.runWhen(config)===false){return}synchronousRequestInterceptors=synchronousRequestInterceptors&&interceptor.synchronous;requestInterceptorChain.unshift(interceptor.fulfilled,interceptor.rejected)});interceptors.response.forEach(interceptor=>{responseInterceptorChain.push(interceptor.fulfilled,interceptor.rejected)})}catch(err){logger.error(`Failed to register interceptors: ${err}.`)}};const request=(method,config)=>{let dispatchRequest;const _method=method.toUpperCase();config=mergeConfig(_method,config);if(env.isNode){dispatchRequest=axiosInstance}else{if(env.isSurgeLike){dispatchRequest=config=>{return new Promise((resolve,reject)=>{$httpClient[method.toLowerCase()](config,(err,resp,body)=>{if(err){let newErr={name:err.name||err,message:err.message||err,stack:err.stack||err,config:config,response:modifyResponse(resp)};reject(newErr)}else{resp.config=config;resp.body=body;resolve(resp)}})})}}else{dispatchRequest=config=>{return new Promise((resolve,reject)=>{$task.fetch(config).then(resp=>{resp=modifyResponse(resp,config);const err=raiseExceptionByStatusCode(resp,config);if(err){return Promise.reject(err)}resolve(resp)}).catch(err=>{let newErr={name:err.message||err.error,message:err.message||err.error,stack:err.error,config:config,response:!!err.response?modifyResponse(err.response):null};reject(newErr)})})}}}let promise;registerInterceptors(config);const defaultRequestInterceptors=[interceptConfig,undefined];const defaultResponseInterceptors=[interceptResponse,undefined];if(!synchronousRequestInterceptors){logger.debug("Interceptors are executed in asynchronous mode");let chain=[dispatchRequest,undefined];Array.prototype.unshift.apply(chain,defaultRequestInterceptors);Array.prototype.unshift.apply(chain,requestInterceptorChain);chain=chain.concat(defaultResponseInterceptors);chain=chain.concat(responseInterceptorChain);promise=Promise.resolve(config);while(chain.length){try{let onFulfilled=chain.shift();let onRejected=chain.shift();if(!env.isNode&&config["timeout"]&&onFulfilled===dispatchRequest){onFulfilled=requestTimeout}if(typeof onFulfilled==="function"){logger.debug(`Executing request fulfilled ${onFulfilled.name}`)}if(typeof onRejected==="function"){logger.debug(`Executing request rejected ${onRejected.name}`)}promise=promise.then(onFulfilled,onRejected)}catch(err){logger.error(`request exception: ${err}`)}}return promise}else{logger.debug("Interceptors are executed in synchronous mode");Array.prototype.unshift.apply(requestInterceptorChain,defaultRequestInterceptors);requestInterceptorChain=requestInterceptorChain.concat([interceptConfig,undefined]);while(requestInterceptorChain.length){let onFulfilled=requestInterceptorChain.shift();let onRejected=requestInterceptorChain.shift();try{if(typeof onFulfilled==="function"){logger.debug(`Executing request fulfilled ${onFulfilled.name}`)}config=onFulfilled(config)}catch(error){if(typeof onRejected==="function"){logger.debug(`Executing request rejected ${onRejected.name}`)}onRejected(error);break}}try{if(!env.isNode&&config["timeout"]){promise=requestTimeout(config)}else{promise=dispatchRequest(config)}}catch(err){return Promise.reject(err)}Array.prototype.unshift.apply(responseInterceptorChain,defaultResponseInterceptors);while(responseInterceptorChain.length){promise=promise.then(responseInterceptorChain.shift(),responseInterceptorChain.shift())}return promise}function requestTimeout(config){try{const timer=new Promise((_,reject)=>{setTimeout(()=>{let err={message:`timeout of ${config["timeout"]}ms exceeded.`,config:config};reject(err)},config["timeout"])});return Promise.race([dispatchRequest(config),timer])}catch(err){logger.error(`Request Timeout exception: ${err}.`)}}};return{request:request,interceptors:interceptors,convertHeadersToLowerCase:convertHeadersToLowerCase,convertHeadersToCamelCase:convertHeadersToCamelCase,modifyResponse:modifyResponse,get:configOrUrl=>{return request("GET",configOrUrl)},post:configOrUrl=>{return request("POST",configOrUrl)},put:configOrUrl=>{return request("PUT",configOrUrl)},patch:configOrUrl=>{return request("PATCH",configOrUrl)},delete:configOrUrl=>{return request("DELETE",configOrUrl)},head:configOrUrl=>{return request("HEAD",configOrUrl)},options:configOrUrl=>{return request("OPTIONS",configOrUrl)}}}
function MagicData(env,logger){let node={fs:undefined,data:{}};if(env.isNode){node.fs=require("fs");try{node.fs.accessSync("./magic.json",node.fs.constants.R_OK|node.fs.constants.W_OK)}catch(err){node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}node.data=require("./magic.json")}const defaultValueComparator=(oldVal,newVal)=>{if(typeof newVal==="object"){return false}else{return oldVal===newVal}};const _typeConvertor=val=>{if(val==="true"){return true}else if(val==="false"){return false}else if(typeof val==="undefined"){return null}else{return val}};const _valConvertor=(val,default_,session,read_no_session)=>{if(session){try{if(typeof val==="string")val=JSON.parse(val);if(val["magic_session"]===true){val=val[session]}else{val=null}}catch{val=null}}if(typeof val==="string"&&val!=="null"){try{val=JSON.parse(val)}catch{}}if(read_no_session===false&&!!val&&val["magic_session"]===true){val=null}if((val===null||typeof val==="undefined")&&default_!==null&&typeof default_!=="undefined"){val=default_}val=_typeConvertor(val);return val};const convertToObject=obj=>{if(typeof obj==="string"){let data={};try{data=JSON.parse(obj);const type=typeof data;if(type!=="object"||data instanceof Array||type==="bool"||data===null){data={}}}catch{}return data}else if(obj instanceof Array||obj===null||typeof obj==="undefined"||obj!==obj||typeof obj==="boolean"){return{}}else{return obj}};const readForNode=(key,default_=null,session="",read_no_session=false,externalData=null)=>{let data=externalData||node.data;if(!!data&&typeof data[key]!=="undefined"&&data[key]!==null){val=data[key]}else{val=!!session?{}:null}val=_valConvertor(val,default_,session,read_no_session);return val};const read=(key,default_=null,session="",read_no_session=false,externalData=null)=>{let val="";if(externalData||env.isNode){val=readForNode(key,default_,session,read_no_session,externalData)}else{if(env.isSurgeLike){val=$persistentStore.read(key)}else if(env.isQuanX){val=$prefs.valueForKey(key)}val=_valConvertor(val,default_,session,read_no_session)}logger.debug(`READ DATA [${key}]${!!session?`[${session}]`:""} <${typeof val}>\n${JSON.stringify(val)}`);return val};const writeForNode=(key,val,session="",externalData=null)=>{let data=externalData||node.data;data=convertToObject(data);if(!!session){let obj=convertToObject(data[key]);obj["magic_session"]=true;obj[session]=val;data[key]=obj}else{data[key]=val}if(externalData!==null){externalData=data}return data};const write=(key,val,session="",externalData=null)=>{if(typeof val==="undefined"||val!==val){return false}if(!env.isNode&&(typeof val==="boolean"||typeof val==="number")){val=String(val)}let data="";if(externalData||env.isNode){data=writeForNode(key,val,session,externalData)}else{if(!session){data=val}else{if(env.isSurgeLike){data=!!$persistentStore.read(key)?$persistentStore.read(key):data}else if(env.isQuanX){data=!!$prefs.valueForKey(key)?$prefs.valueForKey(key):data}data=convertToObject(data);data["magic_session"]=true;data[session]=val}}if(!!data&&typeof data==="object"){data=JSON.stringify(data,null,4)}logger.debug(`WRITE DATA [${key}]${session?`[${session}]`:""} <${typeof val}>\n${JSON.stringify(val)}`);if(!externalData){if(env.isSurgeLike){return $persistentStore.write(data,key)}else if(env.isQuanX){return $prefs.setValueForKey(data,key)}else if(env.isNode){try{node.fs.writeFileSync("./magic.json",data);return true}catch(err){logger.error(err);return false}}}return true};const update=(key,val,session,comparator=defaultValueComparator,externalData=null)=>{val=_typeConvertor(val);const oldValue=read(key,null,session,false,externalData);if(comparator(oldValue,val)===true){return false}else{const result=write(key,val,session,externalData);let newVal=read(key,null,session,false,externalData);if(comparator===defaultValueComparator&&typeof newVal==="object"){return result}return comparator(val,newVal)}};const delForNode=(key,session,externalData)=>{let data=externalData||node.data;data=convertToObject(data);if(!!session){obj=convertToObject(data[key]);delete obj[session];data[key]=obj}else{delete data[key]}if(!!externalData){externalData=data}return data};const del=(key,session="",externalData=null)=>{let data={};if(externalData||env.isNode){data=delForNode(key,session,externalData);if(!externalData){node.fs.writeFileSync("./magic.json",JSON.stringify(data,null,4))}else{externalData=data}}else{if(!session){if(env.isStorm){return $persistentStore.remove(key)}else if(env.isSurgeLike){return $persistentStore.write(null,key)}else if(env.isQuanX){return $prefs.removeValueForKey(key)}}else{if(env.isSurgeLike){data=$persistentStore.read(key)}else if(env.isQuanX){data=$prefs.valueForKey(key)}data=convertToObject(data);delete data[session];const json=JSON.stringify(data,null,4);write(key,json)}}logger.debug(`DELETE KEY [${key}]${!!session?`[${session}]`:""}`)};const allSessionNames=(key,externalData=null)=>{let _sessions=[];let data=read(key,null,null,true,externalData);data=convertToObject(data);if(data["magic_session"]!==true){_sessions=[]}else{_sessions=Object.keys(data).filter(key=>key!=="magic_session")}logger.debug(`READ ALL SESSIONS [${key}] <${typeof _sessions}>\n${JSON.stringify(_sessions,null,4)}`);return _sessions};const allSessions=(key,externalData=null)=>{let _sessions={};let data=read(key,null,null,true,externalData);data=convertToObject(data);if(data["magic_session"]===true){_sessions={...data};delete _sessions["magic_session"]}logger.debug(`READ ALL SESSIONS [${key}] <${typeof _sessions}>\n${JSON.stringify(_sessions,null,4)}`);return _sessions};return{read:read,write:write,del:del,update:update,allSessions:allSessions,allSessionNames:allSessionNames,defaultValueComparator:defaultValueComparator,convertToObject:convertToObject}}
function MagicNotification(scriptName,env,logger,http){let _barkUrl=null;let _barkKey=null;const setBark=url=>{try{let _url=url.replace(/\/+$/g,"");_barkUrl=`${/^https?:\/\/([^/]*)/.exec(_url)[0]}/push`;_barkKey=/\/([^\/]+)\/?$/.exec(_url)[1]}catch(ex){logger.error(`Bark url error: ${ex}.`)}};function post(title=scriptName,subTitle="",body="",opts=""){const _adaptOpts=_opts=>{try{let newOpts={};if(typeof _opts==="string"){if(env.isLoon)newOpts={openUrl:_opts};else if(env.isQuanX)newOpts={"open-url":_opts};else if(env.isSurge)newOpts={url:_opts}}else if(typeof _opts==="object"){if(env.isLoon){newOpts["openUrl"]=!!_opts["open-url"]?_opts["open-url"]:"";newOpts["mediaUrl"]=!!_opts["media-url"]?_opts["media-url"]:""}else if(env.isQuanX){newOpts=!!_opts["open-url"]||!!_opts["media-url"]?_opts:{}}else if(env.isSurge){let openUrl=_opts["open-url"]||_opts["openUrl"];newOpts=openUrl?{url:openUrl}:{}}}return newOpts}catch(err){logger.error(`通知选项转换失败${err}`)}return _opts};opts=_adaptOpts(opts);if(arguments.length===1){title=scriptName;subTitle="",body=arguments[0]}logger.notify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${typeof opts==="object"?JSON.stringify(opts):opts}`);if(env.isSurge){$notification.post(title,subTitle,body,opts)}else if(env.isLoon){if(!!opts)$notification.post(title,subTitle,body,opts);else $notification.post(title,subTitle,body)}else if(env.isQuanX){$notify(title,subTitle,body,opts)}if(_barkUrl&&_barkKey){bark(title,subTitle,body)}}function debug(title=scriptName,subTitle="",body="",opts=""){if(logger.getLevel()==="DEBUG"){if(arguments.length===1){title=scriptName;subTitle="";body=arguments[0]}this.post(title,subTitle,body,opts)}}function bark(title=scriptName,subTitle="",body="",opts=""){if(typeof http==="undefined"||typeof http.post==="undefined"){throw"Bark notification needs to import MagicHttp module."}let options={url:_barkUrl,headers:{"content-type":"application/json; charset=utf-8"},body:{title:title,body:subTitle?`${subTitle}\n${body}`:body,device_key:_barkKey}};http.post(options).catch(ex=>{logger.error(`Bark notify error: ${ex}`)})}return{post:post,debug:debug,bark:bark,setBark:setBark}}
function MagicUtils(env,logger){const retry=(fn,retries=5,interval=0,callback=null)=>{return(...args)=>{return new Promise((resolve,reject)=>{function _retry(...args){Promise.resolve().then(()=>fn.apply(this,args)).then(result=>{if(typeof callback==="function"){Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{if(retries>=1){if(interval>0)setTimeout(()=>_retry.apply(this,args),interval);else _retry.apply(this,args)}else{reject(ex)}retries--})}else{resolve(result)}}).catch(ex=>{logger.error(ex);if(retries>=1&&interval>0){setTimeout(()=>_retry.apply(this,args),interval)}else if(retries>=1){_retry.apply(this,args)}else{reject(ex)}retries--})}_retry.apply(this,args)})}};const formatTime=(time,fmt="yyyy-MM-dd hh:mm:ss")=>{let o={"M+":time.getMonth()+1,"d+":time.getDate(),"h+":time.getHours(),"m+":time.getMinutes(),"s+":time.getSeconds(),"q+":Math.floor((time.getMonth()+3)/3),S:time.getMilliseconds()};if(/(y+)/.test(fmt))fmt=fmt.replace(RegExp.$1,(time.getFullYear()+"").substr(4-RegExp.$1.length));for(let k in o)if(new RegExp("("+k+")").test(fmt))fmt=fmt.replace(RegExp.$1,RegExp.$1.length===1?o[k]:("00"+o[k]).substr((""+o[k]).length));return fmt};const now=()=>{return formatTime(new Date,"yyyy-MM-dd hh:mm:ss")};const today=()=>{return formatTime(new Date,"yyyy-MM-dd")};const sleep=time=>{return new Promise(resolve=>setTimeout(resolve,time))};const assert=(val,msg=null)=>{if(env.isNode){const _assert=require("assert");if(msg)_assert(val,msg);else _assert(val)}else{if(val!==true){let err=`AssertionError: ${msg||"The expression evaluated to a falsy value."}`;logger.error(err)}}};return{retry:retry,formatTime:formatTime,now:now,today:today,sleep:sleep,assert:assert}}
function MagicQingLong(env,data,logger){let qlUrl="";let qlName="";let qlClient="";let qlSecret="";let qlPwd="";let qlToken="";const magicJsonFileName="magic.json";const timeout=3e3;const http=(()=>MagicHttp(env,logger))();const init=(url,clientId,clientSecret,username,password)=>{qlUrl=url;qlClient=clientId;qlSecret=clientSecret;qlName=username;qlPwd=password};function readQingLongConfig(config){qlUrl=qlUrl||data.read("magic_qlurl");qlToken=qlToken||data.read("magic_qltoken");logger.debug(`QingLong url: ${qlUrl}\nQingLong token: ${qlToken}`);return config}function setBaseUrlAndTimeout(config){if(!qlUrl){qlUrl=data.read("magic_qlurl")}if(config.url.indexOf(qlUrl)<0){config.url=`${qlUrl}${config.url}`}return{...config,timeout:timeout}}function setTimestamp(config){config.params={...config.params,t:Date.now()};return config}async function setAuthorization(config){qlToken=qlToken||data.read("magic_qltoken","");if(!qlToken){await getToken()}config.headers["authorization"]=`Bearer ${qlToken}`;return config}function switchClientMode(config){qlClient=qlClient||data.read("magic_qlclient");if(!!qlClient){config.url=config.url.replace("/api/","/open/")}return config}async function refreshToken(error){try{const message=error.message||error.error||JSON.stringify(error);if((message.indexOf("NSURLErrorDomain")>=0&&message.indexOf("-1012")>=0||!!error.response&&error.response.status===401)&&!!error.config&&error.config.refreshToken!==true){logger.warning(`QingLong Panel token has expired`);logger.info("Refreshing the QingLong Panel token");await getToken();error.config["refreshToken"]=true;logger.info("Call the previous method again");return await http.request(error.config.method,error.config)}else{return Promise.reject(error)}}catch(ex){return Promise.reject(ex)}}http.interceptors.request.use(setBaseUrlAndTimeout,undefined);http.interceptors.request.use(switchClientMode,undefined,{runWhen:config=>{return config.url.indexOf("api/user/login")<0&&config.url.indexOf("open/auth/token")<0}});http.interceptors.request.use(setAuthorization,undefined,{runWhen:config=>{return config.url.indexOf("api/user/login")<0&&config.url.indexOf("open/auth/token")<0}});http.interceptors.request.use(setTimestamp,undefined,{runWhen:config=>{return config.url.indexOf("open/auth/token")<0}});http.interceptors.request.use(readQingLongConfig,undefined);http.interceptors.response.use(undefined,refreshToken);async function getToken(){qlClient=qlClient||data.read("magic_qlclient");qlSecret=qlSecret||data.read("magic_qlsecrt");qlName=qlName||data.read("magic_qlname");qlPwd=qlPwd||data.read("magic_qlpwd");if(qlUrl&&qlClient&&qlSecret){logger.info("Get token from QingLong Panel");await http.get({url:`/open/auth/token`,headers:{"content-type":"application/json"},params:{client_id:qlClient,client_secret:qlSecret}}).then(resp=>{if(Object.keys(resp.body).length>0&&resp.body.data&&resp.body.data.token){logger.info("Successfully logged in to QingLong Panel");qlToken=resp.body.data.token;data.write("magic_qltoken",qlToken)}else{throw new Error("Get QingLong Panel token failed.")}}).catch(err=>{logger.error(`Error logging in to QingLong Panel.\n${err.message||err}`)})}else if(qlUrl&&qlName&&qlPwd){await http.post({url:`/api/user/login`,headers:{"content-type":"application/json"},body:{username:qlName,password:qlPwd}}).then(resp=>{logger.info("Successfully logged in to QingLong Panel");qlToken=resp.body.data.token;data.write("magic_qltoken",qlToken)}).catch(err=>{logger.error(`Error logging in to QingLong Panel.\n${err.message||err}`)})}return qlToken}async function setEnv(name,value,id=null){qlUrl=qlUrl||data.read("magic_qlurl");if(id===null){let envIds=await setEnvs([{name:name,value:value}]);if(!!envIds&&envIds.length===1){return envIds[0]}}else{await http.put({url:`/api/envs`,headers:{"content-type":"application/json"},body:{name:name,value:value,id:id}}).then(resp=>{if(resp.body.code===200){logger.debug(`QINGLONG UPDATE ENV ${name} <${typeof value}> (${id})\n${JSON.stringify(value)}`);return true}else{logger.error(`Error adding environment variable from QingLong Panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{logger.error(`Error adding environment variable from QingLong Panel.\n${err.message||err}`);return false})}}async function setEnvs(envs){let envIds=[];await http.post({url:`/api/envs`,headers:{"content-type":"application/json"},body:envs}).then(resp=>{if(resp.body.code===200){resp.body.data.forEach(element=>{logger.debug(`QINGLONG ADD ENV ${element.name} <${typeof element.value}> (${element.id})\n${JSON.stringify(element)}`);envIds.push(element.id)})}else{logger.error(`Error adding environments variable from QingLong Panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{logger.error(`Error adding environments variable from QingLong Panel.\n${err.message||err}`)});return envIds}async function delEnvs(ids){return await http.delete({url:`/api/envs`,headers:{accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",connection:"keep-alive","content-type":"application/json;charset=UTF-8","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:ids}).then(resp=>{if(resp.body.code===200){logger.debug(`QINGLONG DELETE ENV IDS: ${ids}`);return true}else{logger.error(`Error deleting environments variable from QingLong Panel.\n${JSON.stringify(resp)}`);return false}}).catch(err=>{logger.error(`Error deleting environments variable from QingLong Panel.\n${err.message||err}`)})}async function getEnvs(name=null,searchValue="",retired=0){let envs=[];await http.get({url:`/api/envs`,headers:{"content-type":"application/json"},params:{searchValue:searchValue}}).then(resp=>{if(resp.body.code===200){const allEnvs=resp.body.data;if(!!name){let _envs=[];for(const env of allEnvs){if(env.name===name){envs.push(env)}}envs=_envs}envs=allEnvs}else{throw new Error(`Error reading environment variable from QingLong Panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{throw new Error(`Error reading environments variable from QingLong Panel.\n${err.message||err}`)});return envs}async function getEnv(id){let env=null;const allEnvs=await getEnvs();for(const _env of allEnvs){if(_env.id===id){env=_env;break}}return env}async function disableEnvs(ids){let result=false;await http.put({url:`/api/envs/disable`,headers:{accept:"application/json","accept-Language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",connection:"keep-alive","content-type":"application/json;charset=UTF-8","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:ids}).then(resp=>{if(resp.body.code===200){logger.debug(`QINGLONG DISABLED ENV IDS: ${ids}`);result=true}else{logger.error(`Error disabling environments variable from QingLong Panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{logger.error(`Error disabling environments variable from QingLong Panel.\n${err.message||err}`)});return result}async function enableEnvs(ids){let result=false;await http.put({url:`/api/envs/enable`,headers:{accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",connection:"keep-alive","content-type":"application/json;charset=UTF-8","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:ids}).then(resp=>{if(resp.body.code===200){logger.debug(`QINGLONG ENABLED ENV IDS: ${ids}`);result=true}else{logger.error(`Error enabling environments variable from Qilong panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{logger.error(`Error enabling environments variable from Qilong panel.\n${err.message||err}`)});return result}async function addScript(name,path="",content=""){let result=false;await http.post({url:`/api/scripts`,headers:{"content-type":"application/json"},body:{filename:name,path:path,content:content}}).then(resp=>{if(resp.body.code===200){result=true}else{logger.error(`Error reading data from QingLong Panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{logger.error(`Error reading data from QingLong Panel.\n${err.message||err}`)});return result}async function getScript(name,path=""){let content="";await http.get({url:`/api/scripts/${name}`,params:{path:path}}).then(resp=>{if(resp.body.code===200){content=resp.body.data}else{throw new Error(`Error reading data from QingLong Panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{throw new Error(`Error reading data from QingLong Panel.\n${err.message||err}`)});return content}async function editScript(name,path="",content=""){let result=false;await http.put({url:`/api/scripts`,headers:{"content-type":"application/json"},body:{filename:name,path:path,content:content}}).then(resp=>{if(resp.body.code===200){result=true}else{logger.error(`Error reading data from QingLong Panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{logger.error(`Error reading data from QingLong Panel.\n${err.message||err}`)});return result}async function delScript(name,path=""){let result=false;await http.delete({url:`/api/scripts`,headers:{"content-type":"application/json"},body:{filename:name,path:path}}).then(resp=>{if(resp.body.code===200){result=true}else{logger.error(`Error reading data from QingLong Panel.\n${JSON.stringify(resp)}`)}}).catch(err=>{logger.error(`Error reading data from QingLong Panel.\n${err.message||err}`)});return result}async function write(key,val,session=""){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);let writeResult=data.write(key,val,session,qlData);qlContent=JSON.stringify(qlData,null,4);let editResult=await editScript(magicJsonFileName,"",qlContent);return editResult&&writeResult}async function batchWrite(...args){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);for(let arg of args){data.write(arg[0],arg[1],typeof arg[2]!=="undefined"?arg[2]:"",qlData)}qlContent=JSON.stringify(qlData,null,4);return await editScript(magicJsonFileName,"",qlContent)}async function update(key,val,session,comparator=data.defaultValueComparator){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);const updateResult=data.update(key,val,session,comparator,qlData);let editScriptResult=false;if(updateResult===true){qlContent=JSON.stringify(qlData,null,4);editScriptResult=await editScript(magicJsonFileName,"",qlContent)}return updateResult&&editScriptResult}async function batchUpdate(...args){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);for(let arg of args){data.update(arg[0],arg[1],typeof arg[2]!=="undefined"?arg[2]:"",typeof arg[3]!=="undefined"?arg["comparator"]:data.defaultValueComparator,qlData)}qlContent=JSON.stringify(qlData,null,4);return await editScript(magicJsonFileName,"",qlContent)}async function read(key,val,session="",read_no_session=false){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);return data.read(key,val,session,read_no_session,qlData)}async function batchRead(...args){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);let results=[];for(let arg of args){const result=data.read(arg[0],arg[1],typeof arg[2]!=="undefined"?arg[2]:"",typeof arg[3]==="boolean"?arg[3]:false,qlData);results.push(result)}return results}async function del(key,session=""){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);const delResult=data.del(key,session,qlData);qlContent=JSON.stringify(qlData,null,4);const editResult=await editScript(magicJsonFileName,"",qlContent);return delResult&&editResult}async function batchDel(...args){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);for(let arg of args){data.del(arg[0],typeof arg[1]!=="undefined"?arg[1]:"",qlData)}qlContent=JSON.stringify(qlData,null,4);return await editScript(magicJsonFileName,"",qlContent)}async function allSessionNames(key){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);return data.allSessionNames(key,qlData)}async function allSessions(key){let qlContent=await getScript(magicJsonFileName,"");let qlData=data.convertToObject(qlContent);return data.allSessions(key,qlData)}return{url:qlUrl||data.read("magic_qlurl"),init:init,getToken:getToken,setEnv:setEnv,setEnvs:setEnvs,getEnv:getEnv,getEnvs:getEnvs,delEnvs:delEnvs,disableEnvs:disableEnvs,enableEnvs:enableEnvs,addScript:addScript,getScript:getScript,editScript:editScript,delScript:delScript,write:write,read:read,del:del,update:update,batchWrite:batchWrite,batchRead:batchRead,batchUpdate:batchUpdate,batchDel:batchDel,allSessions:allSessions,allSessionNames:allSessionNames}}
// @formatter:on
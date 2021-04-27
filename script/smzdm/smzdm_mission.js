const smzdmCookieKey = "smzdm_cookie";
const scriptName = "什么值得买";
let clickGoBuyMaxTimes = 0; // 好价点击去购买的次数
let clickLikeProductMaxTimes = 0; // 好价点值次数
let clickLikeArticleMaxTimes = 0; // 好文点赞次数
let clickFavArticleMaxTimes = 7; // 好文收藏次数

let magicJS = MagicJS(scriptName, "INFO");
magicJS.unifiedPushUrl = magicJS.read("smzdm_unified_push_url") || magicJS.read("magicjs_unified_push_url");

// 获取点击去购买和点值的链接
function GetProductList() {
  return new Promise((resolve, reject) => {
    let getGoBuyOptions = {
      url: "https://faxian.smzdm.com/",
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Host": "www.smzdm.com",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 Edg/84.0.522.52",
      },
      body: "",
    };
    magicJS.get(getGoBuyOptions, (err, resp, data) => {
      if (err) {
        reject(err);
      } else {
        // 获取每日去购买的链接
        let goBuyList = data.match(/https?:\/\/go\.smzdm\.com\/[0-9a-zA-Z]*\/[^"']*_0/gi);
        if (!!goBuyList) {
          // 去除重复的商品链接
          let goBuyDict = {};
          goBuyList.forEach((element) => {
            let productCode = element.match(/https?:\/\/go\.smzdm\.com\/[0-9a-zA-Z]*\/([^"']*_0)/)[1];
            goBuyDict[productCode] = element;
          });
          goBuyList = Object.values(goBuyDict);
          magicJS.logDebug(`当前获取的每日去购买链接: ${JSON.stringify(goBuyList)}`);
        } else {
          goBuyList = [];
        }

        // 获取每日点值的链接
        let productUrlList = data.match(/https?:\/\/www\.smzdm\.com\/p\/[0-9]*/gi);
        let likeProductList = [];
        if (!!productUrlList) {
          productUrlList.forEach((element) => {
            likeProductList.push(element.match(/https?:\/\/www\.smzdm\.com\/p\/([0-9]*)/)[1]);
          });
        }
        resolve([goBuyList, likeProductList]);
      }
    });
  });
}

// 获取点赞和收藏的好文Id
function GetDataArticleIdList() {
  return new Promise((resolve, reject) => {
    let getArticleOptions = {
      url: "https://post.smzdm.com/",
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Host": "post.smzdm.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41",
      },
      body: "",
    };
    magicJS.get(getArticleOptions, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`获取好文列表失败，请求异常：${err}`);
        reject("GetArticleListErr");
      } else {
        try {
          let articleList = data.match(/data-article=".*" data-type="zan"/gi);
          let result = [];
          articleList.forEach((element) => {
            result.push(element.match(/data-article="(.*)" data-type="zan"/)[1]);
          });
          resolve(result);
        } catch (err) {
          magicJS.logWarning(`获取好文列表失败，执行异常：${err}`);
          reject("GetArticleListErr");
        }
      }
    });
  });
}

// 点击去购买
function ClickGoBuyButton(cookie, url) {
  return new Promise((resolve) => {
    let clickGoBuyOptions = {
      url: url,
      headers: {
        Cookie: cookie,
      },
    };
    magicJS.get(clickGoBuyOptions, (err, resp, data) => {
      resolve();
    });
  });
}

// 好价点值
function ClickLikeProduct(cookie, articleId) {
  return new Promise((resolve) => {
    let ClickLikeProductOptions = {
      url: "https://zhiyou.smzdm.com/user/rating/ajax_add",
      headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "zhiyou.smzdm.com",
        "Origin": "https://faxian.smzdm.com",
        "Referer": "https://faxian.smzdm.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41",
        "Cookie": cookie,
      },
      body: `article_id=${articleId}&channel_id=3&rating=1&client_type=PC&event_key=%E7%82%B9%E5%80%BC&otype=%E5%80%BC&aid=${articleId}&p=16&cid=2&source=%E6%97%A0&atp=3&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Ffaxian.smzdm.com%2F&sourceMode=%E6%97%A0`,
    };
    magicJS.post(ClickLikeProductOptions, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`好价${articleId}点值失败，请求异常：${articleId}`);
        resolve(false);
      } else {
        try {
          let obj = JSON.parse(data);
          if (obj.error_code == 0) {
            magicJS.logDebug(`好价${articleId}点值成功`);
            resolve(true);
          } else if (obj.error_code == 1) {
            magicJS.logDebug(`好价${articleId}点值重复点值`);
            resolve(true);
          } else {
            magicJS.logWarning(`好价${articleId}点值失败，接口响应异常：${data}`);
            resolve(false);
          }
        } catch (err) {
          magicJS.logWarning(`好价${articleId}点值失败，执行异常：${articleId}`);
          resolve(false);
        }
      }
    });
  });
}

// 好文点赞
function ClickLikeArticle(cookie, articleId) {
  return new Promise((resolve) => {
    let ClickLikeProductOptions = {
      url: "https://zhiyou.smzdm.com/user/rating/ajax_add",
      headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "zhiyou.smzdm.com",
        "Origin": "https://post.smzdm.com",
        "Referer": "https://post.smzdm.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41",
        "Cookie": cookie,
      },
      body: `article_id=${articleId}&channel_id=11&rating=1&client_type=PC&event_key=%E7%82%B9%E5%80%BC&otype=%E7%82%B9%E8%B5%9E&aid=${articleId}&p=2&cid=11&source=%E6%97%A0&atp=76&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Fpost.smzdm.com%2F&sourceMode=%E6%97%A0`,
    };
    magicJS.post(ClickLikeProductOptions, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`好文${articleId}点赞失败，请求异常：${articleId}`);
        resolve(false);
      } else {
        try {
          let obj = JSON.parse(data);
          if (obj.error_code == 0) {
            magicJS.logDebug(`好文${articleId}点赞成功`);
            resolve(true);
          } else if (obj.error_code == 1 && obj.error_msg == "已喜欢") {
            magicJS.logDebug(`好文${articleId}点赞失败，重复点值。`);
            resolve(false);
          } else {
            magicJS.logWarning(`好文${articleId}点赞失败，接口响应异常：${data}`);
            resolve(false);
          }
        } catch (err) {
          magicJS.logWarning(`好文${articleId}点赞失败，请求异常：${err}`);
          resolve(false);
        }
      }
    });
  });
}

// 好文收藏/取消收藏
function ClickFavArticle(cookie, articleId) {
  return new Promise((resolve) => {
    let options = {
      url: "https://zhiyou.smzdm.com/user/favorites/ajax_favorite",
      headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "zhiyou.smzdm.com",
        "Origin": "https://post.smzdm.com",
        "Referer": "https://post.smzdm.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41",
        "Cookie": cookie,
      },
      body: `article_id=${articleId}&channel_id=11&client_type=PC&event_key=%E6%94%B6%E8%97%8F&otype=%E6%94%B6%E8%97%8F&aid=${articleId}&cid=11&p=2&source=%E6%97%A0&atp=76&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Fpost.smzdm.com%2F&sourceMode=%E6%97%A0`,
    };
    magicJS.post(options, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`好文${articleId}收藏失败，请求异常：${articleId}`);
        resolve(false);
      } else {
        try {
          let obj = JSON.parse(data);
          if (obj.error_code == 0) {
            magicJS.logDebug(`好文${articleId}收藏成功`);
            resolve(true);
          } else if (obj.error_code == 2) {
            magicJS.logDebug(`好文${articleId}取消收藏成功`);
            resolve(true);
          } else {
            magicJS.logWarning(`好文${articleId}收藏失败，接口响应异常：${data}`);
            resolve(false);
          }
        } catch (err) {
          magicJS.logWarning(`好文${articleId}收藏失败，请求异常：${err}`);
          resolve(false);
        }
      }
    });
  });
}

// 获取每日抽奖active_id
function GetLotteryActiveId(cookie) {
  return new Promise((resolve) => {
    let options = {
      url: "https://m.smzdm.com/zhuanti/life/choujiang/",
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "m.smzdm.com",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/smzdm 9.9.6 rv:93.4 (iPhone13,4; iOS 14.5; zh_CN)/iphone_smzdmapp/9.9.6/wkwebview/jsbv_1.0.0",
      },
    };
    magicJS.get(options, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`获取每日抽奖Id失败，请求异常：${err}`);
        resolve("获取每日抽奖Id失败，请求异常");
      } else {
        try {
          let activeId = /name\s?=\s?\"lottery_activity_id\"\s+value\s?=\s?\"([a-zA-Z0-9]*)\"/.exec(data);
          if (activeId) {
            resolve(activeId[1]);
          } else {
            magicJS.logWarning(`获取每日抽奖activeId失败`);
            resolve("");
          }
        } catch (err) {
          magicJS.logWarning(`获取每日抽奖activeId失败，请求异常：${err}`);
          resolve("");
        }
      }
    });
  });
}

// 每日抽奖
function LotteryDraw(cookie, activeId) {
  return new Promise((resolve) => {
    let options = {
      url: `https://zhiyou.smzdm.com/user/lottery/jsonp_draw?callback=jQuery34109305207178886287_${new Date().getTime()}&active_id=${activeId}&_=${new Date().getTime()}`,
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "zhiyou.smzdm.com",
        "Referer": "https://m.smzdm.com/zhuanti/life/choujiang/",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/smzdm 9.9.0 rv:91 (iPhone 11 Pro Max; iOS 14.2; zh_CN)/iphone_smzdmapp/9.9.0/wkwebview/jsbv_1.0.0",
      },
    };
    magicJS.get(options, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`每日抽奖失败，请求异常：${err}`);
        resolve("每日抽奖失败，请求异常");
      } else {
        try {
          let newData = /\((.*)\)/.exec(data);
          let obj = JSON.parse(newData[1]);
          if (obj.error_code === 0 || obj.error_code === 1 || obj.error_code === 4) {
            magicJS.logInfo(`每日抽奖结果：${obj.error_msg}`);
            resolve(obj.error_msg);
          } else {
            magicJS.logWarning(`每日抽奖失败，接口响应异常：${data}`);
            resolve("每日抽奖失败，接口响应异常");
          }
        } catch (err) {
          magicJS.logWarning(`每日抽奖失败，请求异常：${err}`);
          resolve("每日抽奖失败，请求异常");
        }
      }
    });
  });
}

// 获取用户信息，新版
function WebGetCurrentInfoNewVersion(smzdmCookie) {
  return new Promise((resolve) => {
    let options = {
      url: "https://zhiyou.smzdm.com/user/exp/",
      headers: {
        Cookie: smzdmCookie,
      },
      body: "",
    };
    magicJS.get(options, (err, resp, data) => {
      if (err) {
        magicJS.logError(`获取用户信息失败，异常信息：${err}`);
        resolve([null, null, null, null, null, null, null]);
      } else {
        try {
          // 获取用户名
          let userName = data.match(/info-stuff-nickname.*zhiyou\.smzdm\.com\/user[^<]*>([^<]*)</)[1].trim();
          // 获取近期经验值变动情况
          let pointTimeList = data.match(/<div class="scoreLeft">(.*)<\/div>/gi);
          let pointDetailList = data.match(/<div class=['"]scoreRight ellipsis['"]>(.*)<\/div>/gi);
          let minLength = pointTimeList.length > pointDetailList.length ? pointDetailList.length : pointTimeList.length;
          let userPointList = [];
          for (let i = 0; i < minLength; i++) {
            userPointList.push({
              time: pointTimeList[i].match(/\<div class=['"]scoreLeft['"]\>(.*)\<\/div\>/)[1],
              detail: pointDetailList[i].match(/\<div class=['"]scoreRight ellipsis['"]\>(.*)\<\/div\>/)[1],
            });
          }
          // 获取用户资源
          let assetsNumList = data.match(/assets-part[^<]*>(.*)</gi);
          let points = assetsNumList[0].match(/assets-num[^<]*>(.*)</)[1]; // 积分
          let experience = assetsNumList[2].match(/assets-num[^<]*>(.*)</)[1]; // 经验
          let gold = assetsNumList[4].match(/assets-num[^<]*>(.*)</)[1]; // 金币
          // let prestige = assetsNumList[6].match(/assets-num[^<]*>(.*)</)[1]; // 威望
          let prestige = 0;
          let silver = assetsNumList[6].match(/assets-num[^<]*>(.*)</)[1]; // 碎银子
          resolve([userName, userPointList, Number(points), Number(experience), Number(gold), Number(prestige), Number(silver)]);
        } catch (err) {
          magicJS.logError(`获取用户信息失败，异常信息：${err}`);
          resolve([null, null, null, null, null, null, null]);
        }
      }
    });
  });
}

// 获取用户信息
function WebGetCurrentInfo(smzdmCookie) {
  return new Promise((resolve) => {
    let webGetCurrentInfo = {
      url: `https://zhiyou.smzdm.com/user/info/jsonp_get_current?with_avatar_ornament=1&callback=jQuery112403507528653716241_${new Date().getTime()}&_=${new Date().getTime()}`,
      headers: {
        "Accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "DNT": "1",
        "Host": "zhiyou.smzdm.com",
        "Referer": "https://zhiyou.smzdm.com/user/",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
        "Cookie": smzdmCookie,
      },
    };
    magicJS.get(webGetCurrentInfo, (err, resp, data) => {
      try {
        let obj = JSON.parse(/\((.*)\)/.exec(data)[1]);
        if (obj["smzdm_id"] !== 0) {
          resolve([
            obj["nickname"], // 昵称
            `https:${obj["avatar"]}`, // 头像
            obj["vip_level"], // 新版VIP等级
            obj["checkin"]["has_checkin"], //是否签到
            Number(obj["checkin"]["daily_checkin_num"]), //连续签到天数
            Number(obj["unread"]["notice"]["num"]), // 未读消息
            Number(obj["level"]), // 旧版等级
            Number(obj["exp"]), // 旧版经验
            Number(obj["point"]), // 积分
            Number(obj["gold"]), // 金币
            Number(obj["silver"]), // 碎银子
          ]);
        } else {
          magicJS.logWarning(`获取用户信息异常，Cookie过期或接口变化：${data}`);
          resolve([null, null, null, null, null, false, null, null]);
        }
      } catch (err) {
        magicJS.logError(`获取用户信息异常，代码执行异常：${err}，接口返回数据：${data}`);
        resolve([null, null, null, null, null, false, null, null]);
      }
    });
  });
}

(async () => {
  // 通知信息
  let title = "";
  let subTitle = "";
  let content = "";
  // 获取Cookie
  let smzdmCookie = magicJS.read(smzdmCookieKey);

  if (!!smzdmCookie === false) {
    magicJS.logWarning("没有读取到什么值得买有效cookie，请访问zhiyou.smzdm.com进行登录");
    magicJS.notify(scriptName, "", "❓没有获取到Web端Cookie，请先进行登录。");
  } else {
    try {
      // 任务完成情况
      let clickGoBuyTimes = 0;
      let clickLikePrductTimes = 0;
      let clickLikeArticleTimes = 0;
      let clickFavArticleTimes = 0;

      // 查询签到前用户数据
      let [nickName, avatar, beforeVIPLevel, beforeHasCheckin, , beforeNotice, , , beforePoint, beforeGold, beforeSilver] = await WebGetCurrentInfo(smzdmCookie);
      if (!nickName) {
        magicJS.notify(scriptName, "", "❌Cookie过期或接口变化，请尝试重新登录");
        magicJS.done();
      } else {
        let [, , , beforeExp, , beforePrestige] = await WebGetCurrentInfoNewVersion(smzdmCookie);
        magicJS.logInfo(
          `昵称：${nickName}\nWeb端签到状态：${beforeHasCheckin}\n签到前等级${beforeVIPLevel}，积分${beforePoint}，经验${beforeExp}，金币${beforeGold}，碎银子${beforeSilver}， 未读消息${beforeNotice}`
        );

        // 每日抽奖
        let activeId = await GetLotteryActiveId(smzdmCookie);
        if (activeId){
          content = await LotteryDraw(smzdmCookie, activeId);
        }

        // 获取去购买和好价Id列表
        let [, [goBuyList = [], likProductList = []]] = await magicJS.attempt(magicJS.retry(GetProductList, 5, 1000)(), [[], []]);
        // 获取好文列表
        let [, articleList = []] = await magicJS.attempt(magicJS.retry(GetDataArticleIdList, 5, 1000)(), []);

        // 好价点击去购买，Web端点击已无奖励，放弃
        const clickGoBuyAsync = async () => {
          let clickGoBuyList = goBuyList.splice(0, clickGoBuyMaxTimes);
          if (clickGoBuyList.length > 0) {
            for (let i = 0; i < clickGoBuyList.length; i++) {
              await ClickGoBuyButton(smzdmCookie, clickGoBuyList[i]);
              magicJS.logInfo(`完成第${i + 1}次“每日去购买”任务，点击链接：\n${clickGoBuyList[i]}`);
              clickGoBuyTimes += 1;
              await magicJS.sleep(3100);
            }
          }
        };

        // 好价点值
        const clickLikeProductAsync = async () => {
          let clickLikeProductList = likProductList.splice(0, clickLikeProductMaxTimes);
          if (clickLikeProductList.length > 0) {
            for (let i = 0; i < clickLikeProductList.length; i++) {
              await ClickLikeProduct(smzdmCookie, clickLikeProductList[i]);
              magicJS.logInfo(`完成第${i + 1}次“好价点值”任务，好价Id：${clickLikeProductList[i]}`);
              clickLikePrductTimes += 1;
              await magicJS.sleep(3100);
            }
          }
        };

        // 好文点赞
        const clickLikeArticleAsync = async () => {
          let likeArticleList = articleList.splice(0, clickLikeArticleMaxTimes);
          if (likeArticleList.length > 0) {
            for (let i = 0; i < likeArticleList.length; i++) {
              await ClickLikeArticle(smzdmCookie, likeArticleList[i]);
              magicJS.logInfo(`完成第${i + 1}次“好文点赞”任务，好文Id：${likeArticleList[i]}`);
              clickLikeArticleTimes += 1;
              await magicJS.sleep(3100);
            }
          }
        };

        // 好文收藏
        const clickFavArticleAsync = async () => {
          let favArticleList = articleList.splice(0, clickFavArticleMaxTimes);
          if (favArticleList.length > 0) {
            // 好文收藏
            for (let i = 0; i < favArticleList.length; i++) {
              await ClickFavArticle(smzdmCookie, articleList[i]);
              magicJS.logInfo(`完成第${i + 1}次“好文收藏”任务，好文Id：${articleList[i]}`);
              clickFavArticleTimes += 1;
              await magicJS.sleep(3100);
            }
            // 取消收藏
            for (let i = 0; i < favArticleList.length; i++) {
              await ClickFavArticle(smzdmCookie, articleList[i]);
              magicJS.logInfo(`取消第${i + 1}次“好文收藏”任务的好文，好文Id：${articleList[i]}`);
              await magicJS.sleep(3100);
            }
          }
        };

        await Promise.all([clickGoBuyAsync(), clickLikeProductAsync()]);
        await Promise.all([clickLikeArticleAsync(), clickFavArticleAsync()]);

        // 查询签到后用户数据
        await magicJS.sleep(3000);
        let [, , afterVIPLevel, afterHasCheckin, afterCheckinNum, afterNotice, , , afterPoint, afterGold, afterSilver] = await WebGetCurrentInfo(smzdmCookie);
        let [, afteruserPointList, , afterExp, , afterPrestige] = await WebGetCurrentInfoNewVersion(smzdmCookie);
        magicJS.logInfo(
          `昵称：${nickName}\nWeb端签到状态：${afterHasCheckin}\n签到后等级${afterVIPLevel}，积分${afterPoint}，经验${afterExp}，金币${afterGold}，碎银子${afterSilver}，未读消息${afterNotice}`
        );

        // 通知内容
        if (afterExp && beforeExp) {
          let addPoint = afterPoint - beforePoint;
          let addExp = afterExp - beforeExp;
          let addGold = afterGold - beforeGold;
          // let addPrestige = afterPrestige - beforePrestige;
          let addSilver = afterSilver - beforeSilver;
          content += !!content ? "\n" : "";
          content +=
            "积分" +
            afterPoint +
            (addPoint > 0 ? "(+" + addPoint + ")" : "") +
            " 经验" +
            afterExp +
            (addExp > 0 ? "(+" + addExp + ")" : "") +
            " 金币" +
            afterGold +
            (addGold > 0 ? "(+" + addGold + ")" : "") +
            "\n" +
            "碎银子" +
            afterSilver +
            (addSilver > 0 ? "(+" + addSilver + ")" : "") +
            // ' 威望' + afterPrestige + (addPrestige > 0 ? '(+' + addPrestige + ')' : '') +
            " 未读消息" +
            afterNotice;
        }

        content += `\n点值 ${clickLikePrductTimes}/${clickLikeProductMaxTimes} 去购买 ${clickGoBuyTimes}/${clickGoBuyMaxTimes}\n点赞 ${clickLikeArticleTimes}/${clickLikeArticleMaxTimes} 收藏 ${clickLikeArticleTimes}/${clickFavArticleTimes}`;

        content += !!content ? "\n" : "";
        if (afteruserPointList.length > 0) {
          content += "用户近期经验变动情况(有延迟)：";
          afteruserPointList.forEach((element) => {
            content += `\n${element["time"]} ${element["detail"]}`;
          });
          content += "\n如经验值无变动，请更新Cookie。";
        } else {
          content += "没有获取到用户近期的经验变动情况";
        }

        title = `${scriptName} - ${nickName} V${afterVIPLevel}`;
        magicJS.notify(title, subTitle, content, { "media-url": avatar });
      }
    } catch (err) {
      magicJS.logError(`执行任务出现异常：${err}`);
      magicJS.notify(scriptName, "", "❌执行任务出现，请查阅日志");
    }
  }
  magicJS.done();
})();

// prettier-ignore
function MagicJS(scriptName="MagicJS",logLevel="INFO"){return new class{constructor(){if(this.version="2.2.3.3",this.scriptName=scriptName,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=logLevel,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(err){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(url){this._barkUrl=url.replace(/\/+$/g,"")}set logLevel(level){this._logLevel="string"==typeof level?level.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"!=typeof $request?$request:void 0}get response(){return"undefined"!=typeof $response?($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response):void 0}get platform(){return this.isSurge?"Surge":this.isQuanX?"Quantumult X":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"Unknown"}read(key,session=""){let val="";this.isSurge||this.isLoon?val=$persistentStore.read(key):this.isQuanX?val=$prefs.valueForKey(key):this.isNode?val=this.node.data:this.isJSBox&&(val=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(val=val[key]),this.isJSBox&&(val=JSON.parse(val)[key]),session&&("string"==typeof val&&(val=JSON.parse(val)),val=val&&"object"==typeof val?val[session]:null)}catch(err){this.logError(err),val=session?{}:null,this.del(key)}void 0===val&&(val=null);try{val&&"string"==typeof val&&(val=JSON.parse(val))}catch(err){}return this.logDebug(`READ DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`),val}write(key,val,session=""){let data=session?{}:"";if(session&&(this.isSurge||this.isLoon)?data=$persistentStore.read(key):session&&this.isQuanX?data=$prefs.valueForKey(key):this.isNode?data=this.node.data:this.isJSBox&&(data=JSON.parse($file.read("drive://MagicJS/magic.json").string)),session){try{"string"==typeof data&&(data=JSON.parse(data)),data="object"==typeof data&&data?data:{}}catch(err){this.logError(err),this.del(key),data={}}this.isJSBox||this.isNode?(data[key]&&"object"==typeof data[key]||(data[key]={}),data[key].hasOwnProperty(session)||(data[key][session]=null),void 0===val?delete data[key][session]:data[key][session]=val):void 0===val?delete data[session]:data[session]=val}else this.isNode||this.isJSBox?void 0===val?delete data[key]:data[key]=val:data=void 0===val?null:val;"object"==typeof data&&(data=JSON.stringify(data)),this.isSurge||this.isLoon?$persistentStore.write(data,key):this.isQuanX?$prefs.setValueForKey(data,key):this.isNode?this.node.fs.writeFileSync("./magic.json",data):this.isJSBox&&$file.write({data:$data({string:data}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`)}del(key,session=""){this.logDebug(`DELETE KEY [${key}]${session?`[${session}]`:""}`),this.write(key,null,session)}notify(title=this.scriptName,subTitle="",body="",opts=""){let convertOptions;if(opts=(_opts=>{let newOpts={};if("string"==typeof _opts)this.isLoon?newOpts={openUrl:_opts}:this.isQuanX?newOpts={"open-url":_opts}:this.isSurge&&(newOpts={url:_opts});else if("object"==typeof _opts)if(this.isLoon)newOpts.openUrl=_opts["open-url"]?_opts["open-url"]:"",newOpts.mediaUrl=_opts["media-url"]?_opts["media-url"]:"";else if(this.isQuanX)newOpts=_opts["open-url"]||_opts["media-url"]?_opts:{};else if(this.isSurge){let openUrl=_opts["open-url"]||_opts.openUrl;newOpts=openUrl?{url:openUrl}:{}}return newOpts})(opts),1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.logNotify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${"object"==typeof opts?JSON.stringify(opts):opts}`),this.isSurge)$notification.post(title,subTitle,body,opts);else if(this.isLoon)opts?$notification.post(title,subTitle,body,opts):$notification.post(title,subTitle,body);else if(this.isQuanX)$notify(title,subTitle,body,opts);else if(this.isNode){if(this._barkUrl){let content=encodeURI(`${title}/${subTitle}\n${body}`);this.get(`${this._barkUrl}/${content}`,()=>{})}}else if(this.isJSBox){let push={title:title,body:subTitle?`${subTitle}\n${body}`:body};$push.schedule(push)}}notifyDebug(title=this.scriptName,subTitle="",body="",opts=""){"DEBUG"===this.logLevel&&(1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.notify(title,subTitle,body,opts))}log(msg,level="INFO"){this.logLevels[this._logLevel]<this.logLevels[level.toUpperCase()]||console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)}logDebug(msg){this.log(msg,"DEBUG")}logInfo(msg){this.log(msg,"INFO")}logNotify(msg){this.log(msg,"NOTIFY")}logWarning(msg){this.log(msg,"WARNING")}logError(msg){this.log(msg,"ERROR")}logRetry(msg){this.log(msg,"RETRY")}adapterHttpOptions(options,method){let _options="object"==typeof options?Object.assign({},options):{url:options,headers:{}};_options.hasOwnProperty("header")&&!_options.hasOwnProperty("headers")&&(_options.headers=_options.header,delete _options.header);const headersMap={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};if("object"==typeof _options.headers)for(let key in _options.headers)headersMap[key]&&(_options.headers[headersMap[key]]=_options.headers[key],delete _options.headers[key]);_options.headers&&"object"==typeof _options.headers&&_options.headers["User-Agent"]||(_options.headers&&"object"==typeof _options.headers||(_options.headers={}),this.isNode?_options.headers["User-Agent"]=this.pcUserAgent:_options.headers["User-Agent"]=this.iOSUserAgent);let skipScripting=!1;if(("object"==typeof _options.opts&&(!0===_options.opts.hints||!0===_options.opts["Skip-Scripting"])||"object"==typeof _options.headers&&!0===_options.headers["X-Surge-Skip-Scripting"])&&(skipScripting=!0),skipScripting||(this.isSurge?_options.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?_options.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof _options.opts&&(_options.opts={}),_options.opts.hints=!1)),this.isSurge&&!skipScripting||delete _options.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts,this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts["Skip-Scripting"],"GET"===method&&!this.isNode&&_options.body){let qs=Object.keys(_options.body).map(key=>void 0===_options.body?"":`${encodeURIComponent(key)}=${encodeURIComponent(_options.body[key])}`).join("&");_options.url.indexOf("?")<0&&(_options.url+="?"),_options.url.lastIndexOf("&")+1!=_options.url.length&&_options.url.lastIndexOf("?")+1!=_options.url.length&&(_options.url+="&"),_options.url+=qs,delete _options.body}return this.isQuanX?(_options.hasOwnProperty("body")&&"string"!=typeof _options.body&&(_options.body=JSON.stringify(_options.body)),_options.method=method):this.isNode?(delete _options.headers["Accept-Encoding"],"object"==typeof _options.body&&("GET"===method?(_options.qs=_options.body,delete _options.body):"POST"===method&&(_options.json=!0,_options.body=_options.body))):this.isJSBox&&(_options.header=_options.headers,delete _options.headers),_options}adapterHttpResponse(resp){let _resp={body:resp.body,headers:resp.headers,json:()=>JSON.parse(_resp.body)};return resp.hasOwnProperty("statusCode")&&resp.statusCode&&(_resp.status=resp.statusCode),_resp}get(options,callback){let _options=this.adapterHttpOptions(options,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon?$httpClient.get(_options,callback):this.isQuanX?$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>callback(reason.error,null,null)):this.isNode?this.node.request.get(_options,(err,resp,data)=>{resp=this.adapterHttpResponse(resp),callback(err,resp,data)}):this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.get(_options))}getPromise(options){return new Promise((resolve,reject)=>{magicJS.get(options,(err,resp)=>{err?reject(err):resolve(resp)})})}post(options,callback){let _options=this.adapterHttpOptions(options,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon)$httpClient.post(_options,callback);else if(this.isQuanX)$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>{callback(reason.error,null,null)});else if(this.isNode){let resp=this.node.request.post(_options,callback);resp.status=resp.statusCode,delete resp.statusCode}else this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.post(_options))}get http(){return{get:this.getPromise,post:this.post}}done(value={}){"undefined"!=typeof $done&&$done(value)}isToday(day){if(null==day)return!1;{let today=new Date;return"string"==typeof day&&(day=new Date(day)),today.getFullYear()==day.getFullYear()&&today.getMonth()==day.getMonth()&&today.getDay()==day.getDay()}}isNumber(val){return"NaN"!==parseFloat(val).toString()}attempt(promise,defaultValue=null){return promise.then(args=>[null,args]).catch(ex=>(this.logError(ex),[ex,defaultValue]))}retry(fn,retries=5,interval=0,callback=null){return(...args)=>new Promise((resolve,reject)=>{function _retry(...args){Promise.resolve().then(()=>fn.apply(this,args)).then(result=>{"function"==typeof callback?Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{retries>=1?interval>0?setTimeout(()=>_retry.apply(this,args),interval):_retry.apply(this,args):reject(ex),retries--}):resolve(result)}).catch(ex=>{this.logRetry(ex),retries>=1&&interval>0?setTimeout(()=>_retry.apply(this,args),interval):retries>=1?_retry.apply(this,args):reject(ex),retries--})}_retry.apply(this,args)})}formatTime(time,fmt="yyyy-MM-dd hh:mm:ss"){var o={"M+":time.getMonth()+1,"d+":time.getDate(),"h+":time.getHours(),"m+":time.getMinutes(),"s+":time.getSeconds(),"q+":Math.floor((time.getMonth()+3)/3),S:time.getMilliseconds()};/(y+)/.test(fmt)&&(fmt=fmt.replace(RegExp.$1,(time.getFullYear()+"").substr(4-RegExp.$1.length)));for(let k in o)new RegExp("("+k+")").test(fmt)&&(fmt=fmt.replace(RegExp.$1,1==RegExp.$1.length?o[k]:("00"+o[k]).substr((""+o[k]).length)));return fmt}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(time){return new Promise(resolve=>setTimeout(resolve,time))}}(scriptName)}

const scriptName = "TestFlight";
const tfAppIdKey = "tf_app_id";
const tfJoinedAppIdKey = "tf_joined_app_id";
const tfInvalidAppIdKey = "tf_invalid_app_id";
const tfSessionInfoKey = "tf_session_info";
const tfCheckSessionTimeKey = "tf_check_session_time";
const tfCheckSessionTimeDiffKey = "tf_check_session_time_diff";
const tfAppUseAccountIdKey = "tf_app_use_account_id";
const tfStorefrontId = "tf_storefront_id";
const getSessionRegex = /^https:\/\/testflight\.apple\.com\/v3\/accounts\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})\/apps$/;
const getFullAppIdRegex = /^https:\/\/testflight\.apple\.com\/v3\/accounts\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\/ru\/([a-zA-Z0-9]{8})$/;
const modifyTFRequest = /^https:\/\/testflight\.apple\.com\/v\d\/accounts\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\/apps\/\d+/
const modifySettingsTFRequest = /^https:\/\/testflight\.apple\.com\/v\d\/accounts\/settings\/.*\/apps\/\d+/
const modifyInstallTFRequest = /^https:\/\/testflight\.apple\.com\/v\d\/apps\/\d+\/\d+\/install\/status$/
const $ = MagicJS(scriptName, "INFO");
const blankSessionInfo = {
  "x-session-id": "", "x-session-digest": "", "x-request-id": "", "valid": false
};
// 加入TestFlight的模式，0: 温和 1: 标准 2: 暴力
const tfJoinMode = parseInt($.data.read("tf_join_mode", 1));
// 尝试加入TF时并发请求数量
const tfJoinConcurrency = parseInt($.data.read("tf_join_concurrency", 2));
// 每次执行循环次数
const tfLoopCount = parseInt($.data.read("tf_loop_count", 5));
// 用于检测TF可用性的专用账号
let tfCheckAccountId = $.data.read('tf_check_account_id', '');
// 同步数据到青龙面板
const syncQingLong = $.data.read("tf_sync_qinglong", false);


function removeHeaders(config) {
  let headers = {...config["headers"]};
  delete headers["valid"];
  delete headers["if-none-match"];
  delete headers["If-None-Match"];
  config["headers"] = headers;
  return config;
}

$.http.interceptors.request.use(removeHeaders);

function modifyHeaders(accountId, headers, session, url = "") {
  let newHeaders = {...headers, ...session};
  delete newHeaders["valid"];
  if ($.env.isQuanX || $.env.isStash) {
    newHeaders = $.http.convertHeadersToCamelCase(newHeaders);
    // delete newHeaders["Content-Length"];
    delete headers["If-None-Match"];
  } else {
    newHeaders = $.http.convertHeadersToLowerCase(newHeaders);
    // delete newHeaders["content-length"];
    delete headers["if-none-match"];
  }
  // if ("x-apple-store-front" in newHeaders) {
  //   newHeaders["x-apple-store-front"] = "143441-19,29";
  // }
  // if ($.env.isLoon && /accounts\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(url)) {
  //   newHeaders[":path"] = url.replace("https://testflight.apple.com", "").replace(/accounts\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/, `accounts/${accountId}`);
  //   $.logger.debug(`修改请求头:path\n${JSON.stringify(newHeaders)}`);
  // }
  $.logger.info(`修改请求头\n${JSON.stringify(newHeaders)}`);
  return newHeaders;
}

function modifyRequest() {
  $.logger.info(`请求地址\n${$.request.url}`);
  let url = $.request.url;
  let headers = $.request.headers;
  let body = $.request.body ? JSON.parse($.request.body) : {};
  const result = /apps\/(\d+)/.exec($.request.url);
  if (result) {
    const appAdamId = result[1];
    const appUseAccountId = $.data.read(tfAppUseAccountIdKey, {});
    if (appAdamId in appUseAccountId) {
      const accountId = appUseAccountId[appAdamId];
      const session = $.data.read(tfSessionInfoKey, blankSessionInfo, accountId);
      url = url.replace(/accounts\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/, `accounts/${accountId}`);
      $.logger.info(`修改请求地址为\n${url}`);
      headers = modifyHeaders(accountId, headers, session, url);
    }
  }
  if (/\/install$/.test($.request.url) && Object.keys(body).length > 0) {
    body.storefrontId = $.data.read(tfStorefrontId, "143441-19,29");
  }
  return [url, headers, JSON.stringify(body)];
}

function getAccountAppData(currentAccountId, accountId, headers) {
  return new Promise(resolve => {
    $.http.get({
      url: `https://testflight.apple.com/v3/accounts/${accountId}/apps`, headers: headers
    }).then(resp => {
      let obj = resp.body;
      obj["account_id"] = accountId;
      // 当前账户保留"以前测试过的"App数据
      if (currentAccountId !== accountId) {
        obj["data"] = obj["data"].filter(app => app["previouslyTested"] === false);
      }
      $.logger.info(`账户 ${accountId} 获取到 ${obj["data"].length} 个App`);
      resolve(obj);
    }).catch(async err => {
      if (err.response.status === 401) {
        $.notification.post(`AccountId ${accountId} 的 Session 已过期`);
        let sessionInfo = $.data.read(tfSessionInfoKey, blankSessionInfo, accountId);
        sessionInfo["valid"] = false;
        $.data.write(tfSessionInfoKey, sessionInfo, accountId);
        if (syncQingLong === true) {
          let qlSessionInfo = await $.qinglong.get(tfSessionInfoKey, {}, accountId);
          if (qlSessionInfo["x-request-id"] === sessionInfo["x-request-id"] && qlSessionInfo["valid"] === true) {
            await $.qinglong.write(tfSessionInfoKey, sessionInfo, accountId);
            $.notification.post(`已同步将青龙面板中AccountId ${accountId}设置为失效`);
          }
        }
        resolve({data: [], account_id: accountId});
      } else {
        $.logger.error(`获取 AccountId ${accountId} 的App列表出现异常\n${JSON.stringify(err)}`);
        resolve({data: [], account_id: accountId});
      }
    })
  })
}

async function getAllAppData() {
  try {
    const currentAccountId = $.request.url.match(getSessionRegex)[1];
    $.logger.info(`当前账户为：${currentAccountId}`);
    let obj = $.response.status === 200 ? JSON.parse($.response.body) : {"data": [], "error": null};
    $.logger.debug(`请求到的App列表为：\n${JSON.stringify(obj)}`);
    let allSessions = $.data.read(tfSessionInfoKey, null, "", true);
    let accountIdList = Object.keys(allSessions);
    // 确保当前账户排在数组中的第一位，以保证优先使用当前账户的App数据
    if ($.response.status === 304) {
      accountIdList = accountIdList.filter(accountId => accountId !== currentAccountId);
      accountIdList.unshift(currentAccountId);
    }
    const promises = accountIdList.filter(accountId => {
      return accountId !== 'magic_session' && ($.response.status !== 200 || accountId !== currentAccountId) && allSessions[accountId]['valid'] === true
    }).map(accountId => {
      let session = allSessions[accountId];
      return getAccountAppData(currentAccountId, accountId, modifyHeaders(accountId, $.request.headers, session));
    });

    $.logger.info(`共有 ${promises.length} 个账户需要获取App列表`);

    await Promise.all(promises)
      .then((results) => {
        let appAccountMap = new Map();
        for (let result of results) {
          if (result !== undefined && typeof result["data"] !== undefined) {
            for (let appData of result["data"]) {
              const appAdamId = appData["appAdamId"].toString();
              if (appAccountMap.has(appAdamId) === false) {
                appAccountMap.set(appAdamId, result["account_id"]);
                obj["data"].push(appData);
              }
            }
          } else {
            $.logger.warning(`获取到的App数据为undefined`);
          }
        }
        $.data.write(tfAppUseAccountIdKey, Object.fromEntries(appAccountMap));
      })
      .catch(error => {
        // 处理错误
        $.logger.error(`获取App数据出现异常\n${JSON.stringify(error)}`);
      });
    $.logger.debug(`全部有效账户的App数据\n${JSON.stringify(obj)}`);
    return {body: JSON.stringify(obj)};
  } catch (err) {
    $.logger.error(`获取全部有效账户的App数据出现异常\n${err}`);
    return {body: $.response.body};
  }
}

async function syncToQingLong(currentAccountId = "", currentSessionInfo = null) {

  if (syncQingLong === true) {

    let silentSync = true; // 静默同步，本次同步不弹出通知
    let [qlAllSessions, qlAppIds] = await $.qinglong.batchRead([tfSessionInfoKey, {}, "", true], [tfAppIdKey, ""]);
    let batchWriteData = [];

    // 同步本地的Session至青龙面板
    if (currentAccountId !== "" && currentSessionInfo !== null) {
      try {
        const qlSessionInfo = qlAllSessions[currentAccountId];
        $.logger.info(`青龙面板中旧的SessionInfo\n${JSON.stringify(qlSessionInfo)}`);
        if (qlSessionInfo["x-session-id"] !== currentSessionInfo["x-session-id"] || qlSessionInfo["valid"] === false) {
          batchWriteData.push([tfSessionInfoKey, currentSessionInfo, currentAccountId]);
        }
        if (qlSessionInfo["valid"] === false) {
          silentSync = false;
        }
      } catch
        (error) {
        $.logger.error(`同步当前Session至青龙面板出现异常\n${error}`);
      }
    }

    // 同步AppId至青龙面板
    try {
      let tfAppIds = $.data.read(tfAppIdKey, "").split(";");
      qlAppIds = qlAppIds.split(";").filter(appId => appId !== "");
      // 判断是否有在青龙面板上不存在的AppId
      let newAppIds = tfAppIds.filter(x => !qlAppIds.includes(x));
      if (newAppIds.length > 0) {
        qlAppIds = qlAppIds.concat(tfAppIds);
        qlAppIds = [...new Set(qlAppIds)];
        $.logger.info(`本次需要更新到青龙面板的AppId\n${qlAppIds.join(";")}`);
        let strAppIds = "";
        if (qlAppIds.length === 1) {
          strAppIds = qlAppIds[0];
        } else if (qlAppIds.length > 1) {
          strAppIds = qlAppIds.join(";")
        }
        batchWriteData.push([tfAppIdKey, strAppIds]);
        silentSync = false;
      } else {
        $.logger.info(`所有的AppId都已经存在于青龙面板中，本次同步不进行同步！`);
      }
    } catch (error) {
      $.logger.error(`同步AppId至青龙面板出现异常\n${error}`);
    }

    // 同步青龙面板的数据至本地
    try {
      $.logger.debug(`青龙面板中所有的SessionInfo\n${JSON.stringify(qlAllSessions)}`);
      // 遍历青龙面板存储的Session
      for (let accountId of Object.keys(qlAllSessions)) {
        // 与本地的比较，如果不一致则更新本地的Session
        if (accountId !== "magic_session" && qlAllSessions[accountId]["valid"] === true && accountId !== currentAccountId) {
          const localSession = $.data.read(tfSessionInfoKey, {}, accountId);
          const qlSession = qlAllSessions[accountId];
          if (localSession["x-request-id"] !== qlSession["x-request-id"] || localSession["valid"] === false) {
            $.data.write(tfSessionInfoKey, qlSession, accountId);
            $.logger.info(`将青龙面板 ${accountId} 的 Session 同步到本地\n`);
          }
        }
      }
    } catch (error) {
      $.logger.error(`同步青龙面板的Session至本地出现异常\n${JSON.stringify(error)}`);
    }

    // 批量写入数据
    const result = await $.qinglong.batchWrite(...batchWriteData);
    if (result === true) {
      if (silentSync === false) {
        $.notification.post(
          `${scriptName} ${currentAccountId}`,
          "",
          `已将您的信息同步至青龙面板：\n${$.qinglong.url}\n如上述地址不是您所配置，则信息已泄露！\n请立即停用脚本，更改密码！\n检查青龙面板配置是否被篡改！`);
      } else {
        $.logger.info(`青龙面板已经存在相同信息，故本次同步不弹出通知！\n已将您的信息同步至青龙面板：\n${$.qinglong.url}\n如上述地址不是您所配置，则信息已泄露！\n请立即停用脚本，更改密码！\n检查青龙面板配置是否被篡改！`);
      }
    } else {
      $.notification.post(`将您的信息同步至青龙面板失败：\n${$.qinglong.url}\n请检查青龙面板配置！`);
    }
  }
}

async function getTFSessionInfo() {
  try {
    const matches = $.request.url.match(/\/accounts\/([a-zA-Z0-9-]+)\/apps/);
    if (matches && matches.length > 1) {
      // 账户Id
      const accountId = matches[1];
      // 获取旧的TestFlight Session数据
      const oldSessionInfo = $.data.read(tfSessionInfoKey, blankSessionInfo, accountId);
      $.logger.info(`旧的SessionInfo:\n${JSON.stringify(oldSessionInfo)}`);
      // 获取新的TestFlight Session数据
      $.logger.info(`当前的Headers:\n${JSON.stringify($.request.headers)}`);
      const newSessionInfo = {
        "valid": true,
        "x-session-id": $.request.headers["x-session-id"] || $.request.headers["X-Session-Id"],
        "x-session-digest": $.request.headers["x-session-digest"] || $.request.headers["X-Session-Digest"],
        "x-request-id": $.request.headers["x-request-id"] || $.request.headers["X-Request-Id"],
      };
      $.logger.info(`新的SessionInfo\n${JSON.stringify(newSessionInfo)}`);
      // Session数据不同时写入
      if (oldSessionInfo["x-session-id"] !== newSessionInfo["x-session-id"]) {
        $.data.write(tfSessionInfoKey, newSessionInfo, accountId);
        const tempSessionInfo = $.data.read(tfSessionInfoKey, blankSessionInfo, accountId);
        if (newSessionInfo["x-session-id"] === tempSessionInfo["x-session-id"]) {
          $.notification.post(`${scriptName} - ${accountId}`, "", "写入TestFlight必要信息成功");
        } else {
          $.notification.post(`${scriptName} - ${accountId}`, "", "写入TestFlight必要信息失败");
        }
      }
      // 同步数据至青龙面板
      await syncToQingLong(accountId, newSessionInfo);
    } else {
      $.logger.error(`无法获取TestFlight的AccountId，请检查配置。`);
    }
  } catch (err) {
    const errMsg = `获取TestFlight必要信息出现异常`;
    $.notification.post(errMsg);
    $.logger.error(`${errMsg}\n${err}`);
  }
}

async function autoAddAppId() {
  let obj = JSON.parse($.response.body);
  const match = $.request.url.match(getFullAppIdRegex);
  const appId = match[1];
  let tfAppIds = $.data.read(tfAppIdKey, "").split(";");
  tfAppIds = tfAppIds.filter(appId => {
    return appId !== ""
  });
  $.logger.info(`已存在的TF愿望清单App:${JSON.stringify(tfAppIds)}`);
  if (obj.data.status === "FULL") {
    if (!tfAppIds.includes(appId)) {
      tfAppIds.push(appId);
      let strAppIds = "";
      if (tfAppIds.length === 1) {
        strAppIds = appId;
      } else if (tfAppIds.length > 1) {
        strAppIds = tfAppIds.join(";")
      }
      $.data.write(tfAppIdKey, strAppIds);
      const msg = `应用 [${appId}] 已满员，自动加入TestFlight愿望清单`;
      $.logger.info(msg);
      $.notification.post(msg)
    } else {
      $.logger.info(`应用 [${appId}] 已存在于TestFlight愿望清单，本次不会重复加入`);
    }
    await syncToQingLong();
  } else {
    $.logger.info(`应用 [${appId}] 未满员或不开放，请自行加入`);
  }
}

function getAppTestFlightHtml(appId) {
  return new Promise((resolve) => {
    const url = `https://testflight.apple.com/join/${appId}`;
    $.http
      .get({url, timeout: 5000})
      .then((resp) => {
        if (resp.status === 200 && (resp.body.indexOf("此 Beta 版本的测试员已满") > 0 || resp.body.indexOf("This beta is full") > 0)) {
          $.logger.info(`AppId: [${appId}] 已满员`);
          resolve("FULL");
        } else {
          $.logger.info(`AppId: [${appId}] 未满员`);
          $.logger.info(`当前的Response:\n${resp.body}`);
          resolve("NOT_FULL");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          $.logger.warning(`AppId: [${appId}] 不存在`);
          resolve("NO_EXIST");
        } else {
          $.logger.warning(`获取TestFlight信息出现异常\n${JSON.stringify(err)}`);
          resolve("ERROR");
        }
      });
  });
}

function getAppTestFlightJson(accountId, sessionInfo, appId) {
  return new Promise((resolve) => {
    const url = `https://testflight.apple.com/v3/accounts/${accountId}/ru/${appId}`;
    $.http
      .get({
        url, headers: {...sessionInfo}, timeout: 5000
      })
      .then((resp) => {
        if (resp.status === 200) {
          if (resp.body.data.status === "FULL") {
            $.logger.info(`应用 [${resp.body.data.app.name}] 已满员`);
            resolve([false, resp.status]);
          } else if (resp.body.data.status === "OPEN") {
            $.logger.info(`应用 [${resp.body.data.app.name}] 未满员`);
            resolve([true, resp.status]);
          } else {
            $.logger.info(`应用 [${resp.body.data.app.name}] 状态未知:${resp.body.data.status}`);
            resolve([false, resp.status]);
          }
        } else {
          $.logger.warning(`获取App Beta测试状态出现错误`);
          resolve([false, resp.status]);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          $.logger.warning(`应用${appId}不存在`);
          let invalidAppIds = $.data.read(tfInvalidAppIdKey, []);
          invalidAppIds.push(appId);
          $.data.write(tfInvalidAppIdKey, invalidAppIds);
          resolve([false, err.response.status]);
        } else if (err.response.status === 401) {
          $.logger.warning(`获取App Beta测试状态出现未授权，请更新Session`);
          resolve([false, err.response.status]);
        } else if (err.response && err.response.status) {
          $.logger.warning(`获取App Beta测试状态出现错误：\n${JSON.stringify(err)}，http code: ${err.response.status}`);
          resolve([false, err.response.status]);
        } else {
          $.logger.warning(`获取App Beta测试状态出现错误：\n${err}`);
          resolve([false, undefined]);
        }
      });
  });
}

function joinTestFlight(accountId, sessionInfo, appId) {
  return new Promise((resolve) => {
    const url = `https://testflight.apple.com/v3/accounts/${accountId}/ru/${appId}/accept`;
    $.http
      .post({
        url, headers: sessionInfo,
      })
      .then((resp) => {
        if (resp.status === 200) {
          // 存储已加入的AppId
          let tfJoinedAppIds = $.data.read(tfJoinedAppIdKey, [], accountId);
          if (!tfJoinedAppIds.includes(appId)) {
            tfJoinedAppIds.push(appId);
            tfJoinedAppIds = [...new Set(tfJoinedAppIds)];
            $.data.write(tfJoinedAppIdKey, tfJoinedAppIds, accountId);
          }
          $.logger.info(`成功加入[${resp.body.data.name}]`);
          resolve([true, appId, resp.body.data.name, accountId]);
        } else {
          $.logger.info(`加入[${appId}]失败`);
          $.notification.post(`加入[${appId}]失败`);
          resolve([false, appId, resp.body.data.name, accountId]);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 409) {
          $.logger.warning(`强制加入应用${appId}失败`);
        }
        $.logger.warning(`加入应用${appId}出现异常\n${JSON.stringify(err)}`);
        $.notification.post(`加入[${appId}]失败`);
        resolve([false, appId, "", accountId]);
      });
  });
}

async function startJoinAppTestFlight(accountIds, accountsSessionInfo, appId) {
  if (accountIds.length === 0) {
    return [];
  }
  let joinPromise = [];
  for (let accountId of accountIds) {
    // 遍历N次，尝试加入TestFlight
    for (let i = 0; i < tfJoinConcurrency; i++) {
      joinPromise.push(joinTestFlight(accountId, accountsSessionInfo[accountId], appId));
    }
  }
  return joinPromise;
}

async function checkAppIsOpen(accountId, sessionInfo, appId) {
  let allowJoin = false;
  let httpCode;
  return new Promise(async resolve => {
    if (tfJoinMode === 0) {
      const tfStatus = await getAppTestFlightHtml(appId);
      if (tfStatus === "NOT_FULL") {
        allowJoin = true;
        $.logger.info(`温和模式下，未满员的应用 [${appId}] 尝试加入`);
      } else {
        allowJoin = false;
        $.logger.info(`温和模式下，已满员的应用 [${appId}] 不尝试加入`);
      }
    } else if (tfJoinMode === 1) {
      [allowJoin, httpCode] = await getAppTestFlightJson(accountId, sessionInfo, appId);
      if (allowJoin === false) {
        $.logger.info(`标准模式下，已满员的应用 [${appId}] 不尝试加入`);
      } else {
        $.logger.info(`标准模式下，未满员的应用 [${appId}] 尝试加入`);
      }
    } else {
      $.logger.info(`暴力模式下，不检查AppId的状态，直接强制请求加入应用 [${appId}]，可能会被封号，慎用`);
    }
    $.logger.debug(`AppId [${appId}] 是否允许加入：${allowJoin}`);
    resolve(allowJoin === true ? {'app_id': appId, 'http_code': httpCode} : {});
  }).catch((err) => {
    $.logger.warning(`检查应用${appId}是否开放出现异常\n${JSON.stringify(err)}`);
    return {};
  });
}

async function crowd() {
  try {
    // 获取配置好的AccountId
    let allAccountIds = $.data.allSessionNames(tfSessionInfoKey);
    // 获取需要加入的App Id
    let appIds = $.data.read(tfAppIdKey, "").split(";");
    appIds = appIds.filter(appId => {
      return appId !== ""
    });

    if (appIds.length === 0) {
      $.notification.post(`没有检测到有效的AppId，请检查配置。`);
      return;
    }

    if (allAccountIds.length === 0) {
      $.notification.post(`没有检测到有效的账户信息，请检查配置。`);
      return;
    }

    // 获取每个账户的基础数据
    let accountsJoinedAppIds = $.data.read(tfJoinedAppIdKey, null, "", true);
    let accountsSessionInfo = $.data.read(tfSessionInfoKey, null, "", true);

    // 账户Session有效性检查
    const checkSessionTime = $.data.read(tfCheckSessionTimeKey, 0);
    const checkSessionTimeDiff = parseInt($.data.read(tfCheckSessionTimeDiffKey, 7200));
    const ts = Math.floor(Date.now() / 1000);
    if ((ts - checkSessionTime) >= checkSessionTimeDiff) {
      // 随机选择一个作为检查用的AppId
      const randomIndex = Math.floor(Math.random() * appIds.length);
      const appId = appIds[randomIndex];
      for (let accountId of allAccountIds) {
        let sessionInfo = accountsSessionInfo[accountId];
        // 只检查有效的账户
        if (sessionInfo["valid"] === true) {
          let [_, httpCode] = await getAppTestFlightJson(accountId, sessionInfo, appId);
          if (httpCode === 401) {
            // 修改账户Session为失效
            sessionInfo["valid"] = false;
            $.data.write(tfSessionInfoKey, sessionInfo, accountId);
            $.notification.post(`${accountId} 的 Session 已过期，请重新登录`);
          } else if (httpCode === 404) {
            $.logger.warning(`Session有效性检查异常，所配置的AppId不正确`);
          } else if (httpCode === 200) {
            // 修改账户Session为有效
            sessionInfo["valid"] = true;
            $.data.write(tfSessionInfoKey, sessionInfo, accountId);
            $.logger.info(`${accountId} Session 有效性检查通过`);
          }
        }
      }
      // 更新检查时间
      $.data.write(tfCheckSessionTimeKey, ts);
    }

    let invalidAppIds = $.data.read(tfInvalidAppIdKey, []);

    // 移除已被判断为无效的AppId
    appIds = appIds.filter((appId) => appId && !invalidAppIds.includes(appId));
    allAccountIds = allAccountIds.filter((accountId) => {
      return accountsSessionInfo[accountId]["valid"] === true
    });

    // 判断是否存在专门用于检查TF是否可加入的账户
    let checkAccountSessionInfo = blankSessionInfo;
    if (tfCheckAccountId && !allAccountIds.includes(tfCheckAccountId)) {
      // 移除检查账户
      $.logger.error(`存在用于检查的账户 ${tfCheckAccountId} ，但是该账户未配置Session`);
      return;
    } else if (tfCheckAccountId) {
      // 从账户Session中获取用于检查TF可用性账户的session
      checkAccountSessionInfo = accountsSessionInfo[tfCheckAccountId];
      $.logger.info(`使用账户 ${tfCheckAccountId} 检查TF可用性`);
    } else {
      // 未指定用于检查的账户，随机获取一个账户
      tfCheckAccountId = allAccountIds[Math.floor(Math.random() * allAccountIds.length)];
      $.logger.info(`随机使用账户 ${tfCheckAccountId} 检查TF可用性`);
      checkAccountSessionInfo = accountsSessionInfo[tfCheckAccountId];
    }

    let appJoinAccountIds = {};
    let openAppInfo = {}; // 可加入的AppId
    let checkAppPromise = [];
    // 获取本次需要尝试加入的AppId
    for (let appId of appIds) {
      const accountIds = allAccountIds.filter(accountId => (
            accountsJoinedAppIds[accountId] &&
            !accountsJoinedAppIds[accountId].includes(appId) &&
            !accountsJoinedAppIds[accountId].includes("*")
          ) ||
          !accountsJoinedAppIds[accountId]
      );
      if (accountIds.length > 0) {
        appJoinAccountIds[appId] = accountIds;
        checkAppPromise.push(checkAppIsOpen(tfCheckAccountId, checkAccountSessionInfo, appId));
      } else {
        $.logger.info(`没有任何账户可以加入App [${appId}] 的Beta测试员\n可能已全部加入完成，或账户Session已过期`);
      }
    }
    await Promise.all(checkAppPromise).then(appInfos => {
      for (let _appInfo of appInfos) {
        if (_appInfo && _appInfo["app_id"] && _appInfo["http_code"] === 200) {
          openAppInfo[_appInfo["app_id"]] = appJoinAccountIds[_appInfo["app_id"]];
        }
      }
    }).catch(e => {
      $.logger.error(`检查App是否可加入异常：${e}`);
    });

    // 尝试加入所有开放的AppId
    let joinPromise = [];
    for (let appId in openAppInfo) {
      if (appId !== "") {
        let temp = await startJoinAppTestFlight(openAppInfo[appId], accountsSessionInfo, appId)
        joinPromise = joinPromise.concat(temp);
      }
    }
    // 执行加入Beta测试员
    await Promise.all(joinPromise).then(results => {
      let messages = {};
      for (let val of results) {
        if (val[0] === true) {
          const key = `${val[1]}-${val[3]}`
          if (!(key in messages)) {
            messages[key] = val;
          }
        }
      }
      // 发送通知
      for (let key in messages) {
        $.notification.post(`${scriptName}-${messages[key][3]}`, `已成功加入[${messages[key][2]}]的Beta测试员`);
      }
    }).catch(err => {
      $.logger.error(err);
    })

  } catch (err) {
    $.logger.info(`自动加入TestFlight出现异常\n${err}`);
  }
}

async function loop() {
  let i = 0;
  while (true) {
    if (tfLoopCount > 0 && i >= tfLoopCount) {
      break;
    }
    i++;
    await new Promise(resolve => setTimeout(async () => {
      await crowd();
      resolve();
    }, 800));
  }
}

(async () => {
  let response = null;
  let url;
  let headers;
  let body;
  try {
    // $.notification.post(`链接匹配：${$.request.url}`);
    if ($.isResponse) {
      if (getFullAppIdRegex.test($.request.url)) {
        await autoAddAppId();
      } else if (getSessionRegex.test($.request.url)) {
        await getTFSessionInfo();
        response = await getAllAppData();
      } else {
        $.logger.warning(`意外的HTTP Request匹配，URL：${$.request.url}\n请检查配置是否正确`);
      }
    } else if ($.isRequest) {
      if (modifyTFRequest.test($.request.url) ||
        modifySettingsTFRequest.test($.request.url) ||
        modifyInstallTFRequest.test($.request.url)) {
        [url, headers, body] = modifyRequest();
      } else {
        [url, headers, body] = [$.request.url, $.request.headers, $.request.body];
        $.logger.warning(`意外的HTTP Response匹配，URL：${$.request.url}\n请检查配置是否正确`);
      }
    } else {
      $.logger.info(`开始监控App的Beta测试状态`);
      await loop();
    }
  } catch (err) {
    console.log("出错了\n" + err);
  } finally {
    if ($.isResponse) {
      if (response) {
        $.done(response);
      } else {
        $.done();
      }
    } else if ($.isRequest) {
      $.done({url, headers, body});
    } else {
      $.done();
    }
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
function MagicJS(e="MagicJS",t="INFO"){const i=()=>{const e=typeof $loon!=="undefined";const t=typeof $task!=="undefined";const n=typeof module!=="undefined";const i=typeof $httpClient!=="undefined"&&!e;const s=typeof $storm!=="undefined";const r=typeof $environment!=="undefined"&&typeof $environment["stash-build"]!=="undefined";const o=i||e||s||r;const u=typeof importModule!=="undefined";return{isLoon:e,isQuanX:t,isNode:n,isSurge:i,isStorm:s,isStash:r,isSurgeLike:o,isScriptable:u,get name(){if(e){return"Loon"}else if(t){return"QuantumultX"}else if(n){return"NodeJS"}else if(i){return"Surge"}else if(u){return"Scriptable"}else{return"unknown"}},get build(){if(i){return $environment["surge-build"]}else if(r){return $environment["stash-build"]}else if(s){return $storm.buildVersion}},get language(){if(i||r){return $environment["language"]}},get version(){if(i){return $environment["surge-version"]}else if(r){return $environment["stash-version"]}else if(s){return $storm.appVersion}else if(n){return process.version}},get system(){if(i){return $environment["system"]}else if(n){return process.platform}},get systemVersion(){if(s){return $storm.systemVersion}},get deviceName(){if(s){return $storm.deviceName}}}};const s=(n,e="INFO")=>{let i=e;const s={SNIFFER:6,DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1};const r={SNIFFER:"",DEBUG:"",INFO:"",NOTIFY:"",WARNING:"❗ ",ERROR:"❌ ",CRITICAL:"❌ ",NONE:""};const t=(e,t="INFO")=>{if(!(s[i]<s[t.toUpperCase()]))console.log(`[${t}] [${n}]\n${r[t.toUpperCase()]}${e}\n`)};const o=e=>{i=e};return{setLevel:o,sniffer:e=>{t(e,"SNIFFER")},debug:e=>{t(e,"DEBUG")},info:e=>{t(e,"INFO")},notify:e=>{t(e,"NOTIFY")},warning:e=>{t(e,"WARNING")},error:e=>{t(e,"ERROR")},retry:e=>{t(e,"RETRY")}}};return new class{constructor(e,t){this._startTime=Date.now();this.version="3.0.0";this.scriptName=e;this.env=i();this.logger=s(e,t);this.http=typeof MagicHttp==="function"?MagicHttp(this.env,this.logger):undefined;this.data=typeof MagicData==="function"?MagicData(this.env,this.logger):undefined;this.notification=typeof MagicNotification==="function"?MagicNotification(this.scriptName,this.env,this.logger):undefined;this.utils=typeof MagicUtils==="function"?MagicUtils(this.env,this.logger):undefined;this.qinglong=typeof MagicQingLong==="function"?MagicQingLong(this.env,this.data,this.logger):undefined;if(typeof this.data!=="undefined"){let e=this.data.read("magic_loglevel");const n=this.data.read("magic_bark_url");if(e){this.logger.setLevel(e.toUpperCase())}if(n){this.notification.setBark(n)}}}get isRequest(){return typeof $request!=="undefined"&&typeof $response==="undefined"}get isResponse(){return typeof $response!=="undefined"}get isDebug(){return this.logger.level==="DEBUG"}get request(){if(typeof $request!=="undefined"){this.logger.sniffer(`RESPONSE:\n${JSON.stringify($request)}`);return $request}}get response(){if(typeof $response!=="undefined"){if($response.hasOwnProperty("status"))$response["statusCode"]=$response["status"];if($response.hasOwnProperty("statusCode"))$response["status"]=$response["statusCode"];this.logger.sniffer(`RESPONSE:\n${JSON.stringify($response)}`);return $response}else{return undefined}}done=(e={})=>{this._endTime=Date.now();let t=(this._endTime-this._startTime)/1e3;this.logger.info(`SCRIPT COMPLETED: ${t} S.`);if(typeof $done!=="undefined"){$done(e)}}}(e,t)}
function MagicHttp(c,l){const e="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1";const t="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59";let r;if(c.isNode){const S=require("axios");r=S.create()}class s{constructor(e=true){this.handlers=[];this.isRequest=e}use(e,t,r){this.handlers.push({fulfilled:e,rejected:t,synchronous:r?r.synchronous:false,runWhen:r?r.runWhen:null});return this.handlers.length-1}eject(e){if(this.handlers[e]){this.handlers[e]=null}}forEach(t){this.handlers.forEach(e=>{if(e!==null){t(e)}})}}function n(e){let r={...e};if(!!r.params){if(!c.isNode){let e=Object.keys(r.params).map(e=>{const t=encodeURIComponent(e);r.url=r.url.replace(new RegExp(`${e}=[^&]*`,"ig"),"");r.url=r.url.replace(new RegExp(`${t}=[^&]*`,"ig"),"");return`${t}=${encodeURIComponent(r.params[e])}`}).join("&");if(r.url.indexOf("?")<0)r.url+="?";if(!/(&|\?)$/g.test(r.url)){r.url+="&"}r.url+=e;delete r.params;l.debug(`Params to QueryString: ${r.url}`)}}return r}const d=(e,t)=>{let r=typeof t==="object"?{headers:{},...t}:{url:t,headers:{}};if(!r.method){r["method"]=e}r=n(r);if(r["rewrite"]===true){if(c.isSurge){r.headers["X-Surge-Skip-Scripting"]=false;delete r["rewrite"]}else if(c.isQuanX){r["hints"]=false;delete r["rewrite"]}}if(c.isSurge){if(r["method"]!=="GET"&&r.headers["Content-Type"].indexOf("application/json")>=0&&r.body instanceof Array){r.body=JSON.stringify(r.body);l.debug(`Convert Array object to String: ${r.body}`)}}else if(c.isQuanX){if(r.hasOwnProperty("body")&&typeof r["body"]!=="string")r["body"]=JSON.stringify(r["body"]);r["method"]=e}else if(c.isNode){if(e==="POST"||e==="PUT"||e==="PATCH"||e==="DELETE"){r.data=r.data||r.body}else if(e==="GET"){r.params=r.params||r.body}delete r.body}return r};const f=(t,r=null)=>{if(t){let e={...t,config:t.config||r,status:t.statusCode||t.status,body:t.body||t.data,headers:t.headers||t.header};if(typeof e.body==="string"){try{e.body=JSON.parse(e.body)}catch{}}delete t.data;return e}else{return t}};const o=r=>{return Object.keys(r).reduce((e,t)=>{e[t.toLowerCase()]=r[t];return e},{})};const i=s=>{return Object.keys(s).reduce((e,t)=>{const r=t.split("-").map(e=>e[0].toUpperCase()+e.slice(1)).join("-");e[r]=s[t];return e},{})};const h=(t,r=null)=>{if(!!t&&t.status>=400){l.debug(`Raise exception when status code is ${t.status}`);let e={name:"RequestException",message:`Request failed with status code ${t.status}`,config:r||t.config,response:t};return e}};const a={request:new s,response:new s(false)};let p=[];let y=[];let g=true;function m(e){e=n(e);l.debug(`HTTP ${e["method"].toUpperCase()}:\n${JSON.stringify(e)}`);return e}function b(e){try{e=!!e?f(e):e;l.sniffer(`HTTP ${e.config["method"].toUpperCase()}:\n${JSON.stringify(e.config)}\nSTATUS CODE:\n${e.status}\nRESPONSE:\n${typeof e.body==="object"?JSON.stringify(e.body):e.body}`);const t=h(e);if(!!t){return Promise.reject(t)}return e}catch(t){l.error(t);return e}}const T=t=>{try{p=[];y=[];a.request.forEach(e=>{if(typeof e.runWhen==="function"&&e.runWhen(t)===false){return}g=g&&e.synchronous;p.unshift(e.fulfilled,e.rejected)});a.response.forEach(e=>{y.push(e.fulfilled,e.rejected)})}catch(e){l.error(`Failed to register interceptors: ${e}.`)}};const u=(e,s)=>{let n;const t=e.toUpperCase();s=d(t,s);if(c.isNode){n=r}else{if(c.isSurgeLike){n=o=>{return new Promise((s,n)=>{$httpClient[e.toLowerCase()](o,(t,r,e)=>{if(t){let e={name:t.name||t,message:t.message||t,stack:t.stack||t,config:o,response:f(r)};n(e)}else{r.config=o;r.body=e;s(r)}})})}}else{n=n=>{return new Promise((r,s)=>{$task.fetch(n).then(e=>{e=f(e,n);const t=h(e,n);if(t){return Promise.reject(t)}r(e)}).catch(e=>{let t={name:e.message||e.error,message:e.message||e.error,stack:e.error,config:n,response:!!e.response?f(e.response):null};s(t)})})}}}let o;T(s);const i=[m,undefined];const a=[b,undefined];if(!g){l.debug("Interceptors are executed in asynchronous mode.");let r=[n,undefined];Array.prototype.unshift.apply(r,i);Array.prototype.unshift.apply(r,p);r=r.concat(a);r=r.concat(y);o=Promise.resolve(s);while(r.length){try{let e=r.shift();let t=r.shift();if(!c.isNode&&s["timeout"]&&e===n){o=u(s)}else{o=o.then(e,t)}}catch(e){l.error(`request exception: ${e}`)}}return o}else{l.debug("Interceptors are executed in synchronous mode.");Array.prototype.unshift.apply(p,i);p=p.concat([m,undefined]);while(p.length){let e=p.shift();let t=p.shift();try{s=e(s)}catch(e){t(e);break}}try{if(!c.isNode&&s["timeout"]){o=u(s)}else{o=n(s)}}catch(e){return Promise.reject(e)}Array.prototype.unshift.apply(y,a);while(y.length){o=o.then(y.shift(),y.shift())}return o}function u(r){try{const e=new Promise((e,t)=>{setTimeout(()=>{let e={message:`timeout of ${r["timeout"]}ms exceeded.`,config:r};t(e)},r["timeout"])});return Promise.race([n(r),e])}catch(e){l.error(`Request Timeout exception: ${e}.`)}}};return{request:u,interceptors:a,convertHeadersToLowerCase:o,convertHeadersToCamelCase:i,modifyResponse:f,get:e=>{return u("GET",e)},post:e=>{return u("POST",e)},put:e=>{return u("PUT",e)},patch:e=>{return u("PATCH",e)},delete:e=>{return u("DELETE",e)},head:e=>{return u("HEAD",e)},options:e=>{return u("OPTIONS",e)}}}
function MagicData(i,u){let f={fs:undefined,data:{}};if(i.isNode){f.fs=require("fs");try{f.fs.accessSync("./magic.json",f.fs.constants.R_OK|f.fs.constants.W_OK)}catch(e){f.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}f.data=require("./magic.json")}const o=(e,t)=>{if(typeof t==="object"){return false}else{return e===t}};const a=e=>{if(e==="true"){return true}else if(e==="false"){return false}else if(typeof e==="undefined"){return null}else{return e}};const c=(e,t,s,n)=>{if(s){try{if(typeof e==="string")e=JSON.parse(e);if(e["magic_session"]===true){e=e[s]}else{e=null}}catch{e=null}}if(typeof e==="string"&&e!=="null"){try{e=JSON.parse(e)}catch{}}if(n===false&&!!e&&e["magic_session"]===true){e=null}if((e===null||typeof e==="undefined")&&t!==null&&typeof t!=="undefined"){e=t}e=a(e);return e};const l=t=>{if(typeof t==="string"){let e={};try{e=JSON.parse(t);const s=typeof e;if(s!=="object"||e instanceof Array||s==="bool"||e===null){e={}}}catch{}return e}else if(t instanceof Array||t===null||typeof t==="undefined"||t!==t||typeof t==="boolean"){return{}}else{return t}};const y=(e,t=null,s="",n=false,r=null)=>{let l=r||f.data;if(!!l&&typeof l[e]!=="undefined"&&l[e]!==null){val=l[e]}else{val=!!s?{}:null}val=c(val,t,s,n);return val};const d=(e,t=null,s="",n=false,r=null)=>{let l="";if(r||i.isNode){l=y(e,t,s,n,r)}else{if(i.isSurgeLike){l=$persistentStore.read(e)}else if(i.isQuanX){l=$prefs.valueForKey(e)}l=c(l,t,s,n)}u.debug(`READ DATA [${e}]${!!s?`[${s}]`:""} <${typeof l}>\n${JSON.stringify(l)}`);return l};const p=(t,s,n="",e=null)=>{let r=e||f.data;r=l(r);if(!!n){let e=l(r[t]);e["magic_session"]=true;e[n]=s;r[t]=e}else{r[t]=s}if(e!==null){e=r}return r};const S=(e,t,s="",n=null)=>{if(typeof t==="undefined"||t!==t){return false}if(!i.isNode&&(typeof t==="boolean"||typeof t==="number")){t=String(t)}let r="";if(n||i.isNode){r=p(e,t,s,n)}else{if(!s){r=t}else{if(i.isSurgeLike){r=!!$persistentStore.read(e)?$persistentStore.read(e):r}else if(i.isQuanX){r=!!$prefs.valueForKey(e)?$prefs.valueForKey(e):r}r=l(r);r["magic_session"]=true;r[s]=t}}if(!!r&&typeof r==="object"){r=JSON.stringify(r,null,4)}u.debug(`WRITE DATA [${e}]${s?`[${s}]`:""} <${typeof t}>\n${JSON.stringify(t)}`);if(!n){if(i.isSurgeLike){return $persistentStore.write(r,e)}else if(i.isQuanX){return $prefs.setValueForKey(r,e)}else if(i.isNode){try{f.fs.writeFileSync("./magic.json",r);return true}catch(e){u.error(e);return false}}}return true};const e=(t,s,n,r=o,l=null)=>{s=a(s);const e=d(t,null,n,false,l);if(r(e,s)===true){return false}else{const i=S(t,s,n,l);let e=d(t,null,n,false,l);if(r===o&&typeof e==="object"){return i}return r(s,e)}};const g=(e,t,s)=>{let n=s||f.data;n=l(n);if(!!t){obj=l(n[e]);delete obj[t];n[e]=obj}else{delete n[e]}if(!!s){s=n}return n};const t=(e,t="",s=null)=>{let n={};if(s||i.isNode){n=g(e,t,s);if(!s){f.fs.writeFileSync("./magic.json",JSON.stringify(n,null,4))}else{s=n}}else{if(!t){if(i.isStorm){return $persistentStore.remove(e)}else if(i.isSurgeLike){return $persistentStore.write(null,e)}else if(i.isQuanX){return $prefs.removeValueForKey(e)}}else{if(i.isSurgeLike){n=$persistentStore.read(e)}else if(i.isQuanX){n=$prefs.valueForKey(e)}n=l(n);delete n[t];const r=JSON.stringify(n,null,4);S(e,r)}}u.debug(`DELETE KEY [${e}]${!!t?`[${t}]`:""}`)};const s=(e,t=null)=>{let s=[];let n=d(e,null,null,true,t);n=l(n);if(n["magic_session"]!==true){s=[]}else{s=Object.keys(n).filter(e=>e!=="magic_session")}u.debug(`READ ALL SESSIONS [${e}] <${typeof s}>\n${JSON.stringify(s,null,4)}`);return s};const n=(e,t=null)=>{let s={};let n=d(e,null,null,true,t);n=l(n);if(n["magic_session"]===true){s={...n};delete s["magic_session"]}u.debug(`READ ALL SESSIONS [${e}] <${typeof s}>\n${JSON.stringify(s,null,4)}`);return s};return{read:d,write:S,del:t,update:e,allSessions:n,allSessionNames:s,defaultValueComparator:o,convertToObject:l}}
function MagicNotification(r,f,l){let s=null;let u=null;const c=typeof MagicHttp==="function"?MagicHttp(f,l):undefined;const e=t=>{try{let e=t.replace(/\/+$/g,"");s=`${/^https?:\/\/([^/]*)/.exec(e)[0]}/push`;u=/\/([^\/]+)\/?$/.exec(e)[1]}catch(e){l.error(`Bark url error: ${e}.`)}};function t(e=r,t="",i="",o=""){const n=i=>{try{let t={};if(typeof i==="string"){if(f.isLoon)t={openUrl:i};else if(f.isQuanX)t={"open-url":i};else if(f.isSurge)t={url:i}}else if(typeof i==="object"){if(f.isLoon){t["openUrl"]=!!i["open-url"]?i["open-url"]:"";t["mediaUrl"]=!!i["media-url"]?i["media-url"]:""}else if(f.isQuanX){t=!!i["open-url"]||!!i["media-url"]?i:{}}else if(f.isSurge){let e=i["open-url"]||i["openUrl"];t=e?{url:e}:{}}}return t}catch(e){l.error(`Failed to convert notification option, ${e}`)}return i};o=n(o);if(arguments.length==1){e=r;t="",i=arguments[0]}l.notify(`title:${e}\nsubTitle:${t}\nbody:${i}\noptions:${typeof o==="object"?JSON.stringify(o):o}`);if(f.isSurge){$notification.post(e,t,i,o)}else if(f.isLoon){if(!!o)$notification.post(e,t,i,o);else $notification.post(e,t,i)}else if(f.isQuanX){$notify(e,t,i,o)}if(s&&u&&typeof c!=="undefined"){p(e,t,i)}}function i(e=r,t="",i="",o=""){if(l.level==="DEBUG"){if(arguments.length==1){e=r;t="",i=arguments[0]}this.notify(e,t,i,o)}}function p(e=r,t="",i="",o=""){if(typeof c==="undefined"||typeof c.post==="undefined"){throw"Bark notification needs to import MagicHttp module."}let n={url:s,headers:{"Content-Type":"application/json; charset=utf-8"},body:{title:e,body:t?`${t}\n${i}`:i,device_key:u}};c.post(n).catch(e=>{l.error(`Bark notify error: ${e}`)})}return{post:t,debug:i,bark:p,setBark:e}}
function MagicUtils(r,h){const e=(o,i=5,l=0,a=null)=>{return(...e)=>{return new Promise((s,r)=>{function n(...t){Promise.resolve().then(()=>o.apply(this,t)).then(e=>{if(typeof a==="function"){Promise.resolve().then(()=>a(e)).then(()=>{s(e)}).catch(e=>{if(i>=1){if(l>0)setTimeout(()=>n.apply(this,t),l);else n.apply(this,t)}else{r(e)}i--})}else{s(e)}}).catch(e=>{h.error(e);if(i>=1&&l>0){setTimeout(()=>n.apply(this,t),l)}else if(i>=1){n.apply(this,t)}else{r(e)}i--})}n.apply(this,e)})}};const t=(e,t="yyyy-MM-dd hh:mm:ss")=>{let s={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t))t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length));for(let e in s)if(new RegExp("("+e+")").test(t))t=t.replace(RegExp.$1,RegExp.$1.length==1?s[e]:("00"+s[e]).substr((""+s[e]).length));return t};const s=()=>{return t(new Date,"yyyy-MM-dd hh:mm:ss")};const n=()=>{return t(new Date,"yyyy-MM-dd")};const o=t=>{return new Promise(e=>setTimeout(e,t))};const i=(e,t=null)=>{if(r.isNode){const s=require("assert");if(t)s(e,t);else s(e)}else{if(e!==true){let e=`AssertionError: ${t||"The expression evaluated to a falsy value"}`;h.error(e)}}};return{retry:e,formatTime:t,now:s,today:n,sleep:o,assert:i}}
function MagicQingLong(e,s,o){let i="";let l="";let c="";let u="";let d="";let n="";const g="magic.json";const r=3e3;const f=MagicHttp(e,o);const t=(e,n,r,t,a)=>{i=e;c=n;u=r;l=t;d=a};function a(e){i=i||s.read("magic_qlurl");n=n||s.read("magic_qltoken");return e}function p(e){if(!i){i=s.read("magic_qlurl")}if(e.url.indexOf(i)<0){e.url=`${i}${e.url}`}return{...e,timeout:r}}function y(e){e.params={...e.params,t:Date.now()};return e}function m(e){n=n||s.read("magic_qltoken");if(n){e.headers["Authorization"]=`Bearer ${n}`}return e}function h(e){c=c||s.read("magic_qlclient");if(!!c){e.url=e.url.replace("/api/","/open/")}return e}async function b(e){try{const n=e.message||e.error||JSON.stringify(e);if((n.indexOf("NSURLErrorDomain")>=0&&n.indexOf("-1012")>=0||!!e.response&&e.response.status===401)&&!!e.config&&e.config.refreshToken!==true){o.warning(`Qinglong Panel token has expired.`);await v();e.config["refreshToken"]=true;return await f.request(e.config.method,e.config)}else{return Promise.reject(e)}}catch(e){return Promise.reject(e)}}f.interceptors.request.use(a,undefined);f.interceptors.request.use(p,undefined);f.interceptors.request.use(h,undefined,{runWhen:e=>{return e.url.indexOf("api/user/login")<0&&e.url.indexOf("open/auth/token")<0}});f.interceptors.request.use(m,undefined,{runWhen:e=>{return e.url.indexOf("api/user/login")<0&&e.url.indexOf("open/auth/token")<0}});f.interceptors.request.use(y,undefined,{runWhen:e=>{return e.url.indexOf("open/auth/token")<0&&e.url.indexOf("t=")<0}});f.interceptors.response.use(undefined,b);async function v(){c=c||s.read("magic_qlclient");u=u||s.read("magic_qlsecrt");l=l||s.read("magic_qlname");d=d||s.read("magic_qlpwd");if(i&&c&&u){await f.get({url:`/open/auth/token`,headers:{"Content-Type":"application/json"},params:{client_id:c,client_secret:u}}).then(e=>{o.info("Successfully logged in to Qinglong Panel");n=e.body.data.token;s.update("magic_qltoken",n);return n}).catch(e=>{o.error(`Error logging in to Qinglong Panel.\n${e.message}`)})}else if(i&&l&&d){await f.post({url:`/api/user/login`,headers:{"Content-Type":"application/json"},body:{username:l,password:d}}).then(e=>{o.info("Successfully logged in to Qinglong Panel");n=e.body.data.token;s.update("magic_qltoken",n);return n}).catch(e=>{o.error(`Error logging in to Qinglong Panel.\n${e.message}`)})}}async function E(n,r,t=null){i=i||s.read("magic_qlurl");if(t===null){let e=await w([{name:n,value:r}]);if(!!e&&e.length===1){return e[0]}}else{f.put({url:`/api/envs`,headers:{"Content-Type":"application/json"},body:{name:n,value:r,id:t}}).then(e=>{if(e.body.code===200){o.debug(`QINGLONG UPDATE ENV ${n} <${typeof r}> (${t})\n${JSON.stringify(r)}`);return true}else{o.error(`Error updating environment variable from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error updating environment variable from Qinglong Panel.\n${e.message}`);return false})}}async function w(e){let n=[];await f.post({url:`/api/envs`,headers:{"Content-Type":"application/json"},body:e}).then(e=>{if(e.body.code===200){e.body.data.forEach(e=>{o.debug(`QINGLONG ADD ENV ${e.name} <${typeof e.value}> (${e.id})\n${JSON.stringify(e)}`);n.push(e.id)})}else{o.error(`Error adding environment variable from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error adding environment variable from Qinglong Panel.\n${e.message}`)});return n}async function N(n){return await f.delete({url:`/api/envs`,headers:{Accept:"application/json","Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",Connection:"keep-alive","Content-Type":"application/json;charset=UTF-8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){o.debug(`QINGLONG DELETE ENV IDS: ${n}`);return true}else{o.error(`Error deleting environment variable from Qinglong Panel.\n${JSON.stringify(e)}`);return false}}).catch(e=>{o.error(`Error deleting environment variable from Qinglong Panel.\n${e.message}`)})}async function O(t=null,a="",i=0){if(i<=3){let r=[];await f.get({url:`/api/envs`,headers:{"Content-Type":"application/json"},params:{searchValue:a}}).then(e=>{if(e.body.code===200){const n=e.body.data;if(!!t){let e=[];for(const e of n){if(e.name===t){r.push(e)}}r=e}r=n}else{o.error(`Error reading environment variable from Qinglong Panel.\n${JSON.stringify(e)}`);b();i+=1;O(t,a,i)}}).catch(e=>{o.error(`Error reading environment variable from Qinglong Panel.\n${JSON.stringify(e)}`);b();i+=1;O(t,a,i)});return r}else{throw new Error("An error occurred while reading environment variable from Qinglong Panel.")}}async function S(e){let n=null;const r=await O();for(const t of r){if(t.id===e){n=t;break}}return n}async function $(n){let r=false;await f.put({url:`/api/envs/disable`,headers:{Accept:"application/json","Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",Connection:"keep-alive","Content-Type":"application/json;charset=UTF-8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){o.debug(`QINGLONG DISABLED ENV IDS: ${n}`);r=true}else{o.error(`Error disabling environment variable from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error disabling environment variable from Qinglong Panel.\n${e.message}`)});return r}async function T(n){let r=false;await f.put({url:`/api/envs/enable`,headers:{Accept:"application/json","Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",Connection:"keep-alive","Content-Type":"application/json;charset=UTF-8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30"},body:n}).then(e=>{if(e.body.code===200){o.debug(`QINGLONG ENABLED ENV IDS: ${n}`);r=true}else{o.error(`Error enabling environment variable from Qilong panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error enabling environment variable from Qilong panel.\n${e.message}`)});return r}async function Q(e,n="",r=""){let t=false;await f.post({url:`/api/scripts`,headers:{"Content-Type":"application/json"},body:{filename:e,path:n,content:r}}).then(e=>{if(e.body.code===200){t=true}else{o.error(`Error reading data from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error reading data from Qinglong Panel.\n${e.message}`)});return t}async function q(r,t="",a=0){if(a<=3){let n="";await f.get({url:`/api/scripts/${r}`,params:{path:t}}).then(e=>{if(e.body.code===200){n=e.body.data}else{o.error(`Error reading data from Qinglong Panel.\n${JSON.stringify(e)}`);b();a+=1;q(r,t,a)}}).catch(e=>{o.error(`Error reading data from Qinglong Panel.\n${e.message}`);b();a+=1;q(r,t,a)});return n}else{throw new Error("An error occurred while reading the data from Qinglong Panel.")}}async function P(e,n="",r=""){let t=false;await f.put({url:`/api/scripts`,headers:{"Content-Type":"application/json"},body:{filename:e,path:n,content:r}}).then(e=>{if(e.body.code===200){t=true}else{o.error(`Error reading data from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error reading data from Qinglong Panel.\n${e.message}`)});return t}async function j(e,n=""){let r=false;await f.delete({url:`/api/scripts`,headers:{"Content-Type":"application/json"},body:{filename:e,path:n}}).then(e=>{if(e.body.code===200){r=true}else{o.error(`Error reading data from Qinglong Panel.\n${JSON.stringify(e)}`)}}).catch(e=>{o.error(`Error reading data from Qinglong Panel.\n${e.message}`)});return r}async function k(e,n,r=""){let t=await q(g,"");let a=s.convertToObject(t);let i=s.write(e,n,r,a);t=JSON.stringify(a,null,4);let o=await P(g,"",t);return o&&i}async function C(...n){let e=await q(g,"");let r=s.convertToObject(e);for(let e of n){s.write(e[0],e[1],typeof e[2]!=="undefined"?e[2]:"",r)}e=JSON.stringify(r,null,4);return await P(g,"",e)}async function J(e,n,r,t=s.defaultValueComparator){let a=await q(g,"");let i=s.convertToObject(a);const o=s.update(e,n,r,t,i);let l=false;if(o===true){a=JSON.stringify(i,null,4);l=await P(g,"",a)}return o&&l}async function A(...n){let e=await q(g,"");let r=s.convertToObject(e);for(let e of n){s.update(e[0],e[1],typeof e[2]!=="undefined"?e[2]:"",typeof e[3]!=="undefined"?e["comparator"]:s.defaultValueComparator,r)}e=JSON.stringify(r,null,4);return await P(g,"",e)}async function G(e,n,r="",t=false){let a=await q(g,"");let i=s.convertToObject(a);return s.read(e,n,r,t,i)}async function L(...n){let e=await q(g,"");let r=s.convertToObject(e);let t=[];for(let e of n){const a=s.read(e[0],e[1],typeof e[2]!=="undefined"?e[2]:"",typeof e[3]==="boolean"?e[3]:false,r);t.push(a)}return t}async function _(e,n=""){let r=await q(g,"");let t=s.convertToObject(r);const a=s.del(e,n,t);r=JSON.stringify(t,null,4);const i=await P(g,"",r);return a&&i}async function x(...n){let e=await q(g,"");let r=s.convertToObject(e);for(let e of n){s.del(e[0],typeof e[1]!=="undefined"?e[1]:"",r)}e=JSON.stringify(r,null,4);return await P(g,"",e)}async function D(e){let n=await q(g,"");let r=s.convertToObject(n);return s.allSessionNames(e,r)}async function W(e){let n=await q(g,"");let r=s.convertToObject(n);return s.allSessions(e,r)}return{url:i||s.read("magic_qlurl"),init:t,getToken:v,setEnv:E,setEnvs:w,getEnv:S,getEnvs:O,delEnvs:N,disableEnvs:$,enableEnvs:T,addScript:Q,getScript:q,editScript:P,delScript:j,write:k,read:G,del:_,update:J,batchWrite:C,batchRead:L,batchUpdate:A,batchDel:x,allSessions:W,allSessionNames:D}}
// @formatter:on
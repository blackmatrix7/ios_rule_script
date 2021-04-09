const scriptName = "知乎助手";
const blockedUsersKey = "zhihu_blocked_users";
const currentUserInfoKey = "zhihu_current_userinfo";
const keywordBlockKey = "zhihu_keyword_block";
// 默认屏蔽推荐列表的用户，通常不是真实用户，无法通过加入黑名单屏蔽
const defaultAnswerBlockedUsers = ["会员推荐"];
const keywordMaxCount = 10; // 允许设置的关键词数量
let magicJS = MagicJS(scriptName, "INFO");

(() => {
  let response = null;
  if (magicJS.isResponse) {
    switch (true) {
      // 回答内容优化
      case /^https?:\/\/www\.zhihu\.com\/appview\/v2\/answer\/.*(entry=(?!(preload-topstory|preload-search|preload-subscription)))?/.test(magicJS.request.url):
        try {
          let html = magicJS.response.body;
          // 付费内容提醒
          if ((html.indexOf("查看完整内容") >= 0 || html.indexOf("查看全部章节") >= 0) && html.indexOf("paid") >= 0) {
            let matchStr = html.match(/(richText[^<]*>)(.)/)[1];
            let start = html.lastIndexOf(matchStr) + matchStr.length;
            let insertText =
              '<a style="height: 42px;padding: 0 12px;border-radius: 6px;background-color: rgb(247 104 104 / 8%);display: block;text-decoration: none;" href="#"><div style="color: #f36;display: flex;-webkit-box-align: center;align-items: center;height: 100%;"><svg style="width: 1.2em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1957"><path d="M821.333333 138.666667c64.8 0 117.333333 52.533333 117.333334 117.333333v149.333333a32 32 0 0 1-32 32 74.666667 74.666667 0 0 0 0 149.333334 32 32 0 0 1 32 32v149.333333c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V618.666667a32 32 0 0 1 32-32 74.666667 74.666667 0 0 0 0-149.333334 32 32 0 0 1-32-32V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666zM428.576 329.994667a32 32 0 0 0-43.733333-2.581334l-1.514667 1.344a32 32 0 0 0-2.581333 43.733334L452.565333 458.666667H405.333333l-1.877333 0.053333A32 32 0 0 0 373.333333 490.666667l0.053334 1.877333A32 32 0 0 0 405.333333 522.666667h80v42.666666H405.333333l-1.877333 0.053334A32 32 0 0 0 373.333333 597.333333l0.053334 1.877334A32 32 0 0 0 405.333333 629.333333h80v42.666667l0.053334 1.877333A32 32 0 0 0 517.333333 704l1.877334-0.053333A32 32 0 0 0 549.333333 672v-42.666667H618.666667l1.877333-0.053333A32 32 0 0 0 650.666667 597.333333l-0.053334-1.877333A32 32 0 0 0 618.666667 565.333333h-69.333334v-42.666666H618.666667l1.877333-0.053334A32 32 0 0 0 650.666667 490.666667l-0.053334-1.877334A32 32 0 0 0 618.666667 458.666667h-47.253334l71.84-86.186667 1.248-1.589333a32 32 0 0 0-50.421333-39.381334L512 430.016l-82.08-98.506667z" p-id="1958"></path></svg><div style="flex: 1 1;white-space: nowrap;text-overflow: ellipsis;padding-left:4px"><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;line-height: 20px;color: #f36;white-space: nowrap;font-weight: 600;">知乎助手 · 本文为付费内容</span></div><div><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #f36;line-height: normal;display: flex;-webkit-box-align: center;align-items: center;"><svg style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #f36;line-height: normal;fill: currentcolor;width: 24px;height: 24px;margin: -2px;" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg></span></div></div></a>';
            response = { body: html.slice(0, start) + insertText + html.slice(start) };
          }
          // 营销推广提醒
          else if (html.indexOf("ad-link-card") >= 0 || html.indexOf("xg.zhihu.com") >= 0 || html.indexOf("知乎营销平台") >= 0) {
            let matchStr = html.match(/(richText[^<]*>)(.)/)[1];
            let start = html.lastIndexOf(matchStr) + matchStr.length;
            let insertText =
              '<a style="height: 42px;padding: 0 12px;border-radius: 6px;background-color: rgb(8 188 212 / 8%);display: block;text-decoration: none;" href="#"><div style="color: #00bcd4;display: flex;-webkit-box-align: center;align-items: center;height: 100%;"><svg style="width: 1.2em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1957"><path d="M128 765.952q0 26.624 18.432 45.056t45.056 18.432l191.488 0 0 128-254.976 0q-26.624 0-49.664-10.24t-40.448-27.648-27.648-40.448-10.24-49.664l0-637.952q0-25.6 10.24-49.152t27.648-40.448 40.448-27.136 49.664-10.24l701.44 0q26.624 0 49.664 10.24t40.448 27.136 27.648 40.448 10.24 49.152l0 251.904-128 1.024 0-61.44q0-26.624-18.432-45.056t-45.056-18.432l-574.464 0q-26.624 0-45.056 18.432t-18.432 45.056l0 382.976zM990.208 705.536q21.504 18.432 22.016 34.304t-20.992 33.28q-21.504 18.432-51.2 41.472t-60.928 48.128-61.952 49.152-55.296 43.52q-26.624 20.48-43.52 15.36t-16.896-31.744q1.024-16.384 0-40.448t-1.024-41.472q0-19.456-10.752-24.064t-31.232-4.608q-21.504 0-39.936-0.512t-35.84-0.512-36.352-0.512-41.472-0.512q-9.216 0-19.968-2.048t-19.456-7.168-14.336-15.36-5.632-27.648l0-80.896q0-31.744 15.36-42.496t48.128-10.752q30.72 1.024 61.44 1.024t71.68 1.024q29.696 0 46.08-5.12t16.384-25.6q-1.024-14.336 0.512-35.328t1.536-37.376q0-26.624 14.336-33.28t36.864 10.752q22.528 18.432 52.736 43.008t61.952 50.688 62.976 51.2 54.784 44.544z" p-id="5859"></path></svg><div style="flex: 1 1;white-space: nowrap;text-overflow: ellipsis;padding-left:4px"><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;line-height: 20px;color: #00bcd4;white-space: nowrap;font-weight: 600;">知乎助手 · 本文含有营销推广</span></div><div><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #f36;line-height: normal;display: flex;-webkit-box-align: center;align-items: center;"><svg style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #00BCD4;line-height: normal;fill: currentcolor;width: 24px;height: 24px;margin: -2px;" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg></span></div></div></a>';
            response = { body: html.slice(0, start) + insertText + html.slice(start) };
          }
          // 购物推广提醒
          else if (html.indexOf("mcn-link-card") >= 0) {
            let matchStr = html.match(/(richText[^<]*>)(.)/)[1];
            let start = html.lastIndexOf(matchStr) + matchStr.length;
            let insertText =
              '<a style="height: 42px;padding: 0 12px;border-radius: 6px;background-color: rgb(8 188 212 / 8%);display: block;text-decoration: none;" href="#"><div style="color: #00bcd4;display: flex;-webkit-box-align: center;align-items: center;height: 100%;"><svg style="width: 1.2em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1957"><path d="M346.112 806.912q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zM772.096 808.96q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM944.128 227.328q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832t-49.664 15.872l-35.84 0-65.536 0-86.016 0-96.256 0-253.952 0 14.336 92.16 517.12 0q49.152 0 49.152 41.984 0 20.48-9.728 35.328t-38.4 14.848l-49.152 0-94.208 0-118.784 0-119.808 0-99.328 0-55.296 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-13.312l21.504 0 21.504 0 25.6 0 34.816 0q20.48 0 32.768 6.144t19.456 15.36 10.24 19.456 5.12 17.408q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0zM867.328 194.56l-374.784 0 135.168-135.168q23.552-23.552 51.712-24.064t51.712 23.04z"></path></svg><div style="flex: 1 1;white-space: nowrap;text-overflow: ellipsis;padding-left:4px"><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;line-height: 20px;color: #00bcd4;white-space: nowrap;font-weight: 600;">知乎助手 · 本文含有购物推广</span></div><div><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #f36;line-height: normal;display: flex;-webkit-box-align: center;align-items: center;"><svg style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #00BCD4;line-height: normal;fill: currentcolor;width: 24px;height: 24px;margin: -2px;" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg></span></div></div></a>';
            response = { body: html.slice(0, start) + insertText + html.slice(start) };
          }
          // 彩蛋
          else if (Math.floor(Math.random() * 200) == 7) {
            let matchStr = html.match(/(richText[^<]*>)(.)/)[1];
            let start = html.lastIndexOf(matchStr) + matchStr.length;
            let insertText =
              '<a style="height: 42px;padding: 0 12px;border-radius: 6px;background-color: rgb(74 162 56 / 8%);display: block;text-decoration: none;" href="#"><div style="color: #619201;display: flex;-webkit-box-align: center;align-items: center;height: 100%;"><svg class="icon" style="width: 1.2em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1465"><path d="M512 85.333333c71.477333 0 159.68 57.546667 229.258667 147.018667C817.845333 330.826667 864 455.978667 864 586.666667c0 211.808-148.501333 352-352 352S160 798.474667 160 586.666667c0-130.688 46.144-255.84 122.741333-354.314667C352.32 142.88 440.522667 85.333333 512 85.333333z m0 64c-48.213333 0-120.096 46.912-178.741333 122.314667C265.109333 359.253333 224 470.762667 224 586.666667c0 175.616 119.050667 288 288 288s288-112.384 288-288c0-115.904-41.109333-227.402667-109.258667-315.018667C632.096 196.234667 560.213333 149.333333 512 149.333333z m-74.666667 522.666667a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667z m-96-128a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z" p-id="1466"></path></svg><div style="flex: 1 1;white-space: nowrap;text-overflow: ellipsis;padding-left:4px"><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;line-height: 20px;color: #619201;white-space: nowrap;font-weight: 600;">知乎助手 · 本文为免费内容</span></div><div><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #619201;line-height: normal;display: flex;-webkit-box-align: center;align-items: center;"><svg style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #619201;line-height: normal;fill: currentcolor;width: 24px;height: 24px;margin: -2px;" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg></span></div></div></a>';
            response = { body: html.slice(0, start) + insertText + html.slice(start) };
          }
        } catch (err) {
          magicJS.logError(`知乎付费内容提醒出现异常：${err}`);
        }
        break;
      // 处理登录用户信息
      case /^https:\/\/api\.zhihu\.com\/people\/self/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          magicJS.logDebug(`用户登录用户信息，接口响应：${magicJS.response.body}`);
          if (obj && obj["id"] && obj.hasOwnProperty("vip_info") && obj["vip_info"].hasOwnProperty("is_vip")) {
            let userInfo = {
              id: obj["id"],
              is_vip: obj["vip_info"]["is_vip"] ? obj["vip_info"]["is_vip"] !== undefined : false,
            };
            magicJS.logInfo(`当前用户id：${obj["id"]}，是否为VIP：${obj["vip_info"]["is_vip"]}`);
            magicJS.write(currentUserInfoKey, userInfo);
            // 在知乎APP显示VIP，仅自己可见，无实际用途
            if (obj["vip_info"]["is_vip"] === false) {
              obj["vip_info"]["is_vip"] = true;
              obj["vip_info"]["vip_icon"] = {
                url: "https://pic1.zhimg.com/v2-4812630bc27d642f7cafcd6cdeca3d7a_r.png",
                night_mode_url: "https://pic1.zhimg.com/v2-c9686ff064ea3579730756ac6c289978_r.png",
              };
              obj["vip_info"]["entrance"] = {
                icon: {
                  url: "https://pic1.zhimg.com/v2-5b7012c8c22fd520f5677305e1e551bf.png",
                  night_mode_url: "https://pic1.zhimg.com/v2-e51e3252d7a2cb016a70879defd5da0b.png",
                },
                title: "我的盐选会员",
                expires_day: "2033-12-24",
                sub_title: null,
                button_text: "你好，知乎！",
                jump_url: "zhihu://vip/purchase",
                button_jump_url: "",
                sub_title_new: null,
                identity: "svip",
              };
              obj["vip_info"]["entrance_new"] = {
                left_button: {
                  title: "精选会员内容",
                  description: "为您严选好内容",
                  jump_url: "zhihu://market/home",
                },
                right_button: {
                  title: "开通盐选会员",
                  description: "畅享 10w+ 场优质内容等特权",
                  jump_url: "zhihu://vip/purchase",
                },
              };
              obj["vip_info"]["entrance_v2"] = {
                title: "我的盐选会员",
                sub_title: "畅享 10w+ 优质内容",
                jump_url: "zhihu://vip/my",
                button_text: "查看权益",
              };
              response = { body: JSON.stringify(obj) };
            }
          } else {
            magicJS.logWarning(`没有获取到本次登录用户信息，如未对功能造成影响，请忽略此日志。`);
          }
        } catch (err) {
          magicJS.logError(`知乎获取当前用户信息出现异常：${err}`);
        }
        break;
      // 去除MCN信息
      case /^https?:\/\/api\.zhihu\.com\/people\/((?!self).)*$/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          // 删除MCN信息
          delete obj["mcn_user_info"];
          response = { body: JSON.stringify(obj) };
          // 如已是黑名单用户，但不在脚本黑名单中，则自动加入
          if (obj.name && obj.id && obj.is_blocking === true) {
            let userInfo = GetUserInfo();
            let customBlockedUsers = magicJS.read(blockedUsersKey, userInfo.id);
            customBlockedUsers = typeof customBlockedUsers === "object" && !!customBlockedUsers ? customBlockedUsers : {};
            if (!customBlockedUsers[obj.name]) {
              magicJS.logDebug(`当前需要加入黑名单的用户Id：${obj["id"]}，用户名：${obj["name"]}`);
              customBlockedUsers[obj["name"]] = obj["id"];
              magicJS.write(blockedUsersKey, customBlockedUsers, userInfo.id);
              magicJS.logInfo(`${obj["name"]}写入脚本黑名单成功，当前脚本黑名单数据：${JSON.stringify(customBlockedUsers)}`);
              magicJS.notify(`已自动将用户“${obj["name"]}”写入脚本黑名单。`);
            }
          }
        } catch (err) {
          magicJS.logError(`知乎去除MCN信息出现异常：${err}`);
        }
        break;
      // 推荐去广告与黑名单增强
      case /^https:\/\/api\.zhihu\.com\/topstory\/recommend\?/.test(magicJS.request.url):
        try {
          let user_info = GetUserInfo();
          let customBlockedUsers = magicJS.read(blockedUsersKey, user_info.id);
          let keywords = magicJS.read(keywordBlockKey, user_info.id);
          customBlockedUsers = !!customBlockedUsers ? customBlockedUsers : {};
          keywords = !!keywords ? keywords : [];
          let obj = JSON.parse(magicJS.response.body);
          let data = obj["data"].filter((element) => {
            // 修正由于JS number类型精度问题，导致JSON.parse精度丢失，引起视频无法自动播放的问题
            if (element.hasOwnProperty("extra") && element["extra"].hasOwnProperty("type") && element["extra"]["type"] === "zvideo") {
              let video_id = element["common_card"]["feed_content"]["video"]["customized_page_url"].match(/https?:\/\/www\.zhihu\.com\/zvideo\/serial\/\d+\?videoID=(\d*)/)[1];
              element["common_card"]["feed_content"]["video"]["id"] = video_id;
            }

            // 判断是否是“盐选推荐内容”
            function IsYanXuan(element) {
              let flag = false;
              if (element["common_card"]["footline"].hasOwnProperty("elements")) {
                for (let i = 0; i < element["common_card"]["footline"]["elements"].length; i++) {
                  let item = element["common_card"]["footline"]["elements"][i];
                  if (item.hasOwnProperty("icon") && item["icon"]["image_url"] == "https://pic2.zhimg.com/80/v2-c46fc8ec4c4e9ffc8f846ae0d8158a80_1440w.png") {
                    flag = true;
                    break;
                  }
                }
              }
              return flag;
            }

            // 判断内容是否匹配屏蔽关键字
            function IsKeywordBlock(element) {
              let flag = false;
              let elementStr = JSON.stringify(element);
              for (let i = 0; i < keywords.length; i++) {
                if (elementStr.indexOf(keywords[i]) >= 0) {
                  magicJS.logInfo(`\n内容：\n${element["common_card"]["feed_content"]["content"]["panel_text"]}\n匹配关键字：\n${keywords[i]}`);
                  magicJS.notifyDebug(`匹配关键字：${keywords[i]}\n内容：${element["common_card"]["feed_content"]["content"]["panel_text"]}`);
                  flag = true;
                  break;
                }
              }
              return flag;
            }

            let flag = !(
              element["card_type"] === "slot_event_card" ||
              element.hasOwnProperty("ad") ||
              // 取消以下两行注释，推荐列表拦截视频与直播
              // element["extra"]["type"] === "drama" ||
              // element["extra"]["type"] === "zvideo" ||
              // 取消以下注释，推荐列表拦截“盐选推荐”
              // IsYanXuan(element) ||
              // 注释下行，推荐列表关闭关键字屏蔽功能
              IsKeywordBlock(element)
            );
            try {
              if (flag === true && customBlockedUsers && element["common_card"]["feed_content"].hasOwnProperty("source_line") && element["common_card"]["feed_content"]["source_line"].hasOwnProperty("elements") && customBlockedUsers[element["common_card"]["feed_content"]["source_line"]["elements"][1]["text"]["panel_text"]]) {
                flag = false;
              }
            } catch (err) {}
            return flag;
          });
          obj["data"] = data;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          magicJS.logError(`知乎推荐列表去广告出现异常：${err}`);
        }
        break;
      // 关注列表去广告
      case /^https?:\/\/api\.zhihu\.com\/moments(\/|\?)?(recommend|action=|feed_type=)(?!\/people)/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          let user_info = GetUserInfo();
          let customBlockedUsers = magicJS.read(blockedUsersKey, user_info.id);
          customBlockedUsers = !!customBlockedUsers ? customBlockedUsers : {};
          let data = [];
          // 修正由于JS number类型精度问题，导致JSON.parse精度丢失，引起想法不存在的问题
          const targetIdFix = (element) => {
            if (element["target_type"] == "pin") {
              target_id = element["target"]["url"].match(/https?:\/\/www\.zhihu\.com\/pin\/(\d*)/)[1];
              element["target"]["id"] = target_id;
              // 转发的想法处理
              if (!!element["target"]["origin_pin"] && element["target"]["origin_pin"].hasOwnProperty("url")) {
                origin_target_id = element["target"]["origin_pin"]["url"].match(/https?:\/\/www\.zhihu\.com\/pin\/(\d*)/)[1];
                element["target"]["origin_pin"]["id"] = origin_target_id;
              }
            }
            // 动态折叠处理
            else if (element["type"] == "moments_group") {
              let momentsGroupList = [];
              for (let j = 0; j < element["list"].length; j++) {
                momentsGroupList.push(targetIdFix(element["list"][j]));
              }
              element["list"] = momentsGroupList;
            }
            return element;
          };
          for (let i = 0; i < obj["data"].length; i++) {
            let element = targetIdFix(obj["data"][i]);
            if (!element["ad"]) {
              // 判断转发的想法是否含有黑名单用户
              if (element.target.origin_pin && element.target.origin_pin.author && customBlockedUsers[element.target.origin_pin.author.name]) {
                magicJS.notifyDebug(`屏蔽“${element.target.author.name}”转发黑名单用户“${element.target.origin_pin.author.name}”的想法。`);
              } else {
                data.push(element);
              }
            }
          }
          obj["data"] = data;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          magicJS.logError(`知乎关注列表去广告出现异常：${err}`);
        }
        break;
      // 回答列表去广告与黑名单增强
      case /^https?:\/\/api\.zhihu\.com\/v4\/questions/.test(magicJS.request.url):
        try {
          let userInfo = GetUserInfo();
          let customBlockedUsers = magicJS.read(blockedUsersKey, userInfo.id);
          customBlockedUsers = !!customBlockedUsers ? customBlockedUsers : {};
          let obj = JSON.parse(magicJS.response.body);
          magicJS.logDebug(`当前黑名单列表: ${JSON.stringify(customBlockedUsers)}`);
          delete obj["ad_info"];
          delete obj["roundtable_info"];
          let data = obj["data"].filter((element) => {
            return !customBlockedUsers[element["author"]["name"]];
          });
          obj["data"] = data;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          magicJS.logError(`知乎回答列表去广告出现异常：${err}`);
        }
        break;
      // 拦截官方账号推广消息
      case /^https?:\/\/api\.zhihu\.com\/notifications\/v3\/timeline\/entry\/system_message/.test(magicJS.request.url):
        try {
          const sysmsg_blacklist = ["知乎小伙伴", "知乎视频", "知乎团队", "知乎礼券", "知乎读书会团队"];
          let obj = JSON.parse(magicJS.response.body);
          let data = obj["data"].filter((element) => {
            return sysmsg_blacklist.indexOf(element["content"]["title"]) < 0;
          });
          obj["data"] = data;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          magicJS.logError(`知乎拦截官方账号推广消息出现异常：${err}`);
        }
        break;
      // 屏蔽官方营销消息
      case /^https?:\/\/api\.zhihu\.com\/notifications\/v3\/message/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          let newItems = [];
          for (let item of obj["data"]) {
            if (item["detail_title"] === "官方帐号消息") {
              let unread_count = item["unread_count"];
              if (unread_count > 0) {
                item["content"]["text"] = "未读消息" + unread_count + "条";
              } else {
                item["content"]["text"] = "全部消息已读";
              }
              item["is_read"] = true;
              item["unread_count"] = 0;
              newItems.push(item);
            } else if (item["detail_title"] !== "知乎活动助手") {
              newItems.push(item);
            }
          }
          obj["data"] = newItems;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          magicJS.logError(`知乎屏蔽官方营销消息出现异常：${err}`);
        }
        break;
      // 黑名单管理
      case /^https?:\/\/api\.zhihu\.com\/settings\/blocked_users/.test(magicJS.request.url):
        let userInfo = GetUserInfo();
        let defaultBlockedUsers = {};
        let customBlockedUsers = magicJS.read(blockedUsersKey, userInfo.id);
        customBlockedUsers = typeof customBlockedUsers === "object" && !!customBlockedUsers ? customBlockedUsers : {};
        defaultAnswerBlockedUsers.forEach((element) => {
          customBlockedUsers[element] = "00000000000000000000000000000000";
          defaultBlockedUsers[element] = "00000000000000000000000000000000";
        });
        magicJS.logInfo(`当前用户id：${userInfo.id}，脚本黑名单：${JSON.stringify(customBlockedUsers)}`);
        // 获取黑名单
        if (magicJS.request.method == "GET") {
          try {
            // 加载黑名单首页时，清空历史黑名单，仅保留脚本默认黑名单
            if (magicJS.request.url.indexOf("offset") < 0) {
              customBlockedUsers = defaultBlockedUsers;
              magicJS.logInfo("脚本黑名单已清空，请滑动至黑名单末尾保证重新获取完成。");
              magicJS.notify("脚本黑名单已清空，请滑动至黑名单末尾保证重新获取完成。");
            }
            let obj = JSON.parse(magicJS.response.body);
            if (!!obj["data"]) {
              magicJS.logDebug(`本次滑动获取的黑名单信息：${JSON.stringify(obj["data"])}`);
              obj["data"].forEach((element) => {
                if (element["name"] != "[已重置]") {
                  customBlockedUsers[element["name"]] = element["id"];
                }
              });
              magicJS.write(blockedUsersKey, customBlockedUsers, userInfo.id);
              if (obj["paging"]["is_end"] == true) {
                magicJS.notify(`获取脚本黑名单结束，当前黑名单共${Object.keys(customBlockedUsers).length - defaultAnswerBlockedUsers.length}人。\n脚本内置黑名单${defaultAnswerBlockedUsers.length}人。`);
                magicJS.logInfo(`脚本黑名单内容：${JSON.stringify(customBlockedUsers)}。`);
              }
            } else {
              magicJS.logWarning(`获取黑名单失败，接口响应不合法：${magicJS.response.body}`);
            }
          } catch (err) {
            magicJS.del(blockedUsersKey);
            magicJS.logError(`获取黑名单失败，异常信息：${err}`);
            magicJS.notify("获取黑名单失败，执行异常，已清空黑名单。");
          }
        }
        // 写入黑名单
        else if (magicJS.request.method == "POST") {
          try {
            let obj = JSON.parse(magicJS.response.body);
            if (obj.hasOwnProperty("name") && obj.hasOwnProperty("id")) {
              magicJS.logDebug(`当前需要加入黑名单的用户Id：${obj["id"]}，用户名：${obj["name"]}`);
              if (obj["id"]) {
                customBlockedUsers[obj["name"]] = obj["id"];
                magicJS.write(blockedUsersKey, customBlockedUsers, userInfo.id);
                magicJS.logInfo(`${obj["name"]}写入脚本黑名单成功，当前脚本黑名单数据：${JSON.stringify(customBlockedUsers)}`);
                magicJS.notify(`已将用户“${obj["name"]}”写入脚本黑名单。`);
              } else {
                magicJS.logError(`${obj["name"]}写入脚本黑名单失败，没有获取到用户Id。`);
                magicJS.notify(`将用户“${obj["name"]}”写入脚本黑名单失败！`);
              }
            } else {
              magicJS.logWarning(`写入黑名单失败，接口响应不合法：${magicJS.response.body}`);
              magicJS.notify("写入脚本黑名单失败，接口返回不合法。");
            }
          } catch (err) {
            magicJS.logError(`写入黑名单失败，异常信息：${err}`);
            magicJS.notify("写入脚本黑名单失败，执行异常，请查阅日志。");
          }
        }
        // 移出黑名单
        else if (magicJS.request.method == "DELETE") {
          try {
            let obj = JSON.parse(magicJS.response.body);
            if (obj.success) {
              let user_id = magicJS.request.url.match(/https?:\/\/api\.zhihu\.com\/settings\/blocked_users\/([0-9a-zA-Z]*)/)[1];
              if (user_id) {
                magicJS.logDebug(`当前需要移出黑名单的用户Id：${user_id}`);
                for (let username in customBlockedUsers) {
                  if (customBlockedUsers[username] == user_id) {
                    delete customBlockedUsers[username];
                    magicJS.write(blockedUsersKey, customBlockedUsers, userInfo.id);
                    magicJS.logInfo(`${username}移出脚本黑名单成功，当前脚本黑名单数据：${JSON.stringify(customBlockedUsers)}`);
                    magicJS.notify(`已将用户“${username}”移出脚本黑名单！`);
                    break;
                  }
                }
              } else {
                magicJS.logError("将用户移出脚本黑名单失败！\n建议从设置中刷新黑名单数据。");
                magicJS.notify(`将用户移出脚本黑名单失败，没有获取到用户Id。\n建议从设置中刷新黑名单数据。`);
              }
            } else {
              magicJS.logWarning(`移出黑名单失败，接口响应不合法：${magicJS.response.body}`);
              magicJS.notify("移出脚本黑名单失败，接口返回不合法。");
            }
          } catch (err) {
            magicJS.logError(`移出黑名单失败，异常信息：${err}`);
            magicJS.notify("移出脚本黑名单失败，执行异常，请查阅日志。");
          }
        }
        break;
      // 去除预置关键字广告
      case /^https?:\/\/api\.zhihu\.com\/search\/preset_words\?/.test(magicJS.request.url):
        try {
          if (!!magicJS.response.body) {
            magicJS.logDebug(`预置关键字返回：${magicJS.response.body}`);
            let obj = JSON.parse(magicJS.response.body);
            if (obj.hasOwnProperty("preset_words") && obj["preset_words"]["words"]) {
              let words = obj["preset_words"]["words"].filter((element) => {
                return element["type"] !== "ad";
              });
              obj["preset_words"]["words"] = words;
              response = { body: JSON.stringify(obj) };
            }
          }
        } catch (err) {
          magicJS.logError(`知乎去除预置关键字广告出现异常：${err}`);
        }
        break;
      // 优化知乎软件配置
      case /^https?:\/\/appcloud2\.zhihu\.com\/v\d+\/config/.test(magicJS.request.url):
        try {
          if (!!magicJS.response.body) {
            let obj = JSON.parse(magicJS.response.body);
            let tab_infos = obj["config"]["homepage_feed_tab"]["tab_infos"].filter((e) => {
              if (e.tab_type === "activity_tab") {
                e.end_time = (Date.parse(new Date()) - 120000).toString().substr(0, 10);
                return true;
              } else {
                return false;
              }
            });
            obj["config"]["homepage_feed_tab"]["tab_infos"] = tab_infos;
            obj["config"]["zvideo_max_number"] = 1;
            response = { body: JSON.stringify(obj) };
          }
        } catch (err) {
          magicJS.logError(`优化知乎软件配置出现异常：${err}`);
        }
        break;
      // 知乎热搜去广告
      case /^https?:\/\/api\.zhihu\.com\/search\/top_search\/tabs\/hot\/items/.test(magicJS.request.url):
        try {
          if (!!magicJS.response.body) {
            let obj = JSON.parse(magicJS.response.body);
            obj["commercial_data"] = [];
            response = { body: JSON.stringify(obj) };
          }
        } catch (err) {
          magicJS.logError(`去除知乎热搜广告出现异常：${err}`);
        }
        break;
      // 知乎热榜去广告
      case /^https?:\/\/api\.zhihu\.com\/topstory\/hot-lists?(\?|\/)/.test(magicJS.request.url):
        try {
          if (!!magicJS.response.body) {
            let obj = JSON.parse(magicJS.response.body);
            let data = obj["data"].filter((e) => {
              return e["type"] === "hot_list_feed" || e["type"] === "hot_list_feed_video";
            });
            obj["data"] = data;
            response = { body: JSON.stringify(obj) };
          }
        } catch (err) {
          magicJS.logError(`去除知乎热搜广告出现异常：${err}`);
        }
        break;
      // 知乎V5版本评论去广告及黑名单增强
      case /^https?:\/\/api\.zhihu\.com\/comment_v5\/(answers|pins|comments?|articles)\/\d+\/(root|child)_comment/.test(magicJS.request.url):
        try {
          if (!!magicJS.response.body) {
            let obj = JSON.parse(magicJS.response.body);
            obj["ad_info"] = {};
            // 屏蔽黑名单用户
            let user_info = GetUserInfo();
            let customBlockedUsers = magicJS.read(blockedUsersKey, user_info.id);
            customBlockedUsers = !!customBlockedUsers ? customBlockedUsers : {};
            let newComments = [];
            let blockCommentIdObj = {};
            obj.data.forEach((comment) => {
              // 评论人昵称
              let commentUserName = comment.author.name;
              // 回复哪个人的评论(仅适用于独立子评论页面请求)
              let replyUserName = "";
              if (comment.reply_to_author && comment.reply_to_author && comment.reply_to_author.name) {
                replyUserName = comment.reply_to_author.name;
              }
              if (customBlockedUsers[commentUserName] || customBlockedUsers[replyUserName]) {
                if (customBlockedUsers[commentUserName] && !replyUserName && magicJS.request.url.indexOf("root_comment") > 0) {
                  magicJS.notifyDebug(`屏蔽黑名单用户“${commentUserName}”的主评论。`);
                } else if (customBlockedUsers[commentUserName] && !replyUserName && magicJS.request.url.indexOf("child_comment") > 0) {
                  magicJS.notifyDebug(`屏蔽黑名单用户“${commentUserName}”的子评论。`);
                } else if (customBlockedUsers[commentUserName] && replyUserName && magicJS.request.url.indexOf("child_comment") > 0) {
                  magicJS.notifyDebug(`屏蔽黑名单用户“${commentUserName}”回复“${replyUserName}”的子评论。`);
                } else {
                  magicJS.notifyDebug(`屏蔽“${commentUserName}”回复黑名单用户“${replyUserName}”的子评论。`);
                }
                blockCommentIdObj[comment.id] = commentUserName;
                // 主评论数量-1，仅适用于root_comment主评论页面请求
                if (obj.counts && obj.counts.total_counts) {
                  obj.counts.total_counts -= 1;
                }
                // 子评论数量-1，仅适用于child_comment子评论页面请求
                if (obj.paging && obj.paging.totals) {
                  obj.paging.totals -= 1;
                }
                if (obj.root && obj.root.child_comment_count) {
                  obj.root.child_comment_count -= 1;
                }
              } else {
                if (comment.child_comments) {
                  let newChildComments = [];
                  comment.child_comments.forEach((childComment) => {
                    let childCommentUserName = childComment.author.name;
                    if (customBlockedUsers[childCommentUserName] || blockCommentIdObj[childComment.reply_comment_id]) {
                      if (customBlockedUsers[childCommentUserName]) {
                        magicJS.notifyDebug(`屏蔽黑名单用户“${childCommentUserName}”的子评论。`);
                        blockCommentIdObj[childComment.id] = childCommentUserName;
                      } else {
                        magicJS.notifyDebug(`屏蔽“${childCommentUserName}”回复黑名单用户“${blockCommentIdObj[childComment.reply_comment_id]}”的子评论。`);
                      }
                      comment.child_comment_count -= 1;
                    } else {
                      newChildComments.push(childComment);
                    }
                  });
                  comment.child_comments = newChildComments;
                }
                newComments.push(comment);
              }
            });
            obj.data = newComments;
            response = { body: JSON.stringify(obj) };
          }
        } catch (err) {
          magicJS.logError(`去除知乎评论广告出现异常：${err}`);
        }
        break;
      // 知乎旧版回答中的评论黑名单增强
      case /^https?:\/\/api\.zhihu\.com\/(answers|pins|comments?|articles)\/\d+\/(root|child)_comments/.test(magicJS.request.url):
        try {
          if (!!magicJS.response.body) {
            // 评论区去广告
            let obj = JSON.parse(magicJS.response.body);
            // 屏蔽黑名单用户
            let user_info = GetUserInfo();
            let customBlockedUsers = magicJS.read(blockedUsersKey, user_info.id);
            let newData = [];
            obj.data.forEach((comment) => {
              // 评论人昵称
              let commentUserName = comment.author.member.name;
              // 回复哪个人的评论(仅适用于独立子评论页面请求)
              let replyUserName = "";
              if (comment.reply_to_author && comment.reply_to_author.member && comment.reply_to_author.member.name) {
                replyUserName = comment.reply_to_author.member.name;
              }
              if (customBlockedUsers[commentUserName] || customBlockedUsers[replyUserName]) {
                if (customBlockedUsers[commentUserName] && !replyUserName && magicJS.request.url.indexOf("root_comment") > 0) {
                  magicJS.notifyDebug(`屏蔽黑名单用户“${commentUserName}”的主评论。`);
                } else if (customBlockedUsers[commentUserName] && !replyUserName && magicJS.request.url.indexOf("child_comment") > 0) {
                  magicJS.notifyDebug(`屏蔽黑名单用户“${commentUserName}”的子评论。`);
                } else if (customBlockedUsers[commentUserName] && replyUserName && magicJS.request.url.indexOf("child_comment") > 0) {
                  magicJS.notifyDebug(`屏蔽黑名单用户“${commentUserName}”回复“${replyUserName}”的子评论。`);
                } else {
                  magicJS.notifyDebug(`屏蔽“${commentUserName}”回复黑名单用户“${replyUserName}”的子评论。`);
                }
                // 减少主评论页面中的评论总数(仅适用于独立的主评论页面请求)
                if (obj.common_counts) {
                  obj.common_counts -= 1;
                }
                // 减少子评论页面中的评论总数(仅适用于独立子评论页面请求)
                if (obj.paging && obj.paging.totals) {
                  obj.paging.totals -= 1;
                }
              } else {
                // 屏蔽子评论中的黑名单用户(仅适用于独立的主评论页面请求)
                if (comment.child_comments) {
                  let newChildComments = [];
                  comment.child_comments.forEach((childComment) => {
                    if (customBlockedUsers[childComment.author.member.name] || customBlockedUsers[childComment.reply_to_author.member.name]) {
                      if (customBlockedUsers[childComment.author.member.name]) {
                        magicJS.notifyDebug(`屏蔽黑名单用户“${childComment.author.member.name}”的主评论。`);
                      } else {
                        magicJS.notifyDebug(`屏蔽“${childComment.author.member.name}”回复黑名单用户“${childComment.reply_to_author.member.name}”的子评论。`);
                      }
                      comment.child_comment_count -= 1;
                    } else {
                      newChildComments.push(childComment);
                    }
                  });
                  comment.child_comments = newChildComments;
                }
                newData.push(comment);
              }
            });
            obj.data = newData;
            response = { body: JSON.stringify(obj) };
          }
        } catch (err) {
          magicJS.logError(`去除知乎评论广告出现异常：${err}`);
        }
        break;
      default:
        magicJS.logWarning("触发意外的请求处理，请确认脚本或复写配置正常。");
        break;
    }
  } else if (magicJS.isRequest) {
    // 知乎屏蔽关键词解锁
    if (/^https?:\/\/api\.zhihu\.com\/feed-root\/block/.test(magicJS.request.url) === true) {
      try {
        let userInfo = GetUserInfo();
        // 获取屏蔽关键词列表
        if (magicJS.request.method === "GET" && userInfo.is_vip !== true) {
          let keywords = magicJS.read(keywordBlockKey, userInfo.id);
          if (!keywords) {
            keywords = [];
          }
          let headers = {
            "Cache-Control": "no-cache, no-store, must-revalidate, private, max-age=0",
            "Connection": "keep-alive",
            "Content-Type": "application/json;charset=utf-8",
            "Pragma": "no-cache",
            "Referrer-Policy": "no-referrer-when-downgrade",
            "Server": "CLOUD ELB 1.0.0",
            "Vary": "Accept-Encoding",
            "X-Cache-Lookup": "Cache Miss",
            "x-cdn-provider": "tencent",
          };
          let body = JSON.stringify({
            success: true,
            is_vip: true,
            kw_min_length: 2,
            kw_max_length: 15,
            kw_max_count: keywordMaxCount,
            data: keywords,
          });
          if (magicJS.isQuanX) {
            response = { body: body, headers: headers, status: "HTTP/1.1 200 OK" };
          } else {
            response = { response: { body: body, headers: headers, status: 200 } };
          }
          magicJS.logDebug(`获取屏蔽关键词：${keywords.join("、")}`);
        }
        // 添加屏蔽关键词
        else if (magicJS.request.method === "POST" && userInfo.is_vip !== true) {
          if (!!magicJS.request.body) {
            // 构造 response headers
            let headers = {
              "Cache-Control": "no-cache, no-store, must-revalidate, private, max-age=0",
              "Connection": "keep-alive",
              "Content-Type": "application/json;charset=utf-8",
              "Pragma": "no-cache",
              "Referrer-Policy": "no-referrer-when-downgrade",
              "Server": "CLOUD ELB 1.0.0",
              "Vary": "Accept-Encoding",
              "X-Cache-Lookup": "Cache Miss",
              "x-cdn-provider": "tencent",
            };
            // 读取关键词
            let keyword = decodeURIComponent(magicJS.request.body).match(/keyword=(.*)/)[1];
            let keywords = magicJS.read(keywordBlockKey, userInfo.id);
            if (!keywords) {
              keywords = [];
            }
            // 判断关键词是否存在
            let keywordExists = false;
            for (let i = 0; i < keywords.length; i++) {
              if (keyword === keywords[i]) {
                keywordExists = true;
              }
            }
            // 不存在添加，存在返回异常
            if (keywordExists === false) {
              keywords.push(keyword);
              magicJS.write(keywordBlockKey, keywords, userInfo.id);
              let body = JSON.stringify({ success: true });
              if (magicJS.isQuanX) {
                response = { body: body, headers: headers, status: "HTTP/1.1 200 OK" };
              } else {
                response = { response: { body: body, headers: headers, status: 200 } };
              }
              magicJS.logInfo(`使用本地脚本添加关键词：${keyword}`);
            } else {
              let body = JSON.stringify({
                error: {
                  message: "关键词已存在",
                  code: 100002,
                },
              });
              if (magicJS.isQuanX) {
                response = {
                  body: body,
                  headers: headers,
                  status: "HTTP/1.1 400 Bad Request",
                };
              } else {
                response = { response: { body: body, headers: headers, status: 400 } };
              }
            }
          }
        }
        // 删除屏蔽关键词
        else if (magicJS.request.method === "DELETE" && userInfo.is_vip !== true) {
          let keyword = decodeURIComponent(magicJS.request.url).match(/keyword=(.*)/)[1];
          let keywords = magicJS.read(keywordBlockKey, userInfo.id);
          if (!keywords) {
            keywords = [];
          }
          keywords = keywords.filter((e) => {
            return e != keyword;
          });
          magicJS.write(keywordBlockKey, keywords, userInfo.id);
          let headers = {
            "Cache-Control": "no-cache, no-store, must-revalidate, private, max-age=0",
            "Connection": "keep-alive",
            "Content-Type": "application/json;charset=utf-8",
            "Pragma": "no-cache",
            "Referrer-Policy": "no-referrer-when-downgrade",
            "Server": "CLOUD ELB 1.0.0",
            "Vary": "Accept-Encoding",
            "X-Cache-Lookup": "Cache Miss",
            "x-cdn-provider": "tencent",
          };
          let body = JSON.stringify({ success: true });
          if (magicJS.isQuanX) {
            response = { body: body, headers: headers, status: "HTTP/1.1 200 OK" };
          } else {
            response = { response: { body: body, headers: headers, status: 200 } };
          }
          magicJS.logInfo(`使用本地脚本删除关键词：${keyword}`);
        }
      } catch (err) {
        magicJS.logError(`知乎关键词屏蔽操作出现异常：${err}`);
      }
    }
  } else {
    magicJS.write(currentUserInfoKey, "");
    magicJS.write(blockedUsersKey, "");
    magicJS.write(keywordBlockKey, "");
    magicJS.notify("知乎助手数据清理完毕");
  }
  if (response) {
    magicJS.done(response);
  } else {
    magicJS.done();
  }
})();

function GetUserInfo() {
  let defaultUserInfo = { id: "default", is_vip: false };
  try {
    let userInfo = magicJS.read(currentUserInfoKey);
    if (typeof userInfo === "string") userInfo = JSON.parse(userInfo);
    if (!!userInfo && userInfo.hasOwnProperty("id")) {
      return userInfo;
    } else {
      return defaultUserInfo;
    }
  } catch (err) {
    magicJS.logError(`获取用户信息出现异常：${err}`);
    return defaultUserInfo;
  }
}

// prettier-ignore
function MagicJS(scriptName="MagicJS",logLevel="INFO"){return new class{constructor(){if(this.version="2.2.3.3",this.scriptName=scriptName,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=logLevel,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(err){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(url){this._barkUrl=url.replace(/\/+$/g,"")}set logLevel(level){this._logLevel="string"==typeof level?level.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"!=typeof $request?$request:void 0}get response(){return"undefined"!=typeof $response?($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response):void 0}get platform(){return this.isSurge?"Surge":this.isQuanX?"Quantumult X":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"Unknown"}read(key,session=""){let val="";this.isSurge||this.isLoon?val=$persistentStore.read(key):this.isQuanX?val=$prefs.valueForKey(key):this.isNode?val=this.node.data:this.isJSBox&&(val=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(val=val[key]),this.isJSBox&&(val=JSON.parse(val)[key]),session&&("string"==typeof val&&(val=JSON.parse(val)),val=val&&"object"==typeof val?val[session]:null)}catch(err){this.logError(err),val=session?{}:null,this.del(key)}void 0===val&&(val=null);try{val&&"string"==typeof val&&(val=JSON.parse(val))}catch(err){}return this.logDebug(`READ DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`),val}write(key,val,session=""){let data=session?{}:"";if(session&&(this.isSurge||this.isLoon)?data=$persistentStore.read(key):session&&this.isQuanX?data=$prefs.valueForKey(key):this.isNode?data=this.node.data:this.isJSBox&&(data=JSON.parse($file.read("drive://MagicJS/magic.json").string)),session){try{"string"==typeof data&&(data=JSON.parse(data)),data="object"==typeof data&&data?data:{}}catch(err){this.logError(err),this.del(key),data={}}this.isJSBox||this.isNode?(data[key]&&"object"==typeof data[key]||(data[key]={}),data[key].hasOwnProperty(session)||(data[key][session]=null),void 0===val?delete data[key][session]:data[key][session]=val):void 0===val?delete data[session]:data[session]=val}else this.isNode||this.isJSBox?void 0===val?delete data[key]:data[key]=val:data=void 0===val?null:val;"object"==typeof data&&(data=JSON.stringify(data)),this.isSurge||this.isLoon?$persistentStore.write(data,key):this.isQuanX?$prefs.setValueForKey(data,key):this.isNode?this.node.fs.writeFileSync("./magic.json",data):this.isJSBox&&$file.write({data:$data({string:data}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`)}del(key,session=""){this.logDebug(`DELETE KEY [${key}]${session?`[${session}]`:""}`),this.write(key,null,session)}notify(title=this.scriptName,subTitle="",body="",opts=""){let convertOptions;if(opts=(_opts=>{let newOpts={};return"string"==typeof _opts?this.isLoon?newOpts={openUrl:_opts}:this.isQuanX&&(newOpts={"open-url":_opts}):"object"==typeof _opts&&(this.isLoon?(newOpts.openUrl=_opts["open-url"]?_opts["open-url"]:"",newOpts.mediaUrl=_opts["media-url"]?_opts["media-url"]:""):this.isQuanX&&(newOpts=_opts["open-url"]||_opts["media-url"]?_opts:{})),newOpts})(opts),1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.logNotify(`title:${title}\nsubTitle:${subTitle}\nbody:${body}\noptions:${"object"==typeof opts?JSON.stringify(opts):opts}`),this.isSurge)$notification.post(title,subTitle,body);else if(this.isLoon)opts?$notification.post(title,subTitle,body,opts):$notification.post(title,subTitle,body);else if(this.isQuanX)$notify(title,subTitle,body,opts);else if(this.isNode){if(this._barkUrl){let content=encodeURI(`${title}/${subTitle}\n${body}`);this.get(`${this._barkUrl}/${content}`,()=>{})}}else if(this.isJSBox){let push={title:title,body:subTitle?`${subTitle}\n${body}`:body};$push.schedule(push)}}notifyDebug(title=this.scriptName,subTitle="",body="",opts=""){"DEBUG"===this.logLevel&&(1==arguments.length&&(title=this.scriptName,subTitle="",body=arguments[0]),this.notify(title=title,subTitle=subTitle,body=body,opts=opts))}log(msg,level="INFO"){this.logLevels[this._logLevel]<this.logLevels[level.toUpperCase()]||console.log(`[${level}] [${this.scriptName}]\n${msg}\n`)}logDebug(msg){this.log(msg,"DEBUG")}logInfo(msg){this.log(msg,"INFO")}logNotify(msg){this.log(msg,"NOTIFY")}logWarning(msg){this.log(msg,"WARNING")}logError(msg){this.log(msg,"ERROR")}logRetry(msg){this.log(msg,"RETRY")}adapterHttpOptions(options,method){let _options="object"==typeof options?Object.assign({},options):{url:options,headers:{}};_options.hasOwnProperty("header")&&!_options.hasOwnProperty("headers")&&(_options.headers=_options.header,delete _options.header);const headersMap={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};if("object"==typeof _options.headers)for(let key in _options.headers)headersMap[key]&&(_options.headers[headersMap[key]]=_options.headers[key],delete _options.headers[key]);_options.headers&&"object"==typeof _options.headers&&_options.headers["User-Agent"]||(_options.headers&&"object"==typeof _options.headers||(_options.headers={}),this.isNode?_options.headers["User-Agent"]=this.pcUserAgent:_options.headers["User-Agent"]=this.iOSUserAgent);let skipScripting=!1;if(("object"==typeof _options.opts&&(!0===_options.opts.hints||!0===_options.opts["Skip-Scripting"])||"object"==typeof _options.headers&&!0===_options.headers["X-Surge-Skip-Scripting"])&&(skipScripting=!0),skipScripting||(this.isSurge?_options.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?_options.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof _options.opts&&(_options.opts={}),_options.opts.hints=!1)),this.isSurge&&!skipScripting||delete _options.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts,this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts["Skip-Scripting"],"GET"===method&&!this.isNode&&_options.body){let qs=Object.keys(_options.body).map(key=>void 0===_options.body?"":`${encodeURIComponent(key)}=${encodeURIComponent(_options.body[key])}`).join("&");_options.url.indexOf("?")<0&&(_options.url+="?"),_options.url.lastIndexOf("&")+1!=_options.url.length&&_options.url.lastIndexOf("?")+1!=_options.url.length&&(_options.url+="&"),_options.url+=qs,delete _options.body}return this.isQuanX?(_options.hasOwnProperty("body")&&"string"!=typeof _options.body&&(_options.body=JSON.stringify(_options.body)),_options.method=method):this.isNode?(delete _options.headers["Accept-Encoding"],"object"==typeof _options.body&&("GET"===method?(_options.qs=_options.body,delete _options.body):"POST"===method&&(_options.json=!0,_options.body=_options.body))):this.isJSBox&&(_options.header=_options.headers,delete _options.headers),_options}adapterHttpResponse(resp){let _resp={body:resp.body,headers:resp.headers,json:()=>JSON.parse(_resp.body)};return resp.hasOwnProperty("statusCode")&&resp.statusCode&&(_resp.status=resp.statusCode),_resp}get(options,callback){let _options=this.adapterHttpOptions(options,"GET");this.logDebug(`HTTP GET: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon?$httpClient.get(_options,callback):this.isQuanX?$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>callback(reason.error,null,null)):this.isNode?this.node.request.get(_options,(err,resp,data)=>{resp=this.adapterHttpResponse(resp),callback(err,resp,data)}):this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.get(_options))}getPromise(options){return new Promise((resolve,reject)=>{magicJS.get(options,(err,resp)=>{err?reject(err):resolve(resp)})})}post(options,callback){let _options=this.adapterHttpOptions(options,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(_options)}`),this.isSurge||this.isLoon)$httpClient.post(_options,callback);else if(this.isQuanX)$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>{callback(reason.error,null,null)});else if(this.isNode){let resp=this.node.request.post(_options,callback);resp.status=resp.statusCode,delete resp.statusCode}else this.isJSBox&&(_options.handler=resp=>{let err=resp.error?JSON.stringify(resp.error):void 0,data="object"==typeof resp.data?JSON.stringify(resp.data):resp.data;callback(err,resp.response,data)},$http.post(_options))}get http(){return{get:this.getPromise,post:this.post}}done(value={}){"undefined"!=typeof $done&&$done(value)}isToday(day){if(null==day)return!1;{let today=new Date;return"string"==typeof day&&(day=new Date(day)),today.getFullYear()==day.getFullYear()&&today.getMonth()==day.getMonth()&&today.getDay()==day.getDay()}}isNumber(val){return"NaN"!==parseFloat(val).toString()}attempt(promise,defaultValue=null){return promise.then(args=>[null,args]).catch(ex=>(this.logError(ex),[ex,defaultValue]))}retry(fn,retries=5,interval=0,callback=null){return(...args)=>new Promise((resolve,reject)=>{function _retry(...args){Promise.resolve().then(()=>fn.apply(this,args)).then(result=>{"function"==typeof callback?Promise.resolve().then(()=>callback(result)).then(()=>{resolve(result)}).catch(ex=>{retries>=1?interval>0?setTimeout(()=>_retry.apply(this,args),interval):_retry.apply(this,args):reject(ex),retries--}):resolve(result)}).catch(ex=>{this.logRetry(ex),retries>=1&&interval>0?setTimeout(()=>_retry.apply(this,args),interval):retries>=1?_retry.apply(this,args):reject(ex),retries--})}_retry.apply(this,args)})}formatTime(time,fmt="yyyy-MM-dd hh:mm:ss"){var o={"M+":time.getMonth()+1,"d+":time.getDate(),"h+":time.getHours(),"m+":time.getMinutes(),"s+":time.getSeconds(),"q+":Math.floor((time.getMonth()+3)/3),S:time.getMilliseconds()};/(y+)/.test(fmt)&&(fmt=fmt.replace(RegExp.$1,(time.getFullYear()+"").substr(4-RegExp.$1.length)));for(let k in o)new RegExp("("+k+")").test(fmt)&&(fmt=fmt.replace(RegExp.$1,1==RegExp.$1.length?o[k]:("00"+o[k]).substr((""+o[k]).length)));return fmt}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(time){return new Promise(resolve=>setTimeout(resolve,time))}}(scriptName)}

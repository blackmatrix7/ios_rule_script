const scriptName = '知乎助手';
const blocked_users_key = 'zhihu_blocked_users';
const current_userinfo_key = 'zhihu_current_userinfo';
let magicJS = MagicJS(scriptName, "INFO");

async function main(){
  if (magicJS.isResponse){
    switch (true){
      // 回答内容优化
      case /^https?:\/\/www\.zhihu\.com\/appview\/v2\/answer\/.*(entry=(?!(preload-topstory|preload-search|preload-subscription)))?/.test(magicJS.request.url):
        try{
          let html = magicJS.response.body;
          // 付费内容提醒
          if ((html.indexOf('查看完整内容') >= 0 || html.indexOf('查看全部章节') >= 0) && html.indexOf('paid') >= 0){
            let matchStr = html.match(/(richText[^<]*>)(.)/)[1];
            let start = html.lastIndexOf(matchStr) + matchStr.length;
            let insertText = '<a style="height: 42px;padding: 0 12px;border-radius: 6px;background-color: rgb(247 104 104 / 8%);display: block;text-decoration: none;" href="https://github.com/blackmatrix7/ios_rule_script/blob/master/script/zhihu/README.md#知乎助手"><div style="color: #f36;display: flex;-webkit-box-align: center;align-items: center;height: 100%;"><svg style="width: 1.2em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1957"><path d="M821.333333 138.666667c64.8 0 117.333333 52.533333 117.333334 117.333333v149.333333a32 32 0 0 1-32 32 74.666667 74.666667 0 0 0 0 149.333334 32 32 0 0 1 32 32v149.333333c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V618.666667a32 32 0 0 1 32-32 74.666667 74.666667 0 0 0 0-149.333334 32 32 0 0 1-32-32V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666zM428.576 329.994667a32 32 0 0 0-43.733333-2.581334l-1.514667 1.344a32 32 0 0 0-2.581333 43.733334L452.565333 458.666667H405.333333l-1.877333 0.053333A32 32 0 0 0 373.333333 490.666667l0.053334 1.877333A32 32 0 0 0 405.333333 522.666667h80v42.666666H405.333333l-1.877333 0.053334A32 32 0 0 0 373.333333 597.333333l0.053334 1.877334A32 32 0 0 0 405.333333 629.333333h80v42.666667l0.053334 1.877333A32 32 0 0 0 517.333333 704l1.877334-0.053333A32 32 0 0 0 549.333333 672v-42.666667H618.666667l1.877333-0.053333A32 32 0 0 0 650.666667 597.333333l-0.053334-1.877333A32 32 0 0 0 618.666667 565.333333h-69.333334v-42.666666H618.666667l1.877333-0.053334A32 32 0 0 0 650.666667 490.666667l-0.053334-1.877334A32 32 0 0 0 618.666667 458.666667h-47.253334l71.84-86.186667 1.248-1.589333a32 32 0 0 0-50.421333-39.381334L512 430.016l-82.08-98.506667z" p-id="1958"></path></svg><div style="flex: 1 1;white-space: nowrap;text-overflow: ellipsis;padding-left:4px"><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;line-height: 20px;color: #f36;white-space: nowrap;font-weight: 600;">知乎助手 · 本文为付费内容</span></div><div><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #f36;line-height: normal;display: flex;-webkit-box-align: center;align-items: center;"><svg style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #f36;line-height: normal;fill: currentcolor;width: 24px;height: 24px;margin: -2px;" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg></span></div></div></a>'
            html = html.slice(0, start) + insertText + html.slice(start);
            magicJS.done({body: html});
          }
          // 营销推广提醒
          else if (html.indexOf('ad-link-card') >= 0 || html.indexOf('xg.zhihu.com') >= 0 || html.indexOf('知乎营销平台') >= 0 ){
            let matchStr = html.match(/(richText[^<]*>)(.)/)[1];
            let start = html.lastIndexOf(matchStr) + matchStr.length;
            let insertText = '<a style="height: 42px;padding: 0 12px;border-radius: 6px;background-color: rgb(8 188 212 / 8%);display: block;text-decoration: none;" href="https://github.com/blackmatrix7/ios_rule_script/blob/master/script/zhihu/README.md#知乎助手"><div style="color: #00bcd4;display: flex;-webkit-box-align: center;align-items: center;height: 100%;"><svg style="width: 1.2em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1957"><path d="M128 765.952q0 26.624 18.432 45.056t45.056 18.432l191.488 0 0 128-254.976 0q-26.624 0-49.664-10.24t-40.448-27.648-27.648-40.448-10.24-49.664l0-637.952q0-25.6 10.24-49.152t27.648-40.448 40.448-27.136 49.664-10.24l701.44 0q26.624 0 49.664 10.24t40.448 27.136 27.648 40.448 10.24 49.152l0 251.904-128 1.024 0-61.44q0-26.624-18.432-45.056t-45.056-18.432l-574.464 0q-26.624 0-45.056 18.432t-18.432 45.056l0 382.976zM990.208 705.536q21.504 18.432 22.016 34.304t-20.992 33.28q-21.504 18.432-51.2 41.472t-60.928 48.128-61.952 49.152-55.296 43.52q-26.624 20.48-43.52 15.36t-16.896-31.744q1.024-16.384 0-40.448t-1.024-41.472q0-19.456-10.752-24.064t-31.232-4.608q-21.504 0-39.936-0.512t-35.84-0.512-36.352-0.512-41.472-0.512q-9.216 0-19.968-2.048t-19.456-7.168-14.336-15.36-5.632-27.648l0-80.896q0-31.744 15.36-42.496t48.128-10.752q30.72 1.024 61.44 1.024t71.68 1.024q29.696 0 46.08-5.12t16.384-25.6q-1.024-14.336 0.512-35.328t1.536-37.376q0-26.624 14.336-33.28t36.864 10.752q22.528 18.432 52.736 43.008t61.952 50.688 62.976 51.2 54.784 44.544z" p-id="5859"></path></svg><div style="flex: 1 1;white-space: nowrap;text-overflow: ellipsis;padding-left:4px"><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;line-height: 20px;color: #00bcd4;white-space: nowrap;font-weight: 600;">知乎助手 · 本文含有营销推广</span></div><div><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #f36;line-height: normal;display: flex;-webkit-box-align: center;align-items: center;"><svg style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #00BCD4;line-height: normal;fill: currentcolor;width: 24px;height: 24px;margin: -2px;" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg></span></div></div></a>'
            html = html.slice(0, start) + insertText + html.slice(start);
            magicJS.done({body: html});
          }          
          // 购物推广提醒
          else if (html.indexOf('mcn-link-card') >= 0){
            let matchStr = html.match(/(richText[^<]*>)(.)/)[1];
            let start = html.lastIndexOf(matchStr) + matchStr.length;
            let insertText = '<a style="height: 42px;padding: 0 12px;border-radius: 6px;background-color: rgb(8 188 212 / 8%);display: block;text-decoration: none;" href="https://github.com/blackmatrix7/ios_rule_script/blob/master/script/zhihu/README.md#知乎助手"><div style="color: #00bcd4;display: flex;-webkit-box-align: center;align-items: center;height: 100%;"><svg style="width: 1.2em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1957"><path d="M346.112 806.912q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zM772.096 808.96q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM944.128 227.328q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832t-49.664 15.872l-35.84 0-65.536 0-86.016 0-96.256 0-253.952 0 14.336 92.16 517.12 0q49.152 0 49.152 41.984 0 20.48-9.728 35.328t-38.4 14.848l-49.152 0-94.208 0-118.784 0-119.808 0-99.328 0-55.296 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-13.312l21.504 0 21.504 0 25.6 0 34.816 0q20.48 0 32.768 6.144t19.456 15.36 10.24 19.456 5.12 17.408q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0zM867.328 194.56l-374.784 0 135.168-135.168q23.552-23.552 51.712-24.064t51.712 23.04z"></path></svg><div style="flex: 1 1;white-space: nowrap;text-overflow: ellipsis;padding-left:4px"><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;line-height: 20px;color: #00bcd4;white-space: nowrap;font-weight: 600;">知乎助手 · 本文含有购物推广</span></div><div><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #f36;line-height: normal;display: flex;-webkit-box-align: center;align-items: center;"><svg style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #00BCD4;line-height: normal;fill: currentcolor;width: 24px;height: 24px;margin: -2px;" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg></span></div></div></a>'
            html = html.slice(0, start) + insertText + html.slice(start);
            magicJS.done({body: html});
          }
          // 彩蛋
          else if (Math.floor(Math.random()*200) == 7){
            let matchStr = html.match(/(richText[^<]*>)(.)/)[1];
            let start = html.lastIndexOf(matchStr) + matchStr.length;
            let insertText = '<a style="height: 42px;padding: 0 12px;border-radius: 6px;background-color: rgb(74 162 56 / 8%);display: block;text-decoration: none;" href="https://github.com/blackmatrix7/ios_rule_script/blob/master/script/zhihu/README.md#知乎助手"><div style="color: #619201;display: flex;-webkit-box-align: center;align-items: center;height: 100%;"><svg class="icon" style="width: 1.2em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1465"><path d="M512 85.333333c71.477333 0 159.68 57.546667 229.258667 147.018667C817.845333 330.826667 864 455.978667 864 586.666667c0 211.808-148.501333 352-352 352S160 798.474667 160 586.666667c0-130.688 46.144-255.84 122.741333-354.314667C352.32 142.88 440.522667 85.333333 512 85.333333z m0 64c-48.213333 0-120.096 46.912-178.741333 122.314667C265.109333 359.253333 224 470.762667 224 586.666667c0 175.616 119.050667 288 288 288s288-112.384 288-288c0-115.904-41.109333-227.402667-109.258667-315.018667C632.096 196.234667 560.213333 149.333333 512 149.333333z m-74.666667 522.666667a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667z m-96-128a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z" p-id="1466"></path></svg><div style="flex: 1 1;white-space: nowrap;text-overflow: ellipsis;padding-left:4px"><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;line-height: 20px;color: #619201;white-space: nowrap;font-weight: 600;">知乎助手 · 本文为免费内容</span></div><div><span style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #619201;line-height: normal;display: flex;-webkit-box-align: center;align-items: center;"><svg style="font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-tap-highlight-color: rgba(26,26,26,0);font-size: 14px;color: #619201;line-height: normal;fill: currentcolor;width: 24px;height: 24px;margin: -2px;" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M9.218 16.78a.737.737 0 0 0 1.052 0l4.512-4.249a.758.758 0 0 0 0-1.063L10.27 7.22a.737.737 0 0 0-1.052 0 .759.759 0 0 0-.001 1.063L13 12l-3.782 3.716a.758.758 0 0 0 0 1.063z" fill-rule="evenodd"></path></svg></span></div></div></a>'
            html = html.slice(0, start) + insertText + html.slice(start);
            magicJS.done({body: html});
          }
          else{
            magicJS.done();
          }
          break;
        }
        catch(err){
          magicJS.logError(`知乎付费内容提醒出现异常：${err}`);
          magicJS.done();
        }
        break;
      // 获取当前用户信息
      case /^https:\/\/api\.zhihu\.com\/people\/self/.test(magicJS.request.url):
        try{
          let obj = JSON.parse(magicJS.response.body);
          let user_info = {
            id: obj['id'],
            is_vip: obj['vip_info']['is_vip']
          }
          magicJS.logDebug(`当前用户id：${obj['id']}，是否为VIP：${obj['vip_info']['is_vip']}`);
          magicJS.write(current_userinfo_key, user_info);
          magicJS.done();
        }
        catch(err){
          magicJS.logError(`知乎获取当前用户信息出现异常：${err}`);
          magicJS.done();
        }
        break;
      // 去除MCN信息
      case /^https?:\/\/api\.zhihu\.com\/people\/((?!self).)*$/.test(magicJS.request.url):
        try{
          let body = JSON.parse(magicJS.response.body);
          delete body['mcn_user_info'];
          body=JSON.stringify(body);
          magicJS.done({body});
        }
        catch(err){
          magicJS.logError(`知乎去除MCN信息出现异常：${err}`);
          magicJS.done();
        }
        break;
      // 推荐去广告与黑名单增强
      case /^https:\/\/api\.zhihu\.com\/topstory\/recommend\?/.test(magicJS.request.url):
        try{
          let user_info = GetUserInfo();
          let custom_blocked_users = magicJS.read(blocked_users_key, user_info.id);
          custom_blocked_users = !!custom_blocked_users ? custom_blocked_users : {};
          let body = JSON.parse(magicJS.response.body);
          let data = body['data'].filter((element) =>{
            return !(element['card_type'] === 'slot_event_card' || 
                     element['ad'] || 
                     element['extra']['type'] === 'drama' ||
                     // element['extra']['type'] == 'zvideo' || 
                     custom_blocked_users[element['common_card']['feed_content']['source_line']['elements'][1]['text']['panel_text']]
                    );
          });
          body['data'] = data;
          body=JSON.stringify(body);
          magicJS.done({body});
        }
        catch(err){
          magicJS.logError(`知乎推荐列表去广告出现异常：${err}`);
          magicJS.done();
        }
        break;
      // 关注列表去广告
      case /^https?:\/\/api\.zhihu\.com\/moments(\/|\?)?(recommend|action=|feed_type=)(?!\/people)/.test(magicJS.request.url):
        try{
          let body = JSON.parse(magicJS.response.body);
          let data = [];
          // 修正由于JS number类型精度问题，导致JSON.parse精度丢失，引起想法不存在的问题
          const targetIdFix = (element)=>{
            if (element['target_type'] == 'pin'){
              target_id = element['target']['url'].match(/https?:\/\/www\.zhihu\.com\/pin\/(\d*)/)[1];
              element['target']['id'] = target_id;
              // 转发的想法处理
              if (!!element['target']['origin_pin'] && element['target']['origin_pin'].hasOwnProperty('url')){
                origin_target_id = element['target']['origin_pin']['url'].match(/https?:\/\/www\.zhihu\.com\/pin\/(\d*)/)[1];
                element['target']['origin_pin']['id'] = origin_target_id;
              }
            }
            // 动态折叠处理
            else if (element['type'] == 'moments_group'){
              let momentsGroupList = [];
              for (let j=0;j<element['list'].length;j++){
                momentsGroupList.push(targetIdFix(element['list'][j]));
              }
              element['list'] = momentsGroupList;
            }
            return element;
          }
          for (let i=0;i<body['data'].length;i++){
            let element = targetIdFix(body['data'][i]);
            if (!element['ad']){
              data.push(element);
            }
          }
          body['data'] = data;
          body=JSON.stringify(body);
          magicJS.done({body: body});
        }
        catch(err){
          magicJS.logError(`知乎关注列表去广告出现异常：${err}`);
          magicJS.done();
        }
        break;
      // 回答列表去广告及黑名单增强
      case /^https?:\/\/api\.zhihu\.com\/v4\/questions/.test(magicJS.request.url):
        try{
          let user_info = GetUserInfo();
          let custom_blocked_users = magicJS.read(blocked_users_key, user_info.id);
          custom_blocked_users = !!custom_blocked_users ? custom_blocked_users : {};
          let body = JSON.parse(magicJS.response.body);
          magicJS.logDebug(`当前黑名单列表: ${JSON.stringify(custom_blocked_users)}`);
          delete body['ad_info'];
          delete body['roundtable_info'];
          let data = body['data'].filter((element) =>{return !custom_blocked_users[element['author']['name']]})
          body['data'] = data;
          body=JSON.stringify(body);
          magicJS.done({body});
        }
        catch(err){
          magicJS.logError(`知乎回答列表去广告出现异常：${err}`);
          magicJS.done();
        }
        break;
      // 拦截官方账号推广消息
      case /^https?:\/\/api\.zhihu\.com\/notifications\/v3\/timeline\/entry\/system_message/.test(magicJS.request.url):
        try{
          const sysmsg_blacklist = ['知乎小伙伴', '知乎视频', '知乎团队', '知乎礼券', '知乎读书会团队'];
          let body = JSON.parse(magicJS.response.body);
          let data = body['data'].filter((element) =>{return sysmsg_blacklist.indexOf(element['content']['title']) < 0})
          body['data'] = data;
          body=JSON.stringify(body);
          magicJS.done({body});
        }
        catch (err){
          magicJS.logError(`知乎拦截官方账号推广消息出现异常：${err}`);
          magicJS.done();
        }
        break;
      // 屏蔽官方营销消息
      case /^https?:\/\/api\.zhihu\.com\/notifications\/v3\/message\?/.test(magicJS.request.url):
        try{
          let body = JSON.parse(magicJS.response.body);
          body['data'].forEach((element, index)=> {
            if(element['detail_title'] === '官方帐号消息'){
              let unread_count = body['data'][index]['unread_count'];
              if (unread_count > 0){
                body['data'][index]['content']['text'] = '未读消息' + unread_count + '条';
              }
              else{
                body['data'][index]['content']['text'] = '全部消息已读';
              }
              body['data'][index]['is_read'] = true;
              body['data'][index]['unread_count'] = 0;
            }
          })
          body=JSON.stringify(body);
          magicJS.done({body});
        }
        catch(err){
          magicJS.logError(`知乎屏蔽官方营销消息出现异常：${err}`);
          magicJS.done();
        }
        break;
      // 黑名单管理
      case /^https?:\/\/api\.zhihu\.com\/settings\/blocked_users/.test(magicJS.request.url):
        let userInfo = GetUserInfo();
        const answer_blocked_users = ['会员推荐','知乎付费咨询'];
        let custom_blocked_users = magicJS.read(blocked_users_key, userInfo.id);
        custom_blocked_users = typeof custom_blocked_users === 'object' && !!custom_blocked_users ? custom_blocked_users : {};
        answer_blocked_users.forEach(element => {
          custom_blocked_users[element] = '00000000000000000000000000000000';
        });
        magicJS.logInfo(`当前用户id：${userInfo.id}，脚本黑名单：${JSON.stringify(custom_blocked_users)}`);
        // 获取黑名单
        if (magicJS.request.method == 'GET'){
          try{
            let obj = JSON.parse(magicJS.response.body);
            if (!!obj['data']){
              magicJS.logDebug(`本次滑动获取的黑名单信息：${JSON.stringify(obj['data'])}`);
              obj['data'].forEach(element => {
                if (element['name'] != '[已重置]'){
                  custom_blocked_users[element['name']] = element['id'];
                }
              });
              magicJS.write(blocked_users_key, custom_blocked_users, userInfo.id);
              if (obj['paging']['is_end'] == true){
                magicJS.notify(`获取脚本黑名单结束，当前黑名单共${Object.keys(custom_blocked_users).length}人！`);
                magicJS.logInfo(`脚本黑名单内容：${JSON.stringify(custom_blocked_users)}。`);
              }
            }
            else{
              magicJS.logWarning(`获取黑名单失败，接口响应不合法：${magicJS.response.body}`);
            }
          }
          catch(err){
            magicJS.del(blocked_users_key);
            magicJS.logError(`获取黑名单失败，异常信息：${err}`);
            magicJS.notify('获取黑名单失败，执行异常，已清空黑名单。');
          }
        }
        // 写入黑名单
        else if (magicJS.request.method == 'POST'){
          try{
            let obj = JSON.parse(magicJS.response.body);
            if (obj.hasOwnProperty('name') && obj.hasOwnProperty('id')){
              magicJS.logDebug(`当前需要加入黑名单的用户Id：${obj['id']}，用户名：${obj['name']}`);
              custom_blocked_users[obj['name']] = obj['id'];
              magicJS.write(blocked_users_key, custom_blocked_users, userInfo.id);
              magicJS.logInfo(`${obj['name']}写入脚本黑名单成功，当前脚本黑名单数据：${JSON.stringify(custom_blocked_users)}`);
              magicJS.notify(`已将用户 ${obj['name']} 写入脚本黑名单。`);
            }
            else{
              magicJS.logWarning(`写入黑名单失败，接口响应不合法：${magicJS.response.body}`);
              magicJS.notify('写入脚本黑名单失败，接口返回不合法。');
            }
          }
          catch (err){
            magicJS.logError(`写入黑名单失败，异常信息：${err}`);
            magicJS.notify('写入脚本黑名单失败，执行异常，请查阅日志。');
          }
        }
        // 移出黑名单
        else if (magicJS.request.method == 'DELETE'){
          try{
            let obj = JSON.parse(magicJS.response.body);
            if (obj.success){
              let user_id = magicJS.request.url.match(/https?:\/\/api\.zhihu\.com\/settings\/blocked_users\/([0-9a-zA-Z]*)/)[1];
              magicJS.logDebug(`当前需要移出黑名单的用户Id：${user_id}`);
              for (let username in custom_blocked_users){
                if (custom_blocked_users[username] == user_id){
                  delete custom_blocked_users[username];
                  magicJS.write(blocked_users_key, custom_blocked_users, userInfo.id)
                  magicJS.logInfo(`${username}移出脚本黑名单成功，当前脚本黑名单数据：${JSON.stringify(custom_blocked_users)}`);
                  magicJS.notify(`已将用户 ${username} 移出脚本黑名单！`);
                  break;
                }
              }
            }
            else{
              magicJS.logWarning(`移出黑名单失败，接口响应不合法：${magicJS.response.body}`);
              magicJS.notify('移出脚本黑名单失败，接口返回不合法。');
            }
          }
          catch (err){
            magicJS.logError(`移出黑名单失败，异常信息：${err}`);
            magicJS.notify('移出脚本黑名单失败，执行异常，请查阅日志。');
          }
        }
        magicJS.done();
        break;
      // 去除预置关键字广告
      case /^https?:\/\/api\.zhihu\.com\/search\/preset_words\?/.test(magicJS.request.url):
        try{
          if (!!magicJS.response.body){
            magicJS.logDebug(`预置关键字返回：${magicJS.response.body}`);
            let obj = JSON.parse(magicJS.response.body);
            if (obj.hasOwnProperty('preset_words') && obj['preset_words']['words']){
              let words = obj['preset_words']['words'].filter((element)=>{
                return element['type'] !== 'ad';
              })
              obj['preset_words']['words'] = words;
              let body = JSON.stringify(obj);
              magicJS.done({body});
            }
            else{
              magicJS.done();
            }
          }
          else{
            magicJS.done();
          }
        }
        catch(err){
          magicJS.logError(`知乎去除预置关键字广告出现异常：${err}`);
          magicJS.done();
        }
        break;
      default: 
        magicJS.done(); 
        break;
    }
  }
  // 兜底
  magicJS.done();
} 

main();

function GetUserInfo(){
  try{
    let user_info = magicJS.read(current_userinfo_key);
    if (typeof user_info === 'string') user_info = JSON.parse(user_info);
    return user_info;
  }
  catch(err){
    magicJS.logError(`获取用户信息出现异常：${err}`);
    return {id: 'default', is_vip: false};
  }
}

function MagicJS(a="MagicJS",b="INFO"){const c={accept:"Accept","accept-ch":"Accept-CH","accept-charset":"Accept-Charset","accept-features":"Accept-Features","accept-encoding":"Accept-Encoding","accept-language":"Accept-Language","accept-ranges":"Accept-Ranges","access-control-allow-credentials":"Access-Control-Allow-Credentials","access-control-allow-origin":"Access-Control-Allow-Origin","access-control-allow-methods":"Access-Control-Allow-Methods","access-control-allow-headers":"Access-Control-Allow-Headers","access-control-max-age":"Access-Control-Max-Age","access-control-expose-headers":"Access-Control-Expose-Headers","access-control-request-method":"Access-Control-Request-Method","access-control-request-headers":"Access-Control-Request-Headers",age:"Age",allow:"Allow",alternates:"Alternates",authorization:"Authorization","cache-control":"Cache-Control",connection:"Connection","content-encoding":"Content-Encoding","content-language":"Content-Language","content-length":"Content-Length","content-location":"Content-Location","content-md5":"Content-MD5","content-range":"Content-Range","content-security-policy":"Content-Security-Policy","content-type":"Content-Type",cookie:"Cookie",dnt:"DNT",date:"Date",etag:"ETag",expect:"Expect",expires:"Expires",from:"From",host:"Host","if-match":"If-Match","if-modified-since":"If-Modified-Since","if-none-match":"If-None-Match","if-range":"If-Range","if-unmodified-since":"If-Unmodified-Since","last-event-id":"Last-Event-ID","last-modified":"Last-Modified",link:"Link",location:"Location","max-forwards":"Max-Forwards",negotiate:"Negotiate",origin:"Origin",pragma:"Pragma","proxy-authenticate":"Proxy-Authenticate","proxy-authorization":"Proxy-Authorization",range:"Range",referer:"Referer","retry-after":"Retry-After","sec-websocket-extensions":"Sec-Websocket-Extensions","sec-websocket-key":"Sec-Websocket-Key","sec-websocket-origin":"Sec-Websocket-Origin","sec-websocket-protocol":"Sec-Websocket-Protocol","sec-websocket-version":"Sec-Websocket-Version",server:"Server","set-cookie":"Set-Cookie","set-cookie2":"Set-Cookie2","strict-transport-security":"Strict-Transport-Security",tcn:"TCN",te:"TE",trailer:"Trailer","transfer-encoding":"Transfer-Encoding",upgrade:"Upgrade","user-agent":"User-Agent","variant-vary":"Variant-Vary",vary:"Vary",via:"Via",warning:"Warning","www-authenticate":"WWW-Authenticate","x-content-duration":"X-Content-Duration","x-content-security-policy":"X-Content-Security-Policy","x-dnsprefetch-control":"X-DNSPrefetch-Control","x-frame-options":"X-Frame-Options","x-requested-with":"X-Requested-With","x-surge-skip-scripting":"X-Surge-Skip-Scripting"};return new class{constructor(){if(this.version="2.2.3.2",this.scriptName=a,this.logLevels={DEBUG:5,INFO:4,NOTIFY:3,WARNING:2,ERROR:1,CRITICAL:0,NONE:-1},this.isLoon="undefined"!=typeof $loon,this.isQuanX="undefined"!=typeof $task,this.isJSBox="undefined"!=typeof $drive,this.isNode="undefined"!=typeof module&&!this.isJSBox,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.platform=this.getPlatform(),this.node={request:void 0,fs:void 0,data:{}},this.iOSUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",this.pcUserAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59",this.logLevel=b,this._barkUrl="",this.isNode){this.node.fs=require("fs"),this.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(a){this.node.fs.writeFileSync("./magic.json","{}",{encoding:"utf8"})}this.node.data=require("./magic.json")}else this.isJSBox&&($file.exists("drive://MagicJS")||$file.mkdir("drive://MagicJS"),$file.exists("drive://MagicJS/magic.json")||$file.write({data:$data({string:"{}"}),path:"drive://MagicJS/magic.json"}))}set barkUrl(a){this._barkUrl=a.replace(/\/+$/g,"")}set logLevel(a){this._logLevel="string"==typeof a?a.toUpperCase():"DEBUG"}get logLevel(){return this._logLevel}get isRequest(){return"undefined"!=typeof $request&&"undefined"==typeof $response}get isResponse(){return"undefined"!=typeof $response}get request(){return"undefined"==typeof $request?void 0:$request}get response(){return"undefined"==typeof $response?void 0:($response.hasOwnProperty("status")&&($response.statusCode=$response.status),$response.hasOwnProperty("statusCode")&&($response.status=$response.statusCode),$response)}getPlatform(){return this.isSurge?"Surge":this.isQuanX?"QuantumultX":this.isLoon?"Loon":this.isJSBox?"JSBox":this.isNode?"Node.js":"unknown"}read(a,b=""){let c="";this.isSurge||this.isLoon?c=$persistentStore.read(a):this.isQuanX?c=$prefs.valueForKey(a):this.isNode?c=this.node.data:this.isJSBox&&(c=$file.read("drive://MagicJS/magic.json").string);try{this.isNode&&(c=c[a]),this.isJSBox&&(c=JSON.parse(c)[a]),!b||("string"==typeof c&&(c=JSON.parse(c)),c=c&&"object"==typeof c?c[b]:null)}catch(d){this.logError(d),c=b?{}:null,this.del(a)}"undefined"==typeof c&&(c=null);try{!c||"string"!=typeof c||(c=JSON.parse(c))}catch(a){}return this.logDebug(`READ DATA [${a}]${b?`[${b}]`:""}(${typeof c})\n${JSON.stringify(c)}`),c}write(a,b,c=""){let d=c?{}:"";if(!!c&&(this.isSurge||this.isLoon)?d=$persistentStore.read(a):!!c&&this.isQuanX?d=$prefs.valueForKey(a):this.isNode?d=this.node.data:this.isJSBox&&(d=JSON.parse($file.read("drive://MagicJS/magic.json").string)),!!c){try{"string"==typeof d&&(d=JSON.parse(d)),d="object"==typeof d&&d?d:{}}catch(b){this.logError(b),this.del(a),d={}}this.isJSBox||this.isNode?((!d.hasOwnProperty(a)||"object"!=typeof d[a]||null===d[a])&&(d[a]={}),!d[a].hasOwnProperty(c)&&(d[a][c]=null),"undefined"==typeof b?delete d[a][c]:d[a][c]=b):"undefined"==typeof b?delete d[c]:d[c]=b}else this.isNode||this.isJSBox?"undefined"==typeof b?delete d[a]:d[a]=b:"undefined"==typeof b?d=null:d=b;"object"==typeof d&&(d=JSON.stringify(d)),this.isSurge||this.isLoon?$persistentStore.write(d,a):this.isQuanX?$prefs.setValueForKey(d,a):this.isNode?this.node.fs.writeFileSync("./magic.json",d):this.isJSBox&&$file.write({data:$data({string:d}),path:"drive://MagicJS/magic.json"}),this.logDebug(`WRITE DATA [${a}]${c?`[${c}]`:""}(${typeof b})\n${JSON.stringify(b)}`)}del(a,b=""){this.logDebug(`DELETE KEY [${a}]${!b?"":`[${b}]`}`),this.write(a,null,b)}notify(a=this.scriptName,b="",c="",d=""){if(d=(a=>{let b={};if(this.isSurge||this.isQuanX||this.isLoon)if("string"==typeof a)this.isLoon?b={openUrl:a}:this.isQuanX?b={"open-url":a}:this.isSurge&&(b={url:a});else if("object"==typeof a){let c={Surge:{openUrl:"url","open-url":"url"},Loon:{url:"openUrl","open-url":"openUrl","media-url":"mediaUrl"},QuantumultX:{url:"open-url",openUrl:"open-url",mediaUrl:"media-url"}},d=Object.keys(a);for(let e=0;e<d.length;e++)c[this.platform][d[e]]?b[c[this.platform][d[e]]]=a[d[e]]:b[d[e]]=a[d[e]]}return b})(d),this.logNotify(`title:${a}\nsubTitle:${b}\nbody:${c}\noptions:${"object"==typeof d?JSON.stringify(d):d}`),1==arguments.length&&(a=this.scriptName,b="",c=arguments[0]),this.isSurge||this.isLoon)$notification.post(a,b,c,d);else if(this.isQuanX)$notify(a,b,c,d);else if(this.isNode){if(!!this._barkUrl){let d=encodeURI(`${a}/${b}\n${c}`);this.get(`${this._barkUrl}/${d}`,()=>{})}}else if(this.isJSBox){let d={title:a,body:b?`${b}\n${c}`:c};$push.schedule(d)}}log(a,b="INFO"){this.logLevels[this._logLevel]<this.logLevels[b.toUpperCase()]||console.log(`[${b}] [${this.scriptName}]\n${a}\n`)}logDebug(a){this.log(a,"DEBUG")}logInfo(a){this.log(a,"INFO")}logNotify(a){this.log(a,"NOTIFY")}logWarning(a){this.log(a,"WARNING")}logError(a){this.log(a,"ERROR")}adapterHttpOptions(a,b){let d="object"==typeof a?Object.assign({},a):{url:a,headers:{}};if(d.hasOwnProperty("header")&&!d.hasOwnProperty("headers")&&(d.headers=d.header,delete d.header),"object"==typeof d.headers&&!0)for(let a in d.headers)c[a]&&(d.headers[c[a]]=d.headers[a],delete d.headers[a]);!!d.headers&&"object"==typeof d.headers&&!!d.headers["User-Agent"]||((!!!d.headers||"object"!=typeof d.headers)&&(d.headers={}),d.headers["User-Agent"]=this.isNode?this.pcUserAgent:this.iOSUserAgent);let e=!1;if(("object"==typeof d.opts&&(!0===d.opts.hints||!0===d.opts["Skip-Scripting"])||"object"==typeof d.headers&&!0===d.headers["X-Surge-Skip-Scripting"])&&(e=!0),e||(this.isSurge?d.headers["X-Surge-Skip-Scripting"]=!1:this.isLoon?d.headers["X-Requested-With"]="XMLHttpRequest":this.isQuanX&&("object"!=typeof d.opts&&(d.opts={}),d.opts.hints=!1)),(!this.isSurge||e)&&delete d.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&d.hasOwnProperty("opts")&&delete d.opts,this.isQuanX&&d.hasOwnProperty("opts")&&delete d.opts["Skip-Scripting"],"GET"===b&&!this.isNode&&!!d.body){let a=Object.keys(d.body).map(a=>"undefined"==typeof d.body?"":`${encodeURIComponent(a)}=${encodeURIComponent(d.body[a])}`).join("&");0>d.url.indexOf("?")&&(d.url+="?"),d.url.lastIndexOf("&")+1!=d.url.length&&d.url.lastIndexOf("?")+1!=d.url.length&&(d.url+="&"),d.url+=a,delete d.body}return this.isQuanX?(d.hasOwnProperty("body")&&"string"!=typeof d.body&&(d.body=JSON.stringify(d.body)),d.method=b):this.isNode?(delete d.headers["Accept-Encoding"],"object"==typeof d.body&&("GET"===b?(d.qs=d.body,delete d.body):"POST"==b&&(d.json=!0,d.body=d.body))):this.isJSBox&&(d.header=d.headers,delete d.headers),d}get(a,b){let c=this.adapterHttpOptions(a,"GET");if(this.logDebug(`HTTP GET: ${JSON.stringify(c)}`),this.isSurge||this.isLoon)$httpClient.get(c,b);else if(this.isQuanX)$task.fetch(c).then(a=>{a.status=a.statusCode,b(null,a,a.body)},a=>b(a.error,null,null));else{if(this.isNode)return this.node.request.get(c,b);this.isJSBox&&(c.handler=a=>{let c=a.error?JSON.stringify(a.error):void 0,d="object"==typeof a.data?JSON.stringify(a.data):a.data;b(c,a.response,d)},$http.get(c))}}post(a,b){let c=this.adapterHttpOptions(a,"POST");if(this.logDebug(`HTTP POST: ${JSON.stringify(c)}`),this.isSurge||this.isLoon)$httpClient.post(c,b);else if(this.isQuanX)$task.fetch(c).then(a=>{a.status=a.statusCode,b(null,a,a.body)},a=>{b(a.error,null,null)});else{if(this.isNode)return this.node.request.post(c,b);this.isJSBox&&(c.handler=a=>{let c=a.error?JSON.stringify(a.error):void 0,d="object"==typeof a.data?JSON.stringify(a.data):a.data;b(c,a.response,d)},$http.post(c))}}done(a={}){"undefined"!=typeof $done&&$done(a)}isToday(a){if(null==a)return!1;else{let b=new Date;return"string"==typeof a&&(a=new Date(a)),b.getFullYear()==a.getFullYear()&&b.getMonth()==a.getMonth()&&b.getDay()==a.getDay()}}isNumber(a){return"NaN"!==parseFloat(a).toString()}attempt(a,b=null){return a.then(a=>[null,a]).catch(a=>(this.logError(a),[a,b]))}retry(a,b=5,c=0,d=null){return(...e)=>new Promise((f,g)=>{function h(...e){Promise.resolve().then(()=>a.apply(this,e)).then(a=>{"function"==typeof d?Promise.resolve().then(()=>d(a)).then(()=>{f(a)}).catch(a=>{this.logError(a),1<=b&&0<c?setTimeout(()=>h.apply(this,e),c):1<=b?h.apply(this,e):g(a),b--}):f(a)}).catch(a=>{this.logError(a),1<=b&&0<c?setTimeout(()=>h.apply(this,e),c):1<=b?h.apply(this,e):g(a),b--})}h.apply(this,e)})}formatTime(a,b="yyyy-MM-dd hh:mm:ss"){var c={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),S:a.getMilliseconds()};for(let d in /(y+)/.test(b)&&(b=b.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length))),c)new RegExp("("+d+")").test(b)&&(b=b.replace(RegExp.$1,1==RegExp.$1.length?c[d]:("00"+c[d]).substr((""+c[d]).length)));return b}now(){return this.formatTime(new Date,"yyyy-MM-dd hh:mm:ss")}today(){return this.formatTime(new Date,"yyyy-MM-dd")}sleep(a){return new Promise(b=>setTimeout(b,a))}}(a)}

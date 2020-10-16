/*
BiliBili 去广告

去广告代码来自 https://github.com/onewayticket255/Surge-Script 这里只做整合

Surge Config

[Rule]
URL-REGEX,https://app.bilibili.com/x/v2/(splash|search/(defaultword|square)),REJECT
URL-REGEX,https://api.bilibili.com/x/v2/dm/ad,REJECT

[MITM]
api.bilibili.com, app.bilibili.com, api.live.bilibili.com

[Script]
Bilibili_Tab = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/resource/show/tab\?access_key,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.js
Bilibili_Feed = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/v2/feed/index\?access_key,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.js
Bilibili_Account = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/v2/account/mine\?access_key,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.js
Bilibili_View = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/v2/view\?access_key,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.js
Bilibili_Reply = type=http-response,requires-body=1,max-size=0,pattern=https://api.bilibili.com/x/v2/reply/main\?access_key,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.js
Bilibili_Live = type=http-response,requires-body=1,max-size=0,pattern=https://api.live.bilibili.com/xlive/app-room/v1/index/getInfoByRoom\?access_key,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.js
*/

let body = $response.body;
body=JSON.parse(body);

let tab_regex = /^https:\/\/app.bilibili.com\/x\/resource\/show\/tab\?access_key/;
let feed_regex = /^https:\/\/app.bilibili.com\/x\/v2\/feed\/index\?access_key/;
let account_regex = /^https:\/\/app.bilibili.com\/x\/v2\/account\/mine\?access_key/;
let view_regex = /^https:\/\/app.bilibili.com\/x\/v2\/view\?access_key/;
let reply_regex = /^https:\/\/api.bilibili.com\/x\/v2\/reply\/main\?access_key/;
let live_regex = /^https:\/\/api.live.bilibili.com\/xlive\/app-room\/v1\/index\/getInfoByRoom\?access_key/;

if (tab_regex.test($request.url)){
  body['data']['tab'] = [
    {
        "id": 39,
        "name": "直播",
        "uri": "bilibili://live/home",
        "tab_id": "直播tab",
        "pos": 1
    },
    {
        "id": 40,
        "name": "推荐",
        "uri": "bilibili://pegasus/promo",
        "tab_id": "推荐tab",
        "pos": 2,
        "default_selected": 1
    },
    {
        "id": 41,
        "name": "热门",
        "uri": "bilibili://pegasus/hottopic",
        "tab_id": "热门tab",
        "pos": 3
    },
    {
        "id": 42,
        "name": "追番",
        "uri": "bilibili://pgc/home",
        "tab_id": "追番Tab",
        "pos": 4
    },
    {
        "id": 151,
        "name": "影视",
        "uri": "bilibili://pgc/cinema-tab",
        "tab_id": "影视tab",
        "pos": 5,
    },
  ];

  body['data']['top'] = [
    {
        "id": 176,
        "icon": "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
        "name": "消息",
        "uri": "bilibili://link/im_home",
        "tab_id": "消息Top",
        "pos": 1
    }
  ];

  body['data']['bottom'] = [
    {
        "id": 177,
        "icon": "http://i0.hdslb.com/bfs/archive/63d7ee88d471786c1af45af86e8cb7f607edf91b.png",
        "icon_selected": "http://i0.hdslb.com/bfs/archive/e5106aa688dc729e7f0eafcbb80317feb54a43bd.png",
        "name": "首页",
        "uri": "bilibili://main/home/",
        "tab_id": "首页Bottom",
        "pos": 1
    },
    {
        "id": 178,
        "icon": "http://i0.hdslb.com/bfs/archive/9c453a54eb83f5140cd098bf2e8ed8a599edc7fe.png",
        "icon_selected": "http://i0.hdslb.com/bfs/archive/79d29e6ac3b6e52652881b050e63988e2038130f.png",
        "name": "频道",
        "uri": "bilibili://pegasus/channel/",
        "tab_id": "频道Bottom",
        "pos": 2
    },
    {
        "id": 179,
        "icon": "http://i0.hdslb.com/bfs/archive/86dfbe5fa32f11a8588b9ae0fccb77d3c27cedf6.png",
        "icon_selected": "http://i0.hdslb.com/bfs/archive/25b658e1f6b6da57eecba328556101dbdcb4b53f.png",
        "name": "动态",
        "uri": "bilibili://following/home/",
        "tab_id": "动态Bottom",
        "pos": 3
    },
    {
        "id": 181,
        "icon": "http://i0.hdslb.com/bfs/archive/4b0b2c49ffeb4f0c2e6a4cceebeef0aab1c53fe1.png",
        "icon_selected": "http://i0.hdslb.com/bfs/archive/a54a8009116cb896e64ef14dcf50e5cade401e00.png",
        "name": "我的",
        "uri": "bilibili://user_center/",
        "tab_id": "我的Bottom",
        "pos": 4
    }
  ];
}
else if (feed_regex.test($request.url)){
  body['data']['items'].forEach((element, index)=> {
    if(element.hasOwnProperty('ad_info')||element.hasOwnProperty('banner_item')||element['card_type']!='small_cover_v2'){ 
      body['data']['items'].splice(index,1)  
    }
  });
}
else if (account_regex.test($request.url)){
  body['data']['sections_v2'] = [
    {
      "items": [
        {
          "id": 397,
          "title": "历史记录",
          "icon": "http://i0.hdslb.com/bfs/archive/8385323c6acde52e9cd52514ae13c8b9481c1a16.png",
          "uri": "bilibili://user_center/history"
        },
        {
          "id": 398,
          "title": "我的收藏",
          "icon": "http://i0.hdslb.com/bfs/archive/d79b19d983067a1b91614e830a7100c05204a821.png",
          "uri": "bilibili://user_center/favourite"
        },
        {
            "id": 396,
            "title": "离线缓存",
            "icon": "http://i0.hdslb.com/bfs/archive/5fc84565ab73e716d20cd2f65e0e1de9495d56f8.png",
            "uri": "bilibili://user_center/download"
        },
        {
          "id": 399,
          "title": "稍后再看",
          "icon": "http://i0.hdslb.com/bfs/archive/63bb768caa02a68cb566a838f6f2415f0d1d02d6.png",
          "need_login": 1,
          "uri": "bilibili://user_center/watch_later"
        }
      ],
      "style": 1,
      "button": {
      }
    },
    {
      "title": "创作中心",
      "items": [
        {
          "need_login": 1,
          "display": 1,
          "id": 171,
          "title": "创作首页",
          "global_red_dot": 1,
          "uri": "bilibili://uper/homevc",
          "icon": "http://i0.hdslb.com/bfs/archive/d3aad2d07538d2d43805f1fa14a412d7a45cc861.png"
        },
      ],
      "style": 1,
      "button": {
        "icon": "http://i0.hdslb.com/bfs/archive/205f47675eaaca7912111e0e9b1ac94cb985901f.png",
        "style": 1,
        "url": "bilibili://uper/user_center/archive_selection",
        "text": "发布"
      }
    },
    {
      //"title": "其他设置",
      "items": [
        {
          "id": 410,
          "title": "设置",
          "icon": "http://i0.hdslb.com/bfs/archive/e932404f2ee62e075a772920019e9fbdb4b5656a.png",
          "uri": "bilibili://user_center/setting"
        }
      ],
      "style": 2,
      "button": {
      }
    }
  ];
}
else if (view_regex.test($request.url)){
  body['data']['relates'].forEach((element, index)=> {
    if(element.hasOwnProperty('is_ad')||!element.hasOwnProperty('aid')){      
       body['data']['relates'].splice(index,1)  
      }
  })
  delete body['data']['cms']
}
else if (reply_regex.test($request.url)){
  delete body['data']['notice']
} 
else if (live_regex.test($request.url)){
  body['data']['activity_banner_info']=null
}
body=JSON.stringify(body);
$done({body});

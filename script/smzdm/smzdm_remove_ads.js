/*
[MITM]
homepage-api.smzdm.com, haojia-api.smzdm.com, article-api.smzdm.com

[Script]
什么值得买_首页去广告 = type=http-response,requires-body=1,max-size=0,pattern=^https:\/\/homepage-api.smzdm.com\/home,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.js
什么值得买_好价去广告 = type=http-response,requires-body=1,max-size=0,pattern=^https:\/\/haojia-api.smzdm.com\/home\/list\?,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.js
什么值得买_好文去广告 = type=http-response,requires-body=1,max-size=0,pattern=^https:\/\/article-api.smzdm.com\/article\/index_home_page,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.js
*/

let body = $response.body;
body=JSON.parse(body);

let homepage_regex = /^https:\/\/homepage-api.smzdm.com\/home/;
let haojia_regex = /^https:\/\/haojia-api.smzdm.com\/home\/list/;
let article_regex = /^https:\/\/article-api.smzdm.com\/article\/index_home_page/;

// 去除首页推荐广告
if (homepage_regex.test($request.url)){
  if (!!body){
    if (body['data'].hasOwnProperty('banner')){
      if (body['data']['banner'].hasOwnProperty('big_banner')){
        delete body['data']['banner']['big_banner'];
      }
      if (body['data']['banner'].hasOwnProperty('tonglan_banner')){
        delete body['data']['banner']['tonglan_banner'];
      }
    }
    if (body.hasOwnProperty('data') && body['data'].hasOwnProperty('rows')){
      let rows = body['data']['rows'].filter((item) =>{
        if (item['model_type'] != 'ads'){
          return true;
        }
      })
      body['data']['rows'] = rows;
    }
  }
}
// 好价去广告
else if(haojia_regex.test($request.url)){
  if (body['data'].hasOwnProperty('banner')){
    if (body['data']['banner'].hasOwnProperty('two_banner')){
      delete body['data']['banner']['two_banner'];
    }
    if (body['data']['banner'].hasOwnProperty('big_banner')){
      delete body['data']['banner']['big_banner'];
    }
    if (body['data']['banner'].hasOwnProperty('calendar_banner')){
      delete body['data']['banner']['calendar_banner'];
    }
    if (body['data']['banner'].hasOwnProperty('hongbao_banner')){
      delete body['data']['banner']['hongbao_banner'];
    }
  }
  let rows = body['data']['rows'].filter((item) =>{
    if (item['tag'] != '广告'){
      return true;
    }
  })
  body['data']['rows'] = rows;
}
// 社区好文去广告
else if(article_regex.test($request.url)){
  if (body['data'].hasOwnProperty('big_banner')){
    delete body['data']['big_banner'];
  }
  if (body['data']  .hasOwnProperty('notice')){
    delete body['data']['notice'];
  }
}
body=JSON.stringify(body);
$done({body});

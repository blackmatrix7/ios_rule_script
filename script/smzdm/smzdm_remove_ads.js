let body = $response.body;
body=JSON.parse(body);

let homepage_regex = /^https?:\/\/homepage-api.smzdm.com\/home/;
let haojia_regex = /^https?:\/\/haojia-api.smzdm.com\/home\/list/;
let article_regex = /^https?:\/\/article-api.smzdm.com\/article\/index_home_page/;
let util_regex = /^https?:\/\/app-api\.smzdm\.com\/util\/update/;
let sou_regex = /^https?:\/\/s-api\.smzdm\.com\/sou\/list/;

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
        return item['model_type'] != 'ads' && item['model_type'] != 'cluster';
      })
      body['data']['rows'] = rows;
    }
    delete body['data']['widget'];
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
    return item['tag'] != '广告';
  })
  body['data']['rows'] = rows;
}
// 社区好文去广告
else if(article_regex.test($request.url)){
  if (body['data'].hasOwnProperty('big_banner')){
    delete body['data']['big_banner'];
  }
  if (body['data'].hasOwnProperty('notice')){
    delete body['data']['notice'];
  }
}
// 去除浮动广告
else if (util_regex.test($request.url)){
  delete body['data']['ad_filter'];
  delete body['data']['operation_float_7_0'];
  delete body['data']['operation_full'];
  delete body['data']['operation_float_screen'];
  delete body['data']['operation_float'];
}
// 去除搜索结果广告
else if (sou_regex.test($request.url)){
  if (body.hasOwnProperty('data') && body['data'].hasOwnProperty('rows')){
    let rows = body['data']['rows'].filter((item) =>{ 
      return item['model_type'] != 'ads';
    })
    body['data']['rows'] = rows;
  }
}
body=JSON.stringify(body);
$done({body});

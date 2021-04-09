/*
bilibili home page module customization whitelist. by onewayticket255

QX:
^https://app.bilibili.com/x/resource/show/tab\?access_key url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/bilibiliTab.js

Surge4：
http-response ^https://app.bilibili.com/x/resource/show/tab\?access_key requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/bilibiliTab.js

Surge & QX MITM = app.bilibili.com
*/

let whitelist=['追番','推荐','直播','热门','影视']

let body = $response.body
body=JSON.parse(body)

body['data']['tab'].forEach((element, index) => {
if(!(whitelist.includes(element['name']))) body['data']['tab'].splice(index,1)  
});

body['data']['bottom'].forEach((element, index)=> {
    if(element['pos']==4){      
       body['data']['bottom'].splice(index,1)  
    }
})

body=JSON.stringify(body)
$done({body}) 
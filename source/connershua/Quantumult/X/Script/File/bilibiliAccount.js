/*
bilibili remove some account modules. by onewayticket255

QX:
^https://app.bilibili.com/x/v2/account/mine\?access_key url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/bilibiliAccount.js

Surge4：
http-response ^https://app.bilibili.com/x/v2/account/mine\?access_key requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/bilibiliAccount.js

Surge & QX MITM = app.bilibili.com
*/

let body = $response.body
body=JSON.parse(body)
body['data']['sections'].splice(2,1)
body=JSON.stringify(body)
$done({body})
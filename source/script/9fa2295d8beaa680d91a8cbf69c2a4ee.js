/*
不背单词解锁装备 @Ljm666888
https://sapi.beingfine.cn/v3/report/launch/
不背单词解锁装备 = type=http-response,pattern=^https:\/\/sapi\.beingfine\.cn\/v3\/report\/launch\/,requires-body=1,max-size=0,script-path=bubei.js,
*/
let obj = JSON.parse($response.body);
obj.data_body = obj.data_body.replace(/expire_date":\d+/g, 'expire_date":1884436316000').replace(/granted":\d+/g, 'granted":1').replace(/user_type":\d+/g, 'user_type":3').replace(/collins_user_type":\d+/g, 'collins_user_type":3');
$done({body: JSON.stringify(obj)});
/*
Netease koala removes ads

QX:
^https://sp\.kaola\.com/api/openad$ url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/wykaola.js

Surge4：
http-response ^https://sp\.kaola\.com/api/openad$ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/wykaola.js

Surge & QX MITM = sp.kaola.com
*/

var obj = JSON.parse($response.body);
obj = null;
$done({body: JSON.stringify(obj)});

//by Choler
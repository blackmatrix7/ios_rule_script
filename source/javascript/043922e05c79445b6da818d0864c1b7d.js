let app = JSON.parse($request.body);
app.storefrontId = '143380-1,29';
$done({body:JSON.stringify(app)});
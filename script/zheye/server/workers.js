addEventListener("fetch", (event) => {
  if (event.request.method === "POST" && event.request.url.endsWith("api/v1/answer/links")) {
    event.respondWith(handlePostRequest(event.request));
  } else {
    event.respondWith(new Response('Forbidden', {status: 403}));
  }
});

async function handlePostRequest(request) {
  let requestBody = await request.json();
  let promise = [];
  let checkResult = [];
  for (let link of requestBody) {
    promise.push(_request(link));
  }
  await Promise.all(promise).then(result => {
    checkResult = result;
  })
  let bodyString = JSON.stringify(checkResult);
  return new Response(bodyString, {status: 200});
}

async function _request(url) {
  return new Promise(resolve => {
    if (!url || url === "" || !url.startsWith("https://www.zhihu.com/appview/v2/answer")) {
      resolve("");
    } else {
      fetch(url).then(async resp => {
        let responseText = await resp.text();
        // 付费内容
        if ((responseText.indexOf("查看完整内容") >= 0 || responseText.indexOf("查看全部章节") >= 0) && responseText.indexOf("paid") >= 0) {
          resolve("付费内容");
        }
        // 营销推广提醒
        else if (responseText.indexOf("ad-link-card") >= 0 || responseText.indexOf("xg.zhihu.com") >= 0 || responseText.indexOf("营销平台") >= 0) {
          resolve("营销推广");
        }
        // 购物推广提醒
        else if (responseText.indexOf("mcn-link-card") >= 0) {
          resolve("购物推广");
        } else {
          resolve("");
        }
      }).catch(err => {
        console.log(err);
        resolve("");
      });
    }
  });
}
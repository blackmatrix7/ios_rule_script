# -*-coding:utf-8-*-
import asyncio

import aiohttp
from fastapi import FastAPI

app = FastAPI()


async def fetch(session, url):
    if url and url.startswith('https://www.zhihu.com/appview/v2/answer'):
        async with session.get(url) as resp:
            return await resp.text()
    else:
        return ""


@app.post("/api/v1/answer/links")
async def request_zhihu_answers(links: list[str]):
    loop = asyncio.get_event_loop()
    tasks = []
    async with aiohttp.ClientSession() as session:
        for link in links:
            tasks.append(loop.create_task(fetch(session, link)))
        responses = await asyncio.gather(*tasks)
    result = []
    for link, response in zip(links, responses):
        if ('查看完整内容' in response or '查看全部章节' in response) and 'paid' in response:
            result.append("付费内容")
        elif 'ad-link-card' in response or 'xg.zhihu.com' in response or '营销平台' in response:
            result.append("营销推广")
        elif 'mcn-link-card' in response:
            result.append("购物推广")
        else:
            result.append("")
    return result

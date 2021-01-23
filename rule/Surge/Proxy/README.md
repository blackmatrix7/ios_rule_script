# Proxy

## 前言

本项目的Proxy分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Proxy分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。


Proxy分流规则中含有URL-REGEX类型，此类的规则对于HTTPS请求需要MITM使用才能生效。程序已默认根据正则推导一份MITM的模块/复写/插件在当前分流规则的目录中，便于参考搭配使用。

最后检查时间：2021-01-24 03:18:05。

## 规则统计

总计规则：27968 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 27709 |
| USER-AGENT | 49 |
| DOMAIN | 36 |
| DOMAIN-KEYWORD | 42 |
| IP-CIDR | 127 |
| IP-CIDR6 | 3 |
| PROCESS-NAME | 1 |
| URL-REGEX | 1 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Surge 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/Proxy/Proxy.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/Proxy/Proxy_Domain.list

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

### 特别说明

Proxy.list请使用RULE-SET。

Proxy_Domain.list请使用DOMAIN-SET。

## 重复统计

当前分流规则，已包含以下子规则：

- Global

除非特殊需求，否则不建议重复引用。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Sina](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Sina)    | 101   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.99% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Baidu)    | 265   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.75% |
|  [ByteDance](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ByteDance)    | 202   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.5% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/China)    | 688   | [133](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   19.33% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ChinaTest)    | 71706   | [170](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.24% |
|  [ChinaMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ChinaMedia)    | 299   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   1.34% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Alibaba)    | 1222   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.16% |
|  [KuKeMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/KuKeMusic)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [WangSuKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/WangSuKeJi)    | 189   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.53% |
|  [XieCheng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/XieCheng)    | 29   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   3.45% |
|  [YYeTs](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/YYeTs)    | 21   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   61.9% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple)    | 105   | [40](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   38.1% |
|  [iCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/iCloud)    | 51   | [31](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   60.78% |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AppleBlock)    | 6   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [AppleNews](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AppleNews)    | 11   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   9.09% |
|  [SystemOTA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/SystemOTA)    | 17   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   17.65% |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Github)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [OneDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/OneDrive)    | 19   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   47.37% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Microsoft)    | 101   | [61](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   60.4% |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/YouTube)    | 182   | [59](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   32.42% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Google)    | 104   | [73](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   70.19% |
|  [GoogleDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/GoogleDrive)    | 7   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   28.57% |
|  [YouTubeMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/YouTubeMusic)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AdvertisingLite)    | 25443   | [59](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.23% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Advertising)    | 56381   | [165](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.29% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AdvertisingTest)    | 74004   | [200](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.27% |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Privacy)    | 2838   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   0.07% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Game)    | 64   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   43.75% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Blizzard)    | 38   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   36.84% |
|  [Steam](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Steam)    | 32   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   40.62% |
|  [Rockstar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Rockstar)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   20.0% |
|  [PlayStation](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/PlayStation)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Epic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Epic)    | 15   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   86.67% |
|  [SteamCN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/SteamCN)    | 14   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   28.57% |
|  [WildRift](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/WildRift)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [EA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/EA)    | 163   | [150](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   92.02% |
|  [Garena](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Garena)    | 15   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   40.0% |
|  [Gog](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Gog)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Nintendo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Nintendo)    | 123   | [94](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   76.42% |
|  [OP](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/OP)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Riot](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Riot)    | 54   | [45](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   83.33% |
|  [UBI](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/UBI)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   60.0% |
|  [Xbox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Xbox)    | 34   | [29](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   85.29% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Global)    | 1294   | [1257](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   97.14% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/GlobalMedia)    | 1138   | [199](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   17.49% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList)    | 772   | [759](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   98.32% |
|  [Speedtest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Speedtest)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   20.0% |
|  [Telegram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Telegram)    | 19   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   68.42% |
|  [PotatoChat](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/PotatoChat)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [KakaoTalk](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/KakaoTalk)    | 10   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Line](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Line)    | 22   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   90.91% |
|  [Netflix](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Netflix)    | 42   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Dubox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Dubox)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [TikTok](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/TikTok)    | 16   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   56.25% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Disney)    | 132   | [85](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   64.39% |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Twitter)    | 11   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Cloudflare](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Cloudflare)    | 22   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   4.55% |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Facebook)    | 39   | [36](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   92.31% |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Spotify)    | 19   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   84.21% |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Wikipedia)    | 12   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Discord](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Discord)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/PayPal)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Spark)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Sony)    | 6   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   83.33% |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Niconico)    | 10   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   60.0% |
|  [BBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BBC)    | 17   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   58.82% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Developer)    | 23   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   95.65% |
|  [Amazon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Amazon)    | 26   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   96.15% |
|  [Instagram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Instagram)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Scholar)    | 76   | [37](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   48.68% |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Whatsapp)    | 21   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/TeamViewer)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   20.0% |
|  [Bahamut](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Bahamut)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   60.0% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Adobe)    | 34   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   73.53% |
|  [AFP](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AFP)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [ATTWatchTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ATTWatchTV)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [AbemaTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AbemaTV)    | 22   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   68.18% |
|  [All4](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/All4)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [AmazonPrimeVideo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AmazonPrimeVideo)    | 26   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   61.54% |
|  [Americasvoice](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Americasvoice)    | 1   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [AppleDaily](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AppleDaily)    | 13   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   76.92% |
|  [BoXun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BoXun)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [CBS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/CBS)    | 26   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   84.62% |
|  [CNBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/CNBC)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [CNN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/CNN)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [CableTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/CableTV)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [DAZN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/DAZN)    | 19   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   36.84% |
|  [Dailymotion](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Dailymotion)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Deezer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Deezer)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [EncoreTVB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/EncoreTVB)    | 6   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [Fox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Fox)    | 257   | [228](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   88.72% |
|  [HBO](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/HBO)    | 31   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   45.16% |
|  [HWTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/HWTV)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Huffpost](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Huffpost)    | 18   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [Hulu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Hulu)    | 55   | [47](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   85.45% |
|  [ITV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ITV)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   75.0% |
|  [JOOX](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/JOOX)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   75.0% |
|  [Japonx](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Japonx)    | 10   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   80.0% |
|  [KKBOX](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/KKBOX)    | 7   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   85.71% |
|  [Kakao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Kakao)    | 14   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   85.71% |
|  [LiTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/LiTV)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [LineTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/LineTV)    | 8   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   62.5% |
|  [LondonReal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/LondonReal)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [My5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/My5)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   75.0% |
|  [NYPost](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/NYPost)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [NYTimes](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/NYTimes)    | 16   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   68.75% |
|  [Nikkei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Nikkei)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [PBS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/PBS)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Pandora](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Pandora)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [PandoraTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/PandoraTV)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [RTHK](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/RTHK)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [SkyGO](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/SkyGO)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [SoundCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/SoundCloud)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [TIDAL](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/TIDAL)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   25.0% |
|  [TVB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/TVB)    | 15   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   46.67% |
|  [TaiWanGood](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/TaiWanGood)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [VOA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/VOA)    | 51   | [49](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   96.08% |
|  [VidolTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/VidolTV)    | 1   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Vimeo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Vimeo)    | 16   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   93.75% |
|  [ViuTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ViuTV)    | 10   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   40.0% |
|  [Voxmedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Voxmedia)    | 16   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [ZeeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ZeeTV)    | 9   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   77.78% |
|  [friDay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/friDay)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Lan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Lan)    | 25   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Proxy/Proxy_Repeat.list)   |   4.0% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的Proxy分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的Proxy分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyLite.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/GlobalMedia.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/GlobalMedia.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Global.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Global.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Global.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Outside.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/Apple-proxy.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/foreign.list
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/gfw.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/greatfire.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/proxy.txt
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/BlackList/BlackList.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Proxy/Proxy.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Global.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Global.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Proxy.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Region/Global.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Region/Global.list


感谢以上分流规则作者的辛勤付出（排名不分先后）。

如果您有更好的分流规则，欢迎提交给我，我会将它加到数据源中继续完善。

## 程序特点

### 断链处理

对于某些已删除或失效的数据源，继续使用本地缓存的文件，减少因为断链造成的影响。

### 规则过滤

通过关键字、正则、模糊匹配三种方式对规则进行过滤，以移除部分数据源中的错误规则。

### 合并去重

不仅对完全相同的规则进行去重，还会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6等规则间的包含关系进行合并去重。

### 域名解析

对DOMAIN类型的规则进行DNS解析记录查询，丢弃连续多次无法解析的域名。

### 正则合并

通过程序对相似正则进行合并，不定时手动核验正则合并结果。

### 正则推导

通过程序对含有正则的规则，推导需要MITM的主机名，不定时手动核验推导结果。

### 正则编译

通过程序对正则类型的规则进行编译，去除无法通过编译的正则。

## 最后

### 完善规则

如果您：

1. 有更优的原始规则数据
2. 有更多的黑名单规则数据
3. 有更好的优化建议
4. 在使用分流规则时出现异常
5. 有其他问题

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的Proxy分流规则。

感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议

### 其他问题

爬虫开发的初衷是为满足自己几方面需求：

1. 去除混用多个去广告规则造成的重复
2. 去除多个去广告规则中某些规则
3. 多个分流规则间重复情况检查
4. 定时同步数据源更新

本项目的分流规则还是以自用为主，请不要对外宣传此分流规则。所以，还是请低调使用吧。
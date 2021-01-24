# Proxy

## 前言

本项目的Proxy分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Proxy分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。



最后检查时间：2021-01-25 03:19:11。

## 规则统计

总计规则：27918 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 27709 |
| DOMAIN | 36 |
| DOMAIN-KEYWORD | 42 |
| IP-CIDR | 127 |
| IP-CIDR6 | 3 |
| PROCESS-NAME | 1 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Clash 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy.yaml

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Domain.yaml

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/Proxy/Proxy.yaml

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/Proxy/Proxy_Domain.yaml

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 重复统计

当前分流规则，已包含以下子规则：

- Global

除非特殊需求，否则不建议重复引用。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Sina](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Sina)    | 101   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.99% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Baidu)    | 265   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.75% |
|  [ByteDance](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ByteDance)    | 202   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.5% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/China)    | 656   | [132](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   20.12% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ChinaTest)    | 71634   | [169](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.24% |
|  [ChinaMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ChinaMedia)    | 264   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   1.52% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Alibaba)    | 1222   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.16% |
|  [KuKeMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/KuKeMusic)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [WangSuKeJi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/WangSuKeJi)    | 189   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.53% |
|  [XieCheng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/XieCheng)    | 29   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   3.45% |
|  [YYeTs](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/YYeTs)    | 21   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   61.9% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Apple)    | 85   | [40](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   47.06% |
|  [iCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/iCloud)    | 51   | [31](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   60.78% |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AppleBlock)    | 6   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [AppleNews](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AppleNews)    | 9   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   11.11% |
|  [SystemOTA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/SystemOTA)    | 17   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   17.65% |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Github)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [OneDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/OneDrive)    | 17   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   47.06% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Microsoft)    | 98   | [60](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   61.22% |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/YouTube)    | 177   | [55](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   31.07% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Google)    | 101   | [73](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   72.28% |
|  [GoogleDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/GoogleDrive)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AdvertisingLite)    | 24673   | [59](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.24% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Advertising)    | 54991   | [166](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.3% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AdvertisingTest)    | 73035   | [201](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.28% |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Privacy)    | 2838   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   0.07% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Game)    | 64   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   43.75% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Blizzard)    | 38   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   36.84% |
|  [Steam](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Steam)    | 32   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   40.62% |
|  [Rockstar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Rockstar)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   20.0% |
|  [PlayStation](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/PlayStation)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Epic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Epic)    | 15   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   86.67% |
|  [SteamCN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/SteamCN)    | 14   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   28.57% |
|  [WildRift](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/WildRift)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [EA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/EA)    | 163   | [150](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   92.02% |
|  [Garena](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Garena)    | 15   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   40.0% |
|  [Gog](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Gog)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Nintendo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Nintendo)    | 123   | [94](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   76.42% |
|  [OP](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/OP)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Riot](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Riot)    | 54   | [45](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   83.33% |
|  [UBI](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/UBI)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   60.0% |
|  [Xbox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Xbox)    | 34   | [29](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   85.29% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Global)    | 1254   | [1217](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   97.05% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/GlobalMedia)    | 1080   | [162](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   15.0% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/BlackList)    | 769   | [756](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   98.31% |
|  [Speedtest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Speedtest)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   25.0% |
|  [Telegram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Telegram)    | 19   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   68.42% |
|  [PotatoChat](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/PotatoChat)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [KakaoTalk](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/KakaoTalk)    | 10   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Line](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Line)    | 22   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   90.91% |
|  [Netflix](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Netflix)    | 41   | [27](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   65.85% |
|  [Dubox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Dubox)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [TikTok](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TikTok)    | 15   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   53.33% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Disney)    | 131   | [84](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   64.12% |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Twitter)    | 11   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Cloudflare](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Cloudflare)    | 22   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   4.55% |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Facebook)    | 39   | [36](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   92.31% |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Spotify)    | 17   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   88.24% |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Wikipedia)    | 12   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Discord](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Discord)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/PayPal)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Spark)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Sony)    | 6   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   83.33% |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Niconico)    | 9   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   55.56% |
|  [BBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/BBC)    | 16   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   56.25% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Developer)    | 23   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   95.65% |
|  [Amazon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Amazon)    | 24   | [23](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   95.83% |
|  [Instagram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Instagram)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Scholar)    | 76   | [37](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   48.68% |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Whatsapp)    | 21   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TeamViewer)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   20.0% |
|  [Bahamut](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Bahamut)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Adobe)    | 34   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   73.53% |
|  [AFP](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AFP)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [ATTWatchTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ATTWatchTV)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [AbemaTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AbemaTV)    | 21   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [All4](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/All4)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [AmazonPrimeVideo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AmazonPrimeVideo)    | 24   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   58.33% |
|  [Americasvoice](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Americasvoice)    | 1   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [AppleDaily](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AppleDaily)    | 13   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   76.92% |
|  [BoXun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/BoXun)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [CBS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/CBS)    | 26   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   84.62% |
|  [CNBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/CNBC)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [CNN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/CNN)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [CableTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/CableTV)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [DAZN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/DAZN)    | 18   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [Dailymotion](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Dailymotion)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Deezer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Deezer)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [EncoreTVB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/EncoreTVB)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   20.0% |
|  [Fox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Fox)    | 256   | [227](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   88.67% |
|  [HBO](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/HBO)    | 29   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   44.83% |
|  [HWTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/HWTV)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Huffpost](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Huffpost)    | 18   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [Hulu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Hulu)    | 55   | [47](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   85.45% |
|  [ITV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ITV)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [JOOX](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/JOOX)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Japonx](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Japonx)    | 10   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   80.0% |
|  [KKBOX](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/KKBOX)    | 7   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   85.71% |
|  [Kakao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Kakao)    | 14   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   85.71% |
|  [LiTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/LiTV)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [LineTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/LineTV)    | 7   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   57.14% |
|  [LondonReal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/LondonReal)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [My5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/My5)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [NYPost](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/NYPost)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [NYTimes](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/NYTimes)    | 16   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   68.75% |
|  [Nikkei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Nikkei)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [PBS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/PBS)    | 1   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Pandora](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Pandora)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [PandoraTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/PandoraTV)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [RTHK](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/RTHK)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [SkyGO](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/SkyGO)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [SoundCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/SoundCloud)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [TIDAL](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TIDAL)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [TVB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TVB)    | 14   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   42.86% |
|  [TaiWanGood](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TaiWanGood)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [VOA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/VOA)    | 51   | [49](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   96.08% |
|  [VidolTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/VidolTV)    | 1   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Vimeo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Vimeo)    | 16   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   93.75% |
|  [ViuTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ViuTV)    | 8   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   25.0% |
|  [Voxmedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Voxmedia)    | 16   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [ZeeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ZeeTV)    | 9   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   77.78% |
|  [friDay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/friDay)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   50.0% |
|  [Lan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Lan)    | 26   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy_Repeat.list)   |   3.85% |
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
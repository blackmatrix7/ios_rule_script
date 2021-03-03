# Proxy

## 前言

本项目的Proxy分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Proxy分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。



最后检查时间：2021-03-03 13:01:20.380082。

## 规则统计

总计规则：28648 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 28482 |
| USER-AGENT | 12 |
| DOMAIN | 34 |
| DOMAIN-KEYWORD | 29 |
| IP-CIDR | 88 |
| IP-CIDR6 | 3 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Loon 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/Proxy/Proxy.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/Proxy/Proxy_Domain.list

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 重复统计


当前分流规则，未包含其他子规则。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Wikipedia)    | 12   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spark)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [ATTWatchTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ATTWatchTV)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [CNN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CNN)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Voxmedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Voxmedia)    | 16   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [9to5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/9to5)    | 7   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Atlassian](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Atlassian)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Comodo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Comodo)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [DigiCert](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DigiCert)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Espn](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Espn)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Jwplayer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Jwplayer)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Picsee](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Picsee)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Sectigo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sectigo)    | 7   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Shopify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Shopify)    | 8   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Slack](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Slack)    | 8   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Sling](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sling)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Snap](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Snap)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Stackexchange](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Stackexchange)    | 15   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [VK](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/VK)    | 7   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [WIX](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WIX)    | 9   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Wikimedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Wikimedia)    | 20   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Wordpress](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Wordpress)    | 8   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Zendesk](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Zendesk)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   100.0% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global)    | 28730   | [28562](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   99.42% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList)    | 772   | [758](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   98.19% |
|  [VOA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/VOA)    | 51   | [49](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   96.08% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Developer)    | 24   | [23](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   95.83% |
|  [DtDNS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DtDNS)    | 17   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   94.12% |
|  [Vimeo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Vimeo)    | 16   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   93.75% |
|  [EA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/EA)    | 163   | [150](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   92.02% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Adobe)    | 138   | [126](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   91.3% |
|  [Line](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Line)    | 22   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   90.91% |
|  [Bloomberg](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Bloomberg)    | 22   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   90.91% |
|  [Discord](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Discord)    | 10   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   90.0% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PayPal)    | 248   | [222](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   89.52% |
|  [Dell](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Dell)    | 117   | [104](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   88.89% |
|  [Fox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Fox)    | 257   | [227](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   88.33% |
|  [HuluUSA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HuluUSA)    | 51   | [45](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   88.24% |
|  [Dropbox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Dropbox)    | 17   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   88.24% |
|  [DynDNS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DynDNS)    | 8   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   87.5% |
|  [CBS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CBS)    | 26   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   84.62% |
|  [Riot](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Riot)    | 54   | [45](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   83.33% |
|  [Gucci](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Gucci)    | 6   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   83.33% |
|  [Xbox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Xbox)    | 35   | [29](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   82.86% |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Github)    | 23   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   82.61% |
|  [Zee](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Zee)    | 22   | [18](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   81.82% |
|  [Bestbuy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Bestbuy)    | 82   | [66](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   80.49% |
|  [Hulu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Hulu)    | 56   | [45](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   80.36% |
|  [Japonx](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Japonx)    | 10   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   80.0% |
|  [ZeeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZeeTV)    | 9   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   77.78% |
|  [Cisco](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Cisco)    | 118   | [91](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   77.12% |
|  [AppleDaily](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AppleDaily)    | 13   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   76.92% |
|  [IBM](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/IBM)    | 13   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   76.92% |
|  [Samsung](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Samsung)    | 13   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   76.92% |
|  [Nintendo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Nintendo)    | 123   | [94](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   76.42% |
|  [BrightCove](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BrightCove)    | 12   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   75.0% |
|  [SmarTone](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SmarTone)    | 15   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   73.33% |
|  [Vercel](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Vercel)    | 15   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   73.33% |
|  [PCCW](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PCCW)    | 25   | [18](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   72.0% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Scholar)    | 177   | [127](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   71.75% |
|  [KakaoTalk](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KakaoTalk)    | 14   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   71.43% |
|  [Zoho](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Zoho)    | 13   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   69.23% |
|  [NYTimes](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NYTimes)    | 16   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   68.75% |
|  [Telegram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Telegram)    | 28   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   67.86% |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Facebook)    | 68   | [46](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   67.65% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Game)    | 532   | [356](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   66.92% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Google)    | 111   | [74](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Whatsapp)    | 21   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Logitech](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Logitech)    | 9   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Manorama](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Manorama)    | 12   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Mozilla](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Mozilla)    | 18   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Pixnet](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Pixnet)    | 9   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   66.67% |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Twitter)    | 26   | [17](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   65.38% |
|  [Pinterest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Pinterest)    | 23   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   65.22% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Disney)    | 132   | [84](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   63.64% |
|  [AbemaTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AbemaTV)    | 22   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   63.64% |
|  [Nike](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Nike)    | 11   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   63.64% |
|  [Qualcomm](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Qualcomm)    | 44   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   63.64% |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spotify)    | 19   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   63.16% |
|  [Rarbg](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Rarbg)    | 16   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   62.5% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Microsoft)    | 99   | [61](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   61.62% |
|  [Amazon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Amazon)    | 168   | [103](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   61.31% |
|  [iCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/iCloud)    | 51   | [31](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   60.78% |
|  [Duckduckgo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Duckduckgo)    | 43   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   58.14% |
|  [TikTok](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TikTok)    | 16   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   56.25% |
|  [Shopee](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Shopee)    | 11   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   54.55% |
|  [OneDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/OneDrive)    | 17   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   52.94% |
|  [Cloudflare](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Cloudflare)    | 41   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   48.78% |
|  [BMW](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BMW)    | 729   | [354](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   48.56% |
|  [Intel](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Intel)    | 263   | [126](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   47.91% |
|  [BBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BBC)    | 17   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   47.06% |
|  [Dailymail](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Dailymail)    | 17   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   47.06% |
|  [AmazonPrimeVideo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AmazonPrimeVideo)    | 26   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   46.15% |
|  [HBOHK](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HBOHK)    | 13   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   46.15% |
|  [Oracle](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Oracle)    | 25   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   44.0% |
|  [Garena](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Garena)    | 15   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   40.0% |
|  [TVB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TVB)    | 15   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   40.0% |
|  [HBO](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HBO)    | 31   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   38.71% |
|  [Globalsign](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Globalsign)    | 13   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   38.46% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Apple)    | 113   | [43](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   38.05% |
|  [Naver](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Naver)    | 51   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   37.25% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sony)    | 116   | [43](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   37.07% |
|  [Verisign](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Verisign)    | 33   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   36.36% |
|  [Verizon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Verizon)    | 174   | [62](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   35.63% |
|  [Huffpost](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Huffpost)    | 18   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [Twitch](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Twitch)    | 18   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   33.33% |
|  [ThomsonReuters](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ThomsonReuters)    | 31   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   32.26% |
|  [eBay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/eBay)    | 44   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   31.82% |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouTube)    | 180   | [57](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   31.67% |
|  [Canon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Canon)    | 70   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   31.43% |
|  [Westerndigital](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Westerndigital)    | 23   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   30.43% |
|  [McDonalds](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/McDonalds)    | 26   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   26.92% |
|  [DAZN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DAZN)    | 19   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   26.32% |
|  [Gettyimages](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Gettyimages)    | 25   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   24.0% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Blizzard)    | 61   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   22.95% |
|  [VISA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/VISA)    | 99   | [21](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Proxy/Proxy_Repeat.list)   |   21.21% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的Proxy分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的Proxy分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyLite.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Outside.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/Apple-proxy.list
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/gfw.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/greatfire.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/proxy.txt
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/BlackList/BlackList.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Proxy/Proxy.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Proxy.list


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
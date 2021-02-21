# Global

## 前言

本项目的Global分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Global分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。


Global分流规则中含有URL-REGEX类型，此类的规则对于HTTPS请求需要MITM使用才能生效。程序已默认根据正则推导一份MITM的模块/复写/插件在当前分流规则的目录中，便于参考搭配使用。

最后检查时间：2021-02-22 02:42:57.472149。

## 规则统计

总计规则：28412 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 28155 |
| USER-AGENT | 49 |
| DOMAIN | 35 |
| DOMAIN-KEYWORD | 42 |
| IP-CIDR | 127 |
| IP-CIDR6 | 3 |
| URL-REGEX | 1 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Loon 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/Global/Global.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/Global/Global_Domain.list

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 重复统计

当前分流规则，已包含以下子规则：

- Proxy

除非特殊需求，否则不建议重复引用。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Github)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Twitter)    | 11   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Wikipedia)    | 12   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [Discord](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Discord)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PayPal)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spark)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [ATTWatchTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ATTWatchTV)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [CNN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CNN)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [Voxmedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Voxmedia)    | 16   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   100.0% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Proxy)    | 28318   | [28244](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   99.74% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList)    | 772   | [758](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   98.19% |
|  [Amazon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Amazon)    | 26   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   96.15% |
|  [VOA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/VOA)    | 51   | [49](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   96.08% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Developer)    | 24   | [23](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   95.83% |
|  [Vimeo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Vimeo)    | 16   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   93.75% |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Facebook)    | 39   | [36](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   92.31% |
|  [EA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/EA)    | 163   | [150](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   92.02% |
|  [Line](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Line)    | 22   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   90.91% |
|  [Fox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Fox)    | 257   | [228](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   88.72% |
|  [KakaoTalk](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KakaoTalk)    | 14   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   85.71% |
|  [KKBOX](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KKBOX)    | 7   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   85.71% |
|  [Hulu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Hulu)    | 55   | [47](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   85.45% |
|  [Xbox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Xbox)    | 34   | [29](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   85.29% |
|  [CBS](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CBS)    | 26   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   84.62% |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spotify)    | 19   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   84.21% |
|  [Riot](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Riot)    | 54   | [45](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   83.33% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sony)    | 6   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   83.33% |
|  [Japonx](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Japonx)    | 10   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   80.0% |
|  [ZeeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZeeTV)    | 9   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   77.78% |
|  [AppleDaily](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AppleDaily)    | 13   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   76.92% |
|  [Nintendo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Nintendo)    | 123   | [94](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   76.42% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Adobe)    | 34   | [25](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   73.53% |
|  [LineTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/LineTV)    | 7   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   71.43% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Game)    | 508   | [356](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   70.08% |
|  [NYTimes](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NYTimes)    | 16   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   68.75% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Google)    | 111   | [76](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   68.47% |
|  [Telegram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Telegram)    | 19   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   68.42% |
|  [AbemaTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AbemaTV)    | 22   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   68.18% |
|  [Netflix](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Netflix)    | 42   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   66.67% |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Whatsapp)    | 21   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   66.67% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Disney)    | 132   | [85](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   64.39% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Microsoft)    | 99   | [61](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   61.62% |
|  [AmazonPrimeVideo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AmazonPrimeVideo)    | 26   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   61.54% |
|  [iCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/iCloud)    | 51   | [31](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   60.78% |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Niconico)    | 10   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   60.0% |
|  [BBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BBC)    | 17   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   58.82% |
|  [TikTok](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TikTok)    | 16   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   56.25% |
|  [OneDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/OneDrive)    | 17   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   52.94% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Scholar)    | 76   | [37](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   48.68% |
|  [TVB](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TVB)    | 15   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   46.67% |
|  [HBO](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HBO)    | 31   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   45.16% |
|  [Garena](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Garena)    | 15   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   40.0% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Apple)    | 113   | [43](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   38.05% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Blizzard)    | 38   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   36.84% |
|  [DAZN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DAZN)    | 19   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   36.84% |
|  [Huffpost](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Huffpost)    | 18   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   33.33% |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouTube)    | 180   | [57](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Global/Global_Repeat.list)   |   31.67% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的Global分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的Global分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyLite.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/GlobalMedia.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Global.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Outside.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/Apple-proxy.list
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/gfw.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/greatfire.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/proxy.txt
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/BlackList/BlackList.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Proxy/Proxy.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Global.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Proxy.list
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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的Global分流规则。

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
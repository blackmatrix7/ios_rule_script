# Global

## 前言

本项目的Global分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Global分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。



最后检查时间：2021-01-10 03:01:08。

## 规则统计

总计规则：1288 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| HOST-SUFFIX | 1128 |
| HOST-KEYWORD | 27 |
| IP-CIDR | 66 |
| IP6-CIDR | 3 |
| USER-AGENT | 39 |
| HOST | 25 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### QuantumultX 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/QuantumultX/Global/Global.list

## 重复统计


当前分流规则，未包含其他子规则。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/China)    | 689   | [36](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   5.22% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/ChinaTest)    | 72430   | [34](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   0.05% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Apple)    | 102   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   1.96% |
|  [AppStore](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AppStore)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   100.0% |
|  [TestFlight](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/TestFlight)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   33.33% |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AppleBlock)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   100.0% |
|  [AppleTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AppleTV)    | 7   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   14.29% |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Github)    | 6   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   66.67% |
|  [OneDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/OneDrive)    | 17   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   23.53% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Microsoft)    | 99   | [21](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   21.21% |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/YouTube)    | 13   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   69.23% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Google)    | 111   | [59](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   53.15% |
|  [YouTubeMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/YouTubeMusic)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   50.0% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AdvertisingLite)    | 21602   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   0.05% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Advertising)    | 48176   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   0.06% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/AdvertisingTest)    | 67910   | [32](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   0.05% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Game)    | 63   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   14.29% |
|  [Steam](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Steam)    | 16   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   6.25% |
|  [Epic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Epic)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   50.0% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Proxy)    | 27940   | [1255](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   4.49% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/GlobalMedia)    | 1145   | [165](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   14.41% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BlackList)    | 770   | [675](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   87.66% |
|  [Speedtest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Speedtest)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   20.0% |
|  [Telegram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Telegram)    | 19   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   52.63% |
|  [KakaoTalk](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/KakaoTalk)    | 10   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   40.0% |
|  [Line](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Line)    | 23   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   30.43% |
|  [Netflix](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Netflix)    | 39   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   71.79% |
|  [Dubox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Dubox)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   100.0% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Disney)    | 7   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   71.43% |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Twitter)    | 11   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   90.91% |
|  [Cloudflare](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Cloudflare)    | 22   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   4.55% |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Facebook)    | 39   | [39](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   100.0% |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Spotify)    | 9   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   77.78% |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Wikipedia)    | 12   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   41.67% |
|  [Discord](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Discord)    | 6   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   50.0% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/PayPal)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   60.0% |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Spark)    | 5   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   80.0% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Sony)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   100.0% |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Niconico)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   100.0% |
|  [BBC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BBC)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   66.67% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Developer)    | 23   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   26.09% |
|  [Amazon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Amazon)    | 26   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   34.62% |
|  [Instagram](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Instagram)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   100.0% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Scholar)    | 76   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   1.32% |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Whatsapp)    | 21   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   19.05% |
|  [Bahamut](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Bahamut)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   60.0% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Adobe)    | 34   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Global/Global_Repeat.list)   |   26.47% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的Global分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的Global分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/GlobalMedia.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Global.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Global.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Global.list
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
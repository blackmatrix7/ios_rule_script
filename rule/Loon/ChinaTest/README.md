# China

## 前言

本项目的China分流规则由爬虫程序自动维护。

定时爬取互联网上开源的China分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。




最后检查时间：2020-12-30 10:45:06。

## 规则统计

总计规则：72663 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 72625 |
| USER-AGENT | 11 |
| DOMAIN | 9 |
| IP-CIDR | 4 |
| DOMAIN-KEYWORD | 10 |
| IP-CIDR6 | 4 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Loon 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/ChinaTest/ChinaTest.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/ChinaTest/ChinaTest_Domain.list

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 重复统计

China分流规则，与本项目其他分流规则重复情况统计。

点击重复数量可以查看重复规则明细。

| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Adobe)    | 34   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   5.88% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Advertising)    | 45486   | [1142](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   2.51% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest)    | 65546   | [1168](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   1.78% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingLite)    | 26121   | [656](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   2.51% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Apple)    | 32   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   15.62% |
|  [AsianMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AsianMedia)    | 27   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   51.85% |
|  [Bilibili](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Bilibili)    | 13   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   92.31% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList)    | 770   | [17](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   2.21% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Blizzard)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [ByteDance](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ByteDance)    | 26   | [26](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/China)    | 604   | [601](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   99.5% |
|  [ChinaMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaMedia)    | 72   | [33](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   45.83% |
|  [DiDi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DiDi)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [WhiteList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WhiteList)    | 23   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   4.35% |
|  [PayPal](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PayPal)    | 5   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   80.0% |
|  [Steam](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Steam)    | 16   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [SteamCN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SteamCN)    | 14   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   35.71% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Game)    | 26   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   38.46% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Google)    | 124   | [41](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   33.06% |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouTube)    | 12   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   8.33% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Microsoft)    | 88   | [15](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   17.05% |
|  [OneDriver](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/OneDriver)    | 17   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   5.88% |
|  [Meitu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Meitu)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [NetEase](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NetEase)    | 9   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [NetEaseMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NetEaseMusic)    | 22   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.91% |
|  [Speedtest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Speedtest)    | 5   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   40.0% |
|  [TikTok](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TikTok)    | 11   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   18.18% |
|  [Pinduoduo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Pinduoduo)    | 2   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global)    | 817   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   0.61% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/GlobalMedia)    | 281   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   1.07% |
|  [Hijacking](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Hijacking)    | 208   | [54](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   25.96% |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sony)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [SohuSogo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SohuSogo)    | 10   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   80.0% |
|  [Sina](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sina)    | 10   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   90.0% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Scholar)    | 76   | [60](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   78.95% |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Privacy)    | 2808   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   0.07% |
|  [Weibo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Weibo)    | 4   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [IQiyi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/IQiyi)    | 6   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   16.67% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Proxy)    | 6018   | [47](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   0.78% |
|  [Himalaya](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Himalaya)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [Xunlei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Xunlei)    | 8   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   75.0% |
|  [Tencent](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Tencent)    | 19   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TeamViewer)    | 10   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   50.0% |
|  [XiaoMi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XiaoMi)    | 7   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [VipShop](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/VipShop)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/360)    | 8   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [4399](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/4399)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Alibaba)    | 34   | [33](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   97.06% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Baidu)    | 12   | [12](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [CCTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CCTV)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Douyu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Douyu)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   100.0% |
|  [Huawei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Huawei)    | 9   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   66.67% |
|  [Lan](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Lan)    | 23   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/ChinaTest/ChinaTest_Repeat.list)   |   13.04% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的China分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的China分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/China.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/China.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/CN.list
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/direct.txt
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/China/China.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Domestic.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Domestic.list


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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的China分流规则。

感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) 

提供规则数据源及改进建议

### 其他问题

爬虫开发的初衷是为满足自己几方面需求：

1. 去除混用多个去广告规则造成的重复
2. 去除多个去广告规则中某些规则
3. 多个分流规则间重复情况检查
4. 定时同步数据源更新

本项目的分流规则还是以自用为主，请不要对外宣传此分流规则。所以，还是请低调使用吧。
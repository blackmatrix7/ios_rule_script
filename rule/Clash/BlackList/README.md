# 黑名单

## 前言

本项目的黑名单分流规则由爬虫程序自动维护。

定时爬取互联网上开源的黑名单分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。

**黑名单指被XXX或国内直连非常慢的网址，等同于Proxy，建议直接使用Proxy分流规则，此项因为历史原因保留。**


最后检查时间：2021-01-19 23:26:48。

## 规则统计

总计规则：769 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 694 |
| DOMAIN | 5 |
| PROCESS-NAME | 1 |
| DOMAIN-KEYWORD | 12 |
| IP-CIDR | 57 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Clash 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList.yaml

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/BlackList/BlackList.yaml

## 重复统计


当前分流规则，未包含其他子规则。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/China)    | 656   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   3.35% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ChinaTest)    | 71779   | [27](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   0.04% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Apple)    | 85   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   2.35% |
|  [TestFlight](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TestFlight)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   33.33% |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AppleBlock)    | 6   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   100.0% |
|  [AppleTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AppleTV)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   20.0% |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Github)    | 6   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   33.33% |
|  [OneDrive](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/OneDrive)    | 17   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   5.88% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Microsoft)    | 98   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   13.27% |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/YouTube)    | 177   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   1.69% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Google)    | 101   | [41](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   40.59% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AdvertisingLite)    | 25920   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   0.03% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Advertising)    | 57414   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   0.04% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AdvertisingTest)    | 74643   | [27](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   0.04% |
|  [Game](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Game)    | 64   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   4.69% |
|  [Epic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Epic)    | 15   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   6.67% |
|  [WildRift](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/WildRift)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   66.67% |
|  [Garena](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Garena)    | 15   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   6.67% |
|  [Nintendo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Nintendo)    | 123   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   3.25% |
|  [Riot](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Riot)    | 54   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   3.7% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Proxy)    | 27864   | [756](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   2.71% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Global)    | 1254   | [676](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   53.91% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/GlobalMedia)    | 1092   | [18](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   1.65% |
|  [PotatoChat](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/PotatoChat)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   100.0% |
|  [KakaoTalk](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/KakaoTalk)    | 10   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   90.0% |
|  [Line](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Line)    | 22   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   86.36% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Disney)    | 131   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   1.53% |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Twitter)    | 11   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   63.64% |
|  [Cloudflare](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Cloudflare)    | 22   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   4.55% |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Facebook)    | 39   | [20](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   51.28% |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Spotify)    | 17   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   5.88% |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Wikipedia)    | 12   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   25.0% |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Spark)    | 5   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   60.0% |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Niconico)    | 9   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   22.22% |
|  [Developer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Developer)    | 23   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   34.78% |
|  [Amazon](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Amazon)    | 24   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   79.17% |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Scholar)    | 76   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   1.32% |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Whatsapp)    | 21   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   14.29% |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TeamViewer)    | 10   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   10.0% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Adobe)    | 34   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   20.59% |
|  [AmazonPrimeVideo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AmazonPrimeVideo)    | 24   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   4.17% |
|  [AppleDaily](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AppleDaily)    | 13   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   7.69% |
|  [BoXun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/BoXun)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   50.0% |
|  [CNN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/CNN)    | 6   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   16.67% |
|  [CableTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/CableTV)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   50.0% |
|  [Fox](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Fox)    | 256   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   0.39% |
|  [Kakao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Kakao)    | 14   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   64.29% |
|  [LineTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/LineTV)    | 7   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   28.57% |
|  [NYTimes](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/NYTimes)    | 16   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   25.0% |
|  [RTHK](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/RTHK)    | 3   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   33.33% |
|  [SoundCloud](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/SoundCloud)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   66.67% |
|  [VOA](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/VOA)    | 51   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   1.96% |
|  [Vimeo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Vimeo)    | 16   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   12.5% |
|  [ViuTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ViuTV)    | 8   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   25.0% |
|  [Voxmedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Voxmedia)    | 16   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BlackList/BlackList_Repeat.list)   |   12.5% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的黑名单分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的黑名单分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppleBlock/AppleBlock.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/BlackList/BlackList.list
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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的黑名单分流规则。

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
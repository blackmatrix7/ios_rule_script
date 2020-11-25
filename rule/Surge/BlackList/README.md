# 黑名单

## 前言

本项目的黑名单分流规则由爬虫程序自动维护。

定时爬取互联网上开源的黑名单分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。

黑名单指被XXX或国内直连非常慢的网址，等同于Proxy，建议直接使用Proxy分流规则，此项因为历史原因保留。



最后检查时间：2020-11-25 11:39:27。

## 规则统计

总计规则：782 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 5 |
| DOMAIN-KEYWORD | 12 |
| DOMAIN-SUFFIX | 701 |
| IP-CIDR | 60 |
| PROCESS-NAME | 1 |
| USER-AGENT | 3 |
## 重复统计

黑名单分流规则，与本项目其他分流规则重复情况统计。

点击重复数量可以查看重复规则明细。

| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Adobe)    | 34   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Adobe.list)   |   20.59%  |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Advertising)    | 93803   | [24](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Advertising.list)   |   0.03%  |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AdvertisingTest)    | 110144   | [31](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/AdvertisingTest.list)   |   0.03%  |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AdvertisingLite)    | 41838   | [10](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/AdvertisingLite.list)   |   0.02%  |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple)    | 162   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Apple.list)   |   0.62%  |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AppleBlock)    | 6   | [6](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/AppleBlock.list)   |   100.00%  |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/China)    | 593   | [12](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/China.list)   |   2.02%  |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ChinaTest)    | 73334   | [17](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/ChinaTest.list)   |   0.02%  |
|  [Cloudflare](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Cloudflare)    | 15   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Cloudflare.list)   |   6.67%  |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Facebook)    | 25   | [6](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Facebook.list)   |   24.00%  |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Google)    | 123   | [39](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Google.list)   |   31.71%  |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/YouTube)    | 14   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/YouTube.list)   |   21.43%  |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Microsoft)    | 99   | [12](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Microsoft.list)   |   12.12%  |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Niconico)    | 5   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Niconico.list)   |   40.00%  |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Global)    | 827   | [236](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Global.list)   |   28.54%  |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/GlobalMedia)    | 279   | [19](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/GlobalMedia.list)   |   6.81%  |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Github)    | 6   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Github.list)   |   33.33%  |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Spotify)    | 8   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Spotify.list)   |   12.50%  |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Spark)    | 4   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Spark.list)   |   75.00%  |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Sony)    | 5   | [5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Sony.list)   |   100.00%  |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Scholar)    | 76   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Scholar.list)   |   1.32%  |
|  [TestFlight](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/TestFlight)    | 3   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/TestFlight.list)   |   33.33%  |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Twitter)    | 11   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Twitter.list)   |   63.64%  |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Proxy)    | 5988   | [777](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Proxy.list)   |   12.98%  |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Wikipedia)    | 12   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Wikipedia.list)   |   25.00%  |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Whatsapp)    | 16   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/Whatsapp.list)   |   12.50%  |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/TeamViewer)    | 10   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList/Repeat/TeamViewer.list)   |   10.00%  |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Surge 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/BlackList/BlackList.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/BlackList/BlackList.list

## 数据来源

本项目的黑名单分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的黑名单分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/BlackList/BlackList.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppleBlock/AppleBlock.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Proxy.list


感谢以上分流规则作者的辛勤付出（排名不分先后）。

如果您有更好的分流规则，欢迎提交给我，我会将它加到数据源中继续完善。

## 最后

### 正则过滤

爬虫程序在清洗原始规则数据时，可根据正则定向过滤规则，以达到保留特定规则的目的。经过正则过滤的规则，无法100%涵盖原始规则数据，请知悉。

### 正则校验

从2020年11月25日开始，爬虫程序加入对正则合法性的校验。对于无法校验通过，且不明作用的正则，直接抛弃。如果对比数据源发现正则类型的规则较少，则很大可能是错误的正则都已被过滤掉。

### 黑名单

爬虫程序内置部分规则黑名单，在对原始数据进行清洗时，自动将可能引起异常的黑名单规则去除。经过黑名单去除的规则，无法100%涵盖原始规则数据，请知悉。

### 完善规则

如果您：

1. 有更优的原始规则数据
2. 有更多的黑名单规则数据
3. 有更好的优化建议
4. 在使用分流规则时出现异常
5. 有其他问题

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的黑名单分流规则。

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
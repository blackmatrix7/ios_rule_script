# 黑名单

## 前言

本项目的黑名单分流规则由爬虫程序自动维护。

定时爬取互联网上开源的黑名单分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。


最后检查时间：2020-10-19 11:32:37。

## 规则统计

总计规则：777 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 5 |
| DOMAIN-KEYWORD | 12 |
| DOMAIN-SUFFIX | 697 |
| IP-CIDR | 60 |
| USER-AGENT | 3 |
## 重复统计

黑名单分流规则，与本项目其他分流规则重复情况统计。

点击重复数量可以查看重复规则明细。

| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Adobe)    | 34   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Adobe.list)   |   20.59%  |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Advertising)    | 140101   | [24](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Advertising.list)   |   0.02%  |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest)    | 150581   | [31](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/AdvertisingTest.list)   |   0.02%  |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingLite)    | 44380   | [10](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/AdvertisingLite.list)   |   0.02%  |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Apple)    | 50   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Apple.list)   |   4.00%  |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AppleBlock)    | 5   | [5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/AppleBlock.list)   |   100.00%  |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/China)    | 598   | [12](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/China.list)   |   2.01%  |
|  [Cloudflare](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Cloudflare)    | 15   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Cloudflare.list)   |   6.67%  |
|  [Facebook](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Facebook)    | 25   | [6](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Facebook.list)   |   24.00%  |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Google)    | 64   | [37](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Google.list)   |   57.81%  |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouTube)    | 14   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/YouTube.list)   |   21.43%  |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Microsoft)    | 98   | [12](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Microsoft.list)   |   12.24%  |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Niconico)    | 5   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Niconico.list)   |   40.00%  |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global)    | 841   | [235](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Global.list)   |   27.94%  |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/GlobalMedia)    | 296   | [18](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/GlobalMedia.list)   |   6.08%  |
|  [Github](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Github)    | 6   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Github.list)   |   33.33%  |
|  [Spotify](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spotify)    | 8   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Spotify.list)   |   12.50%  |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spark)    | 4   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Spark.list)   |   75.00%  |
|  [Sony](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Sony)    | 5   | [5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Sony.list)   |   100.00%  |
|  [Scholar](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Scholar)    | 76   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Scholar.list)   |   1.32%  |
|  [TestFlight](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TestFlight)    | 3   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/TestFlight.list)   |   33.33%  |
|  [Twitter](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Twitter)    | 11   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Twitter.list)   |   63.64%  |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Proxy)    | 5984   | [773](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Proxy.list)   |   12.92%  |
|  [Wikipedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Wikipedia)    | 12   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Wikipedia.list)   |   25.00%  |
|  [Whatsapp](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Whatsapp)    | 16   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/Whatsapp.list)   |   12.50%  |
|  [TeamViewer](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/TeamViewer)    | 10   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList/Repeat/TeamViewer.list)   |   10.00%  |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Loon 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/BlackList/BlackList.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/BlackList/BlackList.list

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

[@zjcfynn](https://github.com/zjcfynn) [@Tartarus2014](https://github.com/Tartarus2014)

提供规则数据源及改进建议

### 其他问题

爬虫开发的初衷是为满足自己几方面需求：

1. 去除混用多个去广告规则造成的重复
2. 去除多个去广告规则中某些规则
3. 多个分流规则间重复情况检查
4. 定时同步数据源更新

本项目的分流规则还是以自用为主，请不要对外宣传此分流规则。所以，还是请低调使用吧。
# Apple

## 前言

本项目的Apple分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Apple分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。

不含有Apple News等国内无法使用的分流规则

最后检查时间：2020-10-19 11:32:36。

## 规则统计

总计规则：52 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 19 |
| DOMAIN-SUFFIX | 20 |
| IP-CIDR | 10 |
| PROCESS-NAME | 2 |
| USER-AGENT | 1 |
## 重复统计

Apple分流规则，与本项目其他分流规则重复情况统计。

点击重复数量可以查看重复规则明细。

| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Advertising)    | 140101   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/Advertising.list)   |   0.00%  |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AdvertisingTest)    | 150581   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/AdvertisingTest.list)   |   0.00%  |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AdvertisingLite)    | 44380   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/AdvertisingLite.list)   |   0.00%  |
|  [AppleBlock](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AppleBlock)    | 6   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/AppleBlock.list)   |   33.33%  |
|  [AppleNews](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AppleNews)    | 9   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/AppleNews.list)   |   11.11%  |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList)    | 778   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/BlackList.list)   |   0.26%  |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/China)    | 598   | [13](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/China.list)   |   2.17%  |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Microsoft)    | 100   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/Microsoft.list)   |   1.00%  |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Global)    | 842   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/Global.list)   |   0.24%  |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Proxy)    | 5984   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple/Repeat/Proxy.list)   |   0.03%  |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Surge 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Apple/Apple.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/Apple/Apple.list

## 数据来源

本项目的Apple分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的Apple分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Apple.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Apple.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Quantumult/X/Filter/Apple.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Apple_API.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Apple_CDN.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Apple.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/AppleGlobal.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Apple.list


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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的Apple分流规则。

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
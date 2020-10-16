# Google

## 前言

本项目的Google分流规则由爬虫程序自动维护。

定时爬取互联网上开源的Google分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。


最后检查时间：2020-10-18 22:41:26。

## 规则统计

总计规则：64 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| HOST-KEYWORD | 3 |
| HOST-SUFFIX | 58 |
| USER-AGENT | 3 |
## 重复统计

Google分流规则，与本项目其他分流规则重复情况统计。

点击重复数量可以查看重复规则明细。

| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/BlackList)    | 777   | [37](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Google/Repeat/BlackList.list)   |   4.76%  |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/YouTube)    | 14   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Google/Repeat/YouTube.list)   |   14.29%  |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Global)    | 837   | [56](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Google/Repeat/Global.list)   |   6.69%  |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/GlobalMedia)    | 296   | [3](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Google/Repeat/GlobalMedia.list)   |   1.01%  |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Spark)    | 4   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Google/Repeat/Spark.list)   |   25.00%  |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Proxy)    | 5981   | [53](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX/Google/Repeat/Proxy.list)   |   0.89%  |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### QuantumultX 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Google/Google.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/QuantumultX/Google/Google.list

## 数据来源

本项目的Google分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的Google分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Google/GoogleDrive.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Google/GoogleSearch.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Google.list


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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的Google分流规则。

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
# 去广告测试版

## 前言

本项目的去广告测试版分流规则由爬虫程序自动维护。

定时爬取互联网上开源的去广告测试版分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。

本分流规则不包含任何知乎去广告规则。测试版的去广告规则，会将所有已知的去广告规则作为数据源，不考虑APP承受能力，不考虑误拦截的问题，也无法处理任何关于误拦截的反馈。如果出现误拦截，建议搭配WhiteList分流规则进行修正，将其置于本分流规则之前，并进行放行。

最后检查时间：2020-10-19 11:32:34。

## 规则统计

总计规则：150581 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 95500 |
| DOMAIN-KEYWORD | 56 |
| DOMAIN-SUFFIX | 54435 |
| IP-CIDR | 243 |
| URL-REGEX | 347 |
## 重复统计

去广告测试版分流规则，与本项目其他分流规则重复情况统计。

点击重复数量可以查看重复规则明细。

| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Adobe)    | 34   | [6](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Adobe.list)   |   17.65%  |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Advertising)    | 140101   | [140101](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Advertising.list)   |   100.00%  |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingLite)    | 44380   | [44380](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/AdvertisingLite.list)   |   100.00%  |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Apple)    | 50   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Apple.list)   |   2.00%  |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList)    | 777   | [31](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/BlackList.list)   |   3.99%  |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/China)    | 598   | [10](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/China.list)   |   1.67%  |
|  [ChinaMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaMedia)    | 75   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/ChinaMedia.list)   |   1.33%  |
|  [WhiteList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WhiteList)    | 35   | [5](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/WhiteList.list)   |   14.29%  |
|  [YouTube](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YouTube)    | 14   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/YouTube.list)   |   14.29%  |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Microsoft)    | 98   | [2](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Microsoft.list)   |   2.04%  |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Niconico)    | 5   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Niconico.list)   |   20.00%  |
|  [NetEaseMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NetEaseMusic)    | 50   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/NetEaseMusic.list)   |   2.00%  |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global)    | 841   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Global.list)   |   0.83%  |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/GlobalMedia)    | 296   | [7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/GlobalMedia.list)   |   2.36%  |
|  [Hijacking](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Hijacking)    | 209   | [209](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Hijacking.list)   |   100.00%  |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spark)    | 4   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Spark.list)   |   25.00%  |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Privacy)    | 2714   | [2688](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Privacy.list)   |   99.04%  |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Proxy)    | 5984   | [99](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Proxy.list)   |   1.65%  |
|  [Tencent](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Tencent)    | 19   | [1](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest/Repeat/Tencent.list)   |   5.26%  |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Loon 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/AdvertisingTest/AdvertisingTest.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/AdvertisingTest/Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/AdvertisingTest/AdvertisingTest.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/AdvertisingTest/Domain.list

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 数据来源

本项目的去广告测试版分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的去广告测试版分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/NobyDa/ND-AD/master/QuantumultX/AD_Block.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/QuantumultX/AD_Block_Plus.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block_Add.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block_Plus.txt
- https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/AdRule.list
- https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/AdRuleTest.list
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/AdRule.list
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/AdRuleTest.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Advertising.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Guard/Advertising.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Hijacking.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Advertising.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/QuantumultX/Filter/Liby.txt
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Liby.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Tide.list
- https://raw.githubusercontent.com/scomper/surge-list/master/reject.list
- https://raw.githubusercontent.com/scomper/surge-list/master/adblock.list
- https://raw.githubusercontent.com/nzw9314/Surge/master/Ruleset/Tide.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Reject.list
- https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/Advertising.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/LianXiangJia/LianXiangJia.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/connershua/Quantumult/X/Filter/Advertising.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/adaway.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/base-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/chinese-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/neohosts-full.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/tracking-protection-filter.txt


感谢以上分流规则作者的辛勤付出（排名不分先后）。

如果您有更好的分流规则，欢迎提交给我，我会将它加到数据源中继续完善。

## 最后

### 去广告问题

本项目的去广告测试版规则仅是将网络上开源的去广告规则整合去重，**非实际规则维护者**。数据源规则无法去除的广告，本项目的去广告测试版规则也无能为力。

所以很抱歉，没办法处理关于某个APP无法去除广告的反馈，除非您能明确数据源的规则可以去除，而整合后的规则无法去除。同样，也没办法协助您处理去广告测试版规则误拦截的问题，除非您能明确告知哪条规则存在问题，我会将其加入规则黑名单，下次爬虫程序更新时将其去除。

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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的去广告测试版分流规则。

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
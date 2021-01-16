# ChinaMedia

## 前言

本项目的ChinaMedia分流规则由爬虫程序自动维护。

定时爬取互联网上开源的ChinaMedia分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。



最后检查时间：2021-01-17 03:17:45。

## 规则统计

总计规则：112 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 6 |
| DOMAIN-SUFFIX | 85 |
| DOMAIN-KEYWORD | 2 |
| IP-CIDR | 19 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Clash 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia.yaml

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/ChinaMedia/ChinaMedia.yaml

## 重复统计


当前分流规则，未包含其他子规则。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [BiliBili](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/BiliBili)    | 59   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   22.03% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Baidu)    | 265   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.38% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/China)    | 656   | [31](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   4.73% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ChinaTest)    | 72094   | [45](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.06% |
|  [ChinaIPs](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ChinaIPs)    | 6057   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.03% |
|  [SohuSogo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/SohuSogo)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   20.0% |
|  [Tencent](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Tencent)    | 289   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.35% |
|  [NetEase](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/NetEase)    | 112   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   8.04% |
|  [NetEaseMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/NetEaseMusic)    | 22   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   50.0% |
|  [TencentVideo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TencentVideo)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   50.0% |
|  [iQIYI](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/iQIYI)    | 43   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   18.6% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Alibaba)    | 1222   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.41% |
|  [56](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/56)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   20.0% |
|  [AcFun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AcFun)    | 4   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [ChinaMobile](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/ChinaMobile)    | 28   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   10.71% |
|  [HunanTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/HunanTV)    | 7   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   42.86% |
|  [KugouKuwo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/KugouKuwo)    | 108   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   2.78% |
|  [LeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/LeTV)    | 13   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   7.69% |
|  [Migu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Migu)    | 3   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Sohu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Sohu)    | 53   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   5.66% |
|  [TaiheMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/TaiheMusic)    | 8   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   12.5% |
|  [XiamiMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/XiamiMusic)    | 3   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   66.67% |
|  [YYeTs](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/YYeTs)    | 21   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   33.33% |
|  [YoukuTudou](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/YoukuTudou)    | 34   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   8.82% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AdvertisingLite)    | 26475   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.08% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Advertising)    | 56949   | [24](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.04% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AdvertisingTest)    | 74242   | [24](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.03% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/Proxy)    | 27871   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   0.01% |
|  [AsianMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/AsianMedia)    | 22   | [19](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   86.36% |
|  [WeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash/WeTV)    | 7   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia_Repeat.list)   |   14.29% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的ChinaMedia分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的ChinaMedia分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/DomesticMedia.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/CMedia.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/ChinaMedia.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/Tencent%20Video.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/DomesticMedia.list


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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的ChinaMedia分流规则。

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
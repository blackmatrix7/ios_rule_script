# ChinaMedia

## 前言

本项目的ChinaMedia分流规则由爬虫程序自动维护。

定时爬取互联网上开源的ChinaMedia分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。



最后检查时间：2021-01-27 16:25:18。

## 规则统计

总计规则：299 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 2 |
| USER-AGENT | 35 |
| DOMAIN-SUFFIX | 221 |
| DOMAIN-KEYWORD | 2 |
| IP-CIDR | 39 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Shadowrocket 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Shadowrocket/ChinaMedia/ChinaMedia.list

## 重复统计

当前分流规则，已包含以下子规则：

- CCTV

- NetEaseMusic

- BiliBili

- LeTV

- TencentVideo

- Himalaya

- Douyu

- iQIYI

- Youku

除非特殊需求，否则不建议重复引用。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [BiliBili](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/BiliBili)    | 62   | [62](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Baidu)    | 265   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   0.38% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/China)    | 688   | [50](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   7.27% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/ChinaTest)    | 71610   | [86](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   0.12% |
|  [ChinaIPs](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/ChinaIPs)    | 6057   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   0.05% |
|  [SohuSogo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/SohuSogo)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   20.0% |
|  [CCTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/CCTV)    | 42   | [42](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Tencent](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Tencent)    | 294   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   5.44% |
|  [NetEase](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/NetEase)    | 118   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   18.64% |
|  [NetEaseMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/NetEaseMusic)    | 28   | [28](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Youku](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Youku)    | 1   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [TencentVideo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/TencentVideo)    | 2   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   50.0% |
|  [iQIYI](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/iQIYI)    | 48   | [48](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Douyu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Douyu)    | 10   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Himalaya](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Himalaya)    | 18   | [18](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Alibaba)    | 1222   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   0.49% |
|  [56](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/56)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   20.0% |
|  [AcFun](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/AcFun)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [ChinaMobile](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/ChinaMobile)    | 28   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   10.71% |
|  [HunanTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/HunanTV)    | 8   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   50.0% |
|  [KugouKuwo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/KugouKuwo)    | 109   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   3.67% |
|  [LeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/LeTV)    | 13   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Migu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Migu)    | 5   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   100.0% |
|  [Sohu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Sohu)    | 53   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   5.66% |
|  [TaiheMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/TaiheMusic)    | 9   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   22.22% |
|  [XiamiMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/XiamiMusic)    | 5   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   80.0% |
|  [YYeTs](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/YYeTs)    | 21   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   33.33% |
|  [YoukuTudou](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/YoukuTudou)    | 36   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   13.89% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/AdvertisingLite)    | 27339   | [14](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   0.05% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Advertising)    | 59402   | [17](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   0.03% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/AdvertisingTest)    | 76197   | [17](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   0.02% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/Proxy)    | 28077   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   0.01% |
|  [AsianMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/AsianMedia)    | 27   | [24](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   88.89% |
|  [WeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket/WeTV)    | 7   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaMedia/ChinaMedia_Repeat.list)   |   14.29% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的ChinaMedia分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的ChinaMedia分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/CCTV.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Douyu.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/TencentVideo.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Ximalaya.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Youku.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/DomesticMedia.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Podcast/Himalaya.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/CMedia.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BiliBili.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BiliBili.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CCTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/DouYu.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/LeTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/NeteaseMusic.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/XiMaLaYa.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/iQIYI.list
- https://raw.githubusercontent.com/Mazetsz/ACL4SSR/master/Clash/NetEaseCloudMusic.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/ChinaMedia.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Bilibili.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/Netease%20Music.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/Tencent%20Video.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/Tencent%20Video.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/iQiyi.list
- https://raw.githubusercontent.com/nzw9314/QuantumultX/master/NeteaseMusic.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/Domestic/Bilibili.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/Domestic/Tencent.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/Domestic/iQiyi.list
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
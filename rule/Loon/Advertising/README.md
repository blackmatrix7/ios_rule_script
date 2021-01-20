# 去广告

## 前言

本项目的去广告分流规则由爬虫程序自动维护。

定时爬取互联网上开源的去广告分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。

**Advertising会有一定的误杀，需要能自行抓包处理误杀问题，欢迎反馈误杀的规则。如果希望减少误杀的情况，可以尝试使用Lite版本，或者自定义一些放行的规则。**

去广告分流规则中含有URL-REGEX类型，此类的规则对于HTTPS请求需要MITM使用才能生效。程序已默认根据正则推导一份MITM的模块/复写/插件在当前分流规则的目录中，便于参考搭配使用。

最后检查时间：2021-01-21 03:22:36。

## 规则统计

总计规则：58455 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-SUFFIX | 42565 |
| DOMAIN | 15279 |
| DOMAIN-KEYWORD | 61 |
| IP-CIDR | 240 |
| URL-REGEX | 310 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Loon 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/Advertising/Advertising.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/Advertising/Advertising_Domain.list

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 重复统计

当前分流规则，已包含以下子规则：

- Privacy

- AdvertisingLite

- Hijacking

除非特殊需求，否则不建议重复引用。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [WhiteList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WhiteList)    | 25   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   4.0% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Baidu)    | 265   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   2.26% |
|  [360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/360)    | 249   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.61% |
|  [XiaoMi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/XiaoMi)    | 112   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.79% |
|  [ByteDance](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ByteDance)    | 202   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.49% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/China)    | 688   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.89% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaTest)    | 71784   | [1155](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.61% |
|  [Tencent](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Tencent)    | 294   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.36% |
|  [ChinaMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaMedia)    | 141   | [24](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   17.02% |
|  [NetEaseMusic](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NetEaseMusic)    | 28   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   3.57% |
|  [iQIYI](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/iQIYI)    | 48   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   2.08% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Alibaba)    | 1222   | [13](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.06% |
|  [17173](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/17173)    | 57   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.75% |
|  [178](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/178)    | 22   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   4.55% |
|  [AliPay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AliPay)    | 13   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   7.69% |
|  [BaiFenDian](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BaiFenDian)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   20.0% |
|  [CNNIC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/CNNIC)    | 50   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   6.0% |
|  [Camera360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Camera360)    | 8   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   12.5% |
|  [ChinaTelecom](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ChinaTelecom)    | 83   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   2.41% |
|  [DiSiFanShi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DiSiFanShi)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   25.0% |
|  [Domob](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Domob)    | 26   | [6](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   23.08% |
|  [FengXiaWangLuo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/FengXiaWangLuo)    | 8   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   25.0% |
|  [HuanJu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HuanJu)    | 20   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   5.0% |
|  [JiGuangTuiSong](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/JiGuangTuiSong)    | 17   | [16](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   94.12% |
|  [Kingsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Kingsoft)    | 253   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   0.79% |
|  [Ku6](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Ku6)    | 11   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   9.09% |
|  [KugouKuwo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/KugouKuwo)    | 109   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   0.92% |
|  [MingLueZhaoHui](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/MingLueZhaoHui)    | 18   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   5.56% |
|  [OuPeng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/OuPeng)    | 9   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   11.11% |
|  [PPTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/PPTV)    | 19   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   5.26% |
|  [Qihoo360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Qihoo360)    | 50   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   2.0% |
|  [ShangHaiJuXiao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ShangHaiJuXiao)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   20.0% |
|  [ShenMa](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ShenMa)    | 13   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   30.77% |
|  [SuiShiChuanMei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/SuiShiChuanMei)    | 14   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   21.43% |
|  [UC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/UC)    | 38   | [23](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   60.53% |
|  [VideoCrack](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/VideoCrack)    | 44   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   2.27% |
|  [WiFiMaster](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WiFiMaster)    | 62   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   6.45% |
|  [YYeTs](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YYeTs)    | 21   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   9.52% |
|  [YiChe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/YiChe)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   20.0% |
|  [ZhiYunZhong](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/ZhiYunZhong)    | 8   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   12.5% |
|  [Hpplay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Hpplay)    | 6   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   16.67% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Apple)    | 103   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   0.97% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Microsoft)    | 99   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.01% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Google)    | 104   | [10](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   9.62% |
|  [AdvertisingLite](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingLite)    | 26839   | [16104](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   60.0% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AdvertisingTest)    | 75459   | [53846](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   71.36% |
|  [Hijacking](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Hijacking)    | 219   | [212](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   96.8% |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Privacy)    | 2835   | [2654](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   93.62% |
|  [Blizzard](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Blizzard)    | 38   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   2.63% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Proxy)    | 27914   | [165](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   0.59% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Global)    | 1293   | [29](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   2.24% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/GlobalMedia)    | 1150   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   0.7% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/BlackList)    | 771   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   2.85% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Disney)    | 132   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   1.52% |
|  [Spark](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Spark)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   20.0% |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Niconico)    | 10   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   10.0% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Adobe)    | 34   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   14.71% |
|  [AbemaTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/AbemaTV)    | 22   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   4.55% |
|  [DAZN](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/DAZN)    | 19   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   5.26% |
|  [Dailymotion](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/Dailymotion)    | 4   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   50.0% |
|  [HBO](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/HBO)    | 31   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   3.23% |
|  [NYTimes](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/NYTimes)    | 16   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   18.75% |
|  [WeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Loon/WeTV)    | 7   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/Advertising/Advertising_Repeat.list)   |   14.29% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的去广告分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的去广告分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/787a68/Rules/master/Surge4/Ruleset/Tide.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Advertising.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Hijacking.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Guard/Advertising.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Advertising.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Hijacking.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Privacy.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Privacy.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Custom/ad-domains.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Custom/video-ad.list
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/QuantumultX/AD_Block.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/QuantumultX/AD_Block_Plus.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block_Add.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block_Plus.txt
- https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/AdRule.list
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/AdRule.list
- https://raw.githubusercontent.com/an0na/R/master/Filter/AdBlock.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/connershua/Quantumult/X/Filter/Advertising.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/Advertising.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/LianXiangJia/LianXiangJia.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/QuantumultX/Filter/Liby.txt
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Liby.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Tide.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Reject.list
- https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Adblock4limbo.list
- https://raw.githubusercontent.com/nzw9314/Surge/master/Ruleset/Tide.list
- https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt
- https://raw.githubusercontent.com/scomper/surge-list/master/adblock.list
- https://raw.githubusercontent.com/scomper/surge-list/master/reject.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/AdReject.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/Hijacking.list


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

### 去广告问题

本项目的去广告规则仅是将网络上开源的去广告规则整合去重，**非实际规则维护者**。数据源规则无法去除的广告，本项目的去广告规则也无能为力。

所以很抱歉，没办法处理关于某个APP无法去除广告的反馈，除非您能明确数据源的规则可以去除，而整合后的规则无法去除。同样，也没办法协助您处理去广告规则误拦截的问题，除非您能明确告知哪条规则存在问题，我会将其加入规则黑名单，下次爬虫程序更新时将其去除。

### 特定APP去广告

#### 知乎

本规则不包含知乎去广告，知乎去广告请移步：https://github.com/blackmatrix7/ios_rule_script/tree/master/script/zhihu

#### 哔哩哔哩

如需更完整的哔哩哔哩去广告，请移步：https://github.com/blackmatrix7/ios_rule_script/tree/master/script/bilibili

#### YouTube

本规则不包含YouTube去广告，请自行寻找其他解决方案。

### 完善规则

如果您：

1. 有更优的原始规则数据
2. 有更多的黑名单规则数据
3. 有更好的优化建议
4. 在使用分流规则时出现异常
5. 有其他问题

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的去广告分流规则。

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
# 去广告精简版

## 前言

本项目的去广告精简版分流规则由爬虫程序自动维护。

定时爬取互联网上开源的去广告精简版分流规则，将其进行清洗、去重、合并、优化后，形成单一的分流规则文件，旨在解决引用大量外部规则造成规则重复的问题。

**可能存在部分误拦截，建议搭配WhiteList分流规则进行修正，将其置于本分流规则之前，并进行放行。**

去广告精简版分流规则中含有URL-REGEX类型，此类的规则对于HTTPS请求需要MITM使用才能生效。程序已默认根据正则推导一份MITM的模块/复写/插件在当前分流规则的目录中，便于参考搭配使用。

最后检查时间：2021-01-15 03:21:42。

## 规则统计

总计规则：19208 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN-KEYWORD | 27 |
| DOMAIN-SUFFIX | 15241 |
| DOMAIN | 3446 |
| IP-CIDR | 192 |
| URL-REGEX | 302 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Surge 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/AdvertisingLite/AdvertisingLite.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/AdvertisingLite/AdvertisingLite_Domain.list

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

### 特别说明

AdvertisingLite.list请使用RULE-SET。

AdvertisingLite_Domain.list请使用DOMAIN-SET。

## 重复统计


当前分流规则，未包含其他子规则。


当前分流规则，与本项目其他分流规则重复情况统计(点击重复数量可查看明细)。



| 名称 | 数量 | 重复 | 重合度 |
| ---- | ---- | ---- | ------ |
|  [WhiteList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/WhiteList)    | 24   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   4.17% |
|  [Baidu](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Baidu)    | 265   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   1.89% |
|  [360](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/360)    | 249   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.8% |
|  [XiaoMi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/XiaoMi)    | 112   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.89% |
|  [ByteDance](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ByteDance)    | 202   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.5% |
|  [China](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/China)    | 688   | [7](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   1.02% |
|  [ChinaTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ChinaTest)    | 72126   | [650](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.9% |
|  [Tencent](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Tencent)    | 294   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.68% |
|  [ChinaMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ChinaMedia)    | 141   | [22](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   15.6% |
|  [Alibaba](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Alibaba)    | 1222   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.41% |
|  [178](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/178)    | 22   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   4.55% |
|  [AliPay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AliPay)    | 13   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   7.69% |
|  [BaiFenDian](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BaiFenDian)    | 10   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   20.0% |
|  [CNNIC](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/CNNIC)    | 50   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   6.0% |
|  [DiSiFanShi](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/DiSiFanShi)    | 4   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   25.0% |
|  [Domob](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Domob)    | 26   | [5](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   19.23% |
|  [JiGuangTuiSong](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/JiGuangTuiSong)    | 17   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   11.76% |
|  [Kingsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Kingsoft)    | 253   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.79% |
|  [KugouKuwo](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/KugouKuwo)    | 109   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.92% |
|  [MingLueZhaoHui](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/MingLueZhaoHui)    | 18   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   5.56% |
|  [OuPeng](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/OuPeng)    | 9   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   11.11% |
|  [PPTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/PPTV)    | 19   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   5.26% |
|  [ShangHaiJuXiao](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ShangHaiJuXiao)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   20.0% |
|  [ShenMa](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ShenMa)    | 13   | [3](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   23.08% |
|  [SuiShiChuanMei](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/SuiShiChuanMei)    | 14   | [2](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   14.29% |
|  [VideoCrack](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/VideoCrack)    | 44   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   2.27% |
|  [YiChe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/YiChe)    | 5   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   20.0% |
|  [ZhiYunZhong](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/ZhiYunZhong)    | 8   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   12.5% |
|  [Hpplay](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Hpplay)    | 6   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   16.67% |
|  [Apple](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Apple)    | 107   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.93% |
|  [Microsoft](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Microsoft)    | 101   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.99% |
|  [Google](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Google)    | 111   | [8](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   7.21% |
|  [Advertising](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Advertising)    | 46295   | [15412](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   33.29% |
|  [AdvertisingTest](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/AdvertisingTest)    | 66645   | [15241](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   22.87% |
|  [Hijacking](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Hijacking)    | 219   | [200](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   91.32% |
|  [Privacy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Privacy)    | 2834   | [2347](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   82.82% |
|  [Proxy](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Proxy)    | 27896   | [59](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.21% |
|  [Global](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Global)    | 1294   | [11](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.85% |
|  [GlobalMedia](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/GlobalMedia)    | 1150   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.35% |
|  [BlackList](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/BlackList)    | 772   | [9](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   1.17% |
|  [Disney](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Disney)    | 132   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   0.76% |
|  [Niconico](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Niconico)    | 10   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   10.0% |
|  [Adobe](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/Adobe)    | 34   | [4](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   11.76% |
|  [WeTV](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Surge/WeTV)    | 7   | [1](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingLite/AdvertisingLite_Repeat.list)   |   14.29% |
### 特别说明
程序在实际运算时，会根据DOMAIN、DOMAIN-SUFFIX、IP-CIDR、IP-CIDR6间的包含关系进行去重，而出于运行效率考虑，重复规则只统计纯文本匹配，所以可能与实际效果有所出入，仅供参考。

## 数据来源

本项目的去广告精简版分流规则的数据来自以下链接，通常已涵盖所有数据来源的分流规则。如果你正在使用这些分流规则，建议不要与本项目的去广告精简版分流规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Advertising.list
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block.txt
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/AdRule.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/Advertising.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/LianXiangJia/LianXiangJia.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Liby.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Tide.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Reject.list


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

本项目的去广告精简版规则仅是将网络上开源的去广告规则整合去重，**非实际规则维护者**。数据源规则无法去除的广告，本项目的去广告精简版规则也无能为力。

所以很抱歉，没办法处理关于某个APP无法去除广告的反馈，除非您能明确数据源的规则可以去除，而整合后的规则无法去除。同样，也没办法协助您处理去广告精简版规则误拦截的问题，除非您能明确告知哪条规则存在问题，我会将其加入规则黑名单，下次爬虫程序更新时将其去除。

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

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的去广告精简版分流规则。

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
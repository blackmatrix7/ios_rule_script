# 去广告

## 前言

本项目的去广告复写规则由爬虫程序自动维护。

定时爬取互联网上开源的去广告复写规则，将其进行清洗、去重、合并、优化后，形成单一的复写规则文件，旨在解决引用大量外部规则造成规则重复的问题。




最后检查时间：2020-12-16 03:37:01。

## 复写统计

| 类型 | 数量(条) |
| ---- | ---- |
| mitm | 537 |
| reject | 791 |
## 配置说明

实时版：爬虫程序定时更新，更新频率高，能尽快同步数据源变化

稳定版：不定时手动更新，更新频率低，稳定性好

### Surge 

实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/Surge/Advertising/Advertising.sgmodule

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/Surge/Advertising/Advertising.sgmodule

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 数据来源

本项目的去广告复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。如果你正在使用这些复写规则，请先删除后再使用本项目的去广告复写规则，以免造成规则重复。

- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Rewrite/Block/Advertising.conf
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Module/Block/Advertising.sgmodule
- https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/Rewrite_lhie1.conf
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Module/RewriteRules.sgmodule
- https://raw.githubusercontent.com/Tartarus2014/For-own-use/master/Loon/Advertising.conf
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.sgmodule
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rewrite/Advertising/advertising.lnplugin
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rewrite/Advertising/advertising.lnwrite
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rewrite/Advertising/advertising.sgmodule
- https://raw.githubusercontent.com/eHpo1/Rules/master/Loon/Rewrite.conf
- https://raw.githubusercontent.com/eHpo1/Rules/master/QuantumultX/Rewrite.txt


感谢以上复写规则作者的辛勤付出（排名不分先后）。

如果你有更好的复写规则，欢迎提交给我，我会将它加到数据源中继续完善。

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

### 脚本处理

去广告复写规则已将所有涉及脚本处理的复写去除，请知悉。

### 正则合并

爬虫程序除对完全一样的正则表达式进行去重外，还会通过算法对较为相似的正则进行去重合并。目前算法初步初步过滤600多条相似的正则。但因为正则表达式的复杂性，算法无法100%精确过滤所有重复正则，并可能误过滤一些相似但并不重复的正则。如果你在使用中，发现以上的情况，欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈。

### 正则校验

从2020年11月25日开始，爬虫程序加入对正则合法性的校验。对于无法校验通过，且不明作用的正则，直接抛弃。如果对比数据源发现正则类型的规则较少，则很大可能是错误的正则都已被过滤掉。

### MITM

爬虫程序除保留数据源中的MITM主机名外， 还会通过算法，根据正则反推部分主机名，用于补充数据源中可能遗漏的MITM主机名。但因为正则表达式的复杂性，算法无法100%反推所有的正确主机名。如果你在使用中，发现主机名错误的情况，欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈。

### 正则过滤

爬虫程序在清洗原始复写数据时，可根据正则定向过滤规则，以达到保留特定复写的目的。经过正则过滤的复写，无法100%涵盖原始复写数据，请知悉。

### 黑名单

爬虫程序内置部分复写黑名单，在对原始数据进行清洗时，自动将可能引起异常的黑名单复写去除。经过黑名单去除的复写，无法100%涵盖原始复写数据，请知悉。

### 完善复写

如果你：

1. 有更优的原始复写数据
2. 有更多的黑名单复写数据
3. 有更好的优化建议
4. 在使用复写规则时出现异常
5. 有其他问题

欢迎通过[issues](https://github.com/blackmatrix7/ios_rule_script/issues/new)提交反馈，共同完善本项目的去广告复写规则。

感谢

[@Tartarus2014](https://github.com/Tartarus2014)

提供规则数据源及改进建议
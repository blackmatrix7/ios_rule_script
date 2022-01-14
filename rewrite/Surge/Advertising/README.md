# 复写去广告

## 前言

本项目的复写去广告规则由《规则生成器》自动整合与去重。

复写规则所有数据均收集自开源项目，仅为解决引用过多外部资源引起的规则重复问题，不代表我们支持或使用这些服务。

请通过我国(中华人民共和国)合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。
## 规则说明
与AdvertisingLite的区别：

数据源完全相同，AdvertisingLite会去除一些过于宽泛的匹配规则，减少MITM的数量。

## 复写统计

| 类型 | 数量(条) |
| ---- | ---- |
| mitm | 602 |
| force_http_engine_hosts | 12 |
| DOMAIN-SUFFIX | 1 |
| DOMAIN | 2 |
| reject | 791 |
## 配置说明

实时版：程序定时更新，更新频率高，能尽快同步数据源变化，适合希望尝鲜的人。

稳定版：不定时手动更新，更新频率低，适合不希望规则频繁变化的人。

稳定版中如含有JavaScript脚本，所引用的脚本链接为实时版或外部链接，可能会与预期效果有出入，建议使用实时版。

### Surge 

实时版：


https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/Surge/Advertising/Advertising.sgmodule

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/Surge/Advertising/Advertising_Classical.sgmodule

稳定版：


https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/Surge/Advertising/Advertising.sgmodule

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/Surge/Advertising/Advertising_Classical.sgmodule

如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

### 特别说明

Advertising.sgmodule 使用Mock模拟reject-dict等结果。

Advertising_Classical.sgmodule 采用传统的reject方式直接拒绝请求。

根据个人需求，二选一使用即可。

## 数据来源

本项目的复写去广告复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。

如果你正在使用这些复写规则，建议不要与本项目的复写去广告复写规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Rewrite/Block/Advertising.conf
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Module/Block/Advertising.sgmodule
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Shortcuts/reject.txt
- https://raw.githubusercontent.com/GFBG-IT/QuantumultX/main/Advertising.conf
- https://raw.githubusercontent.com/GeQ1an/Rules/master/Loon/Rewrite/Rewrite.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Rewrite/Rewrite.list
- https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/Rewrite_lhie1.conf
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Module/RewriteRules.sgmodule
- https://raw.githubusercontent.com/Tartarus2014/For-own-use/master/Loon/Advertising.conf
- https://raw.githubusercontent.com/Tartarus2014/Loon-Script/master/Plugin/Block/Advertising.plugin
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rewrite/Advertising/advertising.qxrewrite
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rewrite/Advertising/advertising.sgmodule
- https://raw.githubusercontent.com/eHpo1/Rules/master/Loon/Rewrite.conf
- https://raw.githubusercontent.com/eHpo1/Rules/master/QuantumultX/Rewrite.txt
- https://raw.githubusercontent.com/githubacct001/QuantumultX/master/Rewrite/githubacct001.conf


感谢以上复写规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@Tartarus2014](https://github.com/Tartarus2014)  [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
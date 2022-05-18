# 去广告测试版

## 前言

本项目的去广告测试版规则由《规则生成器》自动整合与去重。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自开源项目，仅为解决引用过多外部资源引起的规则重复问题，不代表我们支持或使用这些服务。

请通过我国(中华人民共和国)合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
测试版的去广告规则，会将所有已知的去广告规则作为数据源，不考虑APP承受能力，不考虑误拦截的问题，也无法处理任何关于误拦截的反馈。

## MITM
去广告测试版分流规则中含有URL-REGEX类型，此类的规则对于HTTPS请求需要使用MITM才能生效。

程序已根据正则推导一份MITM的模块/复写/插件在当前目录中，推导结果可能存在冗余、遗漏或错误，仅供参考。

## 规则统计

总计规则：137622 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| DOMAIN | 46608 |
| DOMAIN-KEYWORD | 85 |
| DOMAIN-SUFFIX | 90371 |
| IP-CIDR | 255 |
| IP-CIDR6 | 1 |
| URL-REGEX | 302 |
## 配置说明

实时版：程序定时更新，更新频率高，能尽快同步数据源变化，适合希望尝鲜的人。

稳定版：不定时手动更新，更新频率低，适合不希望规则频繁变化的人。

### Surge 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingTest/AdvertisingTest.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingTest/AdvertisingTest_Domain.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/AdvertisingTest/AdvertisingTest.list

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/AdvertisingTest/AdvertisingTest_Domain.list



如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

### 特别说明

AdvertisingTest.list 请使用RULE-SET。

AdvertisingTest_Domain.list 请使用DOMAIN-SET。

两者必须同时使用。

## 子规则/排除规则

当前分流规则，已包含以下子规则：

- Advertising

- AdvertisingLite

- Hijacking

- Privacy

除非特殊需求，否则不建议重复引用。

## 数据来源

本项目的去广告测试版复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。

如果你正在使用这些复写规则，建议不要与本项目的去广告测试版复写规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/787a68/Rules/master/Surge4/Ruleset/Liby.list
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
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/AdvertisingPlus.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Hijacking.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Guard/Privacy.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/AdBlock.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Custom/ad-domains.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Custom/video-ad.list
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/reject.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/reject.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/QuantumultX/AD_Block.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/QuantumultX/AD_Block_Plus.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block_Add.txt
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block_Plus.txt
- https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/AdRule.list
- https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/AdRuleTest.list
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/AdRule.list
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/AdRuleTest.list
- https://raw.githubusercontent.com/an0na/R/master/Filter/AdBlock.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/connershua/Quantumult/X/Filter/Advertising.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/Advertising.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/LianXiangJia/LianXiangJia.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/QuantumultX/Filter/Liby.txt
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Liby.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Tide.list
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/adaway.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/annoyances-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/base-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/chinese-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/dns-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/neohosts-full.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/social-media-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/tracking-protection-filter.txt
- https://raw.githubusercontent.com/githubacct001/QuantumultX/master/Filters/githubacct001_AD.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Reject.list
- https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Adblock4limbo.list
- https://raw.githubusercontent.com/mieqq/mieqq/master/In-AppTracker.txt
- https://raw.githubusercontent.com/nzw9314/Surge/master/Ruleset/Tide.list
- https://raw.githubusercontent.com/scomper/surge-list/master/adblock.list
- https://raw.githubusercontent.com/scomper/surge-list/master/reject.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/AdReject.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/Hijacking.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/NormalApp/AppAdBlock.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/antiAD-V4.list
- https://raw.githubusercontent.com/yjqiang/surge_scripts/main/modules/hupu/hupu.sgmodule


感谢以上复写规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
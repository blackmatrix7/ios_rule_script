# 🧸 去广告测试版

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-移除无法解析的域名-important) ![](https://shields.io/badge/-DOMAIN与DOMAIN--SUFFIX合并-green) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN与DOMAIN--KEYWORD合并-9cf) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet) ![](https://shields.io/badge/-MITM--HOSTNAME合并-brightgreen) ![](https://shields.io/badge/-正则推导HOSTNAME-033da7) 

去广告测试版规则由《RULE GENERATOR 规则生成器》自动生成。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
测试版的去广告规则。

会将所有已知的去广告规则作为数据源，不考虑APP承受能力，不考虑误拦截的问题。

也无法处理任何关于误拦截的反馈。

如无必要，非常不建议使用，可能会有严重的副作用。

## 规则统计

最后更新时间：2026-08-04 03:23:42

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| AND | 1  | 
| DOMAIN | 13171  | 
| DOMAIN-KEYWORD | 280  | 
| DOMAIN-SUFFIX | 274656  | 
| IP-CIDR | 508  | 
| IP-CIDR6 | 3  | 
| URL-REGEX | 14  | 
| TOTAL | 288633  | 


## Surge 

#### 使用说明
- AdvertisingTest.list，请使用RULE-SET。
- AdvertisingTest_Resolve.list，请使用RULE-SET。
- AdvertisingTest_Domain.list，请使用DOMAIN-SET。
- URL-REGEX类型的规则，在HTTPS协议中，需要配合MITM使用。规则生成器已尝试推导MITM的配置AdvertisingTest_MITM.sgmodule，仅供参考。

#### 文件区别
- AdvertisingTest_All.list与AdvertisingTest_All_No_Resolve.list为 Surge 5.21.0(2952) 以上版本使用
- AdvertisingTest_Resolve.list与AdvertisingTest.list的区别仅在于后者IP-CIDR(6)类型带no-resolve。

#### 配置建议
- Surge 5.21.0(2952)以上版本使用以下配置：
- AdvertisingTest_All.list 单独使用。
- AdvertisingTest_All_No_Resolve.list 单独使用。
- Surge 5.21.0(2952)以下版本使用以下配置：
- AdvertisingTest.list、AdvertisingTest_Domain.list 共同使用。
- AdvertisingTest_Resolve.list、AdvertisingTest_Domain.list 共同使用。

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingTest/AdvertisingTest.list

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Surge/AdvertisingTest/AdvertisingTest.list

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AdvertisingTest/AdvertisingTest.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/AdvertisingTest/AdvertisingTest.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Surge/AdvertisingTest/AdvertisingTest.list

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/AdvertisingTest/AdvertisingTest.list

## 子规则/排除规则

当前分流规则，已包含以下子规则，除非特殊需求否则不建议重复引用：
| 子规则  |  |  |  |  | 
| ---- | ---- | ---- | ---- | ----  |
| AdGuardSDNSFilter | Advertising | AdvertisingLite | AdvertisingMiTV | EasyPrivacy  | 
| Hijacking | Privacy  |  |  |  | 


## 数据来源

《去广告测试版》的数据来自以下链接，如与本项目的《去广告测试版》规则混合使用，可能会造成规则大量重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list
- https://raw.githubusercontent.com/NobyDa/ND-AD/master/Surge/AD_Block.txt
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/AdRule.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/Advertising.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Advertising/LianXiangJia/LianXiangJia.list
- https://raw.githubusercontent.com/scomper/surge-list/master/reject.list
- https://raw.githubusercontent.com/scomper/surge-list/master/adblock.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list
- https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Adblock4limbo.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Custom/ad-domains.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Custom/video-ad.list
- https://raw.githubusercontent.com/an0na/R/master/Filter/AdBlock.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/AdReject.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/Hijacking.list
- https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/AdRuleTest.list
- https://raw.githubusercontent.com/NobyDa/Script/master/Surge/AdRuleTest.list
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/adaway.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/base-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/chinese-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/neohosts-full.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/tracking-protection-filter.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/reject.txt
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/AdBlock.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/antiAD-V4.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Advertising/NormalApp/AppAdBlock.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/annoyances-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/social-media-filter.txt
- https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/dns-filter.txt
- https://raw.githubusercontent.com/mieqq/mieqq/master/In-AppTracker.txt
- https://raw.githubusercontent.com/yjqiang/surge_scripts/main/modules/hupu/hupu.sgmodule
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/reject.txt
- https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt
- https://easylist-downloads.adblockplus.org/easyprivacy.txt
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Adblock/Adblock.list
- https://raw.githubusercontent.com/zqzess/rule_for_quantumultX/master/QuantumultX/rules/AdBlock.list


感谢以上规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
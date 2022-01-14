# Apple

## 前言

本项目的Apple规则由《规则生成器》自动整合与去重。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自开源项目，仅为解决引用过多外部资源引起的规则重复问题，不代表我们支持或使用这些服务。

请通过我国(中华人民共和国)合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则统计

总计规则：104 条。

各类型规则统计：

| 类型 | 数量(条) |
| ---- | ---- |
| HOST | 3 |
| HOST-SUFFIX | 77 |
| HOST-KEYWORD | 7 |
| USER-AGENT | 7 |
| IP-CIDR | 10 |
## 配置说明

实时版：程序定时更新，更新频率高，能尽快同步数据源变化，适合希望尝鲜的人。

稳定版：不定时手动更新，更新频率低，适合不希望规则频繁变化的人。

### QuantumultX 
实时版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list

稳定版：

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/QuantumultX/Apple/Apple.list



如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 子规则/排除规则

当前分流规则，已包含以下子规则：

- AppStore

- AppleMail

- AppleMusic

- AppleNews

- AppleProxy

- AppleTV

- FindMy

- FitnessPlus

- Siri

- TestFlight

- iCloud

- iCloudPrivateRelay

除非特殊需求，否则不建议重复引用。

## 数据来源

本项目的Apple复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。

如果你正在使用这些复写规则，建议不要与本项目的Apple复写规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Apple.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/AppleNews.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/AppleTV.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Quantumult/X/Filter/Apple.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/Apple.list
- https://raw.githubusercontent.com/ConnersHua/Profiles/master/Surge/Ruleset/AppleNews.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/AppStore.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/AppStoreConnect.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/Apple.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/FindMy.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/FitnessPlus.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/Mail.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/Music.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/News.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/Siri.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/TestFlight.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Extra/Apple/iCloud.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/Apple.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/FindMy.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/FitnessPlus.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/Mail.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/Music.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/News.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/Siri.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/TV.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/TestFlight.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/Apple/iCloud.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Apple.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/Apple-proxy.list
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/apple.txt
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/icloud.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/apple.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/icloud.txt
- https://raw.githubusercontent.com/VirgilClyne/iRingo/main/RuleSet/iCloud_Private_Relay.yaml
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppStore/AppStore.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppleBlock/AppleBlock.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/TestFlight/TestFlight.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Apple_API.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Apple_CDN.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Apple.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/AppleGlobal.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/AppleNews.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Apple.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/Apple.list


感谢以上复写规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
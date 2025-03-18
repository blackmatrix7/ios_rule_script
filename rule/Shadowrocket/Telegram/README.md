# 🧸 Telegram

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-DOMAIN与DOMAIN--SUFFIX合并-green) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet) 

Telegram规则由《RULE GENERATOR 规则生成器》自动生成。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则统计

最后更新时间：2025-03-19 02:13:45

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| DOMAIN | 2  | 
| DOMAIN-KEYWORD | 1  | 
| DOMAIN-SUFFIX | 22  | 
| IP-ASN | 5  | 
| IP-CIDR | 8  | 
| TOTAL | 38  | 


## Shadowrocket 

#### 使用说明
- Telegram.list，请使用RULE-SET。
- Telegram_Resolve.list，请使用RULE-SET。

#### 文件区别
- Telegram_Resolve.list与Telegram.list的区别仅在于后者IP-CIDR(6)类型带no-resolve。

#### 配置建议
- Telegram.list 单独使用。
- Telegram_Resolve.list 单独使用。

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Telegram/Telegram.list

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Shadowrocket/Telegram/Telegram.list

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/Telegram/Telegram.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Shadowrocket/Telegram/Telegram.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Shadowrocket/Telegram/Telegram.list

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Shadowrocket/Telegram/Telegram.list

## 子规则/排除规则

当前分流规则，已包含以下子规则，除非特殊需求否则不建议重复引用：
| 子规则  |  |  | 
| ---- | ---- | ----  |
| TelegramNL | TelegramSG | TelegramUS  | 


## 数据来源

《Telegram》的数据来自以下链接，如与本项目的《Telegram》规则混合使用，可能会造成规则大量重复。

- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Telegram.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Telegram.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/App/social/Telegram.list
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/telegramcidr.txt
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Optional/Telegram.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Services/SNS/Telegram.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/PROXY/Telegram.list
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/telegramcidr.txt
- https://core.telegram.org/resources/cidr.txt
- https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Telegram.yaml
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Clash-RuleSet-Classical/PROXY/Telegram.yaml
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Telegram.yaml
- https://ruleset.isagood.day/telegram_dc4.conf
- https://ruleset.isagood.day/telegram_dc5.conf


感谢以上规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
# 🧸 Global

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-DOMAIN与DOMAIN--SUFFIX合并-green) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet) 

Global规则由《RULE GENERATOR 规则生成器》自动生成。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
.poe.com
.gmauthority.com
.pp.ua
.south-plus.net
.spring-plus.net
.level-plus.net
.hicairo.com

## 规则统计

最后更新时间：2026-09-06 03:52:54

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| DOMAIN | 128  | 
| DOMAIN-KEYWORD | 36  | 
| DOMAIN-SUFFIX | 34756  | 
| IP-CIDR | 112  | 
| IP-CIDR6 | 4  | 
| PROCESS-NAME | 1  | 
| USER-AGENT | 46  | 
| TOTAL | 35083  | 


## Surge 

#### 使用说明
- Global.list，请使用RULE-SET。
- Global_Resolve.list，请使用RULE-SET。
- Global_Domain.list，请使用DOMAIN-SET。

#### 文件区别
- Global_All.list与Global_All_No_Resolve.list为 Surge 5.21.0(2952) 以上版本使用
- Global_Resolve.list与Global.list的区别仅在于后者IP-CIDR(6)类型带no-resolve。

#### 配置建议
- Surge 5.21.0(2952)以上版本使用以下配置：
- Global_All.list 单独使用。
- Global_All_No_Resolve.list 单独使用。
- Surge 5.21.0(2952)以下版本使用以下配置：
- Global.list、Global_Domain.list 共同使用。
- Global_Resolve.list、Global_Domain.list 共同使用。

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Global/Global.list

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Surge/Global/Global.list

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Global/Global.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/Global/Global.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Surge/Global/Global.list

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/Global/Global.list

## 子规则/排除规则

当前分流规则，已包含以下子规则，除非特殊需求否则不建议重复引用：
| 子规则  | 
| ----  |
| Proxy  | 


当前分流规则，已排除以下规则：
| 排除规则  |  |  | 
| ---- | ---- | ----  |
| AdvertisingLite | China | ChinaMaxNoIP  | 

## 数据来源

《Global》的数据来自以下链接，如与本项目的《Global》规则混合使用，可能会造成规则大量重复。

- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Region/Global.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/BlackList/BlackList.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyLite.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/foreign.list
- https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Basic/Apple-proxy.list
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/Proxy/Proxy.list
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/greatfire.txt
- https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/gfw.txt
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/Outside.list
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/gfw.txt
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/greatfire.txt
- https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/proxy.txt
- https://raw.githubusercontent.com/dler-io/Rules/main/Clash/Provider/Proxy.yaml
- https://ruleset.isagood.day/global_domain.conf


感谢以上规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
# 🧸 ChinaNoMedia

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet) 

ChinaNoMedia规则由《RULE GENERATOR 规则生成器》自动生成。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过我国(中华人民共和国)合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则说明
从China中排除ChinaMedia规则，便于在Quantumult X中与ChinaMedia搭配使用。

## 规则统计

最后更新时间：2022-05-19 16:20:07

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| DOMAIN | 56  | 
| DOMAIN-KEYWORD | 2  | 
| DOMAIN-SUFFIX | 166  | 
| IP-CIDR | 27  | 
| USER-AGENT | 30  | 
| TOTAL | 281  | 


## Shadowrocket 

#### 使用说明
- ChinaNoMedia.list，请使用RULE-SET。
- ChinaNoMedia_Resolve.list，请使用RULE-SET。

#### 文件区别
- ChinaNoMedia_Resolve.list与ChinaNoMedia.list的区别仅在于后者IP-CIDR(6)类型带no-resolve。

#### 配置建议
- ChinaNoMedia.list 单独使用。
- ChinaNoMedia_Resolve.list 单独使用。

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Shadowrocket/ChinaNoMedia/ChinaNoMedia.list

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Shadowrocket/ChinaNoMedia/ChinaNoMedia.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Shadowrocket/ChinaNoMedia/ChinaNoMedia.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Shadowrocket/ChinaNoMedia/ChinaNoMedia.list

## 子规则/排除规则

当前分流规则，已包含以下子规则，除非特殊需求否则不建议重复引用：
| 子规则  | 
| ----  |
| ChinaMedia  | 


## 数据来源

《ChinaNoMedia》的数据来自以下链接，如与本项目的《ChinaNoMedia》规则混合使用，可能会造成规则大量重复。

- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Sub/Bilibili.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/Domestic/Bilibili.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/BiliBili.list
- https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/CCTV.list
- https://raw.githubusercontent.com/LM-Firefly/Rules/master/Domestic-Services/CCTV.list
- https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/ChinaMedia.list
- https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Media/Tencent%20Video.list
- https://raw.githubusercontent.com/GeQ1an/Rules/master/QuantumultX/Filter/CMedia.list
- https://raw.githubusercontent.com/sve1r/Rules-For-Quantumult-X/develop/Rules/Media/DomesticMedia.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/StreamingCN.list
- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/Video/bilibili.list


感谢以上规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
# 🧸 AppleIntelligence

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-DOMAIN与DOMAIN--SUFFIX合并-green) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet)

AppleIntelligence规则由《RULE GENERATOR 规则生成器》自动生成。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则统计

最后更新时间：2025-12-06 20:10:00

各类型规则统计：
| 类型 | 数量(条)  |
| ---- | ----  |
| DOMAIN | 5  |
| DOMAIN-SUFFIX | 1  |
| TOTAL | 6  |


## Loon

#### 配置建议
- AppleIntelligence.list 单独使用。

#### 规则链接
**MASTER分支 (每日更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/AppleIntelligence/AppleIntelligence.list

**MASTER分支 CDN (每日更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Loon/AppleIntelligence/AppleIntelligence.list

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Loon/AppleIntelligence/AppleIntelligence.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/AppleIntelligence/AppleIntelligence.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Loon/AppleIntelligence/AppleIntelligence.list

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/AppleIntelligence/AppleIntelligence.list

## 子规则/排除规则

### 与其他规则的关系

当前分流规则，与以下规则存在重复或包含关系：

| 规则 | 重复域名 | 说明 |
| ---- | ---- | ---- |
| Siri | guzzoni.apple.com | Apple Intelligence 和 Siri 共用同一服务器 |
| AppleProxy | api-glb-sea.smoot.apple.com | AppleProxy 包含 smoot.apple.com 的子域名 |

**配置建议：**
- 如果已使用 Apple 主规则（包含 Siri 子规则），建议单独使用 AppleIntelligence 规则以启用完整的 Apple Intelligence 功能
- 本规则包含 Apple Intelligence 特有的中继服务器域名（Private Relay），这些域名不在其他 Apple 规则中

## 数据来源

《AppleIntelligence》的数据来自以下链接，如与本项目的《AppleIntelligence》规则混合使用，可能会造成规则大量重复。

- https://support.apple.com/en-us/101555


感谢以上规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。

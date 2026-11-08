# 🧸 小红书

## 前言

![](https://shields.io/badge/-移除重复规则-ff69b4) ![](https://shields.io/badge/-DOMAIN与DOMAIN--SUFFIX合并-green) ![](https://shields.io/badge/-DOMAIN--SUFFIX间合并-critical) ![](https://shields.io/badge/-DOMAIN与DOMAIN--KEYWORD合并-9cf) ![](https://shields.io/badge/-DOMAIN--SUFFIX与DOMAIN--KEYWORD合并-blue) ![](https://shields.io/badge/-IP--CIDR(6)合并-blueviolet) 

本分支规则基于上游《RULE GENERATOR 规则生成器》的结果维护，并根据 Surge 实际请求补充匹配参数。

分流规则是互联网公共服务的域名和IP地址汇总，所有数据均收集自互联网公开信息，不代表我们支持或使用这些服务。

请通过【中华人民共和国 People's Republic of China】合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。

## 规则统计

最后更新时间：2026-11-08

各类型规则统计：
| 类型 | 数量(条)  | 
| ---- | ----  |
| DOMAIN-SUFFIX | 4  | 
| IP-CIDR | 5  |
| TOTAL | 9  | 


## Surge 

#### 使用说明
- XiaoHongShu.list，请使用RULE-SET。

#### 配置建议
- XiaoHongShu.list 单独使用。

#### IP 直连请求
- `xiaohongshu.com`、`xhscdn.com`、`xhscdn.net` 使用 `extended-matching`，匹配请求域名以及可见的 TLS SNI / HTTP Host，适用于 App 使用 HTTPDNS 或裸 IP 请求的场景。Surge Mac 5.4.0+ / iOS 5.8.0+ 支持该参数；已在 Mac 6.6.0 上验证。
- 实际采样中，API 以 IP 连接但携带 `edith.xiaohongshu.com` 等 SNI；视频 URL 虽为 IP，HTTP Host 仍为 `sns-video-qc.xhscdn.com`。无需为这些请求追加共享 CDN IP。
- `fengkongcloud.com` 为既有共享风控域名，保留原匹配方式，不扩大其范围。
- 保留此前的 5 条 `/32` IP 规则，但这些地址不代表小红书独占，也不保证长期有效；不扩展为网段。
- 无可见域名、SNI、HTTP Host 的请求仍可能漏配；不通过 MITM、宽泛关键字或大段 CDN IP 强行归类。
- 规则文件不指定 DIRECT / Proxy / Slow；实际出口由 Profile 的 RULE-SET 行决定。

#### 规则链接
**MASTER分支（本分支维护）**

https://raw.githubusercontent.com/mjoep/ios_rule_script/refs/heads/master/rule/Surge/XiaoHongShu/XiaoHongShu.list

以下镜像及 RELEASE 链接为上游参考，不代表本分支的补丁：

**上游 MASTER 分支 CDN**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Surge/XiaoHongShu/XiaoHongShu.list

**MASTER分支 GHProxy (每日更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/XiaoHongShu/XiaoHongShu.list

**RELEASE分支 (不定时更新)**

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/XiaoHongShu/XiaoHongShu.list

**RELEASE分支CDN (不定时更新)**

https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Surge/XiaoHongShu/XiaoHongShu.list

**RELEASE分支 GHProxy (不定时更新)**

https://ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Surge/XiaoHongShu/XiaoHongShu.list

## 子规则/排除规则


当前分流规则，未包含其他子规则。

## 数据来源

当前规则未直接引用数据源。

## 最后

### 感谢

[@fiiir](https://github.com/fiiir) [@Tartarus2014](https://github.com/Tartarus2014) [@zjcfynn](https://github.com/zjcfynn) [@chenyiping1995](https://github.com/chenyiping1995) [@vhdj](https://github.com/vhdj)

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
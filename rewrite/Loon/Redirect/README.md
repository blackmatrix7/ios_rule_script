# 重定向

## 前言

本项目的重定向规则由《规则生成器》自动整合与去重。

复写规则所有数据均收集自开源项目，仅为解决引用过多外部资源引起的规则重复问题，不代表我们支持或使用这些服务。

请通过我国(中华人民共和国)合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。
## 规则说明
重定向的复写策略，可能存在安全风险。如将正常的网站重定向到钓鱼网站，以窃取输入的数据。当前重定向复写规则仅为程序自动爬取整合，未对安全性做任何校验，如使用此复写规则需要自行承担风险。建议使用前逐条阅读重定向的目标地址，确认无安全问题后再使用。同时禁止此复写规则自动更新，或将此复写规则的内容复制到本地作为本地文件使用。

## 复写统计

| 类型 | 数量(条) |
| ---- | ---- |
| mitm | 0 |
| redirect | 54 |
## 配置说明

实时版：程序定时更新，更新频率高，能尽快同步数据源变化，适合希望尝鲜的人。

稳定版：不定时手动更新，更新频率低，适合不希望规则频繁变化的人。

稳定版中如含有JavaScript脚本，所引用的脚本链接为实时版或外部链接，可能会与预期效果有出入，建议使用实时版。

### Loon 

实时版：


https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/Loon/Redirect/Redirect.plugin


稳定版：


https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/Loon/Redirect/Redirect.plugin


如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 数据来源

本项目的重定向复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。

如果你正在使用这些复写规则，建议不要与本项目的重定向复写规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Module/General.sgmodule


感谢以上复写规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@Tartarus2014](https://github.com/Tartarus2014)  [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
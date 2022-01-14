# 脚本去广告

## 前言

本项目的脚本去广告规则由《规则生成器》自动整合与去重。

复写规则所有数据均收集自开源项目，仅为解决引用过多外部资源引起的规则重复问题，不代表我们支持或使用这些服务。

请通过我国(中华人民共和国)合法的互联网出入口信道访问规则中的地址，并确保在使用过程中符合相关法律法规。
## 规则说明
整合知乎、BiliBili、什么值得买三个APP去广告，及脚本去除开屏广告复写。

## 复写统计

| 类型 | 数量(条) |
| ---- | ---- |
| mitm | 27 |
| URL-REGEX | 7 |
| DOMAIN | 4 |
| USER-AGENT | 1 |
| DOMAIN-SUFFIX | 1 |
| IP-CIDR | 1 |
| IP-CIDR6 | 1 |
| reject | 22 |
| http-response | 33 |
| http-request | 1 |
## 配置说明

实时版：程序定时更新，更新频率高，能尽快同步数据源变化，适合希望尝鲜的人。

稳定版：不定时手动更新，更新频率低，适合不希望规则频繁变化的人。

稳定版中如含有JavaScript脚本，所引用的脚本链接为实时版或外部链接，可能会与预期效果有出入，建议使用实时版。

### Loon 

实时版：


https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/Loon/AdvertisingScript/AdvertisingScript.plugin


稳定版：


https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rewrite/Loon/AdvertisingScript/AdvertisingScript.plugin


如果稳定版无法访问 ，可能是尚未从实时版的分支合并，建议您先使用实时版，或等待下次稳定版分支合并。

## 数据来源

本项目的脚本去广告复写规则的数据来自以下链接，通常已涵盖所有数据来源的复写规则。

如果你正在使用这些复写规则，建议不要与本项目的脚本去广告复写规则混合使用，以免造成规则重复。

- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.sgmodule
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_remove_ads.lnplugin
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.sgmodule
- https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.lnplugin


感谢以上复写规则作者的辛勤付出（排名不分先后）。

## 最后

### 感谢

[@Tartarus2014](https://github.com/Tartarus2014)  [@chenyiping1995](https://github.com/chenyiping1995) 

提供规则数据源及改进建议。

### 其他

请不要对外宣传本项目。
# 开屏去广告

使用脚本，通过修改开屏广告图片大小、开屏广告持续时间、开屏广告生效时间等方法，去除缓存到本地的APP开屏广告。

维护去广告项目耗费的精力要远高于维护签到项目，所以当前仅能满足个人常用APP的开屏广告去除，并且不保证去除效果。

实在是精力有限，暂时无法帮忙去除其他APP开屏广告，欢迎大佬贡献其他去除开屏广告的代码。

## 配置说明

### Surge

使用模块

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.sgmodule

### Loon

使用远程脚本配置

```ini
[Plugin]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.lnplugin, tag=开屏去广告, enabled=true
```

### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.qxrewrite, tag=开屏去广告, enabled=true
```

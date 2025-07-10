# 开屏去广告

使用脚本，通过修改开屏广告图片大小、开屏广告持续时间、开屏广告生效时间等方法，去除缓存到本地的APP开屏广告。

目前精力有限，仅能满足个人常用APP的开屏广告去除，并且不保证去除效果。

## 配置说明

大部分去广告的链接，都已经被整合型的去广告脚本拦截，脚本无法接管请求。

如果出现拦截失败，请抓包检查相关请求是不是在脚本处理前就已经被拦截。

## 模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.sgmodule
```

## 插件

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.lnplugin
```

## 重写

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.snippet
```

## 覆写

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.stoverride
```


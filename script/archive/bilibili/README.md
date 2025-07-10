# 哔哩哔哩

## 去广告

### 介绍

哔哩哔哩APP去广告，没有广告的哔哩哔哩更值得干杯。

目前已实现：

1. 去除启动广告
2. 去除“推荐”页面广告
3. 去除“追番”页面广告
4. 去除“直播”页面广告
5. 精简“我的”页面功能
6. 去除“动态”中的话题
7. 去除“动态”中的最常访问
8. 精简顶部标签页
9. 去除底部会员购
10. 增加一键Story模式

支持哔哩哔哩与哔哩哔哩概念版

### 特别说明

#### 去APP启动广告

目前几乎所有的整合型去广告规则都带有去除哔哩哔哩启动广告的规则。通过对类似`^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list`

正则复写的拦截来屏蔽启动广告。这在大部分情况下都是有效的，但是如果忘记打开VPN或其他原因导致拦截失败，启动广告缓存到APP中后，下次启动启动广告就会出现。此时再通过正则去拦截已无能为力，只能重装APP或等待广告过期。

在本项目的去广告策略中，采取的是对启动广告请求进行放行，同时通过脚本将广告生效时间设置到2030年以去除启动广告。这样做的好处是即使某次拦截失败，下次APP重新请求一次广告后，启动广告就会消失，不需要重装APP。

但这种策略会与几乎所有的整合型去广告规则产生冲突，因为在复写阶段请求就被拦截掉，后续的脚本没法进行处理。

所以，如果在使用过程中，出现APP启动广告反复出现，请尝试将分流和复写规则中所有关于哔哩哔哩的规则进行去除，仅保留本脚本的相关复写。

### 部署说明

#### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.sgmodule
```

#### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.qxrewrite, tag=哔哩哔哩_去广告, update-interval=86400, opt-parser=false, enabled=true
```

### Loon

使用插件

```ini
[Plugin]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibili/bilibili_plus.lnplugin, tag=哔哩哔哩_去广告, enabled=true
```

## 签到

等待抽空填坑

## 感谢

[@MisterGlasses](https://github.com/MisterGlasses)  [@Mazeorz](https://github.com/Mazeorz)
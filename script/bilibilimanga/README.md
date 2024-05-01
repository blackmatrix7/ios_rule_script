# 哔哩哔哩漫画

## 去广告

### 介绍

哔哩哔哩漫画APP去广告，没有广告的哔哩哔哩更值得干杯。

目前已实现：

1. 去除启动广告
2. 去除首页推荐漫画弹窗
3. 去除活动页TAB
4. 去除我的页多余按钮
5. 去除我的页赛季信息
6. 去除我的页关注官方号提示
7. 去除漫画底部商品推荐

### 部署说明

#### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibilimanga/bilibili_manga.sgmodule
```

#### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibilimanga/bilibili_manga.qxrewrite, tag=哔哩哔哩漫画_去广告, update-interval=86400, opt-parser=false, enabled=true
```

### Loon

使用插件

```ini
[Plugin]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/bilibilimanga/bilibili_manga.lnplugin, tag=哔哩哔哩漫画_去广告, enabled=true
```

## 感谢

[@zirawell](https://github.com/zirawell) 
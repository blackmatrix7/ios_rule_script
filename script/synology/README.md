# Download Station

利用Synology的Download Station下载互联网资源。

## 说明

一个小玩具，实现将互联网某些资源添加到群晖的Download Stations下载，目前暂时支持推特第三方客户端的图片视频下载。

这其实是个架子，提供一种思路：通过脚本获取资源后添加到群晖的Download Station，欢迎有兴趣的大佬一起完善，添加其他功能。~~计划添加自动下载京东电子发票，看什么时候有时间再实现。~~

在使用脚本前，需要有一些前提条件：

1. 一台群晖，安装Download Station
2. 会使用BoxJs
3. 保证能在各种情况下访问群晖
4. 一点点动手和排查问题的能力

## 基础配置

### 新建群晖账户

访问你的群晖，新增User账户，**一定要新建账户**。为了数据安全，强烈建议不要给予管理员权限。仅需要DSM、~~File Station（实际上不需要，看着给）~~、Download Station三个权限。

**目录权限方面，仅需要下载目录的读写权限，其他目录的权限不需要给**，如果你一定要给我也不拦着。

### 登录账户

登录新建的账户，打开Download Station，首次使用会提示选择下载目录，设置好下载目录后完成配置。

### 配置BoxJS

在BoxJS里填入群晖的http地址，不建议使用https，可能因为证书问题会导致访问失败，账户密码根据最近的设置输入，sid不需要填，会自动获取。

目前仅在DSM6.2上验证，DSM7上没有测试是否正常，如果群晖的DSM7接口没有变化应该是可以的。

## 存在的问题

群晖的sid一段时间后会失效，观察了3个多月，sid有效期大概1个月不到，具体的时间没有统计。sid失效后，需要进入boxjs手动将sid删除，让脚本重新获取。~~自动更新sid可以实现，不过比较懒，看看什么时候手动操作烦了再考虑加这个功能。~~

可能会导致用于下载的群晖账户出现异常，表现为sid无论如何重新获取，都无法正常添加下载任务。这个时候需要删除这个用于下载的账户，再根据上述的步骤重新添加账户。目前仅偶尔出现，可能是sid失效后多过重试导致。

**所以新建一个专用的账户给脚本使用就非常重要了。**

## Twitter资源下载

### Twitter第三方客户端

因为Twitter官方的客户端带SSL Pinning，没办法使用此脚本，所以必须使用第三方客户端。并且**开启此脚本的复写后，会导致Twitter官方客户端无法正常使用。**

### 操作方式

在Twitter第三方客户端中，看到喜欢的推文，点击Like，会自动将推文内的图片和视频下载到群晖中。当然还要保证群晖能访问推特，否则下载资源就无从谈起了……

### 配置说明

#### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/synology/twitter.sgmodule
```

#### Loon

使用插件

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/synology/twitter.lnplugin
```

#### Quantumult X

配置文件

```ini
[rewrite_remote]
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/synology/twitter.qxrewrite, tag=Twitter_离线下载收藏内容, enabled=true
```


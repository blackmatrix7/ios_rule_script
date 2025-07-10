# TestFlight

## 前言

TestFlight多账户共存与自动加入脚本，主要满足个人需要两个脚本共存的需求。

**感谢NobyDa、DecoAri、chouchoui、lodepuly等大佬的源代码。**

本脚本部分参考了上述大佬的脚本源代码。

相对于原版，做了以下改动：

**TestFlight 自动加入**

1. 支持NodeJS，含青龙面板
2. 支持多账户
3. 支持MITM Over HTTP/1.1 与 HTTP/2
4. 支持控制加入TF的并发数量
5. 支持Session失效检测
6. 支持满员的TF自动加入任务
7. 支持温和、标准和暴力三种加入模式
8. 标准模式下，支持指定账号检测TF可否加入

**TestFlight 多账户共存**

1. 支持多账户同步
2. 去除共享功能
3. 保留当前账户“以前测试过”的列表

## 部署

**Surge**

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/testflight/testflight.sgmodule
```

**Quantumult X**

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/testflight/testflight.snippet
```

**Loon**

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/testflight/testflight.lnplugin
```

**Stash**

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/testflight/testflight.stoverride
```

## 入门

安装对应的模块/重写/插件/覆写

### **TestFlight 多账户共存**

在AppStore中切换不同的账号，每切换一个账号需要重新打开TestFlight，直至弹出获取必要信息成功的通知。

随后即可在TestFlight App中查看所有共存账号的App。

### **TestFlight 自动加入**

在AppStore中登录需要加入TestFlight的账号，打开TestFlight，弹出获取必要信息成功的通知。

打开需要加入的TestFlight App链接，如果已满员会自动加入任务列表。

脚本主要运行平台为青龙面板，所以在默认的配置中不带有计划任务。需要根据运行平台不同，手动为脚本设置一个定时任务。

#### **Surge**

```ini
[Script]
TestFlight_自动加入 = type=cron,cronexp=0/5 * * * * *,script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/testflight/testflight.js
```

#### **Quantumult X**

```ini
[task_local]
0/5 * * * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/testflight/testflight.js, tag=TestFlight_自动加入, enabled=true
```

#### **Loon**

```ini
[Script]
cron "0/5 * * * * *" script-path=https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/testflight/testflight.js,timeout=5,TestFlight_自动加入
```

#### **Stash**

```yaml
cron:
  script:
    - name: testflight.js
      cron: '0/5 * * * * *'
      argument: ''
      timeout: 10
```

#### **青龙面板**

在Web界面中，选择“定时任务”，选择新增，定时规则为“*/5 * * * * *”，即5秒运行一次。

### **大功告成**

如果你不想太过折腾，那么到这来配置就结束了，不需要再往下阅读。

## 进阶

### TestFlight 多账户共存

#### 多设备互相同步

脚本支持通过青龙面板，将多账户共存的信息在不同设备、不同客户端间互相同步。

举个例子，你有几台iPhone、iPad，它们使用不同的客户端，但是都使用同个脚本，连接同个青龙面板。那么当开启“同步数据到青龙面板”时，TestFlight的账户数据会在多个设备间互相同步。

更具体地说，你在iPhone上，登录A、B两个账号；在iPad上，登录C、D两个账号。开启同步后，你的iPhone、iPad和青龙面板将同时存储A、B、C、D四个账号的信息。这样无论你打开哪台设备的TestFlight的App，它们的数据是完全一致的。

当然，你也可以一台iPhone登录国区账号，一台iPhone登录外区账号，两台间互相同步。

**特别说明**

1. 数据同步可能会影响TestFlight的加载速度，建议只在必要时开启。
2. 如果多设备间数据冲突时，以青龙面板中存储的数据为准。
3. 如果需要删除某个账号，需要在青龙面板的magic.json文件中删除，在iOS设备中删除无效，下次还会从青龙面板同步回来。

### TestFlight 自动加入

#### 手动编辑需要加入的AppId

通过`tf_app_id`变量来存储需要加入的AppId，以;分隔。你可以在BoxJS，或magic.json文件中编辑它。

**需要注意原版是以,分隔，此处配置不同。**

#### 同步至青龙面板

https://github.com/blackmatrix7/ios_rule_script/tree/master/script#readme

根据上述文档，配置青龙面板，然后在BoxJS中打开同步至青龙面板的开关。配置完成后，每次打开TestFlight，登录信息变化时都会同步到青龙面板中。同时，在打开已满员的Beta链接时，也会将App ID同步至青龙面板。

**特别说明**

1. TestFlight中的App ID与青龙面板的同步是单向的，只能从设备同步到青龙面板。
2. 青龙面板最终存储的App ID为所有设备同步数据的合集。

#### 并发数量

指当App的Beta为可加入状态时，**每个账户**并发多少个请求来尝试加入。默认为2个，并发数量并不是越高越好。

#### 三种模式的区别

#### 温和

查询App的Beta状态时，不携带用户信息，仅在App可加入时才会使用存储的用户信息发起申请，理论上可以极大减少AppleID被Ban的几率。缺点为ResponeBody较大，查询的速度相较标准模式可能会稍慢。

**此模式未经验证。**

#### 标准

默认采用标准模式。

同原版一致的逻辑，查询App的Beta状态时，会带入一个用户的信息进行查询。在App可加入时，使用存储的用户信息发起申请。缺点是每次查询都会携带用户信息，理论上有导致AppleID被Ban的风险，不过目前并无先例。

**你可以指定一个小号专门用于检测可用性，具体见后文。**

#### 暴力

不查询App的Beta状态，直接使用存储的用户信息申请加入，如果无法加入会引发409的异常。优点是没有查询过程，抢App的Beta测试员成功率可能会更高。缺点是会持续不断的产生异常的请求，理论上被Ban的风险最大。

**此模式未经过验证。慎选，建议使用新注册的账号试验。**

#### 多账户自动加入

可以通过在iOS的设置中，切换AppStore账户，再打开TestFlight App来实现多账户加入。

多账户并不能提高加入的成功率，相反因为需要尝试加入的账户数量变多，反而会降低成功率。

多账户存储的数据格式如下，其中类似"xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"为AccountId，非常重要，务必记牢。

```json
"tf_session_info": {
  "magic_session": true,
  "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx": {
    "X-Session-Id": "xxxxxxxxxxxxxxxx",
    "X-Session-Digest": "xxxxxxxxxxxxxx",
    "X-Request-Id": "xxxxxxxxxxxxx"
  },
  "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxoo": {
    "X-Session-Id": "xxxxxxxxxxxxx",
    "X-Session-Digest": "xxxxxxxxxxxxxx",
    "X-Request-Id": "xxxxxxxxxxxxx"
  }
}
```

**不同账户加入不同的App Beta测试员**

脚本通过`tf_joined_app_id`存储的数据来判断哪些账户需要加入哪些AppID。

tf_joined_app_id的数据格式如下：

```json
"tf_joined_app_id": {
  "magic_session": true,
  "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx": [
    "*",
    "PTbaSXrf",
    "J3awzdqd",
    "aL5ZWE8A",
    "iSTXkF4K"
  ],
  "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxoo": [
    "*"
  ]
}
```

magic_session 不可修改和删除，xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx为你的账户AccountId，对应的数组则是已经加入成功的AppId。

假设不想让AccountId为xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx的账户加入PTbaSXrf的测试，在对应的数组中写入AppId即可。此时如果存在其他账户，则其他账户依旧会尝试加入PTbaSXrf的测试，直至成功。

如果某个账户，不希望它加入任何TF，则给它加一个"*"，表示任何APP的测试都不加入。

#### 专用账户检查TF

在标准模式下，可以指定一个账号专门用于检查App的TestFlight是否可加入。在BoxJS或magic.json中，为`tf_check_account_id`这个变量分配一个account id，将这个账户用来检查App的Beta成员是否已满。只有当Beta可加入时，才会用真正的账户来尝试加入，以达到保护主账号的目的。

举个例子，你可以注册一个新的账号，专门用于检查TF可否加入，当可以加入时，再用你的主账号尝试加入。

需要注意的是以下几点:

1. 专门用于检查的账号也需要获取Session，同时这个账号也会尝试加入TF，除非你根据上一条的`tf_joined_app_id`配置，排除掉。
2. 不用于检查的主账号，最好隔段时间就刷新一下Session，以免会话过期。

#### 连续运行

配置`tf_loop_count`来设置脚本每次启动时，执行多少次任务再退出，每次任务间隔固定800毫秒。通过配置连续运行次数，可以减少青龙面板的脚本执行频次，避免因为日志过多导致青龙面板没有响应。

如果是NodeJS环境(非青龙面板)，可以设置为0，脚本将持续运行不会终止。

不要在手机上将`tf_loop_count`设置为0，否则脚本会一直运行直到超时，或被手动中止。

#### Session检测

因为脚本的主要运行环境是青龙面板，所以可能存在Session因为长期未更新导致失效的情况。为此加入每2小时检测一次Session有效期的功能，如果失效会推送通知到手机，需要再手动获取信息，并同步到青龙面板。

检测间隔可以通过变量`tf_check_session_time_diff`配置，单位秒，不要配置过短，以免影响脚本正常功能。

## 其他

如果有问题欢迎反馈。

### Loon暂不支持MITM Over HTTP/2

已经和作者反馈，需要等待Loon更新。

### Shadowrocket未经验证

Shadowrocket未经验证，不确保能够正常使用

## 脚本变量

当前脚本使用的变量，你可以根据这些Key，在magic.json中配置数据。

| 名称                       | 类型   | 默认值 | 说明                                                         |
| -------------------------- | ------ | ------ | ------------------------------------------------------------ |
| tf_session_info            | Json   | 无     | 由脚本自动获取的Session信息，如需修改请整个删除重新获取      |
| tf_app_id                  | String | 无     | 需要加入Beta的AppId，多个以;分隔                             |
| tf_join_mode               | Int    | 1      | 执行默认 0 温和 1 标准 2 暴力                                |
| tf_join_concurrency        | Int    | 2      | 每个账户并发加入TestFlight Beta测试员的请求数                |
| tf_joined_app_id           | Json   | 无     | 存储每个账户已经成功加入的AppId                              |
| tf_check_account_id        | String | 无     | 专门用于检查TF可用性的Id，如果为空则从已登录的账户中随机选择 |
| tf_loop_count              | Int    | 1      | 每次运行脚本时循环多少次，每次循环间隔800毫秒，NodeJS(非青龙面板)可设置为0，表示持续运行 |
| tf_check_session_time_diff | Int    | 7200   | 每间隔多少秒检查一次账户的有效性，默认7200秒                 |
| tf_check_session_time      | Int    | 无     | 上次检查账户有效期的时间，自动生成，不需要配置               |
| tf_invalid_app_id          | Json   | 无     | 验证无效的AppId，自动生成，不需要配置                        |


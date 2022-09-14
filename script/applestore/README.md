

# 🧸 Apple Store 库存监控

## 前言

脚本用来监控线下AppleStore指定商品库存，已经支持iPhone14全系列。

长话短说，需要做一些准备：

1. 在Apple官网上获取监控的商品
2. 使用BoxJS配置监控的商品型号和地区
3. 手机有足够的流量、电量

## 基础配置

### 确认型号

##### iPhone 14 系列

https://www.apple.com.cn/shop/buy-iphone/iphone-14

##### iPhone 14 Pro 系列

https://www.apple.com.cn/shop/buy-iphone/iphone-14-pro

在上面的链接中选择需要的型号、颜色、容量，然后把浏览器地址中类似 `MLDH3CH/A` 的文本复制下来，就是需要监控的型号。

如下图：

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/images/01.png)

##### Apple Watch 系列

<u>Apple Watch 因为有选项，所以会稍微麻烦，请以下步骤操作：</u>

1. 在浏览器中选择你所需的型号，得到类似 `https://www.apple.com.cn/shop/buy-watch/apple-watch-ultra/49mm-cellular-titanium-black-gray-trail-loop-m-l` 的地址。
2. 在浏览器中按下`F12`，打开“开发人员工具”，在顶部的标签中选择“网络”或“network”。
3. 在一堆网络请求中找到类似 `fulfillment-messages` 的地址，如果没有找到，保持“开发人员工具”打开的情况下，再刷新一次页面。
4. 把含有 `https://www.apple.com.cn/shop/fulfillment-messages` 的链接复制下来，里面有我们需要的信息。

> 如果你对上述步骤感到比较疑惑，建议在搜索引擎中以“`Chrome 开发人员 工具 教程`”为关键词，搜索相关资料。如何查看浏览器的网络请求，并不在本项目的说明范围内。

###### Apple Watch Ultra

如果你需要监控的是Apple Watch Ultra，事情就很简单，把链接中类似parts.0=MNHT3CH/A的内容记录下来，`MNHT3CH/A`就是你需要监控的型号，保存好它！

###### Apple Watch 8

Apple Watch 8 中地址存在类似的格式 `parts.0=Z0YQ&option.0=MNNQ3CH/A,MPLE3FE/A` 。我们需要的是`parts.0` 和 `option.0` 之后的数据。

以上面的地址为例，我们需要的是 `Z0YQ` 和  `MNNQ3CH/A,MPLE3FE/A`。

至此，完成所需监控的iPhone或Apple Watch型号收集。

### 型号拼接

这步是把获取的型号，拼接成字符串，填写到BoxJS中，让脚本知道你要监控什么商品的库存。

#### iPhone 14、iPhone 14 Pro

采用如下格式

```
<型号>##<名称>
```

型号就是获取的设备型号，名称可以自己取，便于在通知中识别。

假设上面获取的型号是MLDH3CH/A，那拼接后的字符串就是

```
MLDH3CH/A##小黑紫
```

注意有两个##

#### Apple Watch

##### Apple Watch Ultra

和iPhone相似

```
MNHT3CH/A##Apple Watch Ultra
```

##### Apple Watch 8

```
Z0YQ#MNNQ3CH/A,MPLE3FE/A#Apple Watch 8
```

#### 多个型号

如下拼接

```
MLDH3CH/A##小黑紫;MNHT3CH/A##Apple Watch Ultra;Z0YQ#MNNQ3CH/A,MPLE3FE/A#Apple Watch 8
```

### 确认地区

省市示例：吉林 长春 朝阳区

直辖市示例：北京 北京 昌平区

如果搞不定的话，在Apple官网选择查看取货情况，把下面的字保存下来，每个间隔一个空格。

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/images/03.png)

## BoxJS填写效果

![](https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/images/04.png)

## 进阶问题

### 脏数据

每次配置型号和地区，都必须在BoxJS中把库存的数据清理掉，避免脏数据导致脚本异常。

### 监控间隔

移动端默认为5秒执行一次，NodeJS默认3秒执行一次。NodeJS可以使用Bark推送到手机，但因为需要再通过Bark服务端转发一次，会有些许延迟。

### 监控多个型号

脚本可以支持同时监控多个型号，但是**强烈不建议在移动端这么操作**。每次查询库存只能查询单个型号，配置多个型号需要进行多次查询，如果查询间隔设置得过小，可能导致上次脚本尚未执行完成，下轮监控又开始进行，造成重复推送。同时对手机的流量和电量都造成额外的消耗。

如果一定要监控多个型号，建议使用Node在服务器上运行，通过Bark推送监控结果。

## 通知说明

第一行

表示的是型号、颜色、容量和数据更新时间。

第二行

表示的本次监控的结果，监控店铺数量、售罄的店铺数量、有库存的店铺数量。最后会有一个实心或空心的圆圈。实心圆代表有库存的店铺，空心圆代表本次监控全部售罄。

余下通知内容

表示的是每家店铺的具体情况，小太阳表示有货，禁止符号表示售罄，紧接着是城市和店铺名称。

点击通知可以跳转到Apple Store APP，如果你有安装的话。

## 配置说明

### Surge

使用模块

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/applestore.sgmodule
```

### Loon

使用插件

```ini
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/applestore.lnplugin
```

### Quantumult X

配置文件

```ini
[task_local]
0/5 * 6-23 * * * https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/applestore/applestore.js, tag=AppleStore_商品库存监控, enabled=true
```

## 变量说明

NodeJS(含青龙面板)，请根据下表配置magic.json的变量。

更新详细的配置说明，请访问：https://github.com/blackmatrix7/ios_rule_script/blob/master/script/README.md。

| 变量                               | 类型   | 说明                                                         |
| ---------------------------------- | ------ | ------------------------------------------------------------ |
| applestore_goods_model             | string | 监控的商品型号，类似`MPU93CH/A##iPhone 14 午夜色 128G` 。    |
| applestore_region                  | string | 监控的地区，类似`北京 北京 昌平区`、`吉林 长春 朝阳区` 。    |
| applestore_settings_notify_soldout | bool   | 售罄也进行推送，建议为`false` 。                             |
| applestore_run_forever             | bool   | NodeJS环境下只运行一次或无限次运行。只运行一次适合在青龙面板设置定时任务；无限运行适合用NodeJS直接启动脚本。 |
| applestore_watch_interval          | number | NodeJS无限运行时，库存监控间隔，单位毫秒，最小2000。         |
| applestore_goods_stock             | json   | 监控的库存数据，自动生成，不要修改。                         |


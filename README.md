# tinypng-cli

基于[tinypng](https://tinypng.com/developers)官方提供的api做的压缩图片cli工具

## 用法

使用方式简单得 **令人发指！！**

```
tnpm install -g @tencent/tinypng-cli
cd 你的图片目录
tinypng
```

## 使用效果

![](https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/Jietu20181119-215155@2x.jpg	)


## 参数说明

### --dir
指定生成图片所要存放的目录，默认则是替换当前目录下的图片

`tinypng --dir <dir-name>`

### -key
指定所要使用的tinypng的key，[点此申请](https://tinypng.com/developers)，默认使用的是我自己的key

`tinypng --key <key>`

### -proxy
指定所要使用的代理，公司内部网需要用到的请使用此参数，默认已经用了腾讯代理。

`tinypng --proxy <hostname>`

## 兼容性

本项目使用了`async/await`，因此只支持Node 8以上的版本。不打算兼容，欢迎PR！

## 测试用例

测试用例待补充。
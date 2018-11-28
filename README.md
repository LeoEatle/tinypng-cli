# tinypng-cli

A convenient tool to compile imgs via tinypng api.

[Chinese doc](./README-CH.md)

## Usage

```
tnpm install -g @tencent/tinypng-cli
cd <img-dir>
tinypng
```


<img src="https://tuchuang-1251767583.cos.ap-guangzhou.myqcloud.com/Jietu20181119-215155@2x.jpg" width="360" >


## API

### --dir
The output path. If no param, it will replace original images as default behavior. 

`tinypng --dir <dir-name>`

### -key
The key to use tinypng api. The default key is my key. (NOT RECOMMAND)

`tinypng --key <key>`

### -proxy
Proxy. May be useful in company network.

`tinypng --proxy <hostname>`

## Compatibility

Use `async/await` to implement chaining network request. 
No babel used. So it only support Node 8+. 
PR welcomed!
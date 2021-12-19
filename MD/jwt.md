### `JWT原理`

服务器验证通过后，生成一个JSON对象，发回给用户；以后每次用户和服务器通信，服务器都会发回这个JSON对象。为了防止用户篡改数据，服务器生成这个对象的时候，会生成签名。

### `JWT数据结构`

> 它是一个很长的字符串，中间用`.`分割成三个部分，依次是：
>
> 1. Header（头部）
>
>    Header是一个JSON对象，一般都是固定的
>
> 2. Payload（负载）
>
>    Payload也是一个JSON对象，用来传递数据
>
> 3. Signature（签名）
>
>    Signature部分是对前面部分的签名，防止篡改。首先需要指定一个密钥，只有服务器知道，按照SHA256算法

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```


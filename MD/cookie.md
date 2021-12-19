### `cookie`

cookie主要是用来识别身份的，因为http是无状态的，服务端和浏览器都可以设置cookie，每次请求都会携带cookie，cookie大小一般不超过4kb。

cookie存储在客户端，一般存放不密感的信息

### `cookie属性`

1. ### Expires，Max-Age

   `Expires`指定一个具体的到期时间，到了指定时间后，浏览器就不再保留这个cookie。如果不设置或者设置为`null`，Cookie只在当前会话有效，浏览器关闭，该cookie就会被删除。

   `Max-Age`指定从现在开始Cookie存在的秒数

   **如果同时指定`Expires`和`Max-Age`，那么`Max-Age`的值优先生效**

2. Domain，Path

   `Domain`属性指定Cookie属于哪个域名，浏览器向服务端发送请求时，通过这个属性判断是否携带Cookie信息

   如果没有指定Domain属性，则默认为当前域名，如果当前域名是一个IP地址，则不得设置Domain属性

   `Path`属性指定浏览器发出HTTP请求时，哪些路径要附带Cookie

3. Secure，HttpOnly

   `Secure`属性指定浏览器只有在加密协议HTTPS下，才能将这个Cookie发送到服务器，，如果当前协议是HTTP，浏览器会自动忽略服务器发送来的`Secure`属性。

   `HttpOnly`属性指定该Cookie无法通过JavaScript脚本（`document.cookie`）拿到

4. SameSite

   `SameSite`主要是用来防止CSRF(跨站请求伪造)攻击和用户追踪，限制第三方Cookie

   > - Strict
   >
   >   `Strict`最为严格，完全禁用第三方Cookie，任何情况都不会发送Cookie。换而言之，只有当前网页的URL与请求目标一致，才会带上Cookie
   >
   > - Lax
   >
   >   `Lax`稍微宽松一点，只有这三种情况才会携带Cookie：超链接（<a href="..."></a>），预加载请求（<link rel="prerender" href="..."/>），GET表单<form method="GET" action="...">
   >
   > - None
   >
   >   设置该属性表示关闭`SameSite`属性，但是必须设置`Secure`属性才会生效


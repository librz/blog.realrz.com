---
title: URL Encoding
date: "2021-03-20"
language: zh-CN
category: other
---

> 在 [Encoding](https://blog.realrz.com/encoding) 这篇博客里面我对 Encoding 进行了介绍，介绍了常见的字符编码，比如 ASCII 和 UTF-8。另一个常见的例子是 URL Encoding, 在 Web 开发中很常见。可是为什么需要对 URL 进行编码呢？具体怎么实现？

### URL Encoding

URL 中含有一些特殊字符表达特殊的含义，比如 ? 表示 URL Parameter(s) 的开始, = 用于连接属性和值，& 用于连接多个键值对:

```console
http://example.com?name=john&age=10
```

现在试想 name 是 "jo&h=n"会怎么样:

```console
http://example.com?name=jo&h=n&age=10
```

这样的话不知不觉就多个一个参数出来 h=n, 这种还算幸运，更多的时候甚至会导致 URL 无法被解析

为了规避这些可能造成麻烦的特殊字符，URL 都要经过一个编码的过程，由于这个编码使用了 % 符号，所以 URL Encoding 又叫 Percent Encoding.

在 URL 这个 Context 下需要规避的特殊字符有 20 个, 包括空格和 % 本身:

```console
':'  '/'  '?'  '#'  '['  ']'  '@'  '!'  '$'  '&'  "'"  '('  ')'  '*'  '+'  ','  ';'  '='  '%'  ' '
%3A  %2F  %3F  %23  %5B  %5D  %40  %21  %24  %26  %27  %28  %29  %2A  %2B  %2C  %3B  %3D  %25  %20 or +
```

接着之前的例子: 试想 name 是 "jo&h=n"会怎么样

```console
编码前: http://example.com?name=jo&h=n&age=10
编码后: http://example.com?name=jo%26h%3Dn&age=10
```

这样以来 URL 就可以正确解析了，解析之后对属性值再进行解码就得到了它们原本的样子

### application/x-www-form-urlencoded

从 Web 页面发起 http 请求的实现方式大体可以分为 2 种: 直接使用 form 表单 & 手动使用 JS 做 XHR 请求

XHR (XmlHttpRequest) 一般使用 JSON 来作为 request body, http 请求头 Content-Type 是 application/json. 这种方式非常灵活，开发者可以用 JS 在任意时刻发出格式化的请求, request body 里的数据可以任意进行组装

但有的时候发请求就是为了提交一个表单，request body 里的数据都从表单项里来，点击提交按钮时发送请求即可，没必要像 XHR 那样灵活。这时候就可以使用 form 元素，指定 API Endpoint 和 http 方法，确保表单项的 name 属性和 API 的参数一致, 只要配置好这些，浏览器自然就知道如何发送请求。

一个简单的 form 表单如下:

```html
<form
  action="http://example.com/api"
  method="POST"
  enctype="application/x-www-form-urlencoded"
>
  <input type="text" name="name" />
  <input type="text" name="email" />
  <input type="submit" value="提交" />
</form>
```

form 的 method 属性可以选择 GET 或者 POST。语义化的 http 要求 GET 类型的接口只应该查询而不应创建或修改数据，POST 用于创建数据，GET 接口没有专门的 request body 因为 payload 追加到 URL 本身了，而 POST 接口一般都有 request body，因为 URL 有长度限制，所以如果表单中有很多数据的话一般都会使用 POST

注: 有的时候即使是查询操作，后端也用 POST 接口，这种没有错，只是不够语义化

用 GET 还是 POST 并不是本文的讨论重点，下面将假设 form 的 method 被设为 POST

如果 form 的 method 为 POST, 那么可以通过 enctype 属性来设置 request body 的格式。enctype 常用的值有 application/x-www-form-urlencoded 和 multipart/form-data。如果表单需要提交二进制数据(比如文件)的话则只能使用 multipart/form-data, 否则的话这两者都可以，由于后端实现对 application/x-www-form-urlencoded 的支持比较容易，所以在不需要提交二进制 raw data 的情况下一般推荐 application/x-www-form-urlencoded

enctype 是 application/x-www-form-urlencoded, 这告诉浏览器：发送请求时 Content-Type 应该是 application/x-www-form-urlencoded, request body 也需要先使用 URL Encoding 来进行编码之后发送。

假设用户在页面上填写 name 为 John Williams, email 为 john@williams, 那么该请求的 payload 应该是

```console
name=John+Williams&email=john%40gmail.com
```

可以看出使用了像 URL 一样的格式, 属性和值之间用 = 号联系, 键值对之间用 & 号来连接

编码方面, 邮件中的 @ 号按照 Percent Encoding 被编码为 %40, 但 John 和 Williasm 之间的空格被编码为了 + 号而不是标准 Percent Encoding 中的 %20, 这个是因为 x-www-form-urlencoded 用了比较早的 Percent Encoding 标准, 可以认为是个历史遗留问题

### 参考资料

1. [MDN: HTTP POST Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
2. [MDN: Percent Encoding](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)
3. [Wikipedia: Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)

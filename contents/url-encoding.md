---
title: URL Encoding
date: "2021-03-20"
language: zh-CN
category: other
---

> 在 [Encoding](https://blog.realrz.com/encoding) 这篇博客里面我对 Encoding 进行了介绍，介绍了常见的字符编码，比如 ASCII 和 UTF-8。另一个常见的例子是 URL Encoding, 在 Web 开发中很常见。可是为什么需要对 URL 进行编码呢？具体怎么实现？

### URL Parameters 中的特殊字符

URL 中含有一些特殊字符表达特殊的含义，比如 **?** 表示 URL Parameter(s) 的开始, **=** 用于连接属性和值，**&** 用于连接多个键值对:

```console
http://example.com?name=john&age=10
```

现在试想 name 的值是 jo&h=n 会怎么样:

```console
http://example.com?name=jo&h=n&age=10
```

由于 **&** 具有特殊含义, 会被解析成 3 个键值对:

- name=jo
- h=n
- age=10

这显然不是我们想要的。

### 转义 - An Example

如何规避这些可能造成麻烦的特殊字符呢？最常见的方法是对字面量(literal)中含有的特殊字符进行 **转义(escape)**

转义一般会使用某个特殊符号来标记转义的开始, 这个特殊符号被称为转义符(escape character)。最常见的转义符是 **\\**

你可能知道 **\n** 可以用来换行，**\t** 可以用来打印制表符(tab)。这里的 n 和 t 经过 \ 的转义之后都不再代表字母 n 和字母 t, 下面是一个例子:

```javascript
console.log("Hi John,\n\tHow are you?\nBest Wishes");
```

关于转义有一个规律：要打印转义符号本身，需要对转义符号本身进行转义

听着有点绕，让我们看一个例子:

```javascript
console.log("\");
```

如果你运行上面的代码会发现运行环境报错。问题在于 **\\** 被认为是转义符用于转义其后的 **"** 符号。要打印转义符本身我们必须对其进行转义:

```javascript
console.log("\\");
```

### Percent Encoding

URL Encoding 有点特殊，并没有使用 **\\** 作为转义符号，而使用了 **%** 符号，所以 URL Encoding 又被称为 **Percent Encoding**。

在 URL 这个 Context 下需要规避的特殊字符有 20 个, 包括空格和 **%** 本身, 具体编码规则如下:

```console
':'  '/'  '?'  '#'  '['  ']'  '@'  '!'  '$'  '&'  "'"  '('  ')'  '*'  '+'  ','  ';'  '='  '%'  ' '
%3A  %2F  %3F  %23  %5B  %5D  %40  %21  %24  %26  %27  %28  %29  %2A  %2B  %2C  %3B  %3D  %25  %20 or +
```

接着之前的例子: 试想 name 是 jo&h=n 通过 URL Encoding 之后会怎么样

```console
编码前: http://example.com?name=jo&h=n&age=10
编码后: http://example.com?name=jo%26h%3Dn&age=10
```

这样以来 URL 就可以被解析为:

```console
name=jo%26h%3Dn
age=10
```

对属性值再进行解码就得到了它们原本的样子。由于:

1. **%26** 解码后是 **&**
2. **%3D** 解码后是 **=**

所以 name 的值是 **jo&h=n**

### application/x-www-form-urlencoded

从 Web 页面发起 http 请求的实现方式大体可以分为 2 种: 

1. 使用 JS 做 **XHR/Fetch** 请求 (编程式)
2. 利用浏览器对 **form** 元素的原生支持，通过配置 html form 元素发送请求 (配置式)

XHR(XmlHttpRequest)/Fetch 非常灵活，开发者可以用 JavaScript 在任意时刻发出请求。但如果通过配置 form 元素就能满足需求，可能会省下不少代码。

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

**action** 属性是 API 的地址, **method** 是 HTTP 方法, **enctype** 用于设置 **Content-Type** 请求头的值(只有 method 为 post 时才有效)。此外 form fields 的 **name** 属性就是发送 HTTP 请求时的参数名。

需要注意的是 form 的 method 属性只能是 **GET** 或 **POST**。因为相对来说限制少, 使用 POST 的情况要比 GET 常见的多, 这时数据会被放到 http body 里进行传送, 发出的 HTTP 请求中的 **Content-Type** 请求头支持 3 种类型:

1. application/x-www-form-urlencoded
2. application/form-data
3. text/plain

你可以通过设置 form 的 **enctype** 属性来决定具体使用哪个。唯一的限制是: 如果表单需要提交二进制数据(比如文件)的话则只能使用 **multipart/form-data**

如果 **enctype** 设置为 **application/x-www-form-urlencoded** 那么在发送数据前会先使用 **URL Encoding** 进行编码。假设用户在页面上填写 name 为 *John Williams*, email 为 *john@williams.com*, 那么该请求的 raw payload 会是:

```console
name=John+Williams&email=john%40gmail.com
```

### 参考资料

1. [MDN: HTTP POST Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
2. [MDN: Percent Encoding](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)
3. [Wikipedia: Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)

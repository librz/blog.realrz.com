---
title: XSS 攻击
date: "2020-10-24"
language: zh-CN
category: other
---

> Web 被构建之初没有把安全放在首要位置，导致出现了很多安全漏洞。跨站脚步攻击（XSS）是最常见的攻击方式之一。

### 原理

攻击者向服务器发送含有 JavaScript 脚本的文本，如果服务器不对用户提交的文本进行检测和清洗，当有需要在 HTML 中展示这些文本时，含在其中的 JavaScript 脚本就会被执行。

XSS 不直接对服务器进行攻击，而是利用 DOM 的特征和客户端 JavaScript 来攻击使用网站的用户，可以简单认为 XSS 的原理是客户端 JavaScript 注入。比如通过 JavaScript 脚本获取用户的 Cookie，LocalStorage 内存储的信息，重定向到恶意网站等。根据脚本是否被存储在服务器上，XSS 可以分为反射型和存储型。

### 存储型（Stored XSS）

存储型 XSS 的攻击脚本会被服务器（通常是服务器上数据库）持久存储，所以又叫持久 XSS（Persistent XSS）。

假设这样一种情景：一个网站允许用户修改用户名，而且别的用户可以看到网站的用户列表。

服务端的实现可以很简单，拿到用户提交的用户名后，直接丢到数据库，要显示的时候用以下的 HTML 模板：

```html
<span>{userName}</span>
```

这里的 userName 是服务器从数据库中取出的变量(用大括号表示变量)，也就是攻击者设定自己用户名时提交的文本。现在想象一个假如攻击者提交的用户名是 `<script>alert("You are hacked!")</script>` 会怎么样？浏览器将会渲染如下内容：

```html
<span>
  <script>
    alert("You are hacked!");
  </script>
</span>
```

当其他用户查看网站用户列表时，服务器返回带有攻击脚本的 HTML，浏览器解析 DOM 的时候会执行这行脚本提示 You are hacked!

这样的简单攻击很容易防御：发现用户提交的文本中含有 `<script>` 拒绝就好了。但客户端 JavaScript 不是非得在 `<script>` 标签下才能运行，行内 JavaScript 也很常见。

还是上面的例子，网站还允许用户自定义用户名的显示颜色，并采用了以下 HTML 模板：

```html
<span style="color: {userColor}"> {userName} </span>
```

userColor 是用户提交的自定义颜色，如果攻击者提交的是 `blue' onclick='alert("You are hacked again!")`，那么浏览器渲染的可能是：

```html
<span style="color: blue" onclick='alert("You are hacked again")'> king_of_the_world </span>
```

这里巧妙的利用了模板含有单引号，攻击者先补了一个单引号（blue'）强行关上了 style 属性，然后利用 onclick 事件添加行内 JavaScript，注意这里的 onclick 只有一个单引号，因为结尾的单引号模板会补上。

其他用户点击攻击者的用户名 king_of_the_world 就会触发恶意脚本。这样的攻击就稍微复杂了点，一种简单的防御策略是检测 onclick 关键字，但 DOM 事件远不止这一个，需要遍历所有事件名才能比较好的防止这种攻击。

### 反射型（Reflected XSS）

反射型 XSS 不像存储型一样通过将含有恶意脚本存储到服务器上，所以也叫非持久型 XSS（Non-Persistent XSS）。

最常见的是在 URL 上注入 JavaScript 脚本：

假设一个网站的域名是 wallet.com, 如果用户输入的路径不对就会重定向到 404 页面并提示这个路径不存在，404 页面的模板如下：

```html
<html>
  <div>/{route} doesn't exist</div>
</html>
```

用户输入一个错误的 URL 比如 wallet.com/something, 浏览器会渲染 /something doesn't exist

试想如果输入的 URL 是 wallet.com/<script>alert("Sorry, hacked again!")</script> 会发生什么？恶意脚本会被执行

当然正常用户不会故意输入这样的 URL，但是攻击者可能会通过短信或者邮件等方式发送恶意链接给受害者，一旦链接被点击攻击就会开始。

有趣的是现在浏览器（比如 Chrome）都有一定防止反射型 XSS 的能力。但我们不应该依赖浏览器，一是浏览器的防御能力有限，二是不是所有浏览器都内置这种能力。

> 未完，会再写

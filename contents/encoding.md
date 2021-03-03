---
title: Encoding
date: "2021-02-26"
language: zh-CN
category: other
---

> UTF-8 为什么能够兼容 ASCII? Emoji 的网络传输效率和普通文本不相上下？为什么 Microsoft Yahei 的字体文件远比 Helvetica 的要大的多? 看完这篇博客，获得所有答案！

#### /[01]\*/ + Encoding = Information

在计算机中数据的最终存储形式都是一串 0 和 1, 用正则来表示就是 `/[01]*/`，这种排列组合简单却强大，可以表示任意大小的数据量。

但这还不够，毕竟排列组合只是一种数学概念，没有实际意义。给出一串 0 和 1, 我们需要一套解释(interpret)这串数据的规则才能获取到其中的信息, 这套规则被称为编码(encoding)。简言之，`/[01]*/ + encoding = Information`

#### Encoding - An Example

如何对图片进行编码呢? 图片是由像素组成的，假设只需要表示红黄蓝绿这 4 种颜色，以下是 2 种编码方式:

```console
编码方式 A: 红: 00, 黄: 01, 蓝: 10, 绿: 11
编码方式 B: 红: 11, 黄: 10, 蓝: 01, 绿: 00
```

两种设计都非常合理，采用了 2 个比特来表示一种颜色，因为需要一共表示 4 种颜色，每一个比特都没有浪费。

现在我们要开发一个简单的像素预览程序, 它要能够查看用 A 或 B 进行编码的像素图片。

我们规定这种像素图片的格式: 第一个比特是 0 或 1 (0 代表采用 A 编码，1 代表采用 B 编码), 剩余比特是具体的像素信息

如果某个像素图片的二进制表示是 `01101` 那么它就会被程序渲染为 `绿黄` 这 2 个像素; 如果二进制序列是 `11101` 那么渲染的结果就是 `红蓝` 这 2 个像素。

上面的 2 个例子虽然实际像素的二进制序列都是 `1101`, 由于采用了不同的编码，结果解析出的颜色信息完全不同!

#### Character Encoding

有了 Encoding 的概念，计算机科学家们就开始对各种形式的信息进行编码，比如图片视频等。由于文本是信息的基本承载形式，自然是优先编码的对象。文本是由字符组成的，为文本制定编码等同于对字符集进行编码。

有趣的是字符存在多个编码标准，你可能听说过 ASCII, Unicode, UTF-8 等名词，下文将依次介绍它们。

#### ASCII - Latin Characters Only!

ASCII 码是比较早的一种字符编码, 全称是 Amercian Standard Code for Information Interchange。由于这种编码设计的比较早，当时计算机还没在美国之外流行，所以 ASCII 码只考虑了英文用户, 只包含了一些常见的拉丁字符，这包括:

1. 33 个控制字符 (tab, carriage return, line feed...)
2. 空格 (space)
3. 52 个大小写英文字符 ([a-zA-Z])
4. 10 个阿拉伯数字 ([0-9])
5. 32 个常用拉丁符号 (大部分是英文标点符号)

33 + 1 + 52 + 10 + 32 = 128, ASCII 表示的字符集一共有 128 个字符

[这里](https://www.rapidtables.com/code/text/ascii-table.html) 是一张完整的 ASCII 表

请注意，ASCII 表中前 32 个最后 1 个字符(DEL)属于控制字符所以是不可打印的(non-printable)， 中间 95 个字符是可打印的(printable)。这 33 个控制字符大部分都已经过时了，只有 tab, carriage return, line feed 等少数还被我们使用着。

ASCII 使用一个字节(8 bits)表示一个字符，而 ASCII 只需包含 128 个字符，因此也就只使用了 7 个比特(2^7=128)。

当时内存那么紧张，为什么还要多占用一个比特？主要有 2 个原因，第一字节是个比较“整”的单位。第二是为了扩展性，万一以后要加什么字符，就可以利用剩下的那个比特了。实际上，人们确实有利用多出来这个比特，利用了这个比特的 ASCII 叫 Extended ASCII, 但这不是本文的讨论话题。

#### Unicode - One Standard For All Languages

ASCII 只能为英文用户服务，后来使用其他语言的人们也开始使用计算机，非英语国家就开始为自己使用的语言制定编码标准。你可能听说过 GB 18030, 这是中国政府制定的中文编码规范，支持简体和繁体中文。这样只要计算机上装有 GB 18030 就可以显示和输入中文了。日本也有自己的标准，韩国也有自己的标准，中东也有自己的标准...

问题开始出现，难道要为每种语言都制定一个标准吗? 想象一下，你给一个美国朋友发了封邮件，里面有中文而且用的是 GB 18030 编码，由于他不大可能在电脑上装 GB 18030，这时候邮件该如何显示就成了问题。

如果我们可以制定一种编码标准，里面包含了各种语言的字符，所有人都用这个标准的话，那国际间交流就可以很顺畅了。这就是 Unicode 诞生的背景。

Unicode 规定了字符对应的数值，也叫 Code Point, 由于直接用二进制表示太长，所以一般使用 16 进制(hex)来表示。比如简体中文字符 "木" 的 Unicode Code Point 是 U+6729, 日语字符 "き" 的 Unicode Code Point 是 U+304E

Unicode 兼容了 ASCII, 所有的 128 个 ASCII 字符在 Unicode 里有和在 ASCII 中相同的 Code Point, 比如小写字母 "a" 的 Unicode Code Point 为 U+0061

注: Unicode 不一定是 4 位的 hex，但人们习惯把不足 4 位的进行高位补 0 让它看起来是 4 位的。比如 Code Point 是 23(hex) 会写成 U+0023

在 [Graphemica](https://graphemica.com) 上可以查到指定字符对应的 Unicode Code Point

注意: Unicode 只列出了字符对应的 Code Point, 并没有指明该使用多少个字节表示一个字符。实际上，Unicode 有多种不同的实现，最著名的是 UTF-8

#### UTF-8 (Dominence)

UTF-8 是 Unicode Transformation Format - 8 bit 的缩写，是一种变长编码，某个字符占用多少个字节取决于该字符的 Unicode Code Point 的值，具体规则如下:

```console
| Bytes Usage | Code Point Range | Byte 1   | Byte 2   | Byte 3   | Byte 4   |
| ----------- | ---------------- | -------- | -------- | -------- | -------- |
| 1           | U+0000~U+007F    | 0xxxxxxx |          |          |          |
| 2           | U+0080~U+07FF    | 110xxxxx | 10xxxxxx |          |          |
| 3           | U+0800~U+FFFF    | 1110xxxx | 10xxxxxx | 10xxxxxx |          |
| 4           | U+10000~U+10FFFF | 11110xxx | 10xxxxxx | 10xxxxxx | 10xxxxxx |
```

这个表能够回答很多问题:

_(1) UTF-8 为什么能兼容 ASCII_

请注意表的第一行: U+0000 ~ U+007F 的十进制表示是 0 ~ 127, 而 ASCII 刚好有 128 个字符。而且和 ASCII 一样，UTF-8 也使用一个字节来表示这 128 个字符，首位是 0，剩余 7 位表示实际字符的 code point.

_(2) 变长编码如何工作_

定长编码使用固定的字节数来表示字符。比如 ASCII，每一个字符都使用一个字节进行编码，这样每 8 比特为一个单位进行解码就可以了。

变长编码中不同的字符可能占用的字节数不一样，这时如何区分某个字节到底是哪个字符的哪一部分就成了问题。UTF-8 解决问题的方式很简单：使用高位比特进行标记

从表中可以看出:

```console
如果某个字节首位是 0 那么它一定是一个 ASCII 字符并且只占用 1 个字节;
如果某个字节前 2 位是 10, 那么它虽然是字符的组成部分但不是首字节
如果某个字节前 3 位是 110，那么它是某个字符的首字节并且该字符有 2 个字节
如果某个字节前 4 位是 1110，那么它是某个字符的首字节并且该字符有 3 个字节
如果某个字节前 5 位是 11110，那么它是某个字符的首字节并且该字符有 4 个字节
```

利用字节的高位比特判断出该字节的含义，这样就能顺利解码了

_(3) 变长编码的优缺点_

从上面就能看出变长编码的缺点：需要根据字节的高位来判断字节的含义，这里涉及到一些条件判断，解码的时候没有定长编码方便直接，效率也要稍微低一点

但是 UTF-8 依然采用了变长编码，一方面能够轻松兼容 ASCII, 使用 ASCII 编码的文档能够用 UTF-8 解码而不出现乱码；另一方面则是为了节省空间:

ASCII 中的字符都是比较常用的拉丁字符，出现频率高，用一个字节进行编码; 对于不那么常用的拉丁字符以及主流语言的字符使用 2 个字节表示, 比如 CJK(Chinese, Japanese, Korean) 字符在 UTF-8 里就占用 2 个字节; 对于那些不常见的字符使用 3 个或者 4 个字节表示;

_Dominence: 截止本文发表(2021 年), UTF-8 已经占据了绝对优势, 97% 的 web 页面采用了 UTF-8, Internet Mail Consortium 推荐所有邮件程序都应该支持使用 UTF-8 来显示和编辑邮件。以至于虽然 UTF-8 的地位可以用 Dominence 来形容。_

#### We all ❤️ Emoji

2000s 左右，欧美公司开始大批进入日本，发现日本人更喜欢用本国的电子产品。经过调研发现他们选择本国产品的原因之一是这些产品内置了 "絵文字", 写作英文就是 Emoji。但当时 Emoji 的实现简单粗暴: 直接使用图片。

由于当时流量很贵，即使 Emoji 用的图片很小也远比字符消耗的流量多。人们就提出建议能不能 Unicode 中加入 Emoji, 提案刚开始并不受欢迎, Unicode 是字符编码，而当时人们普遍认为 Emoji 是小尺寸图片而已。

不过资本再一次证明了自己力量, Emoji 最终被加入到 Unicode 中。由于加入的时间比较晚, 分配给 Emoij 的 Unicode Block 叫 [Emoticons](<https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)>), 占用的 Code Point Range 为 U+1F600 ~ U+1F64F, Unicode Code Point 的值比较大，使用 UTF-8 时单个 Emoji 需要占用 4 个字节。即使这样，也远比图片小多了。

以下是 A 发送一个 😁 给 B 的流程(假定双方都使用 UTF-8):

```console
1. A 打开输入法，输入法本地加载 Emoji 对应的图片
2. A 选中 😁 并点击发送
注: 😁 在 UTF-8 对应的二进制实际是 11110000:10011111:10011000:10000001
3. 网络开始传输 11110000:10011111:10011000:10000001
4. B 收到这 4 个字节并用 UTF-8 解码，知道这是个 Emoji 并本地加载该 Emoji 对应的图片
```

_由于 Emoji 被 "字符化"，网络传输效率大大提高。除此之外，你甚至可以在记事本里直接输入 Emoji_

#### Fonts

引言中的问题只剩下最后一个: 为什么 Microsoft Yahei 的字体文件远比 Helvetica 的要大的多?

回答这个问题首先要对字体文件有个大概的认识。简单看，字体文件其实是一种映射: 字符 -> 样式。不同的字体格式对样式的定义方式可能不同(你可能听说过 Open Type 和 True Type), 不过他们都是在定义字体样式的 vector 信息，就像 svg 图片一样

Helvetica 是种常见的拉丁字体，只负责 200 多个拉丁字符的样式对应。而 Microsoft Yahei 包含了许多其他字符, 比如 CJK (Chinese, Japanese, Korean) 字符，加起来一共将近 30,000 字符。由于 Microsoft Yahei 的字符集是 Helvetica 的 15 倍左右，而且通常非拉丁文字符的样式定义比较复杂，所以通常 Microsoft Yahei 的字体文件也比 Helvetica 的要大很多。

我做过一个测试，在网络上下载了这 2 种字体文件，Microsoft Yahei.ttf 大约是 14 MB, 而 Helvetica.ttf 只有 311 KB。之前有在油管看到视频，谈及中国和外国的 Web 开发有什么区别，其中一点是中国的 Web 开发者没有引入字体文件的习惯，我想中文字体的体积相对较大也是原因之一。

#### 参考资料

1. [阮一峰: 字符编码笔记](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

2. [Wikipedia: ASCII](https://en.wikipedia.org/wiki/ASCII)

3. [Wikipedia: Unicode](https://en.wikipedia.org/wiki/Unicode)

4. [Wikipedia: UTF-8](https://en.wikipedia.org/wiki/UTF-8)

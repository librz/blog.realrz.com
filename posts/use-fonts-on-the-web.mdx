---
title: 在 web 上使用字体
date: "2023-04-16"
language: zh-CN
category: other
---

周末看了 NHK 拍的纪录片《行家本色 - 字体设计师藤田重信》。记者采访鸟海修(とりのうみ・おさむ)先生时提到他是著名字体 Hiragino Sans 的作者, 顿时肃然起敬。正好借着机会整理下在 Web 开发中和字体相关的知识

### 字体 - An Overview

简单看，字体是一种映射: 字符 -> 样式。不同的字体格式对样式的定义方式可能不同(你可能听说过 OpenType 和 TrueType), 不过他们都是在定义字体样式的矢量信息，就像 svg 图片一样。所以字体设计本质是 graphic design。

### Glyph - 字体的基本组成元素

每套字体都有一个字符集合，其中是该字体所要支持显示的所有字符。Glyph 这个术语用于表示某个字符的特定形状，若干个 Glyph 就组成了一套字体。Wikipedia 对 Glyph 的定义是:

> the specific shape, design, or representation of a character

不同语言的字符集大小不同，拉丁系语言(比如英法德)普遍字符集较小而 CJK (Chinese, Japanese, Korean) 的字符集要大的多。这很容易理解，类似英文这种语言通过对字母表中的 **字母** 进行组合得到单词，而 CJK 系的语言通过对 **字** 的组合得到词。也就是说拉丁系语言的基本组成元素是 **字母** 而 CJK 则是 **字**。字母通常比较少(即使算上大小写) 而字就比较多了，拿中文举例，在 2016 年出版的《现代汉语词典》中收录了 12,500 个汉字。

字符集大小其实在某种程度上决定了字体开发的难度。拿英文和中文做对比，完成度高的英文字体一般需要定义 1K+ 个 Glyph（包括大小写拉丁和希腊字母, 数字, 标点符号和各种特殊标记），而中文字体通常要定义上万个 Glyph。这一点也可以从字体文件的大小上看出：英文字体文件通常只有几十 KB 而中文字体通常都在几 MB 和十几 MB 这个级别。

### Serif 和 Sans-Serif

字体根据设计风格大体可以分 2 种: *Serif(衬线字体)* 和 *Sans-Serif(无衬线条字体)*

Serif 来自德语，原意为**笔触**; Sans 来自法语，原意为**没有**。Serif 字体在笔画的开始和结束的地方有额外的装饰，而且笔画粗细不同，Sans-Serif 则完全相反:

![Serif vs Sans-Serif](/images/serif-vs-sans-serif.png)

大部分情况你会想要使用 Sans-Serif, 它更加简洁现代容易阅读

### Monospace (等宽字体)

大部分拉丁字体都不是等宽的, 这在大部分情况下不是什么问题。但像阅读代码这种场景等宽字体是更好的选择，代码中含有很多特殊符号，程序员需要能很容易分辨出它们。*Menlo, Monaco, Consolas, Courier New* 都是常见的等宽字体。

![使用非等宽字体(Helvetica)渲染代码片段](/images/render-code-with-helvetica-font.png)

上图为：使用非等宽字体(*Helvetica*)渲染代码片段

![使用等宽字体(Hack)渲染代码片段](/images/render-code-with-hack-font.png)

上图为：使用等宽字体(*Hack*)渲染代码片段

注：东亚字体中的方块字(汉字, 日语的假名, 韩语的谚文)基本上都是等宽的

### 常见西文字体

- **Helvetica**: 苹果系统内置的一种西文无衬线字体。Helvetica Neue 是 Helvetica 字体改善版本，增加了更多不同粗细与宽度的字形。

- **Arial**: 为了与 Helvetica 竞争而设计的无衬线西文字体，表现形式和 Helvetica 类似，各种系统都对其提供支持所以兼容性非常好。

- **San Francisco**: 苹果于 2017 年推出一种无衬线字体，也是目前苹果系统的默认西文字体。相比 Helvetica，San Francisco 的风格更加简洁现代。

- **Segoe UI**: Windows 系统下的一种无衬线西文字体，也是 Windows 系统的默认西文字体。

- **Roboto**: Android 系统的默认西文字体，也是一种无衬线字体

- **Times New Roman**: 1932 年发布的衬线字体，多用于报纸印刷和创造复古感

### 常见中文字体

- **苹方(PingFang SC)**: 苹果专为中文用户打造的字体, SC(Simplified Chinese)代表简体。该字体是苹果系统的默认中文字体，采用无衬线设计。

- **冬青黑体(Hiragino Sans GB)**: 久负盛名的日文字体 Hiragino Sans 的中文变种，由日本的鸟海修先生和中国的[汉仪字库](https://www.hanyi.com.cn/home)合作设计。Sans 说明它属于无衬线字体，GB(国标)说明它获得了中国国标认证。

- **微软雅黑(Microsoft YaHei)**: Windows 默认的中文字体，无衬线

- **宋体**: 中文衬线字体，字体偏瘦，风格明显

- **文泉驿微米黑(WenQuanYi Micro Hei)**: Linux 系统下默认中文字体，一般为了兼容 Linux 系统才会设置这个字体。

### 在 CSS 中设置字体

在 CSS 中可以使用 **font-family** 来指定要使用的字体。

关于字体的值有一些规则:

- 如果是非英文字体要使用该字体对应的**英文**名称
- 如果字体名称之间**有空格要使用引号**

下面是一个示例：

```css
font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
```

可以看到设置了一系列字体，这利用了字体的 **fallback** 机制：

1. 如果某种字体不存在那么就按顺序尝试下一种字体
2. 如果某种字体存在，但在渲染某个字符时并不能在该字体的字符集中找到这个字符，那么针对该字符，也会按顺序尝试下一种字体

这就解释了为什么一般会**把英文字体放在中文字体前面**：如果不这样做，由于中文字体的字符集一般也会包含英文字母，这样以来渲染英文字符的时候就没机会使用真正的英文字体了。

同时请注意上面示例中 fallback 的**最后**一个值是 sans-serif，这告诉浏览器：如果找不到前面的任何一个字体，就使用系统默认的无衬线字体。

### 使用 Web Font

由于各大操作系统上面默认支持的字体不同(比如 PingFang SC 就只有苹果系统支持，Microsoft YaHei 就只有微软支持)，如何保持文字在不同设备上的一致性就成为了问题。幸运的是浏览器支持使用网站提供的定制字体，你可以使用第三方字体服务(比如 Google Fonts)也可以选择自己托管字体文件。

定制字体的原理很简单，只要用 CSS 的 **font-face** 定义字体就可以使用了。下面是 Google Fonts 中对一款名为 *Lato* 的字体的定义:

```css
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

### 在 Chrome 中查看实际渲染使用的字体

由于 font-family 存在 fallback 机制，如何知道实际渲染使用哪种字体呢? 在 Chrome 中可以通过 **computed styles** 来查看。下面是我 inspect 某一个段落的 computed styles 的截图: 

![inpect rendered fonts](/images/inspect-rendered-fonts.png)

可以看出该段落有 113 个字符使用了 PingFang SC 字体来渲染，46 个字符使用了 Helvetica Neue 来渲染。看到这样的截图，你可以推断出我大概率在使用苹果系统。

### 纪念 Steve Jobs

提起 Steve Jobs 你可能会想到 iPhone/iPad/Mac 这些具体的产品，其实他最容易为人忽略的贡献是将字体带进了数码世界。

在 1984 年之前，计算机只提供一种字体(通常还没有粗体和斜体)。当第一台 mac 电脑年发布时，Jobs 做了一件史无前例的事情：为用户提供了众多字体以供选择，其中包括今天为人熟知的 *Helvetica, Times New Roman*。这并不是偶然，Jobs 年轻的时候参加了一门书法课(calligraphy)，此后便对手写书法很着迷。在 2005 年 Stanford 大学的毕业演讲中，他提及这段经历的时候说到:

> I learned about serif and sans-serif typefaces, about varying the amount of space between different letter combinations, about what makes great typography great. It was beautiful, historical, artistically subtle in the way that science can't capture, and I found it fascinating.

> None of this had even a hope of any practical application in my life. But ten years later, when we were designing the first Machintosh computer, it all came back to me. And we designed it all into the Mac. It was the first computer with beautiful typograph.

直到今天，苹果系统对字体的支持仍然是所有系统中最好的。在 macOS 上有一个应用叫 *Font Book*, 用户可以通过它轻易管理字体。在字体选择方面，苹果公司花了不少钱购买字体授权作为系统字体，有时还会委托字体设计公司为苹果平台设计字体, 比如 *苹方* 就是苹果公司委托台湾的 *威锋数位* 开发的专有字体。

![Steve Jobs and the machine that brought typograph to the masses](/images/steve-jobs-with-first-mac.webp)

图为: Steve Jobs 和第一款 Mac 电脑

### 参考资料

1. [如何优雅的选择字体](https://www.cnblogs.com/lfri/p/11776320.html)

2. [Web 字体 font-family 浅谈](https://www.cnblogs.com/cangdu/p/14042117.html)

3. [Steve Jobs, typographer](https://uxplanet.org/steve-jobs-typographer-2e450a356437)

4. [十年一字 ——TOPYS 专访字游工房鸟海修](https://www.topys.cn/article/20230)

4. [中文有多少个汉字](https://studycli.org/zh-CN/chinese-characters/number-of-characters-in-chinese/)

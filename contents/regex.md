---
title: 正则表达式
date: "2021-02-15"
language: zh-CN
category: other
---

> 字符串是单个字符排列组合的结果，当我们做字符串匹配的时候就需要一种描述这种排列组合关系的工具或者语言，这就是正则表达式诞生的背景

#### DSL

DSL 是 Domain Specific Language 的缩写，它不是一种通用的语言，而是为了解决某一类特殊领域的问题而发明的专用语言。SQL 和 AWK 这种语言都是 DSL，不能解决通用的问题，但是在自己的领域能够大大提升工作效率。

正则表达式 (regular expression) 就可以看作是一个 DSL, 有着自己的语法，目的清晰明确，着力解决字符匹配问题。

注意：正则表达式本身并不能解决字符匹配问题，只是一种描述匹配目标的语言，执行环境会对正则表达式进行解析，并使用相关的算法进行实际的字符匹配。

#### 标志 (indicator)

正则表达式本身也是一个字符串, 一般用斜杠(/)进行标记: /正则表达式内容/，这告诉执行环境：这是一个正则表达式，你应该按照相关的规则去进行解析。

#### 元字符和字面字符 (meta & literal characters)

正则表达式中的所有字符可以分为两类：元字符(meta character) 和字面字符(literal character)

元字符是一类有特殊意义的字符, 这里先列出元字符的类别（后面会详细说明）:

1. 锚定：caret(^) 和 dollar($) 表示目标的开始和结尾
2. wildcard: 点(.)
3. 数词: 星号(\*), 加号(+), 问号(?)
4. 字符集合的标记: 方括号([])
5. 分组标记: 括号 ()
6. 逻辑或: 竖线(|)
7. 转义字符: 反斜杠(\\)

字面字符比较容易理解，就是字符本身， a 就是 a, 1 就是 1。e.g.

`/abc/` 要求目标中含有 "abc" 这串字符

#### 锚定 (Anchoring)

可以将要匹配的字符的称为目标, 正则表达式其实就是在描述目标的模式(pattern), 通俗一点说就是目标长的样子。

一个很基本的 pattern 就是字符边界: starts with 和 ends with。专业一点的说法叫锚定(anchoring)

在正则表达式中用 caret(^) 表示字符串的开头，用 dollar($) 表示字符串的结尾 (Vim 用户应该很熟悉吧)

正则表达式默认是包含关系: `/cat/` 会匹配 cat, cats, a cat, two cats ...

有了锚定，目标就必须符合锚定规则:

`/^cat/` 只会匹配 cat, cats, cat is cute ...

`/cat$/` 只会匹配 cat, a cat, cute cat ...

`/^cat$/` 只会匹配 cat

#### 通配符(wildcard)

通配符表示任意一个字符，在正则表达式里用点(.)来标记:

`/^L..e$/` 将匹配一个长度为 4 的字符串，开头是 L 结尾是 e, 中间 2 个字符任意。比如 Love, Like, LABe ...

注意: 通配符并不能表示终止字符(terminators): line feed(\n), carriage return (\r)

#### 数词 (numeral)

自然语言中的数词用于描述名词的数量，一般有“数词 + 名词”这样的语法，比如 "一张桌子"。

正则表达式中也有数词，用于描述字符的数量，但采用的是 "字符 + 数词" 的表记方式，把数词放在字符后面。这些数词有:

1. 星号(\*) 表示 0 个或 多 个在它之前的字符
2. 加号(+) 表示 1 个或 多 个在它之前的字符
3. 问号(?) 表示 0 个或 1 个在它之前的字符
4. {n} 表示在它之前的字符有且仅有 n 个
5. {min,} 表示在它之前的字符有至少 min 个
6. {,max} 表示在它之前的字符有至多 max 个
7. {min,max} 表示在它之前的字符至少 min 个，至多 max 个

e.g.

`/a*bc/` 表示 bc, abc, aabc ...

`/a{0,}bc/` 同上

`/colou?r/` 表示 color 或者 colour

#### 字符集合 (character set)

有的时候需要对某个位置的字符进行限定，比如规定某个位置的字符只能是 a 或者 b 或者 c, 这时候就需要用到字符集合。

在正则表达式中用方括号 [] 表示一系列字符的集合, e.g.

[afg] 表示一个字符，这个字符必须是小写 a 或 f 或 g

用 hyphen (-) 可以表示范围(range), e.g.

- [a-f] 表示一个字符，这个字符必须在英文字母表中 a 到 f 之间（小写）
- [1-9] 表示任意一个阿拉伯数字
- [a-zA-Z] 表示任意一个英文字母

集合同样支持非操作，在逻辑上表示“不在此集合中”的字符, 在集合前面追加一个 caret(^), e.g.

- [^2-6] 表示一个字符，这个字符不是数字 2,3,4,5,6
- [^2-6a-z] 表示一个字符，这个字符不是数字 2,3,4,5,6 也不是小写字母

#### 使用数词修饰字符集合 (combine character set with numerals)

字符集合本身其实带有默认的数词，也就是是 1。比如 [a-z] 表示任意“一个”小写英文字母。我们可以用数词来修饰字符集合：

`/^[a-z]{3}1$/` 表示目标长度为 4，前 3 个都是小写英文字母，最后一个字符是数字 1

`/[ \t]*/` 表示目标为任意长度的 space 和 tab 以任意方式进行排列组合

#### 子表达式 (sub-expression)

有的时候一个正则表达式可能不足以描述要匹配目标，这时可以创建 2 个或多个子表达式，通过组装子表达式来解决问题。e.g.

`/^ +| +$/` 表示目标以空格(一个或多个)开头或者结尾

为了更清晰区分子表达式还可以用括号把子表达式括起来: `/(^ +)|( +$)/`

#### 转义元字符 (escape meta characters)

正则表达式使用了一些元字符，比如星号(\*), 加号(+), 问号(?) 等等，这些字符都有特殊含义。如果要匹配的目标中含有这些转义字符本身，就需要用到转义(escape)，一般使用反斜杠(\\)进行转义:

`/\?$/` 检测输入中是否以问号结尾

`/[0-9]+ *\+ *[0-9]+/` 检测输入是否是整数加法表达式

#### 字符组 (character class)

要表示一个阿拉伯数字时会使用 `[0-9]`, 由于“阿拉伯数字”如此常用，为了方便，人们专门规定了它的简洁形式: `\d`

d 表示 digit, 此外，`\D` 可以用来表示"非阿拉伯数字"

上面的 `\d`, `\D`被称为字符组，用来简化那些常用的字符集合。其他常用的字符组有:

\s 表示一个 white space 字符, 这包括 space, tab, line feed, etc

\S 和 \s 正好相反，表示一个不是 white space 的字符

\w 表示一个 word character, 这相当于 `/[0-9a-zA-Z_]/`, 注意除了数字和字母外还多一个下划线 (Don't Ask Me Why :)

\W 和 \w 正好相反，表示一个不是 word character 的字符

#### 标准: BRE, ERE 以及 PCRE

BRE(Basic Regular Expression) 和 ERE(Extended Regular Expression) 是 POSIX 规定的两种正则表达式标准。根据 Wikipedia:

> BRE and ERE work together. ERE adds ?, +, and |, and it removes the need to escape the metacharacters ( ) and { }, which are required in BRE.

PCRE (Perl Compatible Regular Expression) 是被很多编程语言(Java, JavaScript, Python ...)所采用的标准，根据 Wikipedia:

> Perl regexes have become a de facto standard, having a rich and powerful set of atomic expressions. Perl has no "basic" or "extended" levels. As in POSIX EREs, ( ) and { } are treated as metacharacters unless escaped; other metacharacters are known to be literal or symbolic based on context alone.

ERE 是更加现代的标准，PCRE 使用了 ERE 标准并在其之上添加了一些功能，本文使用的是 ERE 标准

#### 例子

重要: 下面的例子中使用了 grep (linux 下一种命令行程序), 它会扫描输入中的每一行，如果该行符合搜索条件(正则表达式)就打印否则不做任何处理。grep 不使用斜杠(/)来标记正则表达式，因为 grep 基于正则表达式已经是个共识，没必要再进行标记。此外，-E 选项表示使用 ERE 标准。

假设当前文件夹下有个名为 test.txt 的文件，其中内容如下 (每一行的结尾都没有 space 或者 tab):

```console
I
walked into a
little sidewalk
and saw she
walk away.
A while latter,
I started to work on
the work I left yesterday
about the works of Shakespeare.
```

1. `grep -E "walk" test.txt`

```console
walked into a
little sidewalk
walk away.
```

2. `grep -E "^walk" test.txt`

```console
walked into a
walk away.
```

3. `grep -E "walk$" test.txt`

```console
little sidewalk
```

4. `grep -E "w[a-z]*k" test.txt`
5. `grep -E "w[a-z]+k" test.txt`
6. `grep -E "w[a-z].k" test.txt`
7. `grep -E "w..k" test.txt`
8. `grep -E "walk|work" test.txt`

```console
walked into a
little sidewalk
walk away.
I started to work on
the work I left yesterday
about the works of Shakespeare.
```

9. `grep -E "^I|e$|^walk" test.txt`

```console
I
walked into a
and saw she
walk away.
I started to work on
```

10. `grep -E "works?" test.tx`

```console
I started to work on
the work I left yesterday
about the works of Shakespeare.
```

11. `grep -E "\.$" test.txt`

```console
walk away.
about the works of Shakespeare.
```

本文在写作过程中参考了[维基百科](https://en.wikipedia.org/wiki/Regular_expression)

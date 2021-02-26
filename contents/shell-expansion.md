---
title: Shell Expansion
date: "2020-08-06"
language: zh-CN
category: linux
---

> Shell 在执行命令之前会检查命令中是否有特殊的语法。如果有，这些语法会被解析，其所修饰的部分会被替换为具有实际意义的字符串，这个过程被称为 shell expansion

#### tab 补全 (tab completion)

很多人知道点击 tab 键可以进行自动补全。比如当前文件夹下有个名为 user_payment_data.txt 的文件，而我们想打印其中的内容:

```console
cat user_p
```

一般只需要输入文件名的一部分就可以了，点击 tab 键 shell 会自动补全剩下的文件名。

自动补全的背后其实是 shell expansion, 上面的例子其实是 expansion 的一种: filename expansion

filename expansion 的高级用法是 file globbing, 我在 [这篇博客](https://www.blog.realrz.com/file_globbing) 中进行了单独介绍

#### 变量求值 (variable evaluation)

无论是 shell 的环境变量，还可以是用户自定义的变量，都会经历被求值的过程

```console
echo $PATH
```

$PATH 是个环境变量，在 shell 执行这行命令前，$PATH 会被替换为实际的值

```console
age=20
echo $age
```

age 是用户自定义的变量，它会被替换为 20

#### 子命令执行 (sub-command execution)

还记得 shell 获取子命令执行结果的语法吗？

```console
user=$(whoami)
```

这里将子命令 whoami 的输出赋给了 user 这个变量

同理，在 shell 直接使用 $(子命令) 这样的语法时，这一段会被替换为子命令的输出

```console
echo $(whoami)
```

如果当前用户名为 john, 那么这行命令会被 expand 为 echo john

#### 花括号扩展 (brace expansion)

花括号扩展常常用于批处理，用的熟练可以节时提效

```console
touch a{1,2,3}.txt
```

这实际相当于 touch a1.txt a2.txt a3.txt

这种扩展还支持 range，语法是 {start..end}:

```console
touch a{1..99}.txt
```

这将创建 a1.txt a2.txt ... a99.txt 这 99 个文件

#### 波浪扩展 (tilde expansion)

这个可以认为是个特例，在 shell 里波浪符(~)会被替换为用户的 home directory

```console
cd ~/code
```

进入到 home directory 底下的 code 文件夹

#### 注意: 单引号和双引号

单引号内的内容不会被 shell 做任何处理，字面上是什么就是什么(literal)。shell expansion 也不例外，只有在没有引号或者双引号内才会生效。

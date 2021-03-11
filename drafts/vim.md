---
title: Pro Code Editting With Vim
date: "2021-03-08"
language: zh-CN
category: other
---

> IDEs come and go, vim will always stay

#### an overview of vim

说起 vim 你会想起什么?

我的第一印象是快捷键，在 vim 中，几乎可以用快捷键做一切事情，很少需要去碰鼠标。

其次它是一种行编辑器(line editor), 特别强调"行"的概念：使用 `jk` 以行为单位上下移动, `:number` 可以到达指定的行, `^` 到达行首，`$` 到达行尾, `dd` 删除当前行, `yy` 复制当前行 ...

从另一种角度看它是一种模式编辑器(Mode Editro), 主要的模式有：命令模式(又叫普通模式)，插入模式和视觉模式(分为普通视觉模式和视觉模式)。这不同于普通编辑器只有插入模式，这种编辑器要实现快捷操作的话只能依靠控制字符，因为

vim 的快捷键还很语义化： `i` 可以从命令模式进去插入(insert)模式, `u` 可以 undo, `p` 表示 paste, `w` 可以前进一个 word, `b` 可以后退(back)一个 word, `v` 进入视觉(visual)模式, `x` 可以删除当前光标下的字符 ...

快捷键通过组合就能实现定制化的行为，比如 `d3w` 就可以连续删除 3 个 word, `dG` 可以一直删除到文档结尾, `di}` 表示 delete inside {} 的内容, ``

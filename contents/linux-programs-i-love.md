---
title: 我喜欢的 Linux 程序
date: "2020-11-09"
language: zh-CN
category: linux
---

> Unix 编程的哲学是 Do One Thing And Do It Well。每个程序的目的都应该很简单明确，不同的程序通过组合就可以完成那些看起来很复杂的工作。以下是一个列表，他们都是我喜欢的 Linux 程序

#### tldr

查找某个命令的用法时常用的做法是使用 man，但有些时候 man 给出的手册太长太详细了，使用者很难找到自己想要的。我就经常查看 man 手册不知不觉睡着了。

[tldr](https://github.com/tldr-pages/tldr) 就用于解决这类问题，它以简洁的方式提供某个命令最常用的用法。比如想要查看 disown 的用法: `tldr disown` 即可

#### apt

我喜欢的不是 apt 本身而是包管理器（package manager）的概念：以一种中心化的方式管理和获取软件

#### tree

打印目录的树状结构

#### pstree

打印进程的树状结构，可以很方便看出进程之间的层级关系

#### cron

如果要执行定时任务，比如隔几天做一次备份，每几个小时执行某个脚本，那么 cron 会首先在我脑中浮现。

#### ssh

Secure Shell, 用于登录远程主机。使用 SSH Key 做身份验证的话非常方便，第一次设定完成后，再也不需要输入密码。

#### scp

在本地和远程主机之间传送文件，基于 SSH

#### curl

灵活强大的网络请求工具，可以用来替换 Postman 还可以用来下载 Web 上的资源。

#### filebrowser

用 Go 和 Vue 构建的基于 Web 的文件管理工具。提供多用户管理，文件上传下载以及预览分享等功能。在 VPS 上安装它就相当于拥有了自己的云盘。

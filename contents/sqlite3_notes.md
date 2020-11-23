---
title: sqlite3 笔记
date: "2020-03-09"
language: zh-CN
category: other
---

> 对小巧轻便的制品总是很喜欢，在众多数据库中 sqlite 把简单轻量诠释到了极致。本文是在学习 sqlite3 过程中记下的一些笔记，我不是专家，仅供参考。

#### 环境设置

sqlite 只需要安装，不需要任何配置即可使用。

截止本文发表，sqlite 最常用的版本是 sqlite3。

在 Linux 上安装: apt install sqlite3。检查 sqlite3 是否存在：which sqlite3

#### 熟悉 sqlite 的命令行

sqlite3 是一个命令行程序，在终端输入 sqlite3, 可以看到 prompt 变成了 sqlite>

在使用 sqlite 的命令行之前，你可能会想知道这些事情：

1. 获取帮助: .help
2. 退出：.quit
3. 清空 screen buffer：CTRL + L
4. sqlite3 的命令行界面支持 tab completion

#### 数据库级别的操作

- 创建/打开 数据库

```shell
sqlite3 example.db
```

如果 example.db 存在，sqlite 会加载这个数据库；如果不存在，sqlite3 会创建一个数据库并将其中的信息保存在这个文件中；

- 罗列数据库中的 table

```shell
.tables
```

#### table 级别的 CRUD

- Create Table

```sql
create table users(first_name text, last_name text);
```

- Read Table Schema

```shell
.schema users;
```

- Update Table Schema

```sql
-- 添加 phone 列
alter table users add column phone text;
```

- Delete Table

```sql
drop table users;
```

#### record 级别的 CRUD

- Create Record(s):

```sql
insert into users values("Sam", "Smith");
insert into users values("Joe", "Peterson");
insert into users values("Peter", "Owens");
insert into users values("Dan", "Smith");
insert into users values("Chris", "Miller");
insert into users values("Rick", "Harrison");
insert into users values("Tim", "Jones");
```

- Read records

```sql
select * from users;

-- rowid 是 reserved keyword, 代表记录的 index
select rowid, last_name from users;

-- where 条件语句, is 精确查找，like 模糊查询
select * from users where first_name is "Sam";

-- fuzzy search: start with s or S, % means anything
select * from users where first_name like "s%";
```

- Update records

```sql
update users set first_name = "Alex" where last_name = "Thompson";
```

- Delete records

```sql
-- 使用 length 函数获取文本的字符数
delete from users where length(first_name) < 4;
```

参考：

1. [sqlite.org](https://www.sqlite.org/docs.html)
2. [Beginners Tutorial on SQLite3 in the Linux Shell Part 1](https://www.youtube.com/watch?v=dFzJ4UPNL1w)

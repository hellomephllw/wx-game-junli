create database if not exists coolguy character set utf8;

-- 设置事务隔离级别为提交读
set global transaction isolation level read committed;

use coolguy;

-- 更改数据库编码，避免出现乱码
SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_database = utf8;
SET character_set_results = utf8;
SET character_set_server = utf8;

-- 管理员
drop table if exists Admin;
create table Admin(
	id int primary key not null auto_increment,
	username varchar(20) not null,
	password varchar(50) not null,
	authority int not null,
	comment varchar(200)
);
insert into Admin values(null, 'admin', 'ljl123', 0, 'super manager');

-- 游戏
drop table if exists Game;
create table Game(
    id int primary key not null auto_increment,
    name varchar(30) not null,
    imgPath varchar(100) not null,
    description varchar(50) not null,
    rankNo int default 999
);

-- 礼包
drop table if exists GoodyBag;
create table GoodyBag(
    id int primary key not null auto_increment,
    name varchar(30) not null,
    description varchar(200) not null,
    gameid int not null
);

-- 兑换码
drop table if exists RedeemKey;
create table RedeemKey(
    id int primary key not null auto_increment,
    code varchar(100) not null,
    isLocked int not null,   -- 1:已锁定, 0:未锁定
    isObtained int not null, -- 1:已被获取，0:未被获取
    goodybagid int not null
);
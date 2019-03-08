-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-12-14 07:33:49
-- 服务器版本： 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE DATABASE `Info6250Final` /*!40100 DEFAULT CHARACTER SET latin1 */;

use `Info6250Final`;
--
-- Database: `info6250final`
--

-- --------------------------------------------------------

--
-- 表的结构 `bid`
--

CREATE TABLE `bid` (
  `bid_id` int(11) NOT NULL,
  `bid_status` varchar(20) DEFAULT NULL,
  `deliverydate` date DEFAULT NULL,
  `bid_amount` int(11) DEFAULT NULL,
  `bid_desc` varchar(100) DEFAULT NULL,
  `serv_id` int(11) NOT NULL,
  `su_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `bid`
--

INSERT INTO `bid` (`bid_id`, `bid_status`, `deliverydate`, `bid_amount`, `bid_desc`, `serv_id`, `su_id`) VALUES
(2, 'selected', '2018-05-01', 900, 'fdfdf', 2, 1),
(6, 'selected', '2017-09-01', 800, 'dfwsaelhhjf', 3, 2),
(7, 'new', '2017-12-31', 800, 'dfwsaelhhjf', 6, 6),
(8, 'selected', '2017-12-19', 455, 'ddfdgfdg', 7, 14),
(9, 'new', '2017-12-22', 600, 'cccc', 8, 14),
(10, 'selected', '2017-12-14', 343, 'test bidindanger', 8, 14),
(11, 'selected', '2017-12-31', 500, '333', 9, 14);

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `cate_id` int(11) NOT NULL,
  `cate_name` varchar(20) DEFAULT NULL,
  `cate_desc` varchar(100) DEFAULT NULL,
  `cate_status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`cate_id`, `cate_name`, `cate_desc`, `cate_status`) VALUES
(22, 'cate2', 'cate2', 'normal'),
(23, 'cate3', 'cate3', 'normal'),
(24, 'cate4', 'cate4', 'normal'),
(27, 'ttt', 'ttt', 'disabled'),
(28, 'fff', 'sss', 'normal'),
(30, 'cateff', 'ffdfd', 'normal');

-- --------------------------------------------------------

--
-- 表的结构 `cc`
--

CREATE TABLE `cc` (
  `cc_id` int(11) NOT NULL,
  `card_num` varchar(20) DEFAULT NULL,
  `expir_month` int(2) DEFAULT NULL,
  `expir_year` int(4) DEFAULT NULL,
  `cvv` int(5) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `cc`
--

INSERT INTO `cc` (`cc_id`, `card_num`, `expir_month`, `expir_year`, `cvv`, `user_id`) VALUES
(3, '1231234', 11, 2018, 123, 24),
(4, '43434', 22, 2018, 444, 24);

-- --------------------------------------------------------

--
-- 表的结构 `funding`
--

CREATE TABLE `funding` (
  `fund_id` int(11) NOT NULL,
  `fund_value` int(11) DEFAULT NULL,
  `fund_desc` varchar(100) DEFAULT NULL,
  `fund_amount` int(11) NOT NULL,
  `idea_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `funding`
--

INSERT INTO `funding` (`fund_id`, `fund_value`, `fund_desc`, `fund_amount`, `idea_id`) VALUES
(1, 100, 'get 1 unit of service provided by this idea', 1000, 1),
(2, 5, 'get 1 unit of service provided by this idea', 1000, 2),
(3, 10, 'get 2 unit of service provided by this idea', 500, 2),
(4, 20, 'get 4 unit of service provided by this idea', 250, 2),
(5, 50, 'get 5 unit of service provided by this idea', 95, 2),
(6, 5, 'test creation', 680, 13),
(7, 10, 'fff', 750, 17);

-- --------------------------------------------------------

--
-- 表的结构 `idea`
--

CREATE TABLE `idea` (
  `idea_id` int(11) NOT NULL,
  `idea_status` varchar(20) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `idea_remark` varchar(100) DEFAULT NULL,
  `idea_name` varchar(40) DEFAULT NULL,
  `idea_desc` varchar(100) DEFAULT NULL,
  `idea_enddate` date DEFAULT NULL,
  `idea_aim` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `idea`
--

INSERT INTO `idea` (`idea_id`, `idea_status`, `created_on`, `idea_remark`, `idea_name`, `idea_desc`, `idea_enddate`, `idea_aim`, `user_id`, `cate_id`) VALUES
(1, 'overdue', '2017-12-03', 'null', 'idea1', 'idea1', '2017-12-04', 1100, 2, 22),
(2, 'new', '2016-12-04', 'null', 'idea1', 'idea1', '2018-12-08', 20000, 2, 23),
(4, 'new', '2017-12-04', 'null', 'idea3', 'idea3', '2018-10-04', 11000, 3, 23),
(5, 'new', '2017-12-04', 'null', 'idea3', 'idea3', '2018-10-04', 11000, 3, 24),
(6, 'new', '2017-11-04', 'null', 'idea3', 'idea3', '2019-10-04', 11000, 3, 23),
(7, 'new', '2017-11-04', 'null', 'idea3', 'idea3', '2018-11-04', 11000, 3, 23),
(8, 'new', '2017-12-04', 'null', 'idea3', 'idea3', '2018-11-12', 11000, 3, 23),
(9, 'overdue', '2017-12-05', 'null', 'idea3', 'test getDyingIdea', '2017-12-07', 11000, 2, 23),
(10, 'overdue', '2017-12-05', 'null', 'idea3', 'test setOverDueIdea', '2016-11-12', 11000, 2, 23),
(11, 'new', '2016-12-07', NULL, 'idea3', 'test setOverDueIdea', '2018-11-12', 11000, 12, 23),
(12, 'overdue', '2016-12-07', NULL, 'idea3', 'test view', '2017-12-09', 11000, 12, 23),
(13, 'new', '2017-12-12', NULL, 'ffdfdfd', 'dfdfdfd', '2018-01-30', 5656, 27, 24),
(16, 'new', '2017-12-13', NULL, 'dying', 'dffsf', '2017-12-16', 200, 27, 24),
(17, 'new', '2017-12-14', NULL, '2323', '2333', '2018-01-25', 5000, 27, 24);

-- --------------------------------------------------------

--
-- 表的结构 `orderhistory`
--

CREATE TABLE `orderhistory` (
  `order_id` int(11) NOT NULL,
  `order_status` varchar(11) NOT NULL,
  `create_on` date NOT NULL,
  `pay_value` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `fund_id` int(11) NOT NULL,
  `buy_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `orderhistory`
--

INSERT INTO `orderhistory` (`order_id`, `order_status`, `create_on`, `pay_value`, `user_id`, `fund_id`, `buy_amount`) VALUES
(1000, 'prepared', '2017-12-06', 50, 8, 5, 5),
(1001, 'prepared', '2017-12-06', 20, 8, 4, 3),
(1002, 'prepared', '2017-12-11', 20, 8, 4, 5),
(1004, 'paid', '2017-12-11', 50, 24, 5, 4),
(1005, 'paid', '2017-12-12', 50, 24, 5, 1),
(1006, 'paid', '2017-12-13', 5, 24, 6, 10),
(1007, 'paid', '2017-12-14', 10, 24, 7, 50),
(1008, 'paid', '2017-12-14', 5, 24, 6, 10);

-- --------------------------------------------------------

--
-- 表的结构 `report`
--

CREATE TABLE `report` (
  `repo_id` int(11) NOT NULL,
  `repo_desc` varchar(100) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `progress` int(3) DEFAULT NULL,
  `bid_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `report`
--

INSERT INTO `report` (`repo_id`, `repo_desc`, `created_on`, `progress`, `bid_id`) VALUES
(1, 'test create report', '2017-12-05', 10, 2),
(2, 'test create report', '2017-12-05', 12, 2),
(3, 'test create report', '2017-12-05', 14, 2),
(4, 'rara', '2017-12-13', 10, 8),
(5, 'asdfa', '2017-12-13', 12, 8),
(6, 'done', '2017-12-14', 90, 10),
(7, '10', '2017-12-14', 10, 11),
(8, '50', '2017-12-14', 50, 11);

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(20) DEFAULT NULL,
  `role_desc` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `role_desc`) VALUES
(1, 'Admin', 'Desc22'),
(2, 'Creator', 'creatord'),
(3, 'Startup', 'startup'),
(4, 'Funder', 'funder'),
(5, 'Guest', 'Guest');

-- --------------------------------------------------------

--
-- 表的结构 `service`
--

CREATE TABLE `service` (
  `serv_id` int(11) NOT NULL,
  `serv_status` varchar(20) DEFAULT NULL,
  `serv_ddl` date DEFAULT NULL,
  `reward` int(11) DEFAULT NULL,
  `serv_desc` varchar(100) DEFAULT NULL,
  `idea_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `service`
--

INSERT INTO `service` (`serv_id`, `serv_status`, `serv_ddl`, `reward`, `serv_desc`, `idea_id`) VALUES
(1, 'new', '2017-12-04', 1000, '11223344', 2),
(2, 'closed', '2018-06-04', 1000, 'idea 2, serv 1', 2),
(3, 'closed', '2018-12-05', 900, 'idea 2, serv 2', 2),
(4, 'new', '2017-12-05', 900, 'idea4', 2),
(5, 'new', '2018-01-05', 2000, 'reward 2000', 2),
(6, 'new', '2018-01-05', 2000, 'reward 2000', 4),
(7, 'closed', '2017-12-22', 1000, 'test create serv', 13),
(8, 'closed', '2017-12-25', 600, 'ideaId 13', 13),
(9, 'closed', '2018-01-04', 900, 'tttt', 17);

-- --------------------------------------------------------

--
-- 表的结构 `startup`
--

CREATE TABLE `startup` (
  `su_id` int(11) NOT NULL,
  `su_name` varchar(20) DEFAULT NULL,
  `comp_name` varchar(20) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `cate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `startup`
--

INSERT INTO `startup` (`su_id`, `su_name`, `comp_name`, `user_id`, `cate_id`) VALUES
(1, 'su1', 'comp1', 4, 23),
(2, 'su2', 'comp1', 6, 23),
(3, 'su3', 'comp1', 7, 23),
(6, 'su3', 'comp2', 11, 24),
(7, 'name9', 'comp2', 13, 24),
(11, 'cvcv', 'xcvx', 26, 23),
(14, 'name9', 'comp2', 31, 24);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_status` varchar(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `name` varchar(40) NOT NULL,
  `created_on` date DEFAULT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `user_status`, `username`, `password`, `name`, `created_on`, `role_id`) VALUES
(1, 'active', 'junxi', 'pass', 'name1', '2017-12-03', 1),
(2, 'active', 'junxiF', 'pass', 'name2', '2015-12-03', 2),
(3, 'active', 'junxiFa', 'pass', 'name3', '2015-12-03', 2),
(4, 'active', 'junxiFan', 'pass', 'name4', '2017-12-03', 3),
(6, 'active', 'junxiFan1', 'pass', 'name5', '2017-12-03', 3),
(7, 'active', 'junxiFanfd1', 'pass', 'name6', '2017-12-04', 3),
(8, 'active', 'funder1', 'pass', 'name7', '2017-12-06', 4),
(11, 'active', 'test', 'pass', 'name6', '2017-12-07', 3),
(12, 'active', 'creatorToDisabled', 'pass', 'name7', '2014-12-07', 2),
(13, 'active', 'test2', 'pass', 'name9', '2017-12-07', 3),
(14, 'active', 'test security', 'pass', 'name7', '2017-12-09', 2),
(16, 'active', 'qweqwe', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', 'name7', '2017-12-09', 1),
(18, 'active', 'ttttt', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', 'name7', '2017-12-11', 2),
(21, 'active', 'ttttts', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', 'name7', '2017-12-11', 4),
(24, 'active', 'funder', '3cc849279ba298b587a34cabaeffc5ecb3a044bbf97c516fab7ede9d1af77cfa', 'name7', '2017-12-11', 4),
(26, 'active', 'xxxxxx', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'cvcv', '2017-12-11', 3),
(27, 'active', 'creator', '3cc849279ba298b587a34cabaeffc5ecb3a044bbf97c516fab7ede9d1af77cfa', 'creatorrr', '2017-12-12', 2),
(31, 'active', 'startup', '3cc849279ba298b587a34cabaeffc5ecb3a044bbf97c516fab7ede9d1af77cfa', 'name9', '2017-12-12', 3),
(35, 'active', 'admin', '3cc849279ba298b587a34cabaeffc5ecb3a044bbf97c516fab7ede9d1af77cfa', 'admin', '2017-12-13', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bid`
--
ALTER TABLE `bid`
  ADD PRIMARY KEY (`bid_id`),
  ADD KEY `fk_bid_01_idx` (`bid_id`),
  ADD KEY `fk_bid_01` (`serv_id`),
  ADD KEY `fk_bid_02` (`su_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cate_id`),
  ADD UNIQUE KEY `idx_cate_01` (`cate_name`);

--
-- Indexes for table `cc`
--
ALTER TABLE `cc`
  ADD PRIMARY KEY (`cc_id`),
  ADD UNIQUE KEY `idx_cc_01` (`card_num`),
  ADD KEY `fk_cc_01_idx` (`user_id`);

--
-- Indexes for table `funding`
--
ALTER TABLE `funding`
  ADD PRIMARY KEY (`fund_id`),
  ADD KEY `fk_funding_01_idx` (`idea_id`);

--
-- Indexes for table `idea`
--
ALTER TABLE `idea`
  ADD PRIMARY KEY (`idea_id`),
  ADD KEY `fk_startup_01_idx` (`user_id`),
  ADD KEY `fk_startup_02_idx` (`cate_id`);

--
-- Indexes for table `orderhistory`
--
ALTER TABLE `orderhistory`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_order_01_idx` (`user_id`),
  ADD KEY `fk_orer_02_idx` (`fund_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`repo_id`),
  ADD KEY `fk_info_01_idx` (`bid_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `idx_role_01` (`role_name`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`serv_id`),
  ADD KEY `fk_service_01_idx` (`idea_id`);

--
-- Indexes for table `startup`
--
ALTER TABLE `startup`
  ADD PRIMARY KEY (`su_id`),
  ADD KEY `fk_startup_01_idx` (`user_id`),
  ADD KEY `fk_startup_02_idx` (`cate_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `idx_user_01` (`username`),
  ADD KEY `fk_user_01_idx` (`role_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `bid`
--
ALTER TABLE `bid`
  MODIFY `bid_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `cate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- 使用表AUTO_INCREMENT `cc`
--
ALTER TABLE `cc`
  MODIFY `cc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `funding`
--
ALTER TABLE `funding`
  MODIFY `fund_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `idea`
--
ALTER TABLE `idea`
  MODIFY `idea_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- 使用表AUTO_INCREMENT `orderhistory`
--
ALTER TABLE `orderhistory`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1009;
--
-- 使用表AUTO_INCREMENT `report`
--
ALTER TABLE `report`
  MODIFY `repo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `service`
--
ALTER TABLE `service`
  MODIFY `serv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- 使用表AUTO_INCREMENT `startup`
--
ALTER TABLE `startup`
  MODIFY `su_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- 限制导出的表
--

--
-- 限制表 `bid`
--
ALTER TABLE `bid`
  ADD CONSTRAINT `fk_bid_01` FOREIGN KEY (`serv_id`) REFERENCES `service` (`serv_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_bid_02` FOREIGN KEY (`su_id`) REFERENCES `startup` (`su_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `cc`
--
ALTER TABLE `cc`
  ADD CONSTRAINT `fk_cc_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `funding`
--
ALTER TABLE `funding`
  ADD CONSTRAINT `fk_funding_01` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`idea_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `idea`
--
ALTER TABLE `idea`
  ADD CONSTRAINT `fk_idea_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_idea_02` FOREIGN KEY (`cate_id`) REFERENCES `category` (`cate_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `orderhistory`
--
ALTER TABLE `orderhistory`
  ADD CONSTRAINT `fk_order_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_order_02` FOREIGN KEY (`fund_id`) REFERENCES `funding` (`fund_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `fk_bifo_01` FOREIGN KEY (`bid_id`) REFERENCES `bid` (`bid_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `fk_seervice_01` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`idea_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `startup`
--
ALTER TABLE `startup`
  ADD CONSTRAINT `fk_startup_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_startup_02` FOREIGN KEY (`cate_id`) REFERENCES `category` (`cate_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_01` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*
 Navicat Premium Data Transfer

 Source Server         : cwq
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : myblog

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 04/03/2024 10:45:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createtime` datetime(0) NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO `blogs` VALUES (1, '今天周五了', '周五了奥利给阿斯12345678910', '2023-11-17 14:09:29', '张三');
INSERT INTO `blogs` VALUES (2, '123', '1234233', '2023-11-17 16:40:03', 'cwq');
INSERT INTO `blogs` VALUES (4, '测试12', '1323123213', '2023-11-17 16:59:14', 'cwq');
INSERT INTO `blogs` VALUES (5, '2023年11月20日', '今天还是以学习和日常工作为主', '2023-11-20 08:49:05', 'cwq');
INSERT INTO `blogs` VALUES (6, '张三的第一个博客', '123456', '2023-11-20 08:57:49', 'zhangsan');
INSERT INTO `blogs` VALUES (9, 'zs', '12311', '2023-11-21 08:57:27', 'zhangsan');
INSERT INTO `blogs` VALUES (10, 'zs1', '123', '2023-11-21 08:58:36', 'zhangsan');

-- ----------------------------
-- Table structure for dangeridentifylist
-- ----------------------------
DROP TABLE IF EXISTS `dangeridentifylist`;
CREATE TABLE `dangeridentifylist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '危险源名称',
  `detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '危险源详情',
  `createTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dangeridentifylist
-- ----------------------------
INSERT INTO `dangeridentifylist` VALUES (2, '炸弹', '(๑•̀ㅂ•́)و✧ 嘭一下就爆炸了', '2024-03-04 09:22:39');
INSERT INTO `dangeridentifylist` VALUES (3, '11232', '1232132', '2024-03-04 09:22:51');

-- ----------------------------
-- Table structure for emergencyrescueplanlist
-- ----------------------------
DROP TABLE IF EXISTS `emergencyrescueplanlist`;
CREATE TABLE `emergencyrescueplanlist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '类型',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '内容',
  `createTime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of emergencyrescueplanlist
-- ----------------------------
INSERT INTO `emergencyrescueplanlist` VALUES (1, '11', '1', '1123123', '2024-03-04 09:36:49');
INSERT INTO `emergencyrescueplanlist` VALUES (3, '2', '1', '123', '2024-03-04 10:05:34');

-- ----------------------------
-- Table structure for messagelist
-- ----------------------------
DROP TABLE IF EXISTS `messagelist`;
CREATE TABLE `messagelist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '姓名',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '手机号',
  `position` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '职位',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '联系地址',
  `createTime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of messagelist
-- ----------------------------
INSERT INTO `messagelist` VALUES (3, 'asdasd', '15222222222', '', '1', '2024-03-03 14:43:58', '0');
INSERT INTO `messagelist` VALUES (4, 'cwq1', '17222222222', '', '1123', '2024-03-03 14:44:11', '0');

-- ----------------------------
-- Table structure for notificationlist
-- ----------------------------
DROP TABLE IF EXISTS `notificationlist`;
CREATE TABLE `notificationlist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '公告标题',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '公告内容',
  `institution` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '公告机构',
  `status` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '1启用 2禁用',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '备注',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notificationlist
-- ----------------------------
INSERT INTO `notificationlist` VALUES (4, '123阿萨德', '123阿萨德', '123', '0', '123', '2024-03-01 17:01:52');
INSERT INTO `notificationlist` VALUES (12, '1123123', '阿萨德啊打算打算发顺丰阿是发发顺丰阿是法师', '123123', '0', '', '2024-03-02 09:02:12');
INSERT INTO `notificationlist` VALUES (13, '阿斯顿sa', '啊实打实的', 'sa啊fa大法师fa', '0', '', '2024-03-02 10:04:49');
INSERT INTO `notificationlist` VALUES (14, '阿斯达是的撒', '阿斯顿撒旦', '12321', '1', '', '2024-03-02 10:10:09');
INSERT INTO `notificationlist` VALUES (15, 'aaaaa', '1111', '11111', '0', '', '2024-03-02 10:10:30');
INSERT INTO `notificationlist` VALUES (16, ' 阿斯达是的撒', 'asd', 'asdad', '0', '', '2024-03-02 10:15:34');
INSERT INTO `notificationlist` VALUES (17, '阿斯达是的撒1', 'asdasd', 'asdasd', '0', '', '2024-03-02 10:20:18');

-- ----------------------------
-- Table structure for safelist
-- ----------------------------
DROP TABLE IF EXISTS `safelist`;
CREATE TABLE `safelist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '内容',
  `person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '人员',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '地址',
  `trainingType` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '类型',
  `trainingTime` datetime(0) NULL DEFAULT NULL COMMENT '培训时间',
  `createTime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of safelist
-- ----------------------------
INSERT INTO `safelist` VALUES (1, '123', '123', '123', '123', '1', '2024-03-27 00:00:00', '2024-03-03 14:56:11');
INSERT INTO `safelist` VALUES (2, '12345', '123', '123', '123', '1', '2024-03-26 08:00:00', '2024-03-03 15:07:10');
INSERT INTO `safelist` VALUES (3, '1234', '123', '123', '123', '1', '2024-03-18 00:00:00', '2024-03-04 09:02:29');

-- ----------------------------
-- Table structure for userlist
-- ----------------------------
DROP TABLE IF EXISTS `userlist`;
CREATE TABLE `userlist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '姓名',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '手机号',
  `position` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '职位',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '联系地址',
  `createTime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userlist
-- ----------------------------
INSERT INTO `userlist` VALUES (2, 'cwq', '15211112222', '1', '123', '2024-03-02 14:36:18', '0');
INSERT INTO `userlist` VALUES (3, '是的撒', '15211112222', '123', '123', '2024-03-04 09:01:11', '0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '密码',
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '真实姓名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'cwq', '6e0f0b964f478bdd742e4d50901a6ccb', '陈文权');
INSERT INTO `users` VALUES (6, 'cwq1', '91d3925734b9e87a09d2b4109cee73f5', 'cwq1');
INSERT INTO `users` VALUES (7, 'cwq11', '6e0f0b964f478bdd742e4d50901a6ccb', 'cwq11');
INSERT INTO `users` VALUES (8, 'zhangsan', '6e0f0b964f478bdd742e4d50901a6ccb', 'zhangsan');

SET FOREIGN_KEY_CHECKS = 1;

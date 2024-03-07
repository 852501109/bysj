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

 Date: 07/03/2024 11:18:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accessmanagementlist
-- ----------------------------
DROP TABLE IF EXISTS `accessmanagementlist`;
CREATE TABLE `accessmanagementlist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of accessmanagementlist
-- ----------------------------
INSERT INTO `accessmanagementlist` VALUES (1, 'cwq', '0', '15211221122', 'asd ', '2024-03-06 11:54:24');

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dangeridentifylist
-- ----------------------------
INSERT INTO `dangeridentifylist` VALUES (2, '炸弹', '(๑•̀ㅂ•́)و✧ 嘭一下就爆炸了', '2024-03-04 09:22:39');
INSERT INTO `dangeridentifylist` VALUES (3, '11232', '1232132', '2024-03-04 09:22:51');
INSERT INTO `dangeridentifylist` VALUES (4, '123123', '123123', '2024-03-07 10:41:50');

-- ----------------------------
-- Table structure for emergencyrescueplanlist
-- ----------------------------
DROP TABLE IF EXISTS `emergencyrescueplanlist`;
CREATE TABLE `emergencyrescueplanlist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '类型',
  `createTime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of emergencyrescueplanlist
-- ----------------------------
INSERT INTO `emergencyrescueplanlist` VALUES (4, '2', '2024-03-06 21:13:33');

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
INSERT INTO `notificationlist` VALUES (15, '123', '1111', '11111', '0', '', '2024-03-02 10:10:30');
INSERT INTO `notificationlist` VALUES (16, ' 阿斯达是的撒', 'asd', 'asdad', '1', '', '2024-03-02 10:15:34');
INSERT INTO `notificationlist` VALUES (17, '阿斯达是的撒1', 'asdasd', 'asdasd', '0', '', '2024-03-02 10:20:18');

-- ----------------------------
-- Table structure for problemreportingandprogressreviewlist
-- ----------------------------
DROP TABLE IF EXISTS `problemreportingandprogressreviewlist`;
CREATE TABLE `problemreportingandprogressreviewlist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '内容',
  `approvalDepartment` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '审批部门',
  `approvalStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '审批状态',
  `createTime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of problemreportingandprogressreviewlist
-- ----------------------------
INSERT INTO `problemreportingandprogressreviewlist` VALUES (2, '电动车问题', '21号楼电动车进入电梯', '安保部门', '处理中', '2024-03-06 11:04:46', 'cwq1');
INSERT INTO `problemreportingandprogressreviewlist` VALUES (3, '消防不合格', '就是不太合格', '等待问题分配', '等待批示', '2024-03-06 16:57:17', 'cwq');
INSERT INTO `problemreportingandprogressreviewlist` VALUES (4, '123', 'asdasd', '安保部门', '已解决', '2024-03-06 21:55:09', 'cwq2');

-- ----------------------------
-- Table structure for safelist
-- ----------------------------
DROP TABLE IF EXISTS `safelist`;
CREATE TABLE `safelist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '人员',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '地址',
  `trainingType` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '内容',
  `trainingTime` datetime(0) NULL DEFAULT NULL COMMENT '培训时间',
  `createTime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of safelist
-- ----------------------------
INSERT INTO `safelist` VALUES (5, '123', '123', '4', '2024-03-01 00:00:00', '2024-03-07 10:42:31');

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userlist
-- ----------------------------
INSERT INTO `userlist` VALUES (2, 'cwq', '15211112222', '1', '123', '2024-03-02 14:36:18', '0');
INSERT INTO `userlist` VALUES (3, '是的撒', '15211112222', '123', '123', '2024-03-04 09:01:11', '0');
INSERT INTO `userlist` VALUES (4, '啊撒大声地', '15211112222', '123', '123', '2024-03-05 08:39:03', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '密码',
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `roles` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '角色 ',
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '部门',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (9, 'admin', '6e0f0b964f478bdd742e4d50901a6ccb', 'admin', 'admin,superAdmin', 'admin');
INSERT INTO `users` VALUES (10, 'cwq', '6e0f0b964f478bdd742e4d50901a6ccb', 'cwq', 'normal', '');
INSERT INTO `users` VALUES (12, 'departAdmin', '6e0f0b964f478bdd742e4d50901a6ccb', 'departAdmin', 'admin', '安保部门');
INSERT INTO `users` VALUES (13, 'cwq1', '6e0f0b964f478bdd742e4d50901a6ccb', 'cwq1', 'normal', '');
INSERT INTO `users` VALUES (14, 'cwq2', '6e0f0b964f478bdd742e4d50901a6ccb', 'cwq2', 'normal', '');
INSERT INTO `users` VALUES (15, 'testAdmin', '6e0f0b964f478bdd742e4d50901a6ccb', 'testAdmin', 'admin', '');

SET FOREIGN_KEY_CHECKS = 1;

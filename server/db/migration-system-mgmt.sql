-- ============================================
-- 系统管理模块数据库完善 (一次性执行)
-- 执行前提: myserve.sql + seed-rbac.sql 已执行
-- 执行方式: mysql -u root -p myblog < migration-system-mgmt.sql
-- 注意: 如果字段已存在会报错，请确保首次执行
-- ============================================

-- ====== 1. users 表补充字段 ======
ALTER TABLE users
  ADD nickname VARCHAR(255) COMMENT '昵称',
  ADD phone VARCHAR(20) COMMENT '手机号',
  ADD email VARCHAR(100) COMMENT '邮箱',
  ADD sex TINYINT DEFAULT 0 COMMENT '0男 1女',
  ADD status TINYINT DEFAULT 1 COMMENT '1启用 0停用',
  ADD avatar VARCHAR(255) COMMENT '头像',
  ADD remark VARCHAR(500) COMMENT '备注',
  ADD dept_id INT DEFAULT 0 COMMENT '部门ID',
  ADD created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';

-- 更新现有用户数据
UPDATE users SET status = 1, dept_id = 1 WHERE username = 'admin';
UPDATE users SET status = 1, dept_id = 2 WHERE username = 'departAdmin';

-- ====== 2. 部门表 ======
DROP TABLE IF EXISTS depts;
CREATE TABLE depts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parent_id INT DEFAULT 0 COMMENT '父部门id',
  name VARCHAR(50) NOT NULL COMMENT '部门名称',
  principal VARCHAR(50) COMMENT '负责人',
  phone VARCHAR(20) COMMENT '联系电话',
  email VARCHAR(100) COMMENT '邮箱',
  sort INT DEFAULT 0 COMMENT '排序',
  status TINYINT DEFAULT 1 COMMENT '1启用 0停用',
  remark VARCHAR(500) COMMENT '备注',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 初始化部门数据
INSERT INTO depts (id, parent_id, name, principal, sort, status) VALUES
(1, 0, '总公司', 'admin', 0, 1),
(2, 1, '安保部门', 'departAdmin', 1, 1),
(3, 1, '行政部门', 'admin', 2, 1),
(4, 1, '技术部门', 'admin', 3, 1);

-- ====== 3. menus 表补充字段 ======
ALTER TABLE menus
  ADD component VARCHAR(255) COMMENT '组件路径',
  ADD redirect VARCHAR(255) COMMENT '重定向路径',
  ADD keep_alive TINYINT DEFAULT 0 COMMENT '缓存 1是 0否',
  ADD hidden_tag TINYINT DEFAULT 0 COMMENT '隐藏标签 1是 0否',
  ADD show_parent TINYINT DEFAULT 0 COMMENT '显示父级 1是 0否',
  ADD frame_src VARCHAR(255) COMMENT 'iframe地址',
  ADD frame_loading TINYINT DEFAULT 1 COMMENT 'iframe加载动画';

-- ====== 4. 补充系统管理菜单数据 ======
INSERT INTO menus (id, parent_id, name, path, icon, permission_code, sort, type, component) VALUES
(15, 12, '用户管理', '/system/user', NULL, 'role:assignUser', 3, 'menu', 'system/user/index'),
(16, 12, '部门管理', '/system/dept', NULL, 'role:assignUser', 4, 'menu', 'system/dept/index');

-- ====== 5. 补充菜单的 component 字段 ======
UPDATE menus SET component = 'welcome/index' WHERE path = '/dashboard';
UPDATE menus SET component = 'userManage/list/index' WHERE path = '/userManage';
UPDATE menus SET component = 'safe/list/index' WHERE path = '/safe';
UPDATE menus SET component = 'dangerIdentify/list/index' WHERE path = '/dangerIdentify';
UPDATE menus SET component = 'accessManagement/list/index' WHERE path = '/accessManagement';
UPDATE menus SET component = 'emergencyRescuePlan/list/index' WHERE path = '/emergencyRescuePlan';
UPDATE menus SET component = 'notification/list/index' WHERE path = '/notification';
UPDATE menus SET component = 'messageManage/list/index' WHERE path = '/messageManage';
UPDATE menus SET component = 'problemReportingAndProgressReview/list/index' WHERE path = '/problemReporting';
UPDATE menus SET component = 'system/index' WHERE path = '/system';
UPDATE menus SET component = 'system/role/index' WHERE path = '/system/role';
UPDATE menus SET component = 'system/menu/index' WHERE path = '/system/menu';

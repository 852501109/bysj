-- ============================================
-- Enterprise RBAC Schema + Seed Data
-- ============================================

-- 角色表
DROP TABLE IF EXISTS role_permissions;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL COMMENT '角色名称',
  code VARCHAR(50) NOT NULL UNIQUE COMMENT '角色标识',
  description VARCHAR(255) DEFAULT NULL,
  status TINYINT DEFAULT 1 COMMENT '1启用 0禁用',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 权限表
CREATE TABLE permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL COMMENT '权限名称',
  code VARCHAR(100) NOT NULL UNIQUE COMMENT '权限标识 user:create',
  resource VARCHAR(50) NOT NULL COMMENT '资源模块',
  action VARCHAR(50) NOT NULL COMMENT '操作',
  description VARCHAR(255) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 角色-权限关联
CREATE TABLE role_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 用户-角色关联
CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 菜单表
CREATE TABLE menus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parent_id INT DEFAULT 0,
  name VARCHAR(50) NOT NULL,
  path VARCHAR(255) DEFAULT NULL,
  icon VARCHAR(50) DEFAULT NULL,
  permission_code VARCHAR(100) DEFAULT NULL,
  sort INT DEFAULT 0,
  type VARCHAR(20) DEFAULT 'menu' COMMENT 'menu|button',
  visible TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ============================================
-- Seed Data
-- ============================================

-- 角色
INSERT INTO roles (name, code, description) VALUES
('超级管理员', 'superAdmin', '系统最高权限'),
('部门管理员', 'admin', '部门管理权限'),
('普通用户', 'normal', '基础查看权限');

-- 权限 (10个模块 × 5个操作 + 角色管理)
INSERT INTO permissions (name, code, resource, action) VALUES
('用户列表', 'user:list', 'user', 'list'),
('用户详情', 'user:detail', 'user', 'detail'),
('创建用户', 'user:create', 'user', 'create'),
('编辑用户', 'user:update', 'user', 'update'),
('删除用户', 'user:delete', 'user', 'delete'),
('博客列表', 'blog:list', 'blog', 'list'),
('博客详情', 'blog:detail', 'blog', 'detail'),
('创建博客', 'blog:create', 'blog', 'create'),
('编辑博客', 'blog:update', 'blog', 'update'),
('删除博客', 'blog:delete', 'blog', 'delete'),
('安全培训列表', 'safe:list', 'safe', 'list'),
('安全培训详情', 'safe:detail', 'safe', 'detail'),
('创建安全培训', 'safe:create', 'safe', 'create'),
('编辑安全培训', 'safe:update', 'safe', 'update'),
('删除安全培训', 'safe:delete', 'safe', 'delete'),
('危险识别列表', 'dangerIdentify:list', 'dangerIdentify', 'list'),
('危险识别详情', 'dangerIdentify:detail', 'dangerIdentify', 'detail'),
('创建危险识别', 'dangerIdentify:create', 'dangerIdentify', 'create'),
('编辑危险识别', 'dangerIdentify:update', 'dangerIdentify', 'update'),
('删除危险识别', 'dangerIdentify:delete', 'dangerIdentify', 'delete'),
('出入管理列表', 'accessManagement:list', 'accessManagement', 'list'),
('出入管理详情', 'accessManagement:detail', 'accessManagement', 'detail'),
('创建出入管理', 'accessManagement:create', 'accessManagement', 'create'),
('编辑出入管理', 'accessManagement:update', 'accessManagement', 'update'),
('删除出入管理', 'accessManagement:delete', 'accessManagement', 'delete'),
('应急方案列表', 'emergencyRescuePlan:list', 'emergencyRescuePlan', 'list'),
('应急方案详情', 'emergencyRescuePlan:detail', 'emergencyRescuePlan', 'detail'),
('创建应急方案', 'emergencyRescuePlan:create', 'emergencyRescuePlan', 'create'),
('编辑应急方案', 'emergencyRescuePlan:update', 'emergencyRescuePlan', 'update'),
('删除应急方案', 'emergencyRescuePlan:delete', 'emergencyRescuePlan', 'delete'),
('通知公告列表', 'notification:list', 'notification', 'list'),
('通知公告详情', 'notification:detail', 'notification', 'detail'),
('创建通知公告', 'notification:create', 'notification', 'create'),
('编辑通知公告', 'notification:update', 'notification', 'update'),
('删除通知公告', 'notification:delete', 'notification', 'delete'),
('消息管理列表', 'messageManage:list', 'messageManage', 'list'),
('消息管理详情', 'messageManage:detail', 'messageManage', 'detail'),
('创建消息管理', 'messageManage:create', 'messageManage', 'create'),
('编辑消息管理', 'messageManage:update', 'messageManage', 'update'),
('删除消息管理', 'messageManage:delete', 'messageManage', 'delete'),
('用户管理列表', 'userManage:list', 'userManage', 'list'),
('用户管理详情', 'userManage:detail', 'userManage', 'detail'),
('创建用户管理', 'userManage:create', 'userManage', 'create'),
('编辑用户管理', 'userManage:update', 'userManage', 'update'),
('删除用户管理', 'userManage:delete', 'userManage', 'delete'),
('问题上报列表', 'problemReporting:list', 'problemReporting', 'list'),
('问题上报详情', 'problemReporting:detail', 'problemReporting', 'detail'),
('创建问题上报', 'problemReporting:create', 'problemReporting', 'create'),
('编辑问题上报', 'problemReporting:update', 'problemReporting', 'update'),
('删除问题上报', 'problemReporting:delete', 'problemReporting', 'delete'),
('角色列表', 'role:list', 'role', 'list'),
('角色详情', 'role:detail', 'role', 'detail'),
('创建角色', 'role:create', 'role', 'create'),
('编辑角色', 'role:update', 'role', 'update'),
('删除角色', 'role:delete', 'role', 'delete'),
('分配权限', 'role:assignPermission', 'role', 'assignPermission'),
('分配用户角色', 'role:assignUser', 'role', 'assignUser');

-- 映射：superAdmin → 全部权限
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;

-- 映射：admin → 除 user:delete 和 role:* 外全部权限
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions
WHERE code NOT IN ('user:delete', 'role:list', 'role:detail', 'role:create', 'role:update', 'role:delete', 'role:assignPermission', 'role:assignUser');

-- 映射：normal → 仅 list + detail 权限（排除 role 资源，role 仅 superAdmin 可见）
INSERT INTO role_permissions (role_id, permission_id)
SELECT 3, id FROM permissions WHERE action IN ('list', 'detail') AND resource != 'role';

-- 现有 admin 用户关联到 superAdmin 角色
INSERT INTO user_roles (user_id, role_id)
SELECT id, 1 FROM users WHERE username = 'admin';

-- 现有其他管理员用户关联到 admin 角色
INSERT INTO user_roles (user_id, role_id)
SELECT id, 2 FROM users WHERE username != 'admin';

-- 菜单数据
INSERT INTO menus (id, parent_id, name, path, icon, permission_code, sort, type) VALUES
(1, 0, '仪表盘', '/dashboard', 'dashboard', NULL, 1, 'menu'),
(2, 0, '用户管理', '/userManage', 'user', 'user:list', 2, 'menu'),
(3, 0, '安全培训', '/safe', 'safety', 'safe:list', 3, 'menu'),
(4, 0, '危险识别', '/dangerIdentify', 'warning', 'dangerIdentify:list', 4, 'menu'),
(5, 0, '出入管理', '/accessManagement', 'lock', 'accessManagement:list', 5, 'menu'),
(6, 0, '应急方案', '/emergencyRescuePlan', 'alert', 'emergencyRescuePlan:list', 6, 'menu'),
(7, 0, '通知公告', '/notification', 'notification', 'notification:list', 7, 'menu'),
(8, 0, '消息管理', '/messageManage', 'message', 'messageManage:list', 8, 'menu'),
(9, 0, '安全管理', '/userManage', 'safety', 'userManage:list', 9, 'menu'),
(10, 0, '问题上报', '/problemReporting', 'problem', 'problemReporting:list', 10, 'menu'),
(11, 0, '博客管理', '/blog', 'blog', 'blog:list', 11, 'menu'),
(12, 0, '系统管理', '/system', 'setting', NULL, 12, 'menu'),
(13, 12, '角色管理', '/system/role', NULL, 'role:list', 1, 'menu'),
(14, 12, '菜单管理', '/system/menu', NULL, 'role:list', 2, 'menu');

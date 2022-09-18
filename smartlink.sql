/*
 Navicat Premium Data Transfer

 Source Server         : smartlink-db
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : smartlink

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 18/09/2022 21:11:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for services
-- ----------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `uuid` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `price` decimal(16,2) NOT NULL,
  `updated_at` timestamp NULL DEFAULT (now()),
  `created_at` timestamp NULL DEFAULT (now()),
  `user_uuid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `user_uuid` (`user_uuid`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`),
  CONSTRAINT `services_chk_1` CHECK ((`unit` in (_utf8mb4'kg',_utf8mb4'pcs',_utf8mb4'cm',_utf8mb4'm2')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of services
-- ----------------------------
BEGIN;
INSERT INTO `services` VALUES ('5951029d-3758-11ed-8945-0242ac150002', 'Cuci', 'kg', 4000.00, '2022-09-18 13:46:51', '2022-09-18 13:46:51', '12110c8b-3756-11ed-8945-0242ac150002');
INSERT INTO `services` VALUES ('6461e362-3758-11ed-8945-0242ac150002', 'Setrika', 'kg', 4000.00, '2022-09-18 13:47:09', '2022-09-18 13:47:09', '12110c8b-3756-11ed-8945-0242ac150002');
INSERT INTO `services` VALUES ('f48b481b-3756-11ed-8945-0242ac150002', 'Cuci + Setrika', 'kg', 5000.00, '2022-09-18 13:36:52', '2022-09-18 13:36:52', '12110c8b-3756-11ed-8945-0242ac150002');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uuid` varchar(36) NOT NULL,
  `username` varchar(15) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session_uuid` varchar(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `username` (`username`),
  CONSTRAINT `users_chk_1` CHECK (regexp_like(`phone`,_utf8mb4'^[0-9]{10,15}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('12110c8b-3756-11ed-8945-0242ac150002', 'salmanrf', 'Salman Rizqi Fatih', '08979457877', '$2b$11$T3NyLWF14UsB.mbvSv7zZ.81WjvDa8JgKXDOVlVStxE3zeBN14Rmi', '2830cb08-440f-4378-bef7-a553d9f05ef2', '2022-09-18 13:30:32', '2022-09-18 13:46:01');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

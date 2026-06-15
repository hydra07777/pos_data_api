-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pos_data
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branding`
--

DROP TABLE IF EXISTS `branding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branding` (
  `id` int NOT NULL DEFAULT '1',
  `company_name` varchar(120) NOT NULL DEFAULT 'JOAC',
  `tagline` varchar(200) NOT NULL DEFAULT 'Specialty drinks & more',
  `logo_text` varchar(6) NOT NULL DEFAULT 'J',
  `primary_color` varchar(7) NOT NULL DEFAULT '#f6905f',
  `secondary_color` varchar(7) NOT NULL DEFAULT '#fdebe1',
  `id_nat` varchar(50) NOT NULL DEFAULT '01-G4701-N25076X',
  `rccm` varchar(50) NOT NULL DEFAULT 'CD/KNG/RCCM/17-A-03542',
  `tax_number` varchar(50) NOT NULL DEFAULT 'A1720894F',
  `address` text NOT NULL,
  `phone` varchar(50) NOT NULL DEFAULT '+243974763940 / 819648854',
  `email` varchar(150) NOT NULL DEFAULT 'zuiya.mambula@gmail.com',
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branding`
--

LOCK TABLES `branding` WRITE;
/*!40000 ALTER TABLE `branding` DISABLE KEYS */;
INSERT INTO `branding` VALUES (1,'JOAC','Specialty drinks & more','J','#f6905f','#fdebe1','01-G4701-N25076X','CD/KNG/RCCM/17-A-03542','A1720894F','03 Avenue Mbiloa / Ngaliema','+243974763940 / 819648854','joac@gmail.com','2026-06-13 19:39:17');
/*!40000 ALTER TABLE `branding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cashiers`
--

DROP TABLE IF EXISTS `cashiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cashiers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `role` enum('cashier','manager','admin') NOT NULL DEFAULT 'cashier',
  `avatar_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `code_2` (`code`),
  UNIQUE KEY `code_3` (`code`),
  UNIQUE KEY `code_4` (`code`),
  UNIQUE KEY `code_5` (`code`),
  UNIQUE KEY `code_6` (`code`),
  UNIQUE KEY `code_7` (`code`),
  UNIQUE KEY `code_8` (`code`),
  UNIQUE KEY `code_9` (`code`),
  UNIQUE KEY `code_10` (`code`),
  UNIQUE KEY `code_11` (`code`),
  UNIQUE KEY `code_12` (`code`),
  UNIQUE KEY `code_13` (`code`),
  UNIQUE KEY `code_14` (`code`),
  UNIQUE KEY `code_15` (`code`),
  UNIQUE KEY `code_16` (`code`),
  UNIQUE KEY `code_17` (`code`),
  UNIQUE KEY `code_18` (`code`),
  UNIQUE KEY `code_19` (`code`),
  UNIQUE KEY `code_20` (`code`),
  UNIQUE KEY `code_21` (`code`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cashiers`
--

LOCK TABLES `cashiers` WRITE;
/*!40000 ALTER TABLE `cashiers` DISABLE KEYS */;
INSERT INTO `cashiers` VALUES (1,'AF666','Albert Flores',NULL,NULL,NULL,'cashier','/cashier-avatar.png',1,'2026-06-12 12:08:51'),(2,'CESAR','cesar',NULL,NULL,NULL,'cashier',NULL,1,'2026-06-12 12:08:51'),(3,'G20','testeur','test@test.com','0895511485','$2a$10$UP5S/uAOuLbh8eyRyO8GauEygEgDxasZFZR3vGCcE8WRfZHU2GTky','manager','',1,'2026-06-12 21:10:55'),(4,'ADMIN','ADMIN','admin@admin.com',NULL,'$2a$10$UP5S/uAOuLbh8eyRyO8GauEygEgDxasZFZR3vGCcE8WRfZHU2GTky','admin',NULL,1,'2026-06-12 21:10:55');
/*!40000 ALTER TABLE `cashiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `label_2` (`label`),
  UNIQUE KEY `slug_2` (`slug`),
  UNIQUE KEY `label_3` (`label`),
  UNIQUE KEY `slug_3` (`slug`),
  UNIQUE KEY `label_4` (`label`),
  UNIQUE KEY `slug_4` (`slug`),
  UNIQUE KEY `label_5` (`label`),
  UNIQUE KEY `slug_5` (`slug`),
  UNIQUE KEY `label_6` (`label`),
  UNIQUE KEY `slug_6` (`slug`),
  UNIQUE KEY `label_7` (`label`),
  UNIQUE KEY `slug_7` (`slug`),
  UNIQUE KEY `label_8` (`label`),
  UNIQUE KEY `slug_8` (`slug`),
  UNIQUE KEY `label_9` (`label`),
  UNIQUE KEY `slug_9` (`slug`),
  UNIQUE KEY `label_10` (`label`),
  UNIQUE KEY `slug_10` (`slug`),
  UNIQUE KEY `label_11` (`label`),
  UNIQUE KEY `slug_11` (`slug`),
  UNIQUE KEY `label_12` (`label`),
  UNIQUE KEY `slug_12` (`slug`),
  UNIQUE KEY `label_13` (`label`),
  UNIQUE KEY `slug_13` (`slug`),
  UNIQUE KEY `label_14` (`label`),
  UNIQUE KEY `slug_14` (`slug`),
  UNIQUE KEY `label_15` (`label`),
  UNIQUE KEY `slug_15` (`slug`),
  UNIQUE KEY `label_16` (`label`),
  UNIQUE KEY `slug_16` (`slug`),
  UNIQUE KEY `label_17` (`label`),
  UNIQUE KEY `slug_17` (`slug`),
  UNIQUE KEY `label_18` (`label`),
  UNIQUE KEY `slug_18` (`slug`),
  UNIQUE KEY `label_19` (`label`),
  UNIQUE KEY `slug_19` (`slug`),
  UNIQUE KEY `label_20` (`label`),
  UNIQUE KEY `slug_20` (`slug`),
  UNIQUE KEY `label_21` (`label`),
  UNIQUE KEY `slug_21` (`slug`),
  UNIQUE KEY `label_22` (`label`),
  UNIQUE KEY `slug_22` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'All','all','2026-06-12 12:08:51'),(2,'Water','water','2026-06-12 12:08:51'),(3,'Energy','energy','2026-06-12 12:08:51'),(4,'Other','other','2026-06-12 12:08:51'),(5,'Whiskies','whiskies','2026-06-12 12:08:51'),(6,'Vins','vins','2026-06-12 12:08:51'),(7,'Champagnes','champagnes','2026-06-12 12:08:51'),(8,'Vodka','vodka','2026-06-12 12:08:51'),(9,'Cognacs','cognacs','2026-06-12 12:08:51'),(10,'Tequilas','tequilas','2026-06-12 12:08:51'),(11,'Liqueurs','liqueurs','2026-06-12 12:08:51'),(12,'Bières','bieres','2026-06-12 12:08:51'),(13,'Soft','soft','2026-06-12 12:08:51'),(14,'biere brunes','biere-brunes','2026-06-14 09:34:50');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('person','company') NOT NULL DEFAULT 'person',
  `name` varchar(150) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `tax_id` varchar(50) DEFAULT NULL,
  `address` text,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboard_logs`
--

DROP TABLE IF EXISTS `dashboard_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboard_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('order_placed','payment_received','discount_applied','refund','stock_adjustment') NOT NULL,
  `label` varchar(150) NOT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `ref_id` int DEFAULT NULL,
  `cashier_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cashier_id` (`cashier_id`),
  CONSTRAINT `dashboard_logs_ibfk_1` FOREIGN KEY (`cashier_id`) REFERENCES `cashiers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboard_logs`
--

LOCK TABLES `dashboard_logs` WRITE;
/*!40000 ALTER TABLE `dashboard_logs` DISABLE KEYS */;
INSERT INTO `dashboard_logs` VALUES (1,'order_placed','Order ORD-10001',42.00,1,3,'2026-06-13 10:11:10'),(2,'payment_received','Payment ORD-10001',42.00,1,3,'2026-06-13 10:11:10'),(3,'order_placed','Order ORD-10002',42.00,2,3,'2026-06-13 10:42:31'),(4,'payment_received','Payment ORD-10002',42.00,2,3,'2026-06-13 10:42:31'),(5,'order_placed','Order ORD-10003',74382.00,3,3,'2026-06-13 10:54:17'),(6,'payment_received','Payment ORD-10003',74382.00,3,3,'2026-06-13 10:54:17'),(7,'order_placed','Order ORD-10004',672.00,4,3,'2026-06-13 15:08:57'),(8,'payment_received','Payment ORD-10004',672.00,4,3,'2026-06-13 15:08:57'),(9,'order_placed','Order ORD-10005',42.00,5,3,'2026-06-13 15:46:27'),(10,'payment_received','Payment ORD-10005',42.00,5,3,'2026-06-13 15:46:27'),(11,'order_placed','Order ORD-10006',42.00,6,3,'2026-06-13 15:47:52'),(12,'payment_received','Payment ORD-10006',42.00,6,3,'2026-06-13 15:47:52'),(13,'order_placed','Order ORD-10007',42.00,7,3,'2026-06-13 16:10:43'),(14,'payment_received','Payment ORD-10007',42.00,7,3,'2026-06-13 16:10:43'),(15,'order_placed','Order ORD-10008',42.00,8,3,'2026-06-13 18:35:29'),(16,'payment_received','Payment ORD-10008',42.00,8,3,'2026-06-13 18:35:29'),(17,'order_placed','Order ORD-10009',94.50,9,3,'2026-06-13 19:44:27'),(18,'payment_received','Payment ORD-10009',94.50,9,3,'2026-06-13 19:44:28'),(19,'order_placed','Order ORD-10010',42.00,10,3,'2026-06-14 09:38:41'),(20,'payment_received','Payment ORD-10010',42.00,10,3,'2026-06-14 09:38:41'),(21,'order_placed','Order ORD-10011',54678.75,11,3,'2026-06-14 09:59:36'),(22,'payment_received','Payment ORD-10011',54678.75,11,3,'2026-06-14 09:59:36');
/*!40000 ALTER TABLE `dashboard_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fx_rates`
--

DROP TABLE IF EXISTS `fx_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fx_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(3) NOT NULL,
  `rate_to_fc` decimal(14,4) NOT NULL,
  `effective_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fx_rates`
--

LOCK TABLES `fx_rates` WRITE;
/*!40000 ALTER TABLE `fx_rates` DISABLE KEYS */;
INSERT INTO `fx_rates` VALUES (1,'USD',2289.3077,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(2,'USD',2289.3077,'2026-06-12 20:59:17','2026-06-12 20:59:17'),(3,'USD',2289.3077,'2026-06-12 21:01:22','2026-06-12 21:01:22');
/*!40000 ALTER TABLE `fx_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `size_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(12,2) NOT NULL,
  `line_total` decimal(12,2) NOT NULL,
  `position` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `order_items_order_id` (`order_id`),
  KEY `order_items_product_id` (`product_id`),
  KEY `size_id` (`size_id`),
  CONSTRAINT `order_items_ibfk_61` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_62` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_63` FOREIGN KEY (`size_id`) REFERENCES `product_sizes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,8,NULL,1,40.00,40.00,0),(2,2,8,NULL,1,40.00,40.00,0),(3,3,30,NULL,1,600.00,600.00,0),(4,3,31,NULL,7,10000.00,70000.00,1),(5,3,23,NULL,4,50.00,200.00,2),(6,3,20,NULL,1,40.00,40.00,3),(7,4,8,NULL,1,40.00,40.00,0),(8,4,30,NULL,1,600.00,600.00,1),(9,5,8,NULL,1,40.00,40.00,0),(10,6,8,NULL,1,40.00,40.00,0),(11,7,8,NULL,1,40.00,40.00,0),(12,8,8,NULL,1,40.00,40.00,0),(13,9,8,NULL,1,40.00,40.00,0),(14,9,23,NULL,1,50.00,50.00,1),(15,10,8,NULL,1,40.00,40.00,0),(16,11,8,NULL,1,40.00,40.00,0),(17,11,23,NULL,7,50.00,350.00,1),(18,11,9,NULL,1,40.00,40.00,2),(19,11,31,NULL,4,10000.00,40000.00,3),(20,11,16,NULL,1,75.00,75.00,4),(21,11,42,NULL,1,7000.00,7000.00,5),(22,11,37,NULL,1,4500.00,4500.00,6),(23,11,10,NULL,1,70.00,70.00,7);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL,
  `cashier_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `status` enum('draft','pending','paid','refunded','cancelled') NOT NULL DEFAULT 'pending',
  `subtotal` decimal(12,2) NOT NULL DEFAULT '0.00',
  `tax_rate` decimal(5,4) NOT NULL DEFAULT '0.0500',
  `tax_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `currency` varchar(3) NOT NULL DEFAULT 'USD',
  `fx_rate` decimal(12,4) NOT NULL DEFAULT '2289.3077',
  `paid_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  UNIQUE KEY `order_number_2` (`order_number`),
  UNIQUE KEY `order_number_3` (`order_number`),
  UNIQUE KEY `order_number_4` (`order_number`),
  UNIQUE KEY `order_number_5` (`order_number`),
  UNIQUE KEY `order_number_6` (`order_number`),
  UNIQUE KEY `order_number_7` (`order_number`),
  UNIQUE KEY `order_number_8` (`order_number`),
  UNIQUE KEY `order_number_9` (`order_number`),
  UNIQUE KEY `order_number_10` (`order_number`),
  UNIQUE KEY `order_number_11` (`order_number`),
  UNIQUE KEY `order_number_12` (`order_number`),
  UNIQUE KEY `order_number_13` (`order_number`),
  UNIQUE KEY `order_number_14` (`order_number`),
  UNIQUE KEY `order_number_15` (`order_number`),
  UNIQUE KEY `order_number_16` (`order_number`),
  UNIQUE KEY `order_number_17` (`order_number`),
  UNIQUE KEY `order_number_18` (`order_number`),
  UNIQUE KEY `order_number_19` (`order_number`),
  UNIQUE KEY `order_number_20` (`order_number`),
  UNIQUE KEY `order_number_21` (`order_number`),
  KEY `orders_status` (`status`),
  KEY `orders_created_at` (`created_at`),
  KEY `orders_cashier_id` (`cashier_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_41` FOREIGN KEY (`cashier_id`) REFERENCES `cashiers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_42` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'ORD-10001',3,NULL,'paid',40.00,0.0500,2.00,42.00,'USD',2289.3077,'2026-06-13 10:11:10','2026-06-13 10:11:10'),(2,'ORD-10002',3,NULL,'paid',40.00,0.0500,2.00,42.00,'USD',2289.3077,'2026-06-13 10:42:31','2026-06-13 10:42:31'),(3,'ORD-10003',3,NULL,'paid',70840.00,0.0500,3542.00,74382.00,'USD',2289.3077,'2026-06-13 10:54:17','2026-06-13 10:54:17'),(4,'ORD-10004',3,NULL,'paid',640.00,0.0500,32.00,672.00,'USD',2289.3077,'2026-06-13 15:08:57','2026-06-13 15:08:57'),(5,'ORD-10005',3,NULL,'paid',40.00,0.0500,2.00,42.00,'USD',2289.3077,'2026-06-13 15:46:27','2026-06-13 15:46:27'),(6,'ORD-10006',3,NULL,'paid',40.00,0.0500,2.00,42.00,'USD',2289.3077,'2026-06-13 15:47:52','2026-06-13 15:47:52'),(7,'ORD-10007',3,NULL,'paid',40.00,0.0500,2.00,42.00,'USD',2289.3077,'2026-06-13 16:10:43','2026-06-13 16:10:43'),(8,'ORD-10008',3,NULL,'paid',40.00,0.0500,2.00,42.00,'USD',2289.3077,'2026-06-13 18:35:29','2026-06-13 18:35:29'),(9,'ORD-10009',3,NULL,'paid',90.00,0.0500,4.50,94.50,'USD',2289.3077,'2026-06-13 19:44:28','2026-06-13 19:44:27'),(10,'ORD-10010',3,NULL,'paid',40.00,0.0500,2.00,42.00,'USD',2289.3077,'2026-06-14 09:38:41','2026-06-14 09:38:41'),(11,'ORD-10011',3,NULL,'paid',52075.00,0.0500,2603.75,54678.75,'USD',2289.3077,'2026-06-14 09:59:36','2026-06-14 09:59:36');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `method` enum('cash','card','mobile','other') NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `reference` varchar(120) DEFAULT NULL,
  `paid_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'cash',42.00,NULL,'2026-06-13 10:11:10'),(2,2,'cash',42.00,NULL,'2026-06-13 10:42:31'),(3,3,'cash',74382.00,NULL,'2026-06-13 10:54:17'),(4,4,'cash',672.00,NULL,'2026-06-13 15:08:57'),(5,5,'cash',42.00,NULL,'2026-06-13 15:46:27'),(6,6,'card',42.00,NULL,'2026-06-13 15:47:52'),(7,7,'cash',42.00,NULL,'2026-06-13 16:10:43'),(8,8,'cash',42.00,NULL,'2026-06-13 18:35:29'),(9,9,'cash',94.50,NULL,'2026-06-13 19:44:28'),(10,10,'cash',42.00,NULL,'2026-06-14 09:38:41'),(11,11,'card',54678.75,NULL,'2026-06-14 09:59:36');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preset_themes`
--

DROP TABLE IF EXISTS `preset_themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preset_themes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `primary_color` varchar(7) NOT NULL,
  `secondary_color` varchar(7) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preset_themes`
--

LOCK TABLES `preset_themes` WRITE;
/*!40000 ALTER TABLE `preset_themes` DISABLE KEYS */;
INSERT INTO `preset_themes` VALUES (1,'Royal Gold','#D4AF37','#FFF8E1'),(2,'Emerald','#10B981','#D1FAE5'),(3,'Ruby Lounge','#B91C1C','#FEE2E2'),(4,'Champagne','#EAB308','#FEF9C3'),(5,'Royal Purple','#7C3AED','#EDE9FE'),(6,'Sapphire','#2563EB','#DBEAFE'),(7,'Copper','#B45309','#FEF3C7'),(8,'Rose Gold','#BE5672','#FCE7F3'),(9,'Obsidian','#111827','#F3F4F6');
/*!40000 ALTER TABLE `preset_themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sizes`
--

DROP TABLE IF EXISTS `product_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `label` varchar(20) NOT NULL,
  `price_extra` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_sizes_product_id_label` (`product_id`,`label`),
  CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sizes`
--

LOCK TABLES `product_sizes` WRITE;
/*!40000 ALTER TABLE `product_sizes` DISABLE KEYS */;
INSERT INTO `product_sizes` VALUES (1,53,'S',0.00),(2,53,'M',0.00),(3,53,'L',0.00);
/*!40000 ALTER TABLE `product_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `category_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL DEFAULT '/drinks/placeholder.png',
  `stock_quantity` int NOT NULL DEFAULT '0',
  `popularity` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id` (`category_id`),
  KEY `products_stock_quantity` (`stock_quantity`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Sir Edward\'s','',30.00,5,'/drinks/Sir Edward\'s.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(2,'Grant\'s 75 cl','',35.00,5,'/drinks/Grant\'s.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(3,'Mouton Cadet','',35.00,6,'/drinks/Mouton Cadet.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(4,'Red Label','',40.00,5,'/drinks/red Label.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(5,'Black Label','',60.00,5,'/drinks/Black Label.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(6,'Double Black','',80.00,5,'/drinks/double Label.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(7,'Gold Label','',90.00,5,'/drinks/Gold Label.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(8,'Absolut Vodka 75 cl','',40.00,8,'/drinks/Absolut Vodka 75 cl.jpeg',90,0,1,'2026-06-12 12:08:51','2026-06-14 09:59:36'),(9,'Baileys','',40.00,11,'/drinks/Baileys.jpeg',99,0,1,'2026-06-12 12:08:51','2026-06-14 09:59:36'),(10,'Cointreau','',70.00,11,'/drinks/Cointreau.jpeg',99,0,1,'2026-06-12 12:08:51','2026-06-14 09:59:36'),(11,'Jameson','',50.00,5,'/drinks/Jameson.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(12,'Jägermeister 50 cl','',50.00,11,'/drinks/Jägermeister.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(13,'Jägermeister 1 L','',80.00,11,'/drinks/Jägermeister.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(14,'Jack Daniel\'s 70 cl','',70.00,5,'/drinks/Jack Daniel\'s.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(15,'Jack Daniel\'s Honey 70 cl','',75.00,5,'/drinks/Jack Daniel\'s Honey.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(16,'Chivas 12 ans 75 cl','',75.00,5,'/drinks/Chivas.jpeg',99,0,1,'2026-06-12 12:08:51','2026-06-14 09:59:36'),(17,'Hennessy VS','',80.00,9,'/drinks/Hennessy vs.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(18,'Hennessy VSOP','',150.00,9,'/drinks/Hennessy VSOP.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(19,'Martell Blue Swift','',100.00,9,'/drinks/Martell Blue Swift.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(20,'Camino Real Blanco 75 cl','',40.00,10,'/drinks/Camino Real Blanco.jpeg',99,0,1,'2026-06-12 12:08:51','2026-06-13 10:54:17'),(21,'Olmeca','',50.00,10,'/drinks/olmeca.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(22,'Don Julio Blanco','',100.00,10,'/drinks/Don Julio Blanco.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(23,'Baron d\'Arignac','',50.00,6,'/drinks/Baron d\'Arignac.jpeg',88,0,1,'2026-06-12 12:08:51','2026-06-14 09:59:36'),(24,'JP. Chenet','',50.00,6,'/drinks/JP. Chenet.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(25,'Moët Brut','',100.00,7,'/drinks/moet brut.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(26,'Moët Ice Impérial','',120.00,7,'/drinks/moet ice.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(27,'Moët Nectar Impérial','',150.00,7,'/drinks/moét nectar imperial.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(28,'Veuve Clicquot','',180.00,7,'/drinks/moet brut.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(29,'Ruinart Blanc de Blancs','',250.00,7,'/drinks/ruinart.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(30,'Armand de Brignac','',600.00,7,'/drinks/moet brut.jpeg',49,0,1,'2026-06-12 12:08:51','2026-06-13 15:08:57'),(31,'Bavaria','',10000.00,12,'/drinks/bavaria.jpeg',89,0,1,'2026-06-12 12:08:51','2026-06-14 09:59:36'),(32,'Savana','',10000.00,12,'/drinks/savana.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(33,'Leffe','',14000.00,12,'/drinks/leffe.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(34,'XXL','',4500.00,3,'/drinks/energy.png',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(35,'Energy Malt','',4500.00,3,'/drinks/energy.png',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(36,'Red Bull','',10000.00,3,'/drinks/red bull.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(37,'Coca Cola','',4500.00,13,'/drinks/coca.jpeg',99,0,1,'2026-06-12 12:08:51','2026-06-14 09:59:36'),(38,'Fanta','',4500.00,13,'/drinks/fanta.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(39,'Maltina','',4500.00,13,'/drinks/maltina.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(40,'Vitalo','',4500.00,13,'/drinks/lemonade.png',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(41,'Tonic','',4500.00,13,'/drinks/tonic.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(42,'Castel','',7000.00,12,'/drinks/castel.jpeg',99,0,1,'2026-06-12 12:08:51','2026-06-14 09:59:36'),(43,'Beaufort GD','',7000.00,12,'/drinks/beaufort.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(44,'Tembo','',10000.00,12,'/drinks/bavaria.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(45,'Nkoyi','',7000.00,12,'/drinks/bavaria.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(46,'Primus','',7000.00,12,'/drinks/Primus.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(47,'Turbo','',6000.00,12,'/drinks/bavaria.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(48,'Mutzing','',6000.00,12,'/drinks/bavaria.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(49,'Heineken','',6000.00,12,'/drinks/Heineken.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(50,'Legend GD','',7000.00,12,'/drinks/bavaria.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(51,'Tiger','',6000.00,12,'/drinks/tiger.jpeg',100,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(52,'Water','',1000.00,2,'/drinks/water.png',500,0,1,'2026-06-12 12:08:51','2026-06-12 12:08:51'),(53,'test','',80.00,12,'/uploads/1781350618945-40f820ef-41cb-4a80-95e7-645eebc4eb96.jpg',8,0,1,'2026-06-13 11:36:59','2026-06-13 11:36:59');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_movements`
--

DROP TABLE IF EXISTS `stock_movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_movements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `type` enum('in','out','adjustment') NOT NULL,
  `quantity` int NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `stock_movements_ibfk_41` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stock_movements_ibfk_42` FOREIGN KEY (`user_id`) REFERENCES `cashiers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_movements`
--

LOCK TABLES `stock_movements` WRITE;
/*!40000 ALTER TABLE `stock_movements` DISABLE KEYS */;
INSERT INTO `stock_movements` VALUES (1,8,'out',-1,'Vente ORD-10001',3,'2026-06-13 10:11:10'),(2,8,'out',-1,'Vente ORD-10002',3,'2026-06-13 10:42:31'),(3,30,'out',-1,'Vente ORD-10003',3,'2026-06-13 10:54:17'),(4,31,'out',-7,'Vente ORD-10003',3,'2026-06-13 10:54:17'),(5,23,'out',-4,'Vente ORD-10003',3,'2026-06-13 10:54:17'),(6,20,'out',-1,'Vente ORD-10003',3,'2026-06-13 10:54:17'),(7,8,'out',-1,'Vente ORD-10004',3,'2026-06-13 15:08:57'),(8,30,'out',-1,'Vente ORD-10004',3,'2026-06-13 15:08:57'),(9,8,'out',-1,'Vente ORD-10005',3,'2026-06-13 15:46:27'),(10,8,'out',-1,'Vente ORD-10006',3,'2026-06-13 15:47:52'),(11,8,'out',-1,'Vente ORD-10007',3,'2026-06-13 16:10:43'),(12,8,'out',-1,'Vente ORD-10008',3,'2026-06-13 18:35:29'),(13,8,'out',-1,'Vente ORD-10009',3,'2026-06-13 19:44:28'),(14,23,'out',-1,'Vente ORD-10009',3,'2026-06-13 19:44:28'),(15,8,'out',-1,'Vente ORD-10010',3,'2026-06-14 09:38:41'),(16,8,'out',-1,'Vente ORD-10011',3,'2026-06-14 09:59:36'),(17,23,'out',-7,'Vente ORD-10011',3,'2026-06-14 09:59:36'),(18,9,'out',-1,'Vente ORD-10011',3,'2026-06-14 09:59:36'),(19,31,'out',-4,'Vente ORD-10011',3,'2026-06-14 09:59:36'),(20,16,'out',-1,'Vente ORD-10011',3,'2026-06-14 09:59:36'),(21,42,'out',-1,'Vente ORD-10011',3,'2026-06-14 09:59:36'),(22,37,'out',-1,'Vente ORD-10011',3,'2026-06-14 09:59:36'),(23,10,'out',-1,'Vente ORD-10011',3,'2026-06-14 09:59:36');
/*!40000 ALTER TABLE `stock_movements` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-15 18:13:22

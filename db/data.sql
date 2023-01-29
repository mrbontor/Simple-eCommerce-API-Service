-- MySQL dump 10.13  Distrib 5.7.41, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	5.7.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20230127163426-product.js'),('20230127170004-stock.js'),('20230127170549-transaction.js'),('20230127171013-user.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES
(1,'Product test',NULL,1,'2023-01-28 08:17:55','2023-01-28 08:17:55'),
(2,'product',NULL,1,'2023-01-28 08:28:59','2023-01-28 08:28:59');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProduct` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT '0',
  `price` decimal(10,0) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idProduct` (`idProduct`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES
(1,1,7,10000,'2023-01-28 08:17:55','2023-01-29 02:09:55'),
(2,2,7,10000,'2023-01-28 08:28:59','2023-01-29 02:09:55');
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `details` json DEFAULT NULL,
  `status` enum('pending','failed','cancelled','done') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `amountPaid` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES
(24,2,'984e4a16-4024-421c-a56a-d954f2be6447','[{\"name\": \"Product test\", \"status\": true, \"quantity\": 1, \"subTotal\": 10000, \"idProduct\": 1}, {\"name\": \"product\", \"status\": true, \"quantity\": 1, \"subTotal\": 10000, \"idProduct\": 2}]','done','2023-01-29 01:15:29','2023-01-29 01:15:29',20000.00,200000.00),
(25,2,'2db43379-bf3c-4755-8ffd-fb2620ae28d0','[{\"name\": \"Product test\", \"status\": true, \"quantity\": 1, \"subTotal\": 10000, \"idProduct\": 1}, {\"name\": \"product\", \"status\": true, \"quantity\": 1, \"subTotal\": 10000, \"idProduct\": 2}]','done','2021-01-29 01:17:54','2023-01-29 01:17:54',20000.00,200000.00),
(29,6,'e5ee47d7-653c-4ee5-8a09-9c1ba844f1d5','[{\"name\": \"Product test\", \"status\": true, \"quantity\": 1, \"subTotal\": 10000, \"idProduct\": 1}, {\"name\": \"product\", \"status\": true, \"quantity\": 1, \"subTotal\": 10000, \"idProduct\": 2}]','done','2012-01-29 02:04:36','2023-01-29 02:04:36',20000.00,200000.00),
(30,6,'6c65eb48-c082-4e87-b334-e4e2a5ad64c7','[{\"name\": \"Product test\", \"status\": true, \"quantity\": 1, \"subTotal\": 10000, \"idProduct\": 1}, {\"name\": \"product\", \"status\": true, \"quantity\": 1, \"subTotal\": 10000, \"idProduct\": 2}]','done','2021-01-29 02:09:55','2023-01-29 02:09:55',20000.00,200000.00);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `infoLogin` json DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `token` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `transaction` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'superadmin','superadmin@gmail.com','{\"hash\": \"bd3e2c4f8a9d23a68b4eefedd077bf0c4a078eab400917c3fcf878a334603b771a6cb2b6a3a352bd9b0fa8fec97f0b52548c697e7e921d6bd78cd31f20e9cc1c\", \"salt\": \"c/mj8LRLwRrt6Qm27y8y/VDyw4s96JqDbyPSMsdJc3L0AJSHeBhRnOsSHRDDN8QIh3R55dmB/JlkhgojKGApYM9FQbNC1APIhM9u3q1JWmtSOJHFobgekvtMXWJudMt9pd/Dyht3kgrd3/cEuM/Gxv6sLzKfdPQq4WKPpzcZvUs=\", \"iterations\": 9209}',1,1,'[]','2023-01-28 06:58:48','2023-01-29 02:12:16',NULL),
(2,'user','user@gmail.com','{\"hash\": \"07c39869a7255da98c2cb3ee3a48ee95a6e8486215f9484942cb729be6b7bf94584f776320db501629ba77060ab3bd5708aef09c330f7c0bb333c794889024c5\", \"salt\": \"IHJcQLVBzMCYEjNismJjN9VKMedk90kOI4XXUDpATo1gHbeD5rPA586Vmlup/1VTDTu57Ss9yS0yV/gkKO44Ae2MbogZNeFyo9NhyyyPSojP0ZTuWN7Y8UM5DHFBWZ4+fjtkYi3hkMzDWB2Uw1RnflGQpHRySzyus/aaAdXZ/Yc=\", \"iterations\": 3772}',0,1,'[]','2023-01-27 23:19:43','2023-01-29 02:04:16',NULL),
(3,'user3','user3@gmail.com','{\"hash\": \"738e81b150b75daa7e5f35749f034e43ebad5fbcb41bd4a6de7109c70112ef3bc15322f7d63d04546d7fe9aa5ec2f94c4e22c5236864e3b9edc8793dc84ab812\", \"salt\": \"d81hKdcGY572Z6u5X40yzOPNjg2X4TZAVW8NrZx+ZpwuMAQROcTsxWuEYFjY7VQzjNTS3sl1/s7HM8r01Qwl93s/Pwgz4DaRj2YJY6CdZizpLwKs+am2G+TQ6dT/cvMKltCszfNqfYRzWnPe7ajGSbDbNlLzNxHPACrWBIU96cw=\", \"iterations\": 2905}',0,1,'[]','2023-01-28 05:59:26','2023-01-28 07:09:59',NULL),
(4,'usertest','usertest@gmail.com','{\"hash\": \"55b5e9004dd867039565f2d34df0c6f3b40272f12df0651e607876faa12d7e2e25af90fa80e4e796e0afc0a41d365ad7d7173e3df192eb43ad73f82e400cf469\", \"salt\": \"MceKm4cb4gjjP7lXaUBT+T9u8bS20jbJ3wPh0QQtYjkob3rl32g94X4TVIfgdN2Uk0mUBktN+rYEeUGVpWQXAHWT0UHvVcFjLcjhIZzajyAeAX7Fs0n3VmEZH69upD+/FqWSWp3xplVT58RjAYqb3t5QIbAxpfKLk+6CXuwWjZY=\", \"iterations\": 4858}',0,1,'[]','2023-01-28 18:01:01','2023-01-29 02:12:02',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-29  5:55:40

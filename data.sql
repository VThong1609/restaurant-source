-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: restaurant
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assignmentStatus` tinyint DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `STAFF_ID` int DEFAULT NULL,
  `WEDDING_PARTY_ID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgfmr1xlfi956a875e0i57vekr` (`STAFF_ID`),
  KEY `FKhls3dfbdckuhx0yitwvqru8kw` (`WEDDING_PARTY_ID`),
  CONSTRAINT `FKgfmr1xlfi956a875e0i57vekr` FOREIGN KEY (`STAFF_ID`) REFERENCES `staffs` (`id`),
  CONSTRAINT `FKhls3dfbdckuhx0yitwvqru8kw` FOREIGN KEY (`WEDDING_PARTY_ID`) REFERENCES `wedding_party_informations` (`id`),
  CONSTRAINT `assignments_chk_1` CHECK ((`assignmentStatus` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brandAddress` varchar(255) NOT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `createdTime` datetime(6) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'ADADS','daDA','2023-10-18 21:31:43.000000','INACTIVE');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands_wedding_services`
--

DROP TABLE IF EXISTS `brands_wedding_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands_wedding_services` (
  `brand_id` int NOT NULL,
  `wedding_service_id` int NOT NULL,
  KEY `FK370si3ywk4wy8x56sm1p0hncc` (`wedding_service_id`),
  KEY `FK1q4at993gh6hefq92rqppbsnb` (`brand_id`),
  CONSTRAINT `FK1q4at993gh6hefq92rqppbsnb` FOREIGN KEY (`brand_id`) REFERENCES `wedding_services` (`id`),
  CONSTRAINT `FK370si3ywk4wy8x56sm1p0hncc` FOREIGN KEY (`wedding_service_id`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands_wedding_services`
--

LOCK TABLES `brands_wedding_services` WRITE;
/*!40000 ALTER TABLE `brands_wedding_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `brands_wedding_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdTime` datetime(6) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,'2023-10-18 21:34:12.000000','Tốt');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staffs`
--

DROP TABLE IF EXISTS `staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staffs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `role` enum('ADMIN','STAFF','USER') NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `BRAND_ID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ikcos5mg2rbdhyg1v5dbyu5is` (`email`),
  KEY `FKamtl71p6989ycigunromnqukd` (`BRAND_ID`),
  CONSTRAINT `FKamtl71p6989ycigunromnqukd` FOREIGN KEY (`BRAND_ID`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staffs`
--

LOCK TABLES `staffs` WRITE;
/*!40000 ALTER TABLE `staffs` DISABLE KEYS */;
INSERT INTO `staffs` VALUES (1,'17A Cộng Hòa',NULL,'admin@gmail.com','Admin','Admin','$2a$10$rryAHVZSkVqxtGT/n7dUUehn9az/Q0WEAdG882uFWD9JFwFc1ZZIm','0373926165','ADMIN','ACTIVE',NULL),(2,'313',NULL,'uuser2@gmail.com','etf','qưeqe','$2a$10$QtjqUxzLy5F676ZW4dLuC.ujvU2okMUpLpxVO11H7cIXtRojXJzrG','115345345','STAFF','ACTIVE',NULL);
/*!40000 ALTER TABLE `staffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `revoked` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `tokenType` enum('BEARER') DEFAULT NULL,
  `STAFF_ID` int DEFAULT NULL,
  `USER_ID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9o9hjlj2m11ws86mbtmswsf0` (`STAFF_ID`),
  KEY `FK2vfkhsdyoh3nbk8gih8pf04ls` (`USER_ID`),
  CONSTRAINT `FK2vfkhsdyoh3nbk8gih8pf04ls` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`id`),
  CONSTRAINT `FK9o9hjlj2m11ws86mbtmswsf0` FOREIGN KEY (`STAFF_ID`) REFERENCES `staffs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20tT3B0aW9uYWxbQURNSU5dIiwiaWF0IjoxNjk3MzM3MjM3LCJleHAiOjE2OTc0MzgwMzd9.rXJepmEGUgKtsfOS6QoyzcCo4oXO4LU71NdUjugIpkgGyCFtFYVkqXBE9RtBreu_66AyH-z5vPeCzTZ5kygU-Q','BEARER',1,NULL),(2,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20tT3B0aW9uYWxbQURNSU5dIiwiaWF0IjoxNjk3NjM4MjgwLCJleHAiOjE2OTc3MzkwODB9.YHOR-YMmphF1fsybMyptLhMvl-dAm3vvI8vpGCpYj9aeuBeoAomLh9fvgL-eDvX8bGF1vXGjaW83ci_wISolmg','BEARER',1,NULL),(3,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20tT3B0aW9uYWxbVVNFUl0iLCJpYXQiOjE2OTc2Mzk2MDksImV4cCI6MTY5Nzc0MDQwOX0.sRrdZ6W7r50VU7RZyIcdbXWhvrUt8KFfulrlDmoYBTZXX4GJvw-kEXtEGVFkf7lJe_z44CFJYYbKzLbPm-1fSw','BEARER',NULL,1),(4,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20tT3B0aW9uYWxbQURNSU5dIiwiaWF0IjoxNjk3NjM5NjgyLCJleHAiOjE2OTc3NDA0ODJ9.hE6YuwzZpbOyA7B5Lkacckb2hbLSpeSPxTH9culngpABC4yFKtoXuE975YWFtldjTGMvMnZYVux1lehSmQAliw','BEARER',1,NULL),(5,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20tT3B0aW9uYWxbVVNFUl0iLCJpYXQiOjE2OTc2Mzk3MDQsImV4cCI6MTY5Nzc0MDUwNH0.yT-JB9SwrJJkQi2xVEcxfzoLQ1A6a7jtKxZRvHxdDJ7JOBUyortMl6DOaB_CoAjaac0B9Pj2ZbPsqYDf3aULSw','BEARER',NULL,1),(6,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20tT3B0aW9uYWxbVVNFUl0iLCJpYXQiOjE2OTc2NDAzNzQsImV4cCI6MTY5Nzc0MTE3NH0.mHazk0YLEOPeQ-x-cDXLVn7EsL91ysfXX3u9D7u8XjBj-ko4fVOJ4Yynal_A_v4WlRVrqB18BgP5dc59yOM-Nw','BEARER',NULL,1),(7,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20tT3B0aW9uYWxbQURNSU5dIiwiaWF0IjoxNjk3NjQwNDQ3LCJleHAiOjE2OTc3NDEyNDd9.EAUeJkrPFp9TShn2QLnU7oXMGDQxGesrt7pVl638Q616MYM0R0rfxv2XjLw-E1kveXHVMubVkPLfgcJw1JilzA','BEARER',1,NULL),(8,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20tT3B0aW9uYWxbVVNFUl0iLCJpYXQiOjE2OTc2NDM0ODQsImV4cCI6MTY5Nzc0NDI4NH0._XaOTBDbd3yufYjKZKLi8KuIQz6mgD_icn31rQZNZ7JrZtJarRIMbfjwdc0S-orZoqCbF_o6jvW0h1ITRu-cTA','BEARER',NULL,1),(9,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20tT3B0aW9uYWxbQURNSU5dIiwiaWF0IjoxNjk3NjQzNTEyLCJleHAiOjE2OTc3NDQzMTJ9.R4UdWV8GZLh2gT_M_kkPJkh2eOTc1or5M1nUftjPdWTuHR381Ho_t7Q6kUDXey0_lm9VrRuzQ9iwhUvWU0Ms1w','BEARER',1,NULL),(10,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkY2VAZ21haWwuY29tLU9wdGlvbmFsW1VTRVJdIiwiaWF0IjoxNjk3NjQ4MTYzLCJleHAiOjE2OTc3NDg5NjN9.Vzjikl8Atuer1QSHq8BKJFpekz1tzJRcVAQVIZtvt1L7qXDGksXM3VBYVdo0Or3yVq05UYcpjnfTRKm__4wrEg','BEARER',NULL,2),(11,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20tT3B0aW9uYWxbVVNFUl0iLCJpYXQiOjE2OTc2NDg3ODEsImV4cCI6MTY5Nzc0OTU4MX0.MxBCBPOLJ2grPe-p5knbv8Xfhl-TbR58lROyShVhKCalQpErZ3W83lzaj-nGM92scwIx87Sc1Xjot3vxZ1GKiw','BEARER',NULL,1),(12,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jbzItT3B0aW9uYWxbVVNFUl0iLCJpYXQiOjE2OTc2NDg4ODcsImV4cCI6MTY5Nzc0OTY4N30.Q5bW891v9dw7BMASNLhKEx0g_ZEdhHx9Clm4AKcuA7SyHYuCKrEomCCDZhVKq5a0HtzspbEvGFR440GAc3dlmg','BEARER',NULL,3),(13,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20tT3B0aW9uYWxbQURNSU5dIiwiaWF0IjoxNjk3NjgwMjE5LCJleHAiOjE2OTc3ODEwMTl9.SnJugcPt8k879b7YCAXcASHz7l9r3K7xJv6N5KckZg97Ev2bS79qy3wk1ARBIC_dc8IPIsdzO2cMdCkTpDDQYw','BEARER',1,NULL),(14,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jbzItT3B0aW9uYWxbVVNFUl0iLCJpYXQiOjE2OTc2OTk2ODgsImV4cCI6MTY5NzgwMDQ4OH0.z7_m9SI0SYPRTWqnxDDagJ5PYN1HQocCIJ-9NmWjb5AdTIn68k52rxZe4iLfktWs2sDRIhaR17yvHk_pNvtYyg','BEARER',NULL,3),(15,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jbzItT3B0aW9uYWxbVVNFUl0iLCJpYXQiOjE2OTc4MTAyNzAsImV4cCI6MTY5NzkxMTA3MH0.txB_eDbWm6l2ZI-U0HKlZM1P-Cy21CqC2_bQysSr3e4GfEbNuWHX2L209Xr9vnGC-ygQC7FH5DcKS922QD4C2g','BEARER',NULL,3),(16,-1,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20tT3B0aW9uYWxbQURNSU5dIiwiaWF0IjoxNjk3ODExMzIxLCJleHAiOjE2OTc5MTIxMjF9.CqEsM-g2EioaUVPnqJLe-96fLAdITglFe7_9svV0Jt-dBn1OZ6jhKH-RcM4TXlmgqzl0G0MBDlzAc_p3bSdfuw','BEARER',1,NULL),(17,0,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20tT3B0aW9uYWxbQURNSU5dIiwiaWF0IjoxNjk3OTkwMDA5LCJleHAiOjE2OTgwOTA4MDl9.iG-fN7NGYPQSvvwiw1UHbXczTEFw5Z5nHj3vPf9kC0VX6LX0DVVIex3I-9olYKVqUbg9mfvc4KFZXCBaG4i34A','BEARER',1,NULL);
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `role` enum('ADMIN','STAFF','USER') NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'313','08fcf88a-2ffb-4ddb-9bd8-14cf73c61af3.webp','user1@gmail.com','ew','af','$2a$10$I4Oc4Zhl0x3AfWbWzqVC3uMn3UFXHkjf2Sp5x02TioyTJVI6b7qEO','115345345','USER','ACTIVE'),(2,'15 Su su su','b4b7688a-46ef-425f-ad54-2e37f889d225.jpg','dce@gmail.com','abc','dce','$2a$10$stILI2ruapNCPw9aMz6eSe71euEUcYJk.ZATXQNii.pt/S3fdtSBe','0327380290','USER','ACTIVE'),(3,'313 ll','b752c5b0-b8e1-4662-82da-86f340e31cc8.jpg','user1@gmail.co2','12','vien','$2a$10$g/WT375aidAWpprTYqle/eWhPgLeAKfwtczKfRw.ubGWvX8RBiNAu','0918567','USER','ACTIVE');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedding_halls`
--

DROP TABLE IF EXISTS `wedding_halls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedding_halls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdTime` datetime(6) NOT NULL,
  `eveningPrice` bigint NOT NULL,
  `morningPrice` bigint NOT NULL,
  `noonPrice` bigint NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `weddingHallLocation` varchar(255) NOT NULL,
  `weddingHallName` varchar(255) NOT NULL,
  `weekendPrice` bigint NOT NULL,
  `BRAND_ID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdjyf6ef8vj622539qipb1xy56` (`BRAND_ID`),
  CONSTRAINT `FKdjyf6ef8vj622539qipb1xy56` FOREIGN KEY (`BRAND_ID`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_halls`
--

LOCK TABLES `wedding_halls` WRITE;
/*!40000 ALTER TABLE `wedding_halls` DISABLE KEYS */;
INSERT INTO `wedding_halls` VALUES (1,'2023-10-18 21:32:23.000000',14124,423423,14234,'ACTIVE','áda','ád',41412,NULL);
/*!40000 ALTER TABLE `wedding_halls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedding_party_informations`
--

DROP TABLE IF EXISTS `wedding_party_informations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedding_party_informations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `partyBookingDate` datetime(6) NOT NULL,
  `partyDate` datetime(6) NOT NULL,
  `totalPrice` bigint NOT NULL,
  `weddingHallType` enum('EVENING','MORNING','NOON','WEEKEND') NOT NULL,
  `weddingServiceIds` varchar(255) NOT NULL,
  `PARTY_HOST_ID` int DEFAULT NULL,
  `WEDDING_HALL_ID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt8tsq5lk7nt67alk7x4e434xr` (`PARTY_HOST_ID`),
  KEY `FKhp983opt6cs13r8i7rxn0g5d1` (`WEDDING_HALL_ID`),
  CONSTRAINT `FKhp983opt6cs13r8i7rxn0g5d1` FOREIGN KEY (`WEDDING_HALL_ID`) REFERENCES `wedding_halls` (`id`),
  CONSTRAINT `FKt8tsq5lk7nt67alk7x4e434xr` FOREIGN KEY (`PARTY_HOST_ID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_party_informations`
--

LOCK TABLES `wedding_party_informations` WRITE;
/*!40000 ALTER TABLE `wedding_party_informations` DISABLE KEYS */;
INSERT INTO `wedding_party_informations` VALUES (1,'2023-10-18 21:34:02.000000','2023-11-15 21:33:00.000000',1326436,'EVENING','1',1,1),(2,'2023-10-18 21:47:00.000000','2023-10-17 19:46:00.000000',1735735,'MORNING','1',1,1),(3,'2023-10-19 00:01:55.000000','2023-10-18 00:01:00.000000',1735735,'MORNING','1',2,1),(4,'2023-10-19 00:08:33.000000','2023-10-09 00:08:00.000000',1353724,'WEEKEND','1',3,1),(5,'2023-10-20 20:58:20.000000','2023-10-21 20:58:00.000000',1735735,'MORNING','1',3,1),(6,'2023-10-20 21:15:10.000000','2023-10-02 21:15:00.000000',1735735,'MORNING','1',3,1);
/*!40000 ALTER TABLE `wedding_party_informations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedding_party_informations_wedding_services`
--

DROP TABLE IF EXISTS `wedding_party_informations_wedding_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedding_party_informations_wedding_services` (
  `wedding_party_information_id` int NOT NULL,
  `wedding_service_id` int NOT NULL,
  KEY `FK8aeerjmeepi7h1e50pefbk68t` (`wedding_service_id`),
  KEY `FKk6j3d88p0a6vb88goabuk1glc` (`wedding_party_information_id`),
  CONSTRAINT `FK8aeerjmeepi7h1e50pefbk68t` FOREIGN KEY (`wedding_service_id`) REFERENCES `wedding_party_informations` (`id`),
  CONSTRAINT `FKk6j3d88p0a6vb88goabuk1glc` FOREIGN KEY (`wedding_party_information_id`) REFERENCES `wedding_services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_party_informations_wedding_services`
--

LOCK TABLES `wedding_party_informations_wedding_services` WRITE;
/*!40000 ALTER TABLE `wedding_party_informations_wedding_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `wedding_party_informations_wedding_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedding_services`
--

DROP TABLE IF EXISTS `wedding_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedding_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdTime` datetime(6) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL,
  `weddingServiceName` varchar(255) NOT NULL,
  `weddingServicePrice` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding_services`
--

LOCK TABLES `wedding_services` WRITE;
/*!40000 ALTER TABLE `wedding_services` DISABLE KEYS */;
INSERT INTO `wedding_services` VALUES (1,'2023-10-18 21:32:33.000000','ACTIVE','ádas',1312312);
/*!40000 ALTER TABLE `wedding_services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-23 22:24:36

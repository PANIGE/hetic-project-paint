--
-- Table structure for table `save`
--

DROP TABLE IF EXISTS `save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `save` (
  `IP` varchar(39) DEFAULT NULL,
  `json` text,
  `name` varchar(32) DEFAULT NULL,
  UNIQUE KEY `IP_UNIQUE` (`IP`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER table `save` ADD UNIQUE (IP, name);
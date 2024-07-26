/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - pruebakonecta
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pruebakonecta` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `pruebakonecta`;

/*Table structure for table `empleado` */

DROP TABLE IF EXISTS `empleado`;

CREATE TABLE `empleado` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA_INGRESO` date NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `SALARIO` decimal(10,2) NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `empleado` */

insert  into `empleado`(`ID`,`FECHA_INGRESO`,`NOMBRE`,`SALARIO`,`CREATED_AT`,`UPDATED_AT`) values 
(1,'2024-07-24','Empleado 1',0.00,'2024-07-24 23:40:45','2024-07-25 19:06:53'),
(6,'2024-07-25','Empleado 2',1500000.00,'2024-07-25 09:34:05','2024-07-25 09:34:05');

/*Table structure for table `solicitud` */

DROP TABLE IF EXISTS `solicitud`;

CREATE TABLE `solicitud` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODIGO` varchar(50) NOT NULL,
  `DESCRIPCION` varchar(50) NOT NULL,
  `RESUMEN` varchar(50) NOT NULL,
  `ID_EMPLEADO` int(11) DEFAULT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `ID_EMPLEADO` (`ID_EMPLEADO`),
  CONSTRAINT `solicitud_ibfk_1` FOREIGN KEY (`ID_EMPLEADO`) REFERENCES `empleado` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `solicitud` */

insert  into `solicitud`(`ID`,`CODIGO`,`DESCRIPCION`,`RESUMEN`,`ID_EMPLEADO`,`CREATED_AT`,`UPDATED_AT`) values 
(1,'10120','Arrocees','Arroz con pollos',6,'2024-07-24 23:41:29','2024-07-25 19:27:50'),
(3,'000120','prueba tres','prueba tres',6,'2024-07-25 19:31:21','2024-07-25 21:35:19');

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PASSWORD_HASH` varchar(255) NOT NULL,
  `ROLE` enum('Empleado','Administrador') NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPDATED_AT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuario` */

insert  into `usuario`(`ID`,`NOMBRE`,`EMAIL`,`PASSWORD_HASH`,`ROLE`,`CREATED_AT`,`UPDATED_AT`) values 
(1,'Admin','administrador@gmail.com','admin','Administrador','2024-07-24 21:38:13','2024-07-25 00:40:46'),
(2,'Empleado 1','empleado@gmail.com','12345','Empleado','2024-07-24 21:38:25','2024-07-24 23:41:52'),
(7,'Empleado 2','empleado2@gmail.com','123456','Empleado','2024-07-25 09:34:05','2024-07-25 09:34:05');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

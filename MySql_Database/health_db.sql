-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2018 at 07:51 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `health_db`
--
CREATE DATABASE IF NOT EXISTS `health_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `health_db`;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_doctors_list`
--

DROP TABLE IF EXISTS `appointment_doctors_list`;
CREATE TABLE IF NOT EXISTS `appointment_doctors_list` (
  `member_id` int(11) NOT NULL,
  `disease` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `specialty` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `doctor_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` int(5) NOT NULL,
  `carrier` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `appointment_doctors_list`
--

INSERT INTO `appointment_doctors_list` (`member_id`, `disease`, `specialty`, `doctor_name`, `zip_code`, `carrier`) VALUES
(61300, 'Eye', 'Optometrist', 'Dr. Diana Ries', 19341, 'First Health Insurance,20/20 Eyecare Plan,Cigna - HMO,'),
(61302, 'Eye', 'Optometrist', 'Dr. Tu Dinh', 19341, 'First Health Insurance,Davis Vision - Vision Care,UnitedHealthcare - UnitedHealthcare Compass Plus '),
(61304, 'Eye', 'Optometrist', 'Dr. Vicki Troese', 78954, 'First Health Insurance,Independence Blue Cross - National BlueCard PPO'),
(61306, 'Eye', 'Optometrist', 'Dr. Michael Negrey', 78960, 'First Health Insurance,Caterpillar - Caterpillar Network Plan'),
(61400, 'Eye', 'Optometrist', 'Dr. Mahendra K Rupani', 19300, 'First Health Insurance,EmblemHealth - 9/11 Program'),
(61500, 'Emergency', 'Emergency Medicine Physicians', 'Dr. Joseph Nowoslawski', 64052, 'First Health Insurance,Caterpillar - Caterpillar Network Plan'),
(61502, 'Emergency', 'Emergency Medicine Physicians', 'Dr. Mark Orland Scott', 64097, 'First Health Insurance,Caterpillar - Caterpillar Network Plan,Independence Blue Cross'),
(61504, 'Emergency', 'Emergency Medicine Physicians', 'Dr. David M Trantham', 64785, 'First Health Insurance,Cigna - HMO,Companion Life - Worker\'s Comp\r\n'),
(65730, 'Wound', 'Wound Care Specialist', 'Dr. Xavier Antony', 64093, 'First Health Insurance,Cigna - HMO'),
(68500, 'Emergency', 'Emergency Medicine Physicians', 'Dr. Lauren A Kanter', 64093, 'First Health Insurance,Companion Life - Worker\'s Comp,'),
(69544, 'Emergency', 'Emergency Medicine Physicians', 'Dr. Arthur E Perpall', 64093, 'First Health Insurance,First Choice Health - PPO,Cigna - HMO');

-- --------------------------------------------------------

--
-- Table structure for table `customer_table`
--

DROP TABLE IF EXISTS `customer_table`;
CREATE TABLE IF NOT EXISTS `customer_table` (
  `member_id` int(11) NOT NULL,
  `role` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `age` int(3) NOT NULL,
  `phone` double(15,0) NOT NULL,
  `house_number` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `zip_code` int(5) NOT NULL,
  `state` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`first_name`,`last_name`,`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customer_table`
--

INSERT INTO `customer_table` (`member_id`, `role`, `first_name`, `last_name`, `age`, `phone`, `house_number`, `city`, `zip_code`, `state`, `email`, `password`) VALUES
(67035, 'customer', 'Chaitanya ', 'Avasarala ', 26, 9972228790, '206 Chestnut Cir', 'Kansas City', 64193, 'MO', 'prashanth6353@gmail.com', 'EF4iCowaY6oslnnTN65Etw=='),
(63236, 'customer', 'Chaitanya Prashanth', 'Avasarala Venkata', 26, 8163725650, '64 Surrey Way', 'Exton', 64093, 'PA', 'prashanth.avc@gmail.com', 'EF4iCowaY6oslnnTN65Etw=='),
(61431, 'customer', 'Deepthi', 'Chowdary', 26, 8163720480, '10 Xaiver St', 'Philli', 78546, 'PA', 'deepthi.muppala@gmail.com', 'LohK8ERLHPD/m7TEbUVXXw=='),
(64782, 'customer', 'harish', 've', 12, 8019974984, 'fssdf', 'hyd', 64093, 'MO', '1@gmail.com', 'amK4FiTGGStkjdUFdXBkgg=='),
(64782, 'customer', 'harish', 'venkateswawaran', 23, 8019974984, 'hahdakzd', 'hyderabad', 64093, 'MO', 'harishsai1993@gmail.com', 'amK4FiTGGStkjdUFdXBkgg=='),
(65511, 'customer', 'Pavan', 'Reddy', 26, 5552221631, '509 Anderson St', 'Warrensburg', 19341, 'MO', 'pavan.reddy@gmail.com', 'b40emdVrmcRPcJpaRle8kg=='),
(61212, 'customer', 'Ramya', 'shillpa', 25, 9000124440, '23 Groover St', 'Delaware', 62034, 'PA', 'Ramya.94@gmail.com', 'arqWd81/n3V9f0FACElKAQ=='),
(62985, 'customer', 'Sai Krishna', 'Reddy', 25, 8167723506, '8630 Chestnut Cir', 'Kansas City', 64131, 'MO', 'saisun229@gmail.com', 'BX/Zl2tobgR8s8+cA6f/bA=='),
(67860, 'customer', 'Saitej', 'Vadlamani', 26, 4442310680, '63 Gay St', 'Prussia', 50601, 'FA', 'Saitej.786@gmail.com', '2U4u01174JN52EhnHaPbsg=='),
(66785, 'customer', 'Sandeep ', 'Avasarala', 25, 8166210680, '64 Surrey Way', 'Exton', 19341, 'PA', 'sandeep92.avasarala@gmail.com', 'piNVOpZ4xMejP1Z3GrI4xA=='),
(60404, 'customer', 'Satya Phani', 'Meduri', 28, 6210681223, '53 Heritage Ln', 'Exton', 19341, 'PA', 'satya.28@gmail.com', 'Bs4qGAJZqNXubjooj2Zalg=='),
(66853, 'customer', 'sdc', 'sad', 56, 7894561230, 's', 'mo', 89654, 'mo', 'k@3.com', 'EF4iCowaY6oslnnTN65Etw=='),
(65151, 'customer', 'Sravan', 'Vanga', 26, 6060121789, '23 Avenue St', 'Malvern', 64093, 'PA', 'sravan.kpf@gmail.com', 'ofM6d1qkbSYVLMQb3lJuMA=='),
(62888, 'customer', 'vishnuvardhan', 'Sheelam', 23, 1234567890, '48 drewes ct', 'nj', 86482, 'nj', 'svreddy8055@gmail.com', 'NSY+uglXnZJDjMQS0GcSyg==');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availability_list`
--

DROP TABLE IF EXISTS `doctor_availability_list`;
CREATE TABLE IF NOT EXISTS `doctor_availability_list` (
  `member_id` int(11) NOT NULL,
  `first_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `rating` float NOT NULL,
  `address` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `available_date` date NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `first_name` (`first_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctor_availability_list`
--

INSERT INTO `doctor_availability_list` (`member_id`, `first_name`, `rating`, `address`, `available_date`) VALUES
(61300, 'Dr. Diana Ries', 3.7, '1642 E Herndon Ave, Exton, PA - 19341.', '2018-01-15'),
(61302, 'Dr. Tu Dinh', 2.9, '7152 N Sharon Ave, Exton, PA - 19341.', '2018-01-15'),
(61304, 'Dr. Vicki Troese', 5, '10 E 85th St, King of Prussia, PA - 78954.', '2018-01-15'),
(61306, 'Dr. Michael Negrey', 3, '135 Central Park West,West Chester,PA - 78960.', '2018-01-15'),
(61400, 'Dr. Mahendra K Rupani', 4, '1615 Winsted Dr, Pottstown Pike, PA - 19300.', '2018-01-15'),
(61500, 'Dr. Joseph Nowoslawski', 4, '53760 Generations Way,Kansas City, MO - 64052.', '2018-01-15'),
(61502, 'Dr. Mark Orland Scott', 4, '53880 Carmichael Cir, South Bend, MO - 64097.', '2018-01-15'),
(61504, 'Dr. David M Trantham', 5, '5501 Old York Road,Lee Summit,MO - 64785.', '2018-01-15'),
(65730, 'Dr. Xavier Antony', 3.5, 'Saint Lukes Cardiovascular Conslts, 407 E Russell Ave, Warrensburg, MO - 64093.', '2018-01-15'),
(68500, 'Dr. Lauren A Kanter', 3, '9411 N Oak Trfy,Warrensburg, MO - 64093.', '2018-01-15'),
(69544, 'Dr.Arthur E Perpall', 4.18476, '603 East Gaines Cir, Warrensburg, MO - 64093.', '2018-01-15'),
(69687, 'Dr.Vishnu Reddy', 4.86536, 'Saint Lukes Cardiovascular Conslts, 407 E Russell Ave, Warrensburg, MO - 64093.', '2018-01-15');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_calendar`
--

DROP TABLE IF EXISTS `doctor_calendar`;
CREATE TABLE IF NOT EXISTS `doctor_calendar` (
  `member_id` int(11) NOT NULL,
  `timeslot` datetime NOT NULL,
  PRIMARY KEY (`member_id`,`timeslot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctor_calendar`
--

INSERT INTO `doctor_calendar` (`member_id`, `timeslot`) VALUES
(60000, '2018-01-11 11:00:00'),
(60000, '2018-01-25 11:00:00'),
(65730, '2018-01-07 08:15:00'),
(65730, '2018-01-07 08:30:00'),
(65730, '2018-01-09 18:15:00'),
(65730, '2018-01-10 08:00:00'),
(65730, '2018-01-10 09:00:00'),
(65730, '2018-01-10 09:15:00'),
(65730, '2018-01-10 09:30:00'),
(65730, '2018-01-10 12:00:00'),
(65730, '2018-01-11 08:00:00'),
(65730, '2018-01-11 15:30:00'),
(65730, '2018-01-12 17:45:00'),
(65730, '2018-01-17 09:00:00'),
(65730, '2018-01-20 09:45:00'),
(65730, '2018-01-24 13:45:00'),
(69544, '2018-01-13 11:00:00'),
(69544, '2018-01-16 10:00:00'),
(69544, '2018-01-16 12:00:00'),
(69544, '2018-01-17 09:00:00'),
(69544, '2018-01-17 11:15:00'),
(69544, '2018-01-17 12:15:00'),
(69544, '2018-01-17 15:15:00'),
(69544, '2018-01-25 11:00:00'),
(69544, '2018-01-27 11:00:00'),
(69544, '2018-01-31 09:00:00'),
(69544, '2018-01-31 11:00:00'),
(69544, '2018-02-01 10:00:00'),
(69544, '2018-03-03 10:00:00'),
(69687, '2018-01-18 10:00:00'),
(69687, '2018-01-18 11:00:00'),
(69687, '2018-01-31 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_profile`
--

DROP TABLE IF EXISTS `doctor_profile`;
CREATE TABLE IF NOT EXISTS `doctor_profile` (
  `doctor_member_id` int(11) NOT NULL,
  `first_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `education` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `hospital_affliation` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `languages` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `professional_Memberships` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `board_certification` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `affliated_insurance` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `specialities` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`doctor_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctor_profile`
--

INSERT INTO `doctor_profile` (`doctor_member_id`, `first_name`, `last_name`, `education`, `hospital_affliation`, `languages`, `professional_Memberships`, `board_certification`, `affliated_insurance`, `specialities`) VALUES
(12345, 'Sandeep Updated', 'Avasarala Venkata', 'M.s, Btech', 'Paoli Hospital', 'English', 'American Academy of Family Physicians', 'American Board of Family Medicine', 'Aetna', 'Family Physician'),
(61302, 'Tu', 'Dinh', 'Medical School - New York University, Doctor of Medicine\r\nColumbia University (Bachelor’s)\r\nUniversity of Miami Hospital, Internship in Internal Medicine\r\nUniversity of Miami Hospital, Residency in Internal Medicine\r\nUniversity of Miami Hospital, Fellowship in Medical Oncology', 'Einstein Medical Center Philadelphia', 'English , Latino , Hindi', 'American Academy of Optometrist', 'American Board of Internal Medicine,\r\nMedical Oncology (Internal Medicine)', 'Caterpillar, Anthem Blue Cross Blue Shield ,First Health Insurance , Companion Life - Worker\'s Comp ,Triple-S Salud: Blue Cross Blue Shield of Puerto Rico', 'Optometrist , Eye'),
(65727, 'ffffffffffffffffffff', 'gfhg tfh', 'fourth grade', 'q', 'qewr', 'gggggg gg', 'vvvvvvvvvv vvv', 'qewr', 'gggg ggg'),
(65730, 'Xavier', 'Antony', 'Medical School - State University of New York, Downstate Medical Center, Doctor of Medicine Long Island College Hospital (Residency)NewYork-Presbyterian Hospital / Columbia University Medical Center (Fellowship)Columbia-Presbyterian Medical Center, Fellowship in Rheumatic Diseases', 'Golden Valley Memorial Hospital', 'English , Spanish , French , Hindi', 'American Academy of Wound Care Specialist', 'New York Academy of Medicine', 'American Healthcare Alliance , First Health Insurance , First Choice Health - PPO, Wellmark Blue Cross Blue Shield , Independence Blue Cross - National BlueCard PPO', 'Wound Care Specialist'),
(69544, 'Arthur E', 'Perpall', 'Tenth Grade', 'Paoli Hospital', 'None', 'American Academy of Family Physicians', 'American Board of Internal Medicine', ' ss , Aetna,First Health Insurance , Independence Blue Cross - National BlueCard PPO,WEA Trust - Fox River Network  Tier one Providers', 'Family Physician '),
(69687, 'Vishnu', 'Reddy', 's', 's', 's', 'ss ss', 'sgsg sgsg', 's', 'shsh shsh');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_table`
--

DROP TABLE IF EXISTS `doctor_table`;
CREATE TABLE IF NOT EXISTS `doctor_table` (
  `member_id` int(11) NOT NULL,
  `role` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `specialty` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `phone` double(15,0) NOT NULL,
  `zip_code` int(5) NOT NULL,
  `email` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`phone`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctor_table`
--

INSERT INTO `doctor_table` (`member_id`, `role`, `first_name`, `last_name`, `specialty`, `phone`, `zip_code`, `email`, `password`) VALUES
(68500, 'doctor', 'Lauren A', 'Kanter', 'Emergency Medicine Physicians', 7860545889, 64093, 'Kanter.A.Lauren456@gmail.com', 'OhMWtJAAgHP8TOBgkkjhHQ=='),
(69544, 'doctor', 'Arthur E', 'Perpall', 'Emergency Medicine Physicians', 7865405889, 64093, 'Arthur.E.Perpall852@gmail.com', 'bn5ueHvNswNBfBWpxBDO/Q=='),
(63679, 'doctor', 'kishore', 'hari', 'Neurologist', 7894563210, 64093, 'kishore.hari@gmail.com', '5rr5XQHo3M7psf04tHeXcQ=='),
(69687, 'doctor', 'Vishnu', 'Reddy', 'Infectious Disease Specialist', 7896541230, 12345, 'prashanth.avc@gmail.com', 'EF4iCowaY6oslnnTN65Etw=='),
(61300, 'doctor', 'Diana', 'Ries', 'Optometrist', 8169247856, 19341, 'Diana456@gmail.com', 'yqDAeh7vp9AFmWHLf3M8og=='),
(61302, 'doctor', 'Tu', 'Dinh', 'Optometrist', 8169427856, 19341, 'Dinh.Tu123@gmail.com', 'NCU0RyvqOgXbQl6ixFfMoA=='),
(65730, 'doctor', 'Xavier', 'Antony', 'Wound Care Specialist', 8790464822, 64093, 'Xavier.INR@gmail.com', 'Q3puCXzemOCHLAN1KV3RGw=='),
(65727, 'doctor', 'Raghu', 'Meduri', 'Cardiothoracic Surgeon', 9701699931, 64093, 'raghu.kpf@gmail.com', 'VHEMC+TIXnzIxIpHJ0oRyg=='),
(66077, 'doctor', 'deepthi', 'Sudha', 'Cardiothoracic Surgeon', 9972228790, 19341, 'deepu.91@gmail.com', 'f1DJWhplDR96aBtxGcMHdA==');

-- --------------------------------------------------------

--
-- Table structure for table `email_notifications`
--

DROP TABLE IF EXISTS `email_notifications`;
CREATE TABLE IF NOT EXISTS `email_notifications` (
  `serial_number` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `serial_number` (`serial_number`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `email_notifications`
--

INSERT INTO `email_notifications` (`serial_number`, `email_id`) VALUES
(1, 'prashanth.avc@gmail.com'),
(2, 'prashanth6353@gmail.com'),
(5, 'prashanth.avasarala@gmail.com'),
(6, 'cxa68890@ucmo.edu'),
(8, 'vangapavan455@gmail.com'),
(9, 'sravanreddy.reva@gmail.com'),
(10, 'meduriraghu@gmail.com'),
(11, 'hemanthkumar32@gmail.com'),
(13, 'saisun229@gmail.com'),
(14, 'svreddy8055@gmail.com'),
(15, 'ranjithchowdhary@gmail.com'),
(16, ''),
(17, '@gmail.com'),
(18, 'g@gmail.com'),
(19, 'harishsai1993@gmail.com'),
(20, 'nareshdeti55@gmail.com'),
(21, 'vishnuvardhanreddysheelam@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `patient_appointments`
--

DROP TABLE IF EXISTS `patient_appointments`;
CREATE TABLE IF NOT EXISTS `patient_appointments` (
  `member_id` int(11) NOT NULL,
  `first_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `contact_num` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `carrier` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `appointment_date` datetime NOT NULL,
  `reason` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `doctor_member_id` int(11) NOT NULL,
  PRIMARY KEY (`appointment_date`,`doctor_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `patient_appointments`
--

INSERT INTO `patient_appointments` (`member_id`, `first_name`, `last_name`, `contact_num`, `carrier`, `appointment_date`, `reason`, `doctor_member_id`) VALUES
(66779, 'Harsha', 'Chowdary', '9063951642', 'First Health Insurance', '2017-11-16 12:00:00', 'Minor Surgery about Girls Weakness, also called Google Voice Number. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66778, 'Anurag', 'Mysari', '8790464822', 'First Health Insurance', '2017-11-20 09:00:00', 'Cosultation/General Follow up about Leg Sprain. Follow Up after Minor Surgery', 69544),
(66776, 'Rahul', 'Gubbala', '7564581232', 'First Health Insurance', '2017-11-20 09:15:00', 'Cosultation/General Follow up about Leg Sprain. Follow Up after Minor Surgery', 69544),
(66784, 'Sudeep', 'Reddy', '8790464822', 'First Health Insurance', '2017-12-06 12:30:00', 'Minor Surgery about Pink eye, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66782, 'Deepthi', 'Muppala', '9063951642', 'First Health Insurance', '2017-12-06 17:30:00', 'Cosultation/General Follow up about Leg Sprain', 69544),
(64782, 'harish', 'venkateswawaran', '8019974984', 'First Health Insurance', '2017-12-07 20:26:30', 'vasa', 61300),
(66777, 'Rahul', 'Sayini', '9064567890', 'First Health Insurance', '2017-12-11 14:30:00', 'Cosultation/General Follow up about Leg Sprain. Follow Up after Minor Surgery', 69544),
(66788, 'Dileep', 'Thallapally', '8790464822', 'First Health Insurance', '2017-12-12 16:29:00', 'Minor Surgery on Retina', 61300),
(61431, 'Deepthi', 'Chowdary', '8163720480', 'First Health Insurance', '2017-12-20 09:00:00', 'Pain in heart and heart broken coz of life partner.', 61302),
(66780, 'Adithya', 'Narala', '8166218956', 'First Health Insurance', '2018-01-10 03:30:00', 'Minor Surgery about Nerves Weakness, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(62985, 'Sai Krishna', 'Reddy', '8167723506', 'irst Health Insurance', '2018-01-10 11:30:00', 'Bleeding/cuts -- not bleeding a lot but requiring stitches and General check up', 69544),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'WEA Trust - Fox River Network: Tier 1 Providers', '2018-01-10 15:00:00', 'jmb', 61300),
(67860, 'Saitej', 'Vadlamani', '4442310680', 'WEA Trust - Fox River Network: Tier 1 Providers', '2018-01-12 08:00:00', 'kikikik', 65730),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'Independence Blue Cross - National BlueCard PPO', '2018-01-17 09:00:00', 'sds', 65730),
(67860, 'Saitej', 'Vadlamani', '4442310680', 'Caterpillar - Caterpillar Network Plan', '2018-01-18 11:00:00', 'hj', 69687),
(66783, 'Ritish', 'Varma Datla', '8790464822', 'First Health Insurance', '2018-01-18 16:15:00', 'Minor Surgery about Pink eye, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66787, 'Sravan', 'Reddy Reva', '8790464822', 'First Health Insurance', '2018-01-18 17:00:00', 'Cosultation/General Follow up about Leg Sprain', 69544),
(66775, 'Ravi Teja', 'Sankati', '8161234569', 'First Health Insurance', '2018-01-23 11:45:00', 'Cosultation/General Follow up about Leg Sprain. Follow Up after Minor Surgery', 69544),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'WEA Trust - Fox River Network: Tier 1 Providers', '2018-02-03 05:16:00', 'Minor broken bones and fractures (i.e. fingers, toes)\r\nModerate back problems', 61304),
(66789, 'Chaithanya', 'prashanth', '8790464822', 'First Health Insurance', '2018-02-07 09:30:00', 'Follow Up after Minor Surgery', 69544),
(54321, 'sandip', 'Venkata', '8163725600', 'polo', '2018-02-10 11:00:00', 'gee', 12345),
(66786, 'Pavan', 'Reddy vanga', '8790464822', 'First Health Insurance', '2018-02-18 11:30:00', 'follow Up on Appenticitis Operation', 69544),
(66781, 'Ramya', 'Muppala', '9063951642', 'First Health Insurance', '2018-02-20 02:30:00', 'Minor Surgery about Pinkeye, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544);

-- --------------------------------------------------------

--
-- Table structure for table `patient_lab_reports`
--

DROP TABLE IF EXISTS `patient_lab_reports`;
CREATE TABLE IF NOT EXISTS `patient_lab_reports` (
  `member_id` int(11) NOT NULL,
  `doctor_member_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`member_id`,`doctor_member_id`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `patient_lab_reports`
--

INSERT INTO `patient_lab_reports` (`member_id`, `doctor_member_id`, `date`, `type`) VALUES
(63236, 65730, '2017-11-11 23:31:15', 'Blood tests and physical test reports'),
(63236, 69544, '2017-11-30 10:53:45', 'Hands fracture scanning reports'),
(66775, 69544, '2017-11-30 08:45:00', 'EMR Scanning for Brain.'),
(66776, 69544, '2017-12-04 10:45:00', 'EMR Scanning for Ear.'),
(66777, 69544, '2017-11-29 11:45:00', 'Blood Tests.');

-- --------------------------------------------------------

--
-- Table structure for table `patient_reviews`
--

DROP TABLE IF EXISTS `patient_reviews`;
CREATE TABLE IF NOT EXISTS `patient_reviews` (
  `member_id` int(11) NOT NULL,
  `doctor_member_id` int(11) NOT NULL,
  `review` varchar(600) COLLATE utf8_unicode_ci NOT NULL,
  `review_date` datetime NOT NULL,
  `rating` float NOT NULL,
  PRIMARY KEY (`member_id`,`doctor_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `patient_reviews`
--

INSERT INTO `patient_reviews` (`member_id`, `doctor_member_id`, `review`, `review_date`, `rating`) VALUES
(61431, 69544, 'Treatment was good , But little wait time.\nUsed very sophisticated instruments', '2017-12-05 00:00:00', 3.44444),
(63236, 61302, 'gsjhhjjsjs', '2017-12-01 21:49:00', 3.6),
(63236, 65730, 'Good Bedside manner and Doctor timing is punctual .prescribed correct medication.', '2017-11-30 09:38:15', 3.5),
(63236, 69544, 'wer', '2018-01-05 03:18:04', 1.33333),
(66775, 69544, 'I am very active and with that has come my share of mishaps. Dr Arthur E explains exactly what is wrong and how we are going to repair. I sincerely trust him, his medical knowledge and his judgment. The entire staff is friendly and makes you feel at ease even through some not-so-easy time.', '2017-11-27 08:45:00', 3.5),
(66776, 69544, 'When I found out I was pregnant with my first child, I was hoping to find an OB who I could trust to have my best interest in mind. My husband did his research and found Dr. Arthur E to be recommended as one of the best doctors in the area. Throughout the entire pregnancy, Dr. Arthur E, Perpall and staff were nothing short of phenomenal! They are friendly, professional, and take the time to answer any questions you might have.', '2017-11-27 09:45:00', 4.2),
(66782, 69544, '\"I absolutely love this office. Front desk is always friendly, Kruthi is fantastic, and Dr. Arthur E Perpall couldn\'t be more caring. They can generally get you in for an appointment very quickly if need be. I had an issue that I called for yesterday and Kruthi answered my questions on the phone and then Dr. Arthur E Perpall I called me back to check on me today. I\'ve never had better or more personal care from a healthcare team.\"', '2017-11-27 10:45:00', 4.3),
(66784, 69544, '\"I absolutely love this office. Front desk is always friendly, Kruthi is fantastic, and Dr. Arthur E perpall couldn\'t be more caring. They can generally get you in for an appointment very quickly if need be. I had an issue that I called for yesterday and Kruthi answered my questions on the phone and then Dr. Arthur E Perpall I called me back to check on me today. I\'ve never had better or more personal care from a healthcare team.\"', '2017-11-27 13:45:00', 5),
(66785, 69544, 'When I found out I was pregnant with my first child, I was hoping to find an OB who I could trust to have my best interest in mind. My husband did his research and found Dr. Arthur E Perpall to be recommended as one of the best doctors in the area. Throughout the entire pregnancy, Dr. Brown, Erin (midwife) and staff were nothing short of phenomenal! They are friendly, professional, and take the time to answer any questions you might have.', '2017-11-27 12:45:00', 4),
(66786, 69544, 'I am very active and with that has come my share of mishaps. Dr Arthur E Perpall explains exactly what is wrong and how we are going to repair. I sincerely trust him, his medical knowledge and his judgment. The entire staff is friendly and makes you feel at ease even through some not-so-easy time.', '2017-11-27 11:45:00', 3.75);

-- --------------------------------------------------------

--
-- Table structure for table `specialty`
--

DROP TABLE IF EXISTS `specialty`;
CREATE TABLE IF NOT EXISTS `specialty` (
  `Value` int(11) NOT NULL,
  `Specialty` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `specialty`
--

INSERT INTO `specialty` (`Value`, `Specialty`) VALUES
(98, 'Dentist'),
(101, 'Dermatologist'),
(114, 'Infectious Disease Specialist'),
(118, 'Pathologist'),
(120, 'Plastic Surgeon'),
(122, 'Psychiatrist'),
(123, 'Radiologist'),
(126, 'Urologist'),
(128, 'Neurologist'),
(129, 'Sports Medicine Specialist'),
(133, 'Optometrist'),
(143, 'Cardiothoracic Surgeon'),
(145, 'Emergency Medicine Physicians'),
(343, 'Travel Medicine Specialist'),
(345, 'Allergist'),
(346, 'Audiologist'),
(470, 'Wound Care Specialist');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

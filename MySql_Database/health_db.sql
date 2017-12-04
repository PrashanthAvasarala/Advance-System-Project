-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2017 at 07:32 PM
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
-- Creation: Nov 09, 2017 at 01:40 AM
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
-- RELATIONSHIPS FOR TABLE `appointment_doctors_list`:
--

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
-- Creation: Nov 29, 2017 at 12:58 AM
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
  `password` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`first_name`,`last_name`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `customer_table`:
--

--
-- Dumping data for table `customer_table`
--

INSERT INTO `customer_table` (`member_id`, `role`, `first_name`, `last_name`, `age`, `phone`, `house_number`, `city`, `zip_code`, `state`, `email`, `password`) VALUES
(67035, 'customer', 'Chaitanya ', 'Avasarala ', 26, 9972228790, '206 Chestnut Cir', 'Kansas City', 64193, 'MO', 'prashanth6353@gmail.com', 'Chaithu@786'),
(63236, 'customer', 'Chaitanya Prashanth', 'Avasarala Venkata', 26, 8163725650, '64 Surrey Way', 'Exton', 64093, 'PA', 'prashanth.avc@gmail.com', 'Chaithu@786'),
(61431, 'customer', 'Deepthi', 'Chowdary', 26, 8163720480, '10 Xaiver St', 'Philli', 78546, 'PA', 'deepthi.muppala@gmail.com', 'Deepu@1031'),
(65511, 'customer', 'Pavan', 'Reddy', 26, 5552221631, '509 Anderson St', 'Warrensburg', 19341, 'MO', 'pavan.reddy@gmail.com', 'Pavan@456'),
(61212, 'customer', 'Ramya', 'shillpa', 25, 9000124440, '23 Groover St', 'Delaware', 62034, 'PA', 'Ramya.94@gmail.com', 'Ramya@123'),
(62985, 'customer', 'Sai Krishna', 'Reddy', 25, 8167723506, '8630 Chestnut Cir', 'Kansas City', 64131, 'MO', 'saisun229@gmail.com', 'Saisun@123'),
(67860, 'customer', 'Saitej', 'Vadlamani', 26, 4442310680, '63 Gay St', 'Prussia', 50601, 'FA', 'Saitej.786@gmail.com', 'Saitej$123'),
(64442, 'customer', 'Sandeep ', 'Avasarala', 25, 8166210680, '64 Surrey Way', 'Exton', 19341, 'PA', 'sandeep92.avasarala@gmail.com', 'Sandeep@1031'),
(60404, 'customer', 'Satya Phani', 'Meduri', 28, 6210681223, '53 Heritage Ln', 'Exton', 19341, 'PA', 'satya.28@gmail.com', 'Satya@123'),
(65151, 'customer', 'Sravan', 'Vanga', 26, 6060121789, '23 Avenue St', 'Malvern', 64093, 'PA', 'sravan.kpf@gmail.com', 'Sravan@786');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availability_list`
--
-- Creation: Dec 04, 2017 at 11:06 AM
--

DROP TABLE IF EXISTS `doctor_availability_list`;
CREATE TABLE IF NOT EXISTS `doctor_availability_list` (
  `member_id` int(11) NOT NULL,
  `first_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `rating` float NOT NULL,
  `address` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `available_date` date NOT NULL,
  PRIMARY KEY (`member_id`,`first_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `doctor_availability_list`:
--

--
-- Dumping data for table `doctor_availability_list`
--

INSERT INTO `doctor_availability_list` (`member_id`, `first_name`, `rating`, `address`, `available_date`) VALUES
(61300, 'Dr. Diana Ries', 3.7, '1642 E Herndon Ave, Exton, PA - 19341.', '2017-12-06'),
(61302, 'Dr. Tu Dinh', 2.9, '7152 N Sharon Ave, Exton, PA - 19341.', '2017-12-06'),
(61304, 'Dr. Vicki Troese', 5, '10 E 85th St, King of Prussia, PA - 78954.', '2017-12-06'),
(61306, 'Dr. Michael Negrey', 3, '135 Central Park West,West Chester,PA - 78960.', '2017-12-06'),
(61400, 'Dr. Mahendra K Rupani', 4, '1615 Winsted Dr, Pottstown Pike, PA - 19300.', '2017-12-06'),
(61500, 'Dr. Joseph Nowoslawski', 4, '53760 Generations Way,Kansas City, MO - 64052.', '2017-12-06'),
(61502, 'Dr. Mark Orland Scott', 4, '53880 Carmichael Cir, South Bend, MO - 64097.', '2017-12-06'),
(61504, 'Dr. David M Trantham', 5, '5501 Old York Road,Lee Summit,MO - 64785.', '2017-12-06'),
(65730, 'Dr. Xavier Antony', 3.5, 'Saint Lukes Cardiovascular Conslts, 407 E Russell Ave, Warrensburg, MO - 64093.', '2017-12-06'),
(68500, 'Dr. Lauren A Kanter', 3, '9411 N Oak Trfy,Warrensburg, MO - 64093.', '2017-12-06'),
(69544, 'Dr. Arthur E Perpall', 4.5, '603 East Gaines Cir, Warrensburg, MO - 64093.', '2017-12-06');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_profile`
--
-- Creation: Nov 28, 2017 at 10:29 AM
--

DROP TABLE IF EXISTS `doctor_profile`;
CREATE TABLE IF NOT EXISTS `doctor_profile` (
  `doctor_member_id` int(11) NOT NULL,
  `first_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `education` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `hospital_affliation` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `languages` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `professional_Memberships` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `board_certification` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `affliated_insurance` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `specialities` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`doctor_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `doctor_profile`:
--

--
-- Dumping data for table `doctor_profile`
--

INSERT INTO `doctor_profile` (`doctor_member_id`, `first_name`, `last_name`, `education`, `hospital_affliation`, `languages`, `professional_Memberships`, `board_certification`, `affliated_insurance`, `specialities`) VALUES
(69544, 'Arthur E', 'Perpall', 'M.s, Btech', 'Paoli Hospital', 'English', 'American Academy of Family Physicians', 'American Board of Family Medicine', 'Aetna and first health ', 'Family Physician ');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_table`
--
-- Creation: Nov 29, 2017 at 03:15 AM
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
  PRIMARY KEY (`first_name`,`last_name`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `doctor_table`:
--

--
-- Dumping data for table `doctor_table`
--

INSERT INTO `doctor_table` (`member_id`, `role`, `first_name`, `last_name`, `specialty`, `phone`, `zip_code`, `email`, `password`) VALUES
(69544, 'doctor', 'Arthur E', 'Perpall', 'Emergency Medicine Physicians', 7865405889, 64093, 'Arthur.E.Perpall852@gmail.com', 'Perpall@852'),
(66077, 'doctor', 'deepthi', 'Sudha', 'Cardiothoracic Surgeon', 9972228790, 19341, 'deepu.91@gmail.com', 'Deepu@786'),
(61300, 'doctor', 'Diana', 'Ries', 'Optometrist', 8169247856, 19341, 'Diana456@gmail.com', 'Diana@456'),
(63679, 'doctor', 'kishore', 'hari', 'Neurologist', 7894563210, 64093, 'kishore.hari@gmail.com', 'Kishore@123'),
(68500, 'doctor', 'Lauren A', 'Kanter', 'Emergency Medicine Physicians', 7860545889, 64093, 'Kanter.A.Lauren456@gmail.com', 'Kanter$786'),
(65727, 'doctor', 'Raghu', 'Meduri', 'Cardiothoracic Surgeon', 9701699931, 64093, 'raghu.kpf@gmail.com', 'Raghu@786'),
(61302, 'doctor', 'Tu', 'Dinh', 'Optometrist', 8169427856, 19341, 'Dinh.Tu123@gmail.com', 'Dinh@987'),
(65730, 'doctor', 'Xavier', 'Antony', 'Wound Care Specialist', 8790464822, 64093, 'Xavier.INR@gmail.com', 'Xavier01');

-- --------------------------------------------------------

--
-- Table structure for table `email_notifications`
--
-- Creation: Nov 14, 2017 at 10:45 PM
--

DROP TABLE IF EXISTS `email_notifications`;
CREATE TABLE IF NOT EXISTS `email_notifications` (
  `serial_number` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `serial_number` (`serial_number`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `email_notifications`:
--

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
(15, 'ranjithchowdhary@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `patient_appointments`
--
-- Creation: Dec 02, 2017 at 10:32 PM
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
  PRIMARY KEY (`member_id`,`appointment_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `patient_appointments`:
--

--
-- Dumping data for table `patient_appointments`
--

INSERT INTO `patient_appointments` (`member_id`, `first_name`, `last_name`, `contact_num`, `carrier`, `appointment_date`, `reason`, `doctor_member_id`) VALUES
(62985, 'Sai Krishna', 'Reddy', '8167723506', 'irst Health Insurance', '2017-12-07 09:23:00', 'Bleeding/cuts -- not bleeding a lot but requiring stitches and General check up', 69544),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'WEA Trust - Fox River Network: Tier 1 Providers', '2017-12-03 05:16:00', 'Minor broken bones and fractures (i.e. fingers, toes)\r\nModerate back problems', 61304),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'Companion Life - Worker\'s Comp', '2017-12-05 07:18:45', 'Regular Retinal Check up', 61302),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'Clover Health - Prestige', '2017-12-20 00:00:00', '(Signs of)Stroke (e.g. loss of vision, sudden numbness, weakness, slurred speech, or confusion)', 61300),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'EmblemHealth - 9/11 Program', '2017-12-26 08:23:30', 'Urinary tract infections\r\nVomiting, diarrhea or dehydration', 61504),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'Clover Health - Prestige', '2017-12-28 04:22:15', 'upper back pain, chest pain and pressure, shortness of breath or arm pain.', 69544),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'WEA Trust - Fox River Network: Tier 1 Providers', '2017-12-29 08:23:00', 'nearsightedness, or blurred vision when looking at faraway objects.\r\ncataracts, or clouding of the eye\'s lens.', 61502),
(63236, 'Chaitanya Prashanth', 'Avasarala Venkata', '8163725650', 'EmblemHealth - 9/11 Program', '2017-12-29 08:23:30', 'retinitis pigmentosa, which occurs when dark pigment collects in your retina and creates tunnel vision.', 61500),
(66775, 'Ravi Teja', 'Sankati', '8161234569', 'First Health Insurance', '2017-11-27 08:45:00', 'Cosultation/General Follow up about Leg Sprain. Follow Up after Minor Surgery', 69544),
(66776, 'Rahul', 'Gubbala', '7564581232', 'First Health Insurance', '2017-11-20 09:15:00', 'Cosultation/General Follow up about Leg Sprain. Follow Up after Minor Surgery', 69544),
(66777, 'Rahul', 'Sayini', '9064567890', 'First Health Insurance', '2017-12-11 14:30:00', 'Cosultation/General Follow up about Leg Sprain. Follow Up after Minor Surgery', 69544),
(66778, 'Anurag', 'Mysari', '8790464822', 'First Health Insurance', '2017-11-20 09:00:00', 'Cosultation/General Follow up about Leg Sprain. Follow Up after Minor Surgery', 69544),
(66779, 'Harsha', 'Chowdary', '9063951642', 'First Health Insurance', '2017-11-20 04:00:00', 'Minor Surgery about Girls Weakness, also called Google Voice Number. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66780, 'Adithya', 'Narala', '8166218956', 'First Health Insurance', '2017-11-20 03:30:00', 'Minor Surgery about Nerves Weakness, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66781, 'Ramya', 'Muppala', '9063951642', 'First Health Insurance', '2017-11-20 02:30:00', 'Minor Surgery about Pinkeye, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66782, 'Deepthi', 'Muppala', '9063951642', 'First Health Insurance', '2017-11-01 01:30:00', 'Cosultation/General Follow up about Leg Sprain', 69544),
(66783, 'Ritish', 'Varma Datla', '8790464822', 'First Health Insurance', '2017-11-18 11:00:00', 'Minor Surgery about Pink eye, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66784, 'Sudeep', 'Reddy', '8790464822', 'First Health Insurance', '2017-12-06 12:30:00', 'Minor Surgery about Pink eye, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66785, 'Sandeep', 'Venkata', '8790464822', 'First Health Insurance', '2017-11-18 12:30:00', 'Minor Surgery about Pinkeye, also called conjunctivitis. It is a common childhood illness. Pinkeye usually makes the whites of your eyes turn red.', 69544),
(66786, 'Pavan', 'Reddy vanga', '8790464822', 'First Health Insurance', '2017-11-18 11:30:00', 'follow Up on Appenticitis Operation', 69544),
(66787, 'Sravan', 'Reddy Reva', '8790464822', 'First Health Insurance', '2017-11-18 12:00:00', 'Cosultation/General Follow up about Leg Sprain', 69544),
(66788, 'Dileep', 'Thallapally', '8790464822', 'First Health Insurance', '2017-12-12 16:29:00', 'Minor Surgery on Retina', 61300),
(66789, 'Chaithanya', 'prashanth', '8790464822', 'First Health Insurance', '2017-12-08 09:30:00', 'Follow Up after Minor Surgery', 69544);

-- --------------------------------------------------------

--
-- Table structure for table `patient_lab_reports`
--
-- Creation: Nov 28, 2017 at 09:47 AM
--

DROP TABLE IF EXISTS `patient_lab_reports`;
CREATE TABLE IF NOT EXISTS `patient_lab_reports` (
  `member_id` int(11) NOT NULL,
  `doctor_member_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`member_id`,`doctor_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `patient_lab_reports`:
--

--
-- Dumping data for table `patient_lab_reports`
--

INSERT INTO `patient_lab_reports` (`member_id`, `doctor_member_id`, `date`, `type`) VALUES
(66775, 69544, '2017-11-30 08:45:00', 'EMR Scanning for Brain.'),
(66776, 69544, '2017-12-04 10:45:00', 'EMR Scanning for Ear.'),
(66777, 69544, '2017-11-29 11:45:00', 'Blood Tests.');

-- --------------------------------------------------------

--
-- Table structure for table `patient_reviews`
--
-- Creation: Nov 28, 2017 at 09:47 AM
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
-- RELATIONSHIPS FOR TABLE `patient_reviews`:
--

--
-- Dumping data for table `patient_reviews`
--

INSERT INTO `patient_reviews` (`member_id`, `doctor_member_id`, `review`, `review_date`, `rating`) VALUES
(63236, 65730, 'ji', '2017-11-30 09:38:15', 1.5),
(66775, 69544, 'I am very active and with that has come my share of mishaps. Dr Mastey explains exactly what is wrong and how we are going to repair. I sincerely trust him, his medical knowledge and his judgment. The entire staff is friendly and makes you feel at ease even through some not-so-easy time.', '2017-11-27 08:45:00', 3.5),
(66776, 69544, 'When I found out I was pregnant with my first child, I was hoping to find an OB who I could trust to have my best interest in mind. My husband did his research and found Dr. Brown to be recommended as one of the best doctors in the area. Throughout the entire pregnancy, Dr. Brown, Erin (midwife) and staff were nothing short of phenomenal! They are friendly, professional, and take the time to answer any questions you might have.', '2017-11-27 09:45:00', 4.2),
(66782, 69544, '\"I absolutely love this office. Front desk is always friendly, Kruthi is fantastic, and Dr. Sandeep couldn\'t be more caring. They can generally get you in for an appointment very quickly if need be. I had an issue that I called for yesterday and Kruthi answered my questions on the phone and then Dr. Sandeep i called me back to check on me today. I\'ve never had better or more personal care from a healthcare team.\"', '2017-11-27 10:45:00', 4.3),
(66784, 69544, '\"I absolutely love this office. Front desk is always friendly, Kruthi is fantastic, and Dr. Sandeep couldn\'t be more caring. They can generally get you in for an appointment very quickly if need be. I had an issue that I called for yesterday and Kruthi answered my questions on the phone and then Dr. Sandeep i called me back to check on me today. I\'ve never had better or more personal care from a healthcare team.\"', '2017-11-27 13:45:00', 5),
(66785, 69544, 'When I found out I was pregnant with my first child, I was hoping to find an OB who I could trust to have my best interest in mind. My husband did his research and found Dr. Brown to be recommended as one of the best doctors in the area. Throughout the entire pregnancy, Dr. Brown, Erin (midwife) and staff were nothing short of phenomenal! They are friendly, professional, and take the time to answer any questions you might have.', '2017-11-27 12:45:00', 4),
(66786, 69544, 'I am very active and with that has come my share of mishaps. Dr Mastey explains exactly what is wrong and how we are going to repair. I sincerely trust him, his medical knowledge and his judgment. The entire staff is friendly and makes you feel at ease even through some not-so-easy time.', '2017-11-27 11:45:00', 3.75);

-- --------------------------------------------------------

--
-- Table structure for table `specialty`
--
-- Creation: Nov 01, 2017 at 07:38 PM
--

DROP TABLE IF EXISTS `specialty`;
CREATE TABLE IF NOT EXISTS `specialty` (
  `Value` int(11) NOT NULL,
  `Specialty` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `specialty`:
--

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

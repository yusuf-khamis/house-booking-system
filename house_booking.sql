-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2016 at 07:48 AM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `house_booking`
--
CREATE DATABASE IF NOT EXISTS `house_booking` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `house_booking`;

-- --------------------------------------------------------

--
-- Table structure for table `admin-password`
--

CREATE TABLE IF NOT EXISTS `admin-password` (
  `id` int(11) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin-password`
--

INSERT INTO `admin-password` (`id`, `password`) VALUES
(1, 'admin-password');

-- --------------------------------------------------------

--
-- Table structure for table `emails`
--

CREATE TABLE IF NOT EXISTS `emails` (
  `id` int(11) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `content` varchar(200) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `read_status` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employee_address`
--

CREATE TABLE IF NOT EXISTS `employee_address` (
  `emp_id` int(10) unsigned NOT NULL,
  `box_number` int(11) NOT NULL,
  `box_city` varchar(30) NOT NULL,
  `postal_address` int(11) NOT NULL,
  `phone_number` int(10) unsigned zerofill NOT NULL,
  `alternate_number` int(10) unsigned zerofill NOT NULL,
  `email_address` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_address`
--

INSERT INTO `employee_address` (`emp_id`, `box_number`, `box_city`, `postal_address`, `phone_number`, `alternate_number`, `email_address`) VALUES
(2015014, 432, 'Kericho', 741, 0714321654, 0717071081, 'kansiime@lule.com'),
(2015068, 20587, 'Mombasa', 98540, 4294967295, 4294967295, 'hashtag@email.com'),
(2015078, 54862, 'Eldoret', 16987, 0795364172, 0784697136, 'kasule99@yahoo.com'),
(2015365, 54862, 'Mombasa', 16987, 0736987156, 0785154623, 'shirandula@kapsabet.com'),
(2015417, 4712, 'Mumias', 98742, 0784658214, 0798214569, 'kansiime@nyakatch.com');

-- --------------------------------------------------------

--
-- Table structure for table `employee_basic`
--

CREATE TABLE IF NOT EXISTS `employee_basic` (
  `emp_id` int(10) unsigned NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `second_name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `password` varchar(32) NOT NULL,
  `marital_status` varchar(7) NOT NULL,
  `id_number` int(11) NOT NULL,
  `availability` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_basic`
--

INSERT INTO `employee_basic` (`emp_id`, `first_name`, `second_name`, `surname`, `gender`, `password`, `marital_status`, `id_number`, `availability`) VALUES
(2015014, 'Kansiime', 'Lule', 'Kariuki', 'Female', 'password', 'Married', 12345678, 'available'),
(2015068, 'Saruji', 'Katembo', 'Kiilu', 'Male', 'password', 'Single', 14785236, 'available'),
(2015078, 'Kasule', 'Likoni', 'Lasagna', 'Male', 'password', 'Married', 7413596, 'available'),
(2015365, 'Shirandula', 'Kipepeo', 'Simiyu', 'Female', 'longpassword', 'Single', 65478921, 'available'),
(2015417, 'Kasule', 'Kansiime', 'Lexus', 'Female', 'password', 'Single', 87456932, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE IF NOT EXISTS `houses` (
  `house_id` int(10) unsigned NOT NULL,
  `location` varchar(15) NOT NULL,
  `house_number` varchar(5) NOT NULL,
  `book_status` varchar(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`house_id`, `location`, `house_number`, `book_status`) VALUES
(1, 'Mbaraki', 'MB001', 'Vacant'),
(2, 'Mbaraki', 'MB002', 'Vacant'),
(3, 'Mbaraki', 'MB003', 'Vacant'),
(4, 'Mbaraki', 'MB004', 'Vacant'),
(5, 'Mbaraki', 'MB005', 'Vacant'),
(6, 'Mbaraki', 'MB006', 'Vacant'),
(7, 'Mbaraki', 'MB007', 'Vacant'),
(8, 'Mbaraki', 'MB008', 'Vacant'),
(9, 'Mbaraki', 'MB009', 'Vacant'),
(10, 'Mbaraki', 'MB010', 'Vacant'),
(11, 'Mbaraki', 'MB011', 'Vacant'),
(12, 'Mbaraki', 'MB012', 'Vacant'),
(13, 'Mbaraki', 'MB013', 'Vacant'),
(14, 'Mbaraki', 'MB014', 'Vacant'),
(15, 'Mbaraki', 'MB015', 'Vacant'),
(16, 'Mbaraki', 'MB016', 'Vacant'),
(17, 'Mbaraki', 'MB017', 'Vacant'),
(18, 'Mbaraki', 'MB018', 'Vacant'),
(19, 'Mbaraki', 'MB019', 'Vacant'),
(20, 'Mbaraki', 'MB020', 'Vacant'),
(21, 'Pandya', 'PN001', 'Vacant'),
(22, 'Pandya', 'PN002', 'Vacant'),
(23, 'Pandya', 'PN003', 'Vacant'),
(24, 'Pandya', 'PN004', 'Vacant'),
(25, 'Pandya', 'PN005', 'Vacant'),
(26, 'Pandya', 'PN006', 'Vacant'),
(27, 'Pandya', 'PN007', 'Vacant'),
(28, 'Pandya', 'PN008', 'Vacant'),
(29, 'Pandya', 'PN009', 'Vacant'),
(30, 'Pandya', 'PN010', 'Vacant'),
(31, 'Pandya', 'PN011', 'Vacant'),
(32, 'Pandya', 'PN012', 'Vacant'),
(33, 'Pandya', 'PN013', 'Vacant'),
(34, 'Pandya', 'PN014', 'Vacant'),
(35, 'Pandya', 'PN015', 'Vacant'),
(36, 'Kiembeni', 'KM001', 'Vacant'),
(37, 'Kiembeni', 'KM002', 'Vacant'),
(38, 'Kiembeni', 'KM003', 'Vacant'),
(39, 'Kiembeni', 'KM004', 'Vacant'),
(40, 'Kiembeni', 'KM005', 'Vacant'),
(41, 'Kiembeni', 'KM006', 'Vacant'),
(42, 'Kiembeni', 'KM007', 'Booked'),
(43, 'Kiembeni', 'KM008', 'Vacant'),
(44, 'Kiembeni', 'KM009', 'Vacant'),
(45, 'Kiembeni', 'KM010', 'Vacant'),
(46, 'Kiembeni', 'KM011', 'Vacant'),
(47, 'Kiembeni', 'KM012', 'Vacant'),
(48, 'Kiembeni', 'KM013', 'Vacant'),
(49, 'Kiembeni', 'KM014', 'Vacant'),
(50, 'Kiembeni', 'KM015', 'Vacant'),
(51, 'Kiembeni', 'KM016', 'Vacant'),
(52, 'Kiembeni', 'KM017', 'Vacant'),
(53, 'Kiembeni', 'KM018', 'Vacant'),
(54, 'Kiembeni', 'KM019', 'Vacant'),
(55, 'Kiembeni', 'KM020', 'Vacant'),
(56, 'Nyali', 'NL001', 'Vacant'),
(57, 'Nyali', 'NL002', 'Vacant'),
(58, 'Nyali', 'NL003', 'Vacant'),
(59, 'Nyali', 'NL004', 'Vacant'),
(60, 'Nyali', 'NL005', 'Vacant'),
(61, 'Nyali', 'NL006', 'Vacant'),
(62, 'Nyali', 'NL007', 'Vacant'),
(63, 'Nyali', 'NL008', 'Vacant'),
(64, 'Nyali', 'NL009', 'Vacant'),
(65, 'Nyali', 'NL010', 'Vacant'),
(66, 'Ganjoni', 'GN001', 'Vacant'),
(67, 'Ganjoni', 'GN002', 'Vacant'),
(68, 'Ganjoni', 'GN003', 'Vacant'),
(69, 'Ganjoni', 'GN004', 'Vacant'),
(70, 'Ganjoni', 'GN005', 'Vacant'),
(71, 'Ganjoni', 'GN006', 'Vacant'),
(72, 'Ganjoni', 'GN007', 'Vacant'),
(73, 'Ganjoni', 'GN008', 'Vacant'),
(74, 'Ganjoni', 'GN009', 'Vacant'),
(75, 'Ganjoni', 'GN010', 'Vacant'),
(76, 'Ganjoni', 'GN011', 'Vacant'),
(77, 'Ganjoni', 'GN012', 'Vacant'),
(78, 'Ganjoni', 'GN013', 'Vacant'),
(79, 'Ganjoni', 'GN014', 'Vacant'),
(80, 'Ganjoni', 'GN015', 'Vacant');

-- --------------------------------------------------------

--
-- Table structure for table `occupation`
--

CREATE TABLE IF NOT EXISTS `occupation` (
  `id` int(11) NOT NULL,
  `house_number` varchar(5) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `since_date` date NOT NULL,
  `till_date` date DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `occupation`
--

INSERT INTO `occupation` (`id`, `house_number`, `emp_id`, `since_date`, `till_date`) VALUES
(13, 'MB014', 2015365, '2016-03-12', '2016-03-12'),
(14, 'GN011', 2015014, '2016-03-12', '2016-03-12'),
(15, 'MB013', 2015014, '2016-03-12', '2016-03-12'),
(16, 'KM007', 2015014, '2016-03-12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE IF NOT EXISTS `requests` (
  `id` int(11) NOT NULL,
  `house_number` varchar(5) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `previous` varchar(5) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `requested_date` date NOT NULL,
  `requested_time` time NOT NULL,
  `acceptance` varchar(10) DEFAULT NULL,
  `acceptance_date` date DEFAULT NULL,
  `acceptance_time` time DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `house_number`, `emp_id`, `previous`, `type`, `requested_date`, `requested_time`, `acceptance`, `acceptance_date`, `acceptance_time`) VALUES
(15, 'MB007', 2015365, NULL, 'new', '2016-03-12', '18:07:30', 'Approved', '2016-03-12', '18:07:59'),
(16, 'MB004', 2015365, 'MB007', 'changing', '2016-03-12', '18:11:54', 'Approved', '2016-03-12', '20:12:17'),
(17, 'PN001', 2015365, 'MB004', 'changing', '2016-03-12', '20:13:15', 'Approved', '2016-03-12', '20:13:34'),
(18, 'MB014', 2015365, 'PN001', 'changing', '2016-03-12', '20:14:45', 'Approved', '2016-03-12', '20:15:22'),
(19, 'MB014', 2015365, 'MB014', 'left', '2016-03-12', '20:16:00', 'OK', '2016-03-12', '20:16:24'),
(20, 'MB008', 2015365, NULL, 'new', '2016-03-12', '20:22:56', 'Declined', '2016-03-12', '20:42:40'),
(21, 'MB009', 2015014, NULL, 'new', '2016-03-12', '22:30:50', 'Approved', '2016-03-12', '22:35:16'),
(22, 'PN013', 2015014, 'MB009', 'changing', '2016-03-12', '22:38:12', 'Approved', '2016-03-12', '22:38:28'),
(23, 'GN011', 2015014, 'PN013', 'changing', '2016-03-12', '22:40:10', 'Approved', '2016-03-12', '23:21:31'),
(24, 'GN011', 2015014, 'GN011', 'left', '2016-03-12', '23:21:47', 'OK', '2016-03-12', '23:22:13'),
(25, 'MB013', 2015014, NULL, 'new', '2016-03-12', '23:23:38', 'Approved', '2016-03-12', '23:29:01'),
(26, 'MB013', 2015014, 'MB013', 'left', '2016-03-12', '23:29:09', 'OK', '2016-03-12', '23:29:19'),
(27, 'MB011', 2015014, NULL, 'new', '2016-03-12', '23:29:29', 'Approved', '2016-03-12', '23:30:27'),
(28, 'KM007', 2015014, 'MB011', 'changing', '2016-03-12', '23:30:53', 'Approved', '2016-03-12', '23:31:41'),
(29, 'PN011', 2015014, 'KM007', 'changing', '2016-03-12', '23:31:57', 'Declined', '2016-03-12', '23:32:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin-password`
--
ALTER TABLE `admin-password`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emails`
--
ALTER TABLE `emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_address`
--
ALTER TABLE `employee_address`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `employee_basic`
--
ALTER TABLE `employee_basic`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`house_id`);

--
-- Indexes for table `occupation`
--
ALTER TABLE `occupation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin-password`
--
ALTER TABLE `admin-password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `emails`
--
ALTER TABLE `emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `house_id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `occupation`
--
ALTER TABLE `occupation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

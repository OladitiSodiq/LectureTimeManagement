-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2022 at 09:39 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mylecturetimetable`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `classAddorEdit` (IN `id` INT(50), IN `classname` VARCHAR(50), IN `course` VARCHAR(50))  NO SQL
BEGIN
IF id = 0 THEN
INSERT INTO class(classname,course)
VALUES (classname,course);
SET id = last_insert_id();
ELSE
UPDATE class
SET
classname = classname,
course = course

WHERE id = id;
END IF;
SELECT id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `lectureaddoredit` (IN `id` INT(50), IN `class_id` VARCHAR(50), IN `time` TIME, IN `day` ENUM('Monday','Tuesday','Wednesday','Thursday','Friday'))  NO SQL
BEGIN
IF id = 0 THEN
INSERT INTO lecture(class_id,time,day)
VALUES (class_id,time,day);
SET id = last_insert_id();
ELSE
UPDATE lecture
SET
class_id = class_id,
time = time,
day = day

WHERE id = id;
END IF;


SELECT id AS  id;


END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `classname` varchar(50) NOT NULL,
  `course` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `classname`, `course`) VALUES
(2, 'HND 1 Computer Sciencess', 'Python Programming Language');

-- --------------------------------------------------------

--
-- Table structure for table `lecture`
--

CREATE TABLE `lecture` (
  `id` int(11) NOT NULL,
  `class_id` varchar(10) NOT NULL,
  `time` time NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lecture`
--

INSERT INTO `lecture` (`id`, `class_id`, `time`, `day`) VALUES
(1, '2', '12:41:09', 'Monday'),
(2, '2', '12:41:09', 'Tuesday'),
(3, '2', '12:41:09', 'Tuesday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lecture`
--
ALTER TABLE `lecture`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lecture`
--
ALTER TABLE `lecture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

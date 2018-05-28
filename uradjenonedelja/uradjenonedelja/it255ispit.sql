-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2017 at 08:37 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it255ispit`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategorija_proizvoda`
--

CREATE TABLE `kategorija_proizvoda` (
  `ID` int(11) NOT NULL,
  `IME` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategorija_proizvoda`
--

INSERT INTO `kategorija_proizvoda` (`ID`, `IME`) VALUES
(2, 'patike'),
(3, 'cipele');

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `ID` int(11) NOT NULL,
  `FIRSTNAME` varchar(128) NOT NULL,
  `LASTNAME` varchar(128) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(256) NOT NULL,
  `TOKEN` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`ID`, `FIRSTNAME`, `LASTNAME`, `USERNAME`, `PASSWORD`, `TOKEN`) VALUES
(1, 'admin', 'adminovic', 'admin', '0192023a7bbd73250516f069df18b500', '7f8c16c29e3545d6a91c9218ad8e29ac00b4cab9'),
(2, 'dusan', 'djokovic', 'user1', 'df5e8c760f430ff37c1384098bd7e806', '7c58af304802da4a1097f2ce931899d2e82d610b'),
(3, 'pera', 'peric', 'userpera', 'df5e8c760f430ff37c1384098bd7e806', '1ab39947824b77c5be8e807e92155664da2fa86a');

-- --------------------------------------------------------

--
-- Table structure for table `porudzbina`
--

CREATE TABLE `porudzbina` (
  `ID` int(11) NOT NULL,
  `KORISNICI_ID` int(11) DEFAULT NULL,
  `PROIZVOD_ID` int(11) DEFAULT NULL,
  `DATUM` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `porudzbina`
--

INSERT INTO `porudzbina` (`ID`, `KORISNICI_ID`, `PROIZVOD_ID`, `DATUM`) VALUES
(5, 1, 2, '0000-00-00 00:00:00'),
(6, 1, 2, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `proizvod`
--

CREATE TABLE `proizvod` (
  `ID` int(11) NOT NULL,
  `KATEGORIJA_PROIZVODA_ID` int(11) DEFAULT NULL,
  `IME` varchar(128) NOT NULL,
  `CENA` decimal(12,4) NOT NULL,
  `OPIS` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proizvod`
--

INSERT INTO `proizvod` (`ID`, `KATEGORIJA_PROIZVODA_ID`, `IME`, `CENA`, `OPIS`) VALUES
(2, 3, 'sandale', '500.0000', 'zenske');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategorija_proizvoda`
--
ALTER TABLE `kategorija_proizvoda`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `porudzbina`
--
ALTER TABLE `porudzbina`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_RELATIONSHIP_2` (`KORISNICI_ID`),
  ADD KEY `FK_RELATIONSHIP_3` (`PROIZVOD_ID`);

--
-- Indexes for table `proizvod`
--
ALTER TABLE `proizvod`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_RELATIONSHIP_1` (`KATEGORIJA_PROIZVODA_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategorija_proizvoda`
--
ALTER TABLE `kategorija_proizvoda`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `porudzbina`
--
ALTER TABLE `porudzbina`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `proizvod`
--
ALTER TABLE `proizvod`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `porudzbina`
--
ALTER TABLE `porudzbina`
  ADD CONSTRAINT `FK_RELATIONSHIP_2` FOREIGN KEY (`KORISNICI_ID`) REFERENCES `korisnici` (`ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_3` FOREIGN KEY (`PROIZVOD_ID`) REFERENCES `proizvod` (`ID`);

--
-- Constraints for table `proizvod`
--
ALTER TABLE `proizvod`
  ADD CONSTRAINT `FK_RELATIONSHIP_1` FOREIGN KEY (`KATEGORIJA_PROIZVODA_ID`) REFERENCES `kategorija_proizvoda` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

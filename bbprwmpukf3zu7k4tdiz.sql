-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bbprwmpukf3zu7k4tdiz-mysql.services.clever-cloud.com:3306
-- Generation Time: Feb 22, 2023 at 09:14 AM
-- Server version: 8.0.22-13
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bbprwmpukf3zu7k4tdiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `title`, `user_id`) VALUES
(1, 'Mitt #1 Album', 1),
(2, 'Mitt #2 Album', 1),
(3, '2 ALBUM BLUM Album', 2),
(4, '4th Album 3rd ID', 3),
(5, 'Mitt #2 Album', 3),
(6, 'Mitt #3 Album', 3);

-- --------------------------------------------------------

--
-- Table structure for table `photo`
--

CREATE TABLE `photo` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `user_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `photo`
--

INSERT INTO `photo` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(1, 'WEEEEEEEEEEEEEEEEEEE', 'https://images.undwadadawsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'waewadwawdawents', 1),
(2, 'wdat ad wadcadcasf wdadadawcda221122', 'https://images.undwadadawsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'waewadwawdawents', 1),
(3, 'WEEEEEEEEEEEEEEEEEEE', 'https://images.undwadadawsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'waewadwawdawents', 1),
(4, 'WEEEEEEEEEEEEEEEEEEE', 'https://images.undwadadawsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'waewadwawdawents', 1),
(5, '1213', 'hekpa.co', 'gawd', 3),
(6, 'WEEEEEEEEEEEEEEEEEEE', 'https://images.undwadadawsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'waewadwawdawents', 3),
(7, 'WEEEEEEEEEEEEEEEEEEE', 'https://images.undwadadawsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'waewadwawdawents', 3),
(8, 'AWDWADAW', 'h22magesund.wadadawspfe', 'awdwa', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(1, 'ickeskola@gmail.com', '$2b$10$G3alfOv/TnPajIHZQcvEIurxqGHUpzrNu8012.vg4mFIMw/Y1bk2m', 'Ludvig', 'Lundberg'),
(2, 'ickeskola2@gmail.com', '$2b$10$EzKWq8ALl3BGWfChetVMdeQmlDU2Z.FTn5oHJKkV3E3TIcvtDEdyO', 'Ludvig', 'Lundberg'),
(3, 'ickeskola3@gmail.com', '$2b$10$wNB3YeH6RMUHcBf2g2n1SuLGu91mpSWcvlelsREfVj0q4Ty0zEYyK', 'Ludvig', 'Lundberg'),
(4, 'l@gmail.com', '$2b$10$wiJ00kKWpzKPAPq4jfmX7.Txuj/Cm6XGdnOfNHW8TH4EiNuajvfPK', 'Lugg', 'Ligg'),
(5, 'example@email.com', '$2b$10$oj1rN0jJka9.EnT7bauSFefQkhFixZkU/NONKanSfREhziMx80uSC', 'first name', 'last name');

-- --------------------------------------------------------

--
-- Table structure for table `_albumTophoto`
--

CREATE TABLE `_albumTophoto` (
  `A` int UNSIGNED NOT NULL,
  `B` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_albumTophoto`
--

INSERT INTO `_albumTophoto` (`A`, `B`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(4, 5),
(4, 6),
(4, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `album_user_id_fkey` (`user_id`);

--
-- Indexes for table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photo_user_id_fkey` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_key` (`email`);

--
-- Indexes for table `_albumTophoto`
--
ALTER TABLE `_albumTophoto`
  ADD UNIQUE KEY `_albumTophoto_AB_unique` (`A`,`B`),
  ADD KEY `_albumTophoto_B_index` (`B`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `album_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `_albumTophoto`
--
ALTER TABLE `_albumTophoto`
  ADD CONSTRAINT `_albumTophoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_albumTophoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `photo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

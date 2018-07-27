-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июл 27 2018 г., 09:58
-- Версия сервера: 10.1.31-MariaDB
-- Версия PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `id5879446_camagru_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `comments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `img_id`, `comments`, `user`, `datetime`) VALUES
(1, 4, 'Hello', '6', '2018-07-04 11:08:49');

-- --------------------------------------------------------

--
-- Структура таблицы `like`
--

CREATE TABLE `like` (
  `img_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT '0',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `like`
--

INSERT INTO `like` (`img_id`, `quantity`, `user_id`) VALUES
(2, 0, 1),
(3, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `verifications` enum('true','false') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'false',
  `comment_mail` enum('true','false') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'true',
  `verifications_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `email`, `password`, `verifications`, `comment_mail`, `verifications_code`) VALUES
(1, 'How', 'gryshchenk@gmail.com', 'f69ddcc92c44eb5a6320e241183ef551d9287d7fa6e4b2c77459145d8dd0bb37', 'true', 'true', '0'),
(2, 'oksana', 'oksana@i.ua', '7d10823aa58f44844535bfd51ffebaa1e25222622307d9f673e6ba8b0e0670d7', 'true', 'true', '5b05109e9a82a'),
(3, 'Andy', 'vinzzz@ukr.net', 'a0aff5fe0be2f4dae7ba69790199942f601af5aca656bff268d13d5dd8b8857b', 'false', 'true', '5b0657eab16bf'),
(4, 'student', 'student@gmail.com', '6403f5b3c28361627f0d3138d9d3077c9330a101bb2e8d473b34cb4fbd43fd62', 'true', 'true', '5b2b54b3568f4'),
(5, 'guest_test', 'guest@gmail.com', '03587d3a7482ee565de65b99c0c0448f95b9253ad76c96ca5d0d198ad5e563a2', 'false', 'true', '5b2b5742647c6'),
(6, 'test', 'test@test.com', '176344d4b7feeec6e6cdc05ac78b35496367bb0620d2b24292dd7c26cda6e550', 'true', 'true', '5b2b669fb4b6f'),
(7, 'Igor', 'andrii.galavan@gmail.com', 'd91c7caea81a26f8340843a4aa6ffe1482921ab38e67c6a1668573abe337c4fb', 'true', 'true', '0');

-- --------------------------------------------------------

--
-- Структура таблицы `user_img`
--

CREATE TABLE `user_img` (
  `img_id` int(11) NOT NULL,
  `src` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `user_img`
--

INSERT INTO `user_img` (`img_id`, `src`, `user_id`) VALUES
(1, '1.png', '1'),
(2, '2.png', '1'),
(3, '3.png', '1'),
(4, '4.png', '4'),
(5, '5.png', '4'),
(6, '6.png', '4'),
(7, '7.png', '4'),
(8, '8.png', '4'),
(9, '9.png', '4'),
(10, '10.png', '4'),
(11, '11.png', '4'),
(12, '12.png', '4'),
(13, '13.png', '4'),
(14, '14.png', '4'),
(15, '15.png', '4'),
(16, '16.png', '4'),
(17, '17.png', '4'),
(18, '18.png', '1'),
(19, '19.png', '1'),
(20, '20.png', '6'),
(22, '21.png', '6');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_img`
--
ALTER TABLE `user_img`
  ADD PRIMARY KEY (`img_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `user_img`
--
ALTER TABLE `user_img`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

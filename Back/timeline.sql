-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 24 mai 2023 à 21:18
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `timeline`
--

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

CREATE TABLE `evenements` (
  `idEvenement` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `idImage` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `imagePrincipal` tinyint(4) NOT NULL,
  `idEvenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `periodes`
--

CREATE TABLE `periodes` (
  `idPeriode` int(11) NOT NULL,
  `noms` varchar(255) NOT NULL,
  `debutPeriode` int(11) NOT NULL,
  `finPeriode` int(11) NOT NULL,
  `audio` varchar(255) NOT NULL,
  `color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `periodes`
--

INSERT INTO `periodes` (`idPeriode`, `noms`, `debutPeriode`, `finPeriode`, `audio`, `color`) VALUES
(1, 'siécle des lumiéres', 1715, 1789, '', '#b38c52');

-- --------------------------------------------------------

--
-- Structure de la table `periode_evenement`
--

CREATE TABLE `periode_evenement` (
  `idEvenement` int(11) NOT NULL,
  `idPeriode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE `question` (
  `idQuestion` int(11) NOT NULL,
  `intitule` varchar(255) NOT NULL,
  `idQuizz` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `quizz`
--

CREATE TABLE `quizz` (
  `idQuizz` int(11) NOT NULL,
  `timer` int(11) NOT NULL,
  `idPeriode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reponses`
--

CREATE TABLE `reponses` (
  `idReponse` int(11) NOT NULL,
  `reponse` varchar(255) NOT NULL,
  `estCorrect` tinyint(4) NOT NULL,
  `idQuestion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `textcomponent`
--

CREATE TABLE `textcomponent` (
  `idText` int(11) NOT NULL,
  `content` text NOT NULL,
  `orderValue` int(11) NOT NULL,
  `idEvenement` int(11) NOT NULL,
  `idPeriode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `videos`
--

CREATE TABLE `videos` (
  `idVideo` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `idEvenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD PRIMARY KEY (`idEvenement`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`idImage`),
  ADD KEY `images_evenements_FK` (`idEvenement`);

--
-- Index pour la table `periodes`
--
ALTER TABLE `periodes`
  ADD PRIMARY KEY (`idPeriode`);

--
-- Index pour la table `periode_evenement`
--
ALTER TABLE `periode_evenement`
  ADD PRIMARY KEY (`idEvenement`,`idPeriode`),
  ADD KEY `periode_evenement_periodes0_FK` (`idPeriode`);

--
-- Index pour la table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`idQuestion`),
  ADD KEY `question_quizz_FK` (`idQuizz`);

--
-- Index pour la table `quizz`
--
ALTER TABLE `quizz`
  ADD PRIMARY KEY (`idQuizz`),
  ADD KEY `quizz_periodes_FK` (`idPeriode`);

--
-- Index pour la table `reponses`
--
ALTER TABLE `reponses`
  ADD PRIMARY KEY (`idReponse`),
  ADD KEY `reponses_question_FK` (`idQuestion`);

--
-- Index pour la table `textcomponent`
--
ALTER TABLE `textcomponent`
  ADD PRIMARY KEY (`idText`),
  ADD KEY `textComponent_evenements_FK` (`idEvenement`),
  ADD KEY `textComponent_periodes0_FK` (`idPeriode`);

--
-- Index pour la table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`idVideo`),
  ADD KEY `videos_evenements_FK` (`idEvenement`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `evenements`
--
ALTER TABLE `evenements`
  MODIFY `idEvenement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `idImage` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `periodes`
--
ALTER TABLE `periodes`
  MODIFY `idPeriode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `question`
--
ALTER TABLE `question`
  MODIFY `idQuestion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `quizz`
--
ALTER TABLE `quizz`
  MODIFY `idQuizz` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reponses`
--
ALTER TABLE `reponses`
  MODIFY `idReponse` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `textcomponent`
--
ALTER TABLE `textcomponent`
  MODIFY `idText` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `videos`
--
ALTER TABLE `videos`
  MODIFY `idVideo` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_evenements_FK` FOREIGN KEY (`idEvenement`) REFERENCES `evenements` (`idEvenement`);

--
-- Contraintes pour la table `periode_evenement`
--
ALTER TABLE `periode_evenement`
  ADD CONSTRAINT `periode_evenement_evenements_FK` FOREIGN KEY (`idEvenement`) REFERENCES `evenements` (`idEvenement`),
  ADD CONSTRAINT `periode_evenement_periodes0_FK` FOREIGN KEY (`idPeriode`) REFERENCES `periodes` (`idPeriode`);

--
-- Contraintes pour la table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_quizz_FK` FOREIGN KEY (`idQuizz`) REFERENCES `quizz` (`idQuizz`);

--
-- Contraintes pour la table `quizz`
--
ALTER TABLE `quizz`
  ADD CONSTRAINT `quizz_periodes_FK` FOREIGN KEY (`idPeriode`) REFERENCES `periodes` (`idPeriode`);

--
-- Contraintes pour la table `reponses`
--
ALTER TABLE `reponses`
  ADD CONSTRAINT `reponses_question_FK` FOREIGN KEY (`idQuestion`) REFERENCES `question` (`idQuestion`);

--
-- Contraintes pour la table `textcomponent`
--
ALTER TABLE `textcomponent`
  ADD CONSTRAINT `textComponent_evenements_FK` FOREIGN KEY (`idEvenement`) REFERENCES `evenements` (`idEvenement`),
  ADD CONSTRAINT `textComponent_periodes0_FK` FOREIGN KEY (`idPeriode`) REFERENCES `periodes` (`idPeriode`);

--
-- Contraintes pour la table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_evenements_FK` FOREIGN KEY (`idEvenement`) REFERENCES `evenements` (`idEvenement`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

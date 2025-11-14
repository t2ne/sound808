CREATE DATABASE musicapi;

USE musicapi;

CREATE TABLE artistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    nacionalidade VARCHAR(255) NOT NULL
);

CREATE TABLE generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE albuns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    id_genero INT NOT NULL,
    id_artista INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES generos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_artista) REFERENCES artistas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE musicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tempo FLOAT NOT NULL,
    id_album INT NOT NULL,
    FOREIGN KEY (id_album) REFERENCES albuns(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO artistas (nome, idade, nacionalidade) VALUES ('ArtistaTeste1', 20, 'Portugal');

INSERT INTO generos (nome) VALUES ('GéneroTeste1');

INSERT INTO musicas (nome, tempo, id_album) VALUES ('MúsicaTeste1', 1.0, 1);

INSERT INTO albuns (nome, data, id_genero, id_artista) VALUES ('ÁlbumTeste1', 2024-12-31, 1, 1);
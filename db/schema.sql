CREATE DATABASE simple_db;
USE simple_db;

CREATE TABLE users
(
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  usertype varchar(1) NOT NULL,
  PRIMARY KEY (id)
);


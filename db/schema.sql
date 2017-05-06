USE dt12issfv05mzmvu;

CREATE TABLE users
(
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  usertype varchar(1) NOT NULL,
  PRIMARY KEY (id)
);



ALTER TABLE books
ADD google_id varchar(255),
ADD pages int;


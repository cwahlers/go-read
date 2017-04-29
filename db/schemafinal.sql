CREATE DATABASE read_db;
USE read_db;

/*users*/
CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(60) NOT NULL,
  password_hash varchar(255) NOT NULL,
  facebook_id varchar(255),
	first_name varchar(40) NOT NULL,
	last_name varchar(40) NOT NULL,
  type varchar(1) NOT NULL,
  -- S-student, T-teacher, P-parent
	PRIMARY KEY (id)
);

/*books*/
CREATE TABLE books
(
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  author varchar(80) NOT NULL,
  genre varchar(100),
  isbn varchar (100),
  PRIMARY KEY (id)
);

/*logs*/
CREATE TABLE logs
(
	user_id int NOT NULL,
  book_id int NOT NULL,
  created date NOT NULL,
  time_lapsed dec(6,2),
  PRIMARY KEY (user_id, book_id, created),
	FOREIGN KEY (user_id) references users(id),
  FOREIGN KEY (book_id) references books(id)
);

/*users_books*/
CREATE TABLE user_books
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	book_id int NOT NULL,
  started date,
  current_page int,
  completed date,
	PRIMARY KEY (id, book_id),
	FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (book_id) references books(id)
);

/*classes*/
CREATE TABLE classes
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	teacher_id int NOT NULL,
	grade varchar(2) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (teacher_id) references users(id)
);

/*class_students*/
CREATE TABLE class_students
(
  class_id int NOT NULL,
  student_id int NOT NULL,
  PRIMARY KEY (class_id, student_id),
  FOREIGN KEY (class_id) references classes(id),
  FOREIGN KEY (student_id) references users(id)
);


/*parent_students*/
CREATE TABLE parent_students
(
  parent_id int NOT NULL,
  student_id int NOT NULL,
  FOREIGN KEY (parent_id) references users(id),
  FOREIGN KEY (student_id) references users(id),
  PRIMARY KEY (parent_id, student_id)
);

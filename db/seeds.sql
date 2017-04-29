
-- Add users
INSERT INTO users (email, password_hash, first_name, last_name, type) VALUES ("wahlers1@gmail.com", "password", "Chris", "Wahlers", "P");
INSERT INTO users (email, password_hash, first_name, last_name, type) VALUES ("kwahlers@gmail.com", "password", "Kyle", "Wahlers", "S");
INSERT INTO users (email, password_hash, first_name, last_name, type) VALUES ("cwahlers51@gmail.com", "password", "Cole", "Wahlers", "S");
INSERT INTO users (email, password_hash, first_name, last_name, type) VALUES ("cwahlers29@gmail.com", "password", "Carson", "Wahlers", "S");
INSERT INTO users (email, password_hash, first_name, last_name, type) VALUES ("cwahlers13@gmail.com", "password", "Carter", "Wahlers", "S");
INSERT INTO users (email, password_hash, first_name, last_name, type) VALUES ("chrobot@gmail.com", "password", "M", "Chrobot", "T");
INSERT INTO users (email, password_hash, first_name, last_name, type) VALUES ("fischer@gmail.com", "password", "C", "Fischer", "T");
INSERT INTO users (email, password_hash, first_name, last_name, type) VALUES ("massa@gmail.com", "password", "L", "Massa", "T");

-- Add books
INSERT INTO books (title, author, genre, isbn) VALUES ("My Life as a Gamer", "Janet Tashjian","Childrens", "978-0-8050-9851-8" );
INSERT INTO books (title, author, genre, isbn) VALUES ("Middle School the Worst year of my life", "James Paterson", "Childrens", "978-0-316-10169-1");
INSERT INTO books (title, author, genre, isbn) VALUES ("Babe Ruth", "Matt Christopher","Biography", "0-316-01113-4");
INSERT INTO books (title, author, genre, isbn) VALUES ("Goosebumps Most Wanted", " R.L. Stine", "Childrens", "978-0-545-62776-4");
INSERT INTO books (title, author, genre, isbn) VALUES ("Who was Albert Einstein", "Jess Brallier","Biography","0-448-42496-7");
INSERT INTO books (title, author, genre, isbn) VALUES ("Goosebumps Night of the Living Dummy", "R.L. Stine", "Childrens","978-0-545-03517-0");
INSERT INTO books (title, author, genre, isbn) VALUES ("Alvin Ho", "Lenore Look", "Childrens", "978-0-385-38600-5");
INSERT INTO books (title, author, genre, isbn) VALUES ("Captaion Unserpants and the big, bad battle of the bionic booger boy","Dav Pilkey", "Childrens","0-439-37610-6");
INSERT INTO books (title, author, genre, isbn) VALUES ("NO Talking", "Andrew Clements", "Childrens", "978-1-4169-0984-2");
INSERT INTO books (title, author, genre, isbn) VALUES ("Amulet, Escape from Lucien", "Kazu Kibuishi", "Childrens", "978-0-545-43315-0");
INSERT INTO books (title, author, genre, isbn) VALUES ("Amulet, Firelight", "Kazu Kibuishi", "Childrens", "978-0-545-43316-7");
INSERT INTO books (title, author, genre, isbn) VALUES ("Wayne Gretzky", "Matt Doeden", "Biography", "978-0-7607-9170-7");

  -- Add classes
INSERT INTO classes (name, teacher_id, grade) VALUES ("Mrs. Chrobot's Fifth Grade", 6, "5");
INSERT INTO classes (name, teacher_id, grade) VALUES ("Mrs. Fischer's Fifth Grade", 7, "5");
INSERT INTO classes (name, teacher_id, grade) VALUES ("Mrs. Massa's Fifth Grade", 8, "5");


-- Assign students to class
INSERT INTO class_students (class_id, student_id) VALUES (1,5);
INSERT INTO class_students (class_id, student_id) VALUES (1,3);
INSERT INTO class_students (class_id, student_id) VALUES (1,2);

-- Assign students to parent
INSERT INTO parent_students (parent_id, student_id) VALUES (1, 2);
INSERT INTO parent_students (parent_id, student_id) VALUES (1, 3);
INSERT INTO parent_students (parent_id, student_id) VALUES (1, 4);
INSERT INTO parent_students (parent_id, student_id) VALUES (1, 5);

-- Assign books to student
INSERT INTO user_books (user_id, book_id) VALUES (5, 1);
INSERT INTO user_books (user_id, book_id) VALUES (5, 2);
INSERT INTO user_books (user_id, book_id) VALUES (5, 3);
INSERT INTO user_books (user_id, book_id) VALUES (5, 4);
INSERT INTO user_books (user_id, book_id) VALUES (5, 5);
INSERT INTO user_books (user_id, book_id) VALUES (3, 3);
INSERT INTO user_books (user_id, book_id) VALUES (3, 5);
INSERT INTO user_books (user_id, book_id) VALUES (2, 8);
INSERT INTO user_books (user_id, book_id) VALUES (2, 12);

-- Add reading log
INSERT INTO logs (user_id, book_id, created, time_lapsed) VALUES (5,1, "2017-01-12", 1.2);
INSERT INTO logs (user_id, book_id, created, time_lapsed) VALUES (5,1, "2017-01-13", 0.5);
INSERT INTO logs (user_id, book_id, created, time_lapsed) VALUES (5,1, "2017-01-14", 0.2);
INSERT INTO logs (user_id, book_id, created, time_lapsed) VALUES (5,1, "2017-01-15", 0.75);
INSERT INTO logs (user_id, book_id, created, time_lapsed) VALUES (5,2, "2017-02-01", 0.5);
INSERT INTO logs (user_id, book_id, created, time_lapsed) VALUES (5,2, "2017-02-03", 1.0);

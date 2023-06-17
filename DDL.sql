DROP TABLE IF EXISTS Student_Class;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS Instructor;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Student;

CREATE TABLE Department (
    department_id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE Student (
    student_id int NOT NULL AUTO_INCREMENT,
    f_name VARCHAR(45) NOT NULL,
    l_name VARCHAR(45) NOT NULL,
    major VARCHAR(45) NOT NULL,
    credits_remaining int NOT NULL,
    gpa FLOAT NOT NULL,
    PRIMARY KEY (student_id)
);

CREATE TABLE Instructor (
    instructor_id int NOT NULL AUTO_INCREMENT,
    f_name VARCHAR(45) NOT NULL,
    l_name VARCHAR(45) NOT NULL,
    department_id int NOT NULL,
    PRIMARY KEY (instructor_id),
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

CREATE TABLE Class (
    class_id int NOT NULL AUTO_INCREMENT,
    department_id int NOT NULL,
    instructor_id int NOT NULL,
    credits int NOT NULL,
    PRIMARY KEY (class_id),
    FOREIGN KEY (department_id) REFERENCES Department(department_id),
    FOREIGN KEY (instructor_id) REFERENCES Instructor(instructor_id)
);

CREATE TABLE Student_Class (
    student_id int NOT NULL,
    class_id int NOT NULL,
    registered int NOT NULL,
    grade VARCHAR(1),
    received_credit int NOT NULL,
    PRIMARY KEY (student_id, class_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (class_id) REFERENCES Class(class_id)
);

INSERT INTO Department (name)
VALUES ('CS'),
('EE'),
('ENG');

INSERT INTO Student (f_name, l_name, major, credits_remaining, gpa)
VALUES ('Jamie', 'Lannister', 'CS', 100, 1.21),
('Brandon', 'Stark', 'CS', 44, 3.86),
('Jon', 'Snow', 'EE', 60, 4.00),
('Tyrion', 'Lannister', 'ENG', 84, 2.79),
('Arya', 'Stark', 'CS', 12, 3.84);

INSERT INTO Instructor (f_name, l_name, department_id)
VALUES ('Aragorn', 'Elessar', (SELECT department_id FROM Department WHERE name = 'CS')),
('Bilbo', 'Baggins', (SELECT department_id FROM Department WHERE name = 'CS')),
('Frodo', 'Baggins', (SELECT department_id FROM Department WHERE name = 'EE')),
('Pippin', 'Took', (SELECT department_id FROM Department WHERE name = 'EE')),
('Samwise', 'Gamgee', (SELECT department_id FROM Department WHERE name = 'ENG'));

INSERT INTO Class (department_id, instructor_id, credits)
VALUES ((SELECT department_id FROM Department WHERE name = 'CS'), (SELECT instructor_id FROM Instructor WHERE f_name = 'Aragorn' AND l_name = 'Elessar'), 4),
((SELECT department_id FROM Department WHERE name = 'CS'), (SELECT instructor_id FROM Instructor WHERE f_name = 'Bilbo' AND l_name = 'Baggins'), 4),
((SELECT department_id FROM Department WHERE name = 'EE'), (SELECT instructor_id FROM Instructor WHERE f_name = 'Frodo' AND l_name = 'Baggins'), 3),
((SELECT department_id FROM Department WHERE name = 'EE'), (SELECT instructor_id FROM Instructor WHERE f_name = 'Pippin' AND l_name = 'Took'), 4),
((SELECT department_id FROM Department WHERE name = 'ENG'), (SELECT instructor_id FROM Instructor WHERE f_name = 'Samwise' AND l_name = 'Gamgee'), 3);

INSERT INTO Student_Class (student_id, class_id, registered, grade, received_credit)
VALUES ((SELECT student_id FROM Student WHERE f_name = 'Jamie' AND l_name = 'Lannister'), (SELECT class_id FROM Class WHERE class_id = 1), 1, NULL, 0),
((SELECT student_id FROM Student WHERE f_name = 'Brandon' AND l_name = 'Stark'), (SELECT class_id FROM Class WHERE class_id = 2), 1, NULL, 0),
((SELECT student_id FROM Student WHERE f_name = 'Jon' AND l_name = 'Snow'), (SELECT class_id FROM Class WHERE class_id = 3), 1, NULL, 0),
((SELECT student_id FROM Student WHERE f_name = 'Tyrion' AND l_name = 'Lannister'), (SELECT class_id FROM Class WHERE class_id = 4), 1, NULL, 0),
((SELECT student_id FROM Student WHERE f_name = 'Arya' AND l_name = 'Stark'), (SELECT class_id FROM Class WHERE class_id = 5), 1, NULL, 0);

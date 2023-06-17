-- The following are for the student page
-- query to add a student to the database
INSERT INTO Student (f_name, l_name, major, credits_remaining, gpa)
VALUES(:f_name_input, :l_name_input, :major_input, :credits_remaining_input, gpa_input)

-- get a single students data for the update student form
SELECT f_name, l_name, major, credits_remaining, gpa FROM Student WHERE
student_id = :student_id_dropdown

-- update the student
UPDATE Student SET f_name = :f_name_input, l_name= :l_name_input, major = :major_input, credits_remaining= :credits_remaining_input, gpa = :gpa_input WHERE
student_id= :student_id_dropdown

-- delete a student
DELETE FROM Student WHERE student_id = :student_id_dropdown

-- Get the student table for display in the html Table
SELECT * FROM Student


-- The following are for the instructor page
-- add an instructor to the database
INSERT INTO Instructor (f_name, l_name, department_id)
VALUES(:f_name_input, :l_name_input, :department_id_dropdown)

-- get a single instructor for the update instructor form
SELECT f_name, l_name, department_id FROM Instructor WHERE
instructor_id = :instructor_id_dropdown

-- Update an instructor
UPDATE Instructor SET f_name = :f_name_input, l_name = :l_name_input, department_id = :department_id_dropdown WHERE
instructor_id= :instructor_id_dropdown

-- delete an instructor
DELETE FROM Instructor WHERE instructor_id = :instructor_id_dropdown

-- Get the intructor table for display in the html Table
SELECT * FROM Instructor


-- add a department to the database
INSERT INTO Department (name)
VALUES(:name_input)

-- get a single department for the update department form
SELECT `name`, department_id FROM Department WHERE
department_id = :department_id_dropdown

-- Update a department
UPDATE Department SET `name` = :name_input WHERE
department_id= :department_id_dropdown

-- delete a department
DELETE FROM Department WHERE department_id = :department_id_dropdown

-- Get the Department table for display in the html Table
SELECT * FROM Department


-- add a class to the database
INSERT INTO Class (class_department, instructor_id, credits)
VALUES(class_department = :class_department_dropdown, instructor_id = :instructor_id_dropdown, credits = :credits_input)

-- get a single class for the update department form
SELECT class_id, class_department, instructor_id, credits FROM Class WHERE
class_id = :class_id_dropdown

-- Update a department
UPDATE Class SET class_department = :class_department_dropdown, instructor_id = :instructor_id_dropdown, credits = :credits_input WHERE
class_id= :class_id_dropdown

-- delete a class
DELETE FROM Class WHERE class_id = :class_id_dropdown

-- Get the student table for display in the html Table
SELECT * FROM Class


-- The following are for the class registration page
-- Register a student for a class
INSERT INTO Student_Class (student_id, class_id, registered, grade, recieved_credit)
VALUES(:student_id_dropdown, :class_id_dropdown, :registered_input, :grade_input, :recieved_credit_input)

-- get a single registration for the update registration form
SELECT student_id, class_id, registered, grade, recieved_credit FROM Student_Class WHERE
student_id = :student_id_dropdown, class_id = :class_id_dropdown

-- Update a registration
UPDATE Student_CLass SET registered = :registered_input, grade = :grade_input, recieved_credit = :recieved_credit_input WHERE
student_id = :student_id_dropdown, class_id = :class_id_dropdown

-- delete a registration
DELETE FROM Student_CLass WHERE student_id = :student_id_dropdown, class_id = :class_id_dropdown

-- Get the student_Class table for display in the html Table
SELECT * FROM Student_Class


-- Instructor_Department table
SELECT instructor_id, department_id 
FROM Instructor NATURAL JOIN Department

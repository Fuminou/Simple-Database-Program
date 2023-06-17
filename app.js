/*
    SETUP
*/
// MySQL
var db = require('./db-connector')

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9122;                 // Set a port number at the top so it's easy to change in the future
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters an *.hbs file.

// Make public directory (CSS, etc,.) available to client (user's browser)
app.use(express.static('public'));


/*
    ROUTES
*/
app.get('/', function(req, res) {
    // Define the SQL queries needed to populate data on the page
    let get_students = `SELECT student_id, f_name, l_name, major, credits_remaining, gpa FROM Student;`;
          
    db.pool.query(get_students, function(error, students_rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.render('students', { students: students_rows });
        }
    });
});

app.get('/studentClass', function(req, res) {
    // Define the SQL query needed to populate data on the page
    let get_students = `SELECT student_id, class_id, registered, grade, received_credit FROM Student_Class`;

    db.pool.query(get_students, function(error, students_rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.render('student_class', { students: students_rows });
        }
    });
});

app.get('/departments', function(req, res) {
    // Define the SQL query needed to populate data on the page
    let get_departments = `SELECT department_id, name FROM Department;`;
          
    db.pool.query(get_departments, function(error, departments_rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.render('departments', { departments: departments_rows });
        }
    });
});

app.get('/instructors', function(req, res) {
    // Define the SQL query needed to populate data on the page
    let get_instructors = `SELECT instructor_id, f_name, l_name, department_id FROM Instructor`;

    db.pool.query(get_instructors, function(error, instructors_rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.render('instructors', { instructors: instructors_rows });
        }
    });
});

// Called when user adds a new student
app.post('/add_new_student', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let form_input = req.body;

    // Create the query and run it on the database to insert a new student
    let insert_student = `INSERT INTO Student (f_name, l_name, major, credits_remaining, gpa) 
                          VALUES (?, ?, ?, ?, ?)`;
    let parameters = [
        form_input['input-first_name'],
        form_input['input-last_name'],
        form_input['input-major'],
        form_input['input-credits-remaining'],
        form_input['input-gpa']
    ];

    db.pool.query(insert_student, parameters, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            // After the insertion, retrieve the updated list of students from the database
            let get_students = `SELECT student_id, f_name, l_name, major, credits_remaining, gpa FROM Student`;
            db.pool.query(get_students, function(error, students_rows) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500); // Send HTTP response 500 for internal server error
                } else {
                    res.render('students', { students: students_rows });
                }
            });
        }
    });
});


// Called when user deletes a student
app.post('/delete_student', function(req, res) {
    let studentId = req.body.student_id; // Get the student ID from the request body
  
    // Create the delete queries and run them on the database
    let deleteStudent = 'DELETE FROM Student WHERE student_id = ?';
    let deleteFromClass = 'DELETE FROM Student_Class WHERE student_id = ?';
    let parameters = [studentId];
  
    db.pool.query(deleteFromClass, parameters, function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500); // Send HTTP response 500 for internal server error
      } else {
        db.pool.query(deleteStudent, parameters, function(error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
          } else {
            res.redirect('/'); // Redirect back to the root route after deleting the student
          }
        });
      }
    });
  });
  

// Called when user updates a student
app.post('/update_student', function(req, res) {
    let studentId = req.body.student_id; // Get the student ID from the request body

    // Create the delete query and run it on the database
    let updateStudent = 'UPDATE Student SET f_name = ?, l_name = ?, major = ?, credits_remaining = ?, gpa = ? WHERE student_id = ?';
    let parameters = [
      req.body['input-update_f_name'],
      req.body['input-update_l_name'],
      req.body['input-update_major'],
      req.body['input-update_credits-remaining'],
      req.body['input-update_gpa'],
      studentId
    ];

    db.pool.query(updateStudent, parameters, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.redirect('/'); // Redirect back to the root route after deleting the student
        }
    });
});

// Called when user adds a new instructor
app.post('/add_new_instructor', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let form_input = req.body;

    // Create the query and run it on the database to insert a new instructor
    let insert_instructors = `INSERT INTO Instructor (f_name, l_name, department_id) 
                          VALUES (?, ?, ?)`;
    let parameters = [
        form_input['input-instructor_f_name'],
        form_input['input-instructor_l_name'],
        form_input['input-instructor_department_id']
    ];

    db.pool.query(insert_instructors, parameters, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            // After the insertion, retrieve the updated list of instructors from the database
            let get_instructors = `SELECT instructor_id, f_name, l_name, department_id FROM Instructor`;
            db.pool.query(get_instructors, parameters, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500); // Send HTTP response 500 for internal server error
                } else {
                    res.redirect('/instructors'); // Redirect back to the root route after deleting the student
                }
            });
        }
    });
});

// Called when user deletes an instructor
app.post('/delete_instructor', function(req, res) {
    let instructorId = req.body.instructor_id; // Get the instructor ID from the request body
  
    // Create the delete query and run it on the database
    let deleteInstructor = 'DELETE FROM Instructor WHERE instructor_id = ?';
    let parameters = [instructorId];
  
    db.pool.query(deleteInstructor, parameters, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.redirect('/instructors'); // Redirect back to the root route after deleting the student
        }
    });
  });

// Called when user updates a student
app.post('/update_instructor', function(req, res) {
    let instructorId = req.body.instructor_id; // Get the student ID from the request body

    // Create the delete query and run it on the database
    let updateInstructor = 'UPDATE Instructor SET f_name = ?, l_name = ?, department_id = ? WHERE instructor_id = ?';
    let parameters = [
      req.body['input-update_instructor_f_name'],
      req.body['input-update_instructor_l_name'],
      req.body['input-update_instructor_department_id'],
      instructorId
    ];

    db.pool.query(updateInstructor, parameters, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.redirect('/instructors'); // Redirect back to the root route after deleting the student
        }
    });
});

// ROUTES FOR DEPARTMENTS
app.get('/departments', function(req, res) {
    // Define the SQL queries needed to populate data on the page
    let get_departments = `SELECT department_id, name FROM Department;`;
          
    db.pool.query(get_departments, function(error, departments_rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.render('departments', { departments: departments_rows });
        }
    });
});

// Called when user adds a new instructor
app.post('/add_new_department', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let form_input = req.body;

    // Create the query and run it on the database to insert a new instructor
    let insert_department = `INSERT INTO Department (name) 
                          VALUES (?)`;
    let parameters = [
        form_input['input-department_name']
    ];

    db.pool.query(insert_department, parameters, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            // After the insertion, retrieve the updated list of instructors from the database
            let get_departments = `SELECT department_id, name FROM Department`;
            db.pool.query(get_departments, function(error, departments_rows) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500); // Send HTTP response 500 for internal server error
                } else {
                    res.render('departments', { departments: departments_rows });
                }
            });
        }
    });
});

// Called when user deletes an instructor
app.post('/delete_department', function(req, res) {
    let departmentId = req.body.department_id; // Get the department ID from the request body
  
    // Create the delete query and run it on the database
    let deleteDepartment = 'DELETE FROM Department WHERE department_id = ?';
    let parameters = [departmentId];
  
    db.pool.query(deleteDepartment, parameters, function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500); // Send HTTP response 500 for internal server error
      } else {
        res.redirect('/departments'); // Redirect back to the root route after deleting the department
      }
    });
  });

// Called when user updates a student
app.post('/update_department', function(req, res) {
    let departmentId = req.body.department_id; // Get the student ID from the request body

    // Create the delete query and run it on the database
    let updateDepartment = 'UPDATE Department SET name = ? WHERE department_id = ?';
    let parameters = [
      req.body['input-update_department_name'],
      departmentId
    ];

    db.pool.query(updateDepartment, parameters, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.redirect('/departments'); // Redirect back to the root route after deleting the student
        }
    });
});

// Called when user adds a new student
app.post('/add_new_student_registration', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let form_input = req.body;

    // Create the query and run it on the database to insert a new student
    let insert_student = `INSERT INTO Student_Class (student_id, class_id, registered, grade, received_credit) 
                          VALUES (?, ?, ?, ?, ?)`;
    let parameters = [
        form_input['input-student-id'],
        form_input['input-class-id'],
        form_input['input-registered'],
        form_input['input-grade'],
        form_input['input-received-credit']
    ];

    db.pool.query(insert_student, parameters, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            // After the insertion, retrieve the updated list of students from the database
            let get_students = `SELECT student_id, class_id, registered, grade, received_credit FROM Student_Class`;
            db.pool.query(get_students, function(error, students_rows) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500); // Send HTTP response 500 for internal server error
                } else {
                    res.render('student_class', { students: students_rows });
                }
            });
        }
    });
});

// Called when user updates a student
app.post('/update_student_registration', function(req, res) {
    let studentId = req.body.student_id; // Get the student ID from the request body

    // Create the delete query and run it on the database
    let updateStudent = 'UPDATE Student_Class SET student_id = ?, class_id = ?, registered = ?, grade = ?, received_credit = ? WHERE student_id = ?';
    let parameters = [
      studentId,
      req.body['input-class-id'],
      req.body['input-registered'],
      req.body['input-grade'],
      req.body['input-received-credit'],
      studentId
    ];

    db.pool.query(updateStudent, parameters, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Send HTTP response 500 for internal server error
        } else {
            res.redirect('/studentClass'); // Redirect back to the root route after updating the student
        }
    });
});

// Called when user deletes a student
app.post('/delete_student_registration', function(req, res) {
    let studentId = req.body.student_id; // Get the student ID from the request body
  
    // Create the delete query and run it on the database
    let deleteStudent = 'DELETE FROM Student_Class WHERE student_id = ?';
    let parameters = [studentId];
  
    db.pool.query(deleteStudent, parameters, function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500); // Send HTTP response 500 for internal server error
      } else {
        res.redirect('/studentClass'); // Redirect back to the root route after deleting the student
      }
    });
  });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
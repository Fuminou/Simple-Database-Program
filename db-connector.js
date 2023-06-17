// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_chongjoo',
    password        : '6826',
    database        : 'cs340_chongjoo',
    multipleStatements: true // Useful for submitting many queries in one request; But note--this can open the door for SQL injections!
})

// Export it for use in our applicaiton
module.exports.pool = pool;
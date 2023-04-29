const mysql = require('mysql2');


// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employees_db'
  }
);
connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to the employees_db database.`);
});

module.exports = connection;

// Requirements
const mysql = require('mysql2');
const db = require('./db/connection.js');


let dataResults = '';

// Functions to fetch from database
function getFromDB(callback) {
  const query = 'SELECT * FROM employee';
  db.query(query, callback);
};

function handleQueryResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    dataResults = results;
    console.table(dataResults);
  }
};

// Run function to get data
// getFromDB(handleQueryResults);

module.export = dataResults;
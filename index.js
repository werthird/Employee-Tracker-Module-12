// Requirements
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connectToDB.js');
const questions = require('./utils/questions.js');
const fetchDB = require('./fetchDB.js');
// const cTable = require('console.table');

// ====================================================================================

// Function to initialize app
function init() {
  inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(answers);

    // Define request from user
    let query;

    // Write db query based off user request
    switch (answers.request) {
      case 'View All Employees':
        query = 'SELECT * FROM employee';
        break;
      case 'View All Roles':
        query = 'SELECT * FROM role';
        break;
      case 'View All Roles':
        query = 'SELECT * FROM role';
        break;
      case 'View All Departments':
        query = 'SELECT * FROM department';
        break;
      }; 
      fetchDB(query).then((data) => {
        console.log(`\n${cTable.getTable(data)}\n`);
      });
  });
};

// Function call to initialize app
init();
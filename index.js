// Requirements
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connectToDB.js');
const { initialQues, newEmpQues } = require('./utils/questions.js');
const fetchDB = require('./fetchDB.js');
const process = require('node:process');

// ====================================================================================

// Function to initialize app
async function init() {
  const answers = await inquirer.prompt(initialQues);

  // Define request from user
  let query;

  // Write db query based on user request
  switch (answers.request) {
    case 'VIEW_EMPLOYEES':
      query = 'SELECT * FROM employee';
      break;
    case 'ADD_EMPLOYEE':
      query = await newEmpData();
      break;
    case 'UPDATE_EMPLOYEE_ROLE':
      query = 'SELECT * FROM employee';
      break;
    case 'VIEW_ROLES':
      query = 'SELECT * FROM role';
      break;
    case 'VIEW_DEPARTMENTS':
      query = 'SELECT * FROM department';
      break;
    case 'ADD_DEPARTMENT':
      query = 'SELECT * FROM employee';
      break;
    case 'QUIT':
      process.exit();
    }; 

    // Send query string to fetchDB function then print to console
    fetchDB(query).then((data) => {
      console.log(`\n${cTable.getTable(data)}\n`);
      init();
    });
};

// Function call to initialize app
init();

// Asks questions about new employee
async function newEmpData() {
  const empAnswers = await inquirer.prompt(newEmpQues);
  const { first_name, last_name, role_id, manager_id } = empAnswers;
  let queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
  return queryString;
};

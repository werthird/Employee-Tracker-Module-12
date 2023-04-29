// Requirements
const inquirer = require('inquirer');
const db = require('./db/connection.js');
const questions = require('./utils/questions.js');
const fetchDB = require('./fetchDB.js');

// ====================================================================================

// Grab the info from the database





// Function to initialize app
function init() {
  inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(answers);
    // console.log(dataResults);
  })
}


// Function call to initialize app
init();
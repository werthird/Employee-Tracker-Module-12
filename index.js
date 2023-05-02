// REQUIREMENTS
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const cTable = require('console.table');
const db = require('./db/connectToDB.js');
const { initialQues, getEmpByMan, newEmpQues, newRolQues, newDepQues, upEmpRolQues } = require('./utils/questions.js');
const fetchDB = require('./utils/fetchDB.js');
const process = require('node:process');


// ====================================================================================
// GLOBAL VARIABLES
const getEmpList = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN department ON roles.department_id=department.id LEFT JOIN employee m ON employee.manager_id = m.id ORDER BY id ASC;";
const getDepList = 'SELECT id, name AS department FROM department;';
const getRolList = 'SELECT roles.id, roles.title, roles. salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id=department.id ORDER BY id ASC;';
const getEmpManag = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee JOIN roles ON employee.role_id = roles.id WHERE employee.manager_id IS NULL ORDER BY id ASC;';


// ====================================================================================
// FUNCTION TO RUN COMMAND LINE
async function init() {
  const answers = await inquirer.prompt(initialQues);

  // Define request from user
  let query;

  // Write db query based on user request
  switch (answers.request) {

    // SELECT FROM TABLES
    case 'VIEW_EMPLOYEES':
      query = getEmpList;
      break;
    case 'VIEW_ROLES':
      query = getRolList;
      break;
    case 'VIEW_DEPARTMENTS':
      query = getDepList;
      break;
    case 'VIEW_EMPLOYEES_BY_MANAGER':
      query = await getEmpByMangData();
      break;

    // ADD TO TABLES
    case 'ADD_EMPLOYEE':
      let newEmp = await newEmpData();
      await fetchDB(newEmp);
      query = getEmpList;
      break;
    case 'ADD_DEPARTMENT':
      let newDep = await newDepData();
      await fetchDB(newDep);
      query = getDepList;
      break;
    case 'ADD_ROLE':
      let newRol = await newRolData();
      await fetchDB(newRol);
      query = getRolList;
      break;

    // UPDATE TABLES
    case 'UPDATE_EMPLOYEE_ROLE':
      let upEmp = await upEmpRolData();
      await fetchDB(upEmp);
      query = getEmpList;
      break;

    // QUIT PROMPT
    case 'QUIT':
      process.exit();
    }; 

  // Resets the auto-incriment of the tables
  await fetchDB('ALTER TABLE employee AUTO_INCREMENT = 1');
  await fetchDB('ALTER TABLE department AUTO_INCREMENT = 1');
  await fetchDB('ALTER TABLE roles AUTO_INCREMENT = 1');

  // Send query string to fetchDB function then print to console
  fetchDB(query).then((data) => {
    console.log(`\n${cTable.getTable(data)}\n`);
    init();
  });
};

// Function call to initialize app
empTrackLogo();
init();


// ====================================================================================
//  FUNCTIONS TO BUILD QUERY
// ====================================================================================

// ====================================================================================
// VIEW EMPLOYEE BY MANAGER QUESTIONS
async function getEmpByMangData() {
  let arr;
  await getEmpByMan(getEmpManag).then((quesArray) => {
    arr = quesArray;
  });
  const answers = await inquirer.prompt(arr);
  console.log(answers);
  const { manager_id } = answers;
  let queryString = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN department ON roles.department_id=department.id WHERE employee.manager_id = ${manager_id} ORDER BY id ASC;`;
  console.log(queryString);
  return queryString;
};


// ====================================================================================
// ADD NEW EMPLOYEE QUESTIONS
async function newEmpData() {
  let arr;
  await newEmpQues(getRolList, getEmpManag).then((quesArray) => {
    arr = quesArray;
  });
  const answers = await inquirer.prompt(arr);
  const { first_name, last_name, role_id, manager_id } = answers;
  let queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
  return queryString;
};


// ====================================================================================
// BUILD NEW DEPARTMENT
async function newDepData() {
  const answers = await inquirer.prompt(newDepQues);
  const { new_department } = answers;
  let queryString = `INSERT INTO department (name) VALUES ('${new_department}')`;
  return queryString;
};


// ====================================================================================
// BUILD NEW ROLE
async function newRolData() {
  let arr;
  await newRolQues(getDepList).then((quesArray) => {
    arr = quesArray;
  });
  const answers = await inquirer.prompt(arr);
  const { role_title, role_salary, role_depart } = answers;
  let queryString = `INSERT INTO roles (title, salary, department_id) VALUES ('${role_title}', '${role_salary}', '${role_depart}')`;
  return queryString;
};


// ====================================================================================
// UPDATE EMPLOYEE ROLE
async function upEmpRolData() {
  let arr;
  await upEmpRolQues(getEmpList, getRolList).then((quesArray) => {
    arr = quesArray;
  });
  const answers = await inquirer.prompt(arr);
  const { up_employee, up_role } = answers;
  let queryString = `UPDATE employee SET role_id = ${up_role} WHERE id = ${up_employee};`;
  return queryString;
};



// ====================================================================================
//  FUNCTIONS TO BUILD LOGO
function empTrackLogo() {
  console.log(
    logo({
        name: 'Employee Tracker',
        font: 'Standard',
        lineChars: 2,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-green',
        textColor: 'green',
    })
    .render()
  );
};
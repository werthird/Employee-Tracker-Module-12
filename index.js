// Requirements
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connectToDB.js');
const { initialQues, newEmpQues, newDepQues, newRolQues, upEmpRolQues } = require('./utils/questions.js');
const fetchDB = require('./fetchDB.js');
const process = require('node:process');

// ====================================================================================

// Function to initialize app
async function init() {
  const answers = await inquirer.prompt(initialQues);

  // Define request from user
  const getEmpList = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN department ON roles.department_id=department.id LEFT JOIN employee m ON employee.manager_id = m.id ORDER BY id ASC;";
  const getDepList = 'SELECT * FROM department ORDER BY id;';
  const getRolList = 'SELECT * FROM roles ORDER BY id;';
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
init();

//

// New employee questions
async function newEmpData() {
  const answers = await inquirer.prompt(newEmpQues);
  const { first_name, last_name, role_id, manager_id } = answers;
  let queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
  return queryString;
};

// New department questions
async function newDepData() {
  const answers = await inquirer.prompt(newDepQues);
  const { new_department } = answers;
  let queryString = `INSERT INTO department (name) VALUES ('${new_department}')`;
  return queryString;
};

// New role questions
async function newRolData() {
  const answers = await inquirer.prompt(newRolQues);
  const { role_title, role_salary, role_depart } = answers;
  let queryString = `INSERT INTO roles (title, salary, department_id) VALUES ('${role_title}', '${role_salary}', '${role_depart}')`;
  return queryString;
};

// Update employee role questions
async function upEmpRolData() {
  const answers = await inquirer.prompt(upEmpRolQues);
  const { up_employee, up_role } = answers;
  let queryString = `UPDATE employee SET role_id = ${up_role} WHERE id = ${up_employee};`;
  return queryString;
};

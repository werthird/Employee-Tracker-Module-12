const fetchDB = require('./utils/fetchDB.js');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
    case 'VIEW_EMPLOYEES_BY_MANAGER':
      query = await getEmpByMangData();
      break;
  }

  // Send query string to fetchDB function then print to console
  fetchDB(query).then((data) => {
    console.log(`\n${cTable.getTable(data)}\n`);
    init();
  });
};


// ---------  WORKING!!!! ----------
// ====================================================================================
//        INITIAL QUESTIONS
const initialQues = [
  {//Initial Questions
    type: 'list',
    message: 'What would you like to do?',
    name: 'request',
    choices: [
      {// VIEW EMPLOYEES
        name: 'View Employees by Manager',
        value: 'VIEW_EMPLOYEES_BY_MANAGER'
      }
    ]
  }
];


// ====================================================================================
// VIEW EMPLOYEE BY MANAGER QUESTIONS
async function getEmpByMangData() {
  let arr;
  await getEmpByMan().then((quesArray) => {
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
//        GET EMPLOYEES BY MANAGER QUESTIONS
const getEmpByMan = async () => {
  const managers = await fetchDB(getEmpManag);
  const quesArray = [
    { // Manager NAME
      type: 'list',
      name: 'manager_id',
      message: 'Choose the manager to view employees by.',
      choices: managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name} - ${manager.title}`,
          value: manager.id.toString()
        }))
    }
  ];
  return quesArray;
};


init();
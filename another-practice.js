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
    case 'UPDATE_EMPLOYEE_MANAGER':
      query = await upEmpManData();
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
      {// UPDATE EMPLOYEE MANAGER
        name: 'Update an Employees Manager',
        value: 'UPDATE_EMPLOYEE_MANAGER'
      }
    ]
  }
];


// ====================================================================================
// VIEW EMPLOYEE BY MANAGER QUESTIONS
async function upEmpManData() {
  let arr;
  await upEmpManQues(getEmpList, getEmpManag).then((quesArray) => {
    arr = quesArray;
  });
  const answers = await inquirer.prompt(arr);
  console.log(answers);
  const { up_employee, up_manager } = answers;
  let queryString = `UPDATE employee SET manager_id = ${up_manager} WHERE id = ${up_employee};`;
  console.log(queryString);
  return queryString;
};


// ====================================================================================
//        UPDATE EMPLOYEE MANAGER 
const upEmpManQues = async (getEmpList, getEmpManag) => {
  const employees = await fetchDB(getEmpList);
  const manager = await fetchDB(getEmpManag);
  const quesArray = [
    {
      type: 'list',
      name: 'up_employee',
      message: 'What is the name of the employee you would like to update?',
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id.toString()
      }))
    },
    { // Role
      type: 'list',
      name: 'up_manager',
      message: 'What new manager would you like this employee to have?',
      choices: manager.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name} - ${manager.title}`,
        value: manager.id.toString()
      }))
    }
  ];
  return quesArray;
};


init();
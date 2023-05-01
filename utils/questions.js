const fetchDB = require('../fetchDB.js');


//===============================================
//        INITIAL QUESTIONS
const initialQues = [
  {//Initial Questions
    type: 'list',
    message: 'What would you like to do?',
    name: 'request',
    choices: [
      {// VIEW EMPLOYEES
        name: 'View All Employees',
        value: 'VIEW_EMPLOYEES'
      },
      {// VIEW ROLES
        name: 'View All Roles',
        value: 'VIEW_ROLES'
      },
      {// VIEW DEPARTMENTS
        name: 'View All Departments',
        value: 'VIEW_DEPARTMENTS'
      },
      {// ADD EMPLOYEE
        name: 'Add Employee',
        value: 'ADD_EMPLOYEE'
      },
      {// ADD DEPARTMENT
        name: 'Add Department',
        value: 'ADD_DEPARTMENT'
      },
      {// ADD ROLE
        name: 'Add Role',
        value: 'ADD_ROLE'
      },
      {// UPDATE EMPLOYEE ROLE
        name: 'Update Employee Role',
        value: 'UPDATE_EMPLOYEE_ROLE'
      },
      {// QUIT
        name: 'Quit',
        value: 'QUIT'
      }
    ],
    pageSize: 10 // increase the height of the list to 10
  }
];

//===============================================
//        NEW EMPLOYEE QUESTIONS
const newEmpQues = async (getRolList) => {
  const roles = await fetchDB(getRolList);
  const buildNewEmpQuestions = [
    { // First Name
      type: 'input',
      name: 'first_name',
      message: 'What is the new employee first name?'
    },
    { // Last Name
      type: 'input',
      name: 'last_name',
      message: 'What is the new employees last name?'
    },
    { // Role
      type: 'list',
      name: 'role_id',
      message: 'What is the new employees role?',
      choices: roles.map((roles) => ({
        name: roles.title,
        value: roles.id.toString()
      }))
    },
    { // Manager ID
      type: 'input',
      name: 'manager_id',
      message: 'What is the new employees manager id?'
    }
  ];
  return buildNewEmpQuestions;
};

//===============================================
//        NEW DEPARTMENT QUESTIONS
const newDepQues = [
  {
    type: 'input',
    name: 'new_department',
    message: 'What new department would you like to add?'
  }
];

//===============================================
//        NEW ROLE QUESTIONS
const newRolQues = async (getDepList) => {
  const departments = await fetchDB(getDepList);
  const buildNewRoleQuestions = [
    {
      type: 'input',
      name: 'role_title',
      message: 'What is the new roles title?'
    },
    {
      type: 'input',
      name: 'role_salary',
      message: 'What is the new roles salary?'
    },
    {
      type: 'list',
      name: 'role_depart',
      message: 'What department will the new role be in?',
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id.toString()
      }))
    }
  ];
  return buildNewRoleQuestions;
};

//===============================================
//        UPDATE EMPLOYEE ROLE QUESTIONS
const upEmpRolQues = [
  {
    type: 'input',
    name: 'up_employee',
    message: 'What is the id of the employee you would like to update?'
  },
  {
    type: 'list',
    name: 'up_role',
    message: 'What new role would you like this employee to have?',
    choices: [
      {
        name: 'Sales Representative',
        value: '1'
      },
      {
        name: 'Sales Manager',
        value: '2'
      },
      {
        name: 'Customer Service Representative',
        value: '3'
      }
    ]
  }
];



module.exports = {
  initialQues,
  newEmpQues,
  newDepQues,
  upEmpRolQues,
  newRolQues
};
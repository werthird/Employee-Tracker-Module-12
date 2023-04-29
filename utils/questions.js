// Array of questions for user input
const initialQues = [
  {//Initial Questions
    type: 'list',
    message: 'What would you like to do?',
    name: 'request',
    choices: [
      {
        name: 'View All Employees',
        value: 'VIEW_EMPLOYEES'
      },
      {
        name: 'Add Employee',
        value: 'ADD_EMPLOYEE'
      },
      {
        name: 'Update Employee Role',
        value: 'UPDATE_EMPLOYEE_ROLE'
      },
      {
        name: 'View All Roles',
        value: 'VIEW_ROLES'
      },
      {
        name: 'View All Departments',
        value: 'VIEW_DEPARTMENTS'
      },
      {
        name: 'Add Department',
        value: 'ADD_DEPARTMENT'
      },
      {
        name: 'Quit',
        value: 'QUIT'
      }
    ]
  }
];

const newEmpQues = [
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
    type: 'input',
    name: 'role_id',
    message: 'What is the new employees role?'
  },
  { // Manager ID
    type: 'input',
    name: 'manager_id',
    message: 'What is the new employees manager id?'
  }
];


// const newEmpQues = [
//   {//First Name
//     type: 'input',
//     message: 'What is the new employees first name?',
//     name: 'first_name',
//   },
//   {//Last Name
//     type: 'input',
//     message: 'What is the new employees last name?',
//     name: 'last_name',
//   },
//   {//Role
//     type: 'input',
//     message: 'What is their new role?',
//     name: 'role',
//   },
//   {//Manager
//     type: 'input',
//     message: 'What is their managers id?',
//     name: 'manager_id',
//   }
// ];

module.exports = {
  initialQues,
  newEmpQues
};

// module.exports = initialQues;
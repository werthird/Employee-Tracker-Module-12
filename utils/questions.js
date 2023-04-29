// Array of questions for user input
const initialQues = [
  {//Initial Questions
    type: 'list',
    message: 'What would you like to do?',
    name: 'request',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'View All Departments',
      'Add Department',
      'Quit'
    ]
  }
];
// const newEmployQues = [
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

module.exports = initialQues;
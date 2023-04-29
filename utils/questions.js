// Array of questions for user input
const questions = [
  {//PROJECT NAME
    type: 'list',
    message: 'What would you like to do?',
    name: 'task',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'View All Departments',
      'Add Department',
      'Quit',
      'View All Employees'
    ]
  }
];

module.exports = questions;
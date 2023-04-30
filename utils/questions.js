//===============================================
//        INITIAL QUESTIONS
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

//===============================================
//        NEW EMPLOYEE QUESTIONS
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
    type: 'list',
    name: 'role_id',
    message: 'What is the new employees role?',
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
  },
  { // Manager ID
    type: 'input',
    name: 'manager_id',
    message: 'What is the new employees manager id?'
  }
];

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
  upEmpRolQues
};
const fetchDB = require('./fetchDB.js');


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
      {// VIEW EMPLOYEES BY MANAGER
        name: 'View Employees by Manager',
        value: 'VIEW_EMPLOYEES_BY_MANAGER'
      },
      {// VIEW EMPLOYEES BY DEPARTMENT
        name: 'View Employees by Department',
        value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
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
      {// UPDATE EMPLOYEE MANAGER
        name: 'Update an Employees Manager',
        value: 'UPDATE_EMPLOYEE_MANAGER'
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


// ====================================================================================
//        GET EMPLOYEES BY MANAGER QUESTIONS
const getEmpByMan = async (getEmpManag) => {
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


// ====================================================================================
//        GET EMPLOYEES BY MANAGER QUESTIONS
const getEmpByDep = async (getDepList) => {
  const department = await fetchDB(getDepList);
  const quesArray = [
    { // Manager NAME
      type: 'list',
      name: 'department_id',
      message: 'Choose the department to view employees by.',
      choices: department.map((department) => ({
          name: department.department,
          value: department.id.toString()
        }))
    }
  ];
  return quesArray;
};


//===============================================
//        NEW EMPLOYEE QUESTIONS
const newEmpQues = async (getRolList, getEmpManag) => {
  const roles = await fetchDB(getRolList);
  const managers = await fetchDB(getEmpManag);
  const quesArray = [
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
    { // Manager NAME
      type: 'list',
      name: 'manager_id',
      message: 'Who is the new employees manager?',
      choices: [
        ...managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name} - ${manager.title}`,
          value: manager.id.toString()
        })),
        {
          name: 'No manager',
          value: null
        }
      ]
    }
  ];
  return quesArray;
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
  const quesArray = [
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
        name: department.department,
        value: department.id.toString()
      }))
    }
  ];
  return quesArray;
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


//===============================================
//        UPDATE EMPLOYEE ROLE QUESTIONS
const upEmpRolQues = async (getEmpList, getRolList) => {
  const employees = await fetchDB(getEmpList);
  const roles = await fetchDB(getRolList);
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
      name: 'up_role',
      message: 'What new role would you like this employee to have?',
      choices: roles.map((roles) => ({
        name: roles.title,
        value: roles.id.toString()
      }))
    }
  ];
  return quesArray;
};

// EXPORTS
module.exports = {
  initialQues,
  getEmpByMan,
  getEmpByDep,
  newEmpQues,
  newDepQues,
  upEmpRolQues,
  upEmpManQues,
  newRolQues
};
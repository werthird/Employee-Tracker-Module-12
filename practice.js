const fetchDB = require('./fetchDB.js');
const getEmpMan = 'SELECT DISTINCT e2.first_name, e2.last_name FROM employee e1 JOIN employee e2 ON e1.manager_id = e2.id;';

//        NEW EMPLOYEE QUESTIONS
const newEmpQues = async (getRolList, getEmpList) => {
  // const roles = await fetchDB(getRolList);
  const managers = await fetchDB(getEmpMan);
  


  const quesArray = [
    // { // First Name
    //   type: 'input',
    //   name: 'first_name',
    //   message: 'What is the new employee first name?'
    // },
    // { // Last Name
    //   type: 'input',
    //   name: 'last_name',
    //   message: 'What is the new employees last name?'
    // },
    // { // Role
    //   type: 'list',
    //   name: 'role_id',
    //   message: 'What is the new employees role?',
    //   choices: roles.map((roles) => ({
    //     name: roles.title,
    //     value: roles.id.toString()
    //   }))
    // },
    { // Manager ID
      type: 'list',
      name: 'manager_id',
      message: 'Who is the new employees manager?',
      choices: managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id.toString()
      }))
    }
  ];
  return quesArray;
};

console.log(newEmpQues);
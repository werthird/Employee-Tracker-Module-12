const fetchDB = require('./fetchDB.js');


const buildNewRoleQuestions = async () => {
  const getDepList = 'SELECT * FROM department ORDER BY id;';
  const departments = await fetchDB(getDepList);
  const newRolQues = [
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
  return newRolQues;
};
let rolQueArr;
buildNewRoleQuestions().then((newRolQues) => {
  rolQueArr = newRolQues;
  console.log(rolQueArr);
});

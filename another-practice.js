const fetchDB = require('./fetchDB.js');

const departments = [
  { id: 1, name: 'Sales' },
  { id: 2, name: 'Customer Service' },
  { id: 3, name: 'Design' }
];

const mappedDepartments = departments.map((department) => ({
  id: department.id,
  name: department.name
}));

console.log(mappedDepartments);
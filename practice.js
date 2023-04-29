const cTable = require('console.table');

const list = [ 
  { 
    id: 1, 
    name: 'Sales'
  }, 
  { id: 2, 
    name: 'Customer Service' 
  } 
];


console.log(`\n${cTable.getTable(list)}\n`);
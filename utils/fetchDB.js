// Requirements
const db = require('../db/connectToDB.js');

function getFromDB(query) {

  return new Promise((resolve, reject) => {
    db.query(query, function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


module.exports = getFromDB;
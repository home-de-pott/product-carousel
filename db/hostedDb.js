const mysql = require('mysql');
const Promise = require('bluebird');

var db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
  },
  err => console.error(err)
);

Promise.promisifyAll(db);

db.connectAsync()
  .then(() => {
    console.log('Connected');
    db.queryAsync('USE baembry');
  })
  .catch(err => {
    console.error(err);
    db.connectAsync();
  });

module.exports = db;

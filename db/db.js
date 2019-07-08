var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'brian',
  password: process.env.MYSQL_PASS,
});

console.log(process.env.MYSQL_PASS);

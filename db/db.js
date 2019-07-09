const mysql = require('mysql');
const Promise = require('bluebird');

const data = require('../utils/data.json');

const makeRelatedItems = function() {
  const relatedItems = [];
  //populate related items table with random data
  for (let product of data) {
    const numberOfRelatedItems = Math.random() * 7;
    for (let i = 0; i < numberOfRelatedItems; i++) {
      const randomItemIndex = Math.floor(Math.random() * data.length);
      console.log(randomItemIndex);
      const randomID = data[randomItemIndex].ID;
      relatedItems.push([product.ID, randomID]);
    }
  }
  return Array.from(new Set(relatedItems));
};

var db = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
});

Promise.promisifyAll(db);

db.connect(function(err) {
  if (err) throw err;
  console.log('Connected to DB!');
});

// db.queryAsync('DROP DATABASE products');
//make db
db.queryAsync('CREATE DATABASE IF NOT EXISTS products')
  .then(() => {
    db.queryAsync('USE products');
  })
  .then(() => {
    db.queryAsync(`CREATE TABLE IF NOT EXISTS products (
          ID varchar(255) not null,
          name varchar(255),
          price varchar(255),
          brand varchar(255),
          photo varchar(255),
          primary key (ID)
      )`);
  })
  .then(() => {
    db.queryAsync(`CREATE TABLE IF NOT EXISTS related_products (
        product_id varchar(255),
        related_product_id varchar(255)
    )`);
  })
  .then(() => {
    console.log('Database and tables created');
  })
  .then(() => {
    // const promisifiedData = data.map(product => {
    //   return db.queryAsync(
    //     `INSERT INTO products values ("${product.ID}", "${product.name}", "${product.price}", "${product.brand}", "${product.mainPhoto}")`
    //   );
    // });
    // Promise.all(promisifiedData).then(results => {
    //   console.log(results);
    // });
  })
  .then(() => {
    // const relatedItems = makeRelatedItems();
    // const promisified = relatedItems.map(pair => {
    //   return db.queryAsync(
    //     `INSERT INTO related_products values ("${pair[0]}", "${pair[1]}")`
    //   );
    // });
    // return Promise.all(promisified);
  })
  //   .then(results => {
  //     console.log(results);
  //   })
  .catch(err => {
    console.error(err);
  });

module.exports = db;

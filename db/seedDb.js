const mysql = require('mysql');
const Promise = require('bluebird');

const data = require('../utils/data.json');
const relatedItems = require('../utils/relatedItems.json');

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
  // .then(() => {
  //   setInterval(function() {
  //     db.query('SELECT 1 From products', () => {
  //       console.log('DB queried');
  //     });
  //   }, 60 * 1000 * 3);
  // })
  .then(() => {
    db.queryAsync(`CREATE TABLE IF NOT EXISTS products (
          ID varchar(20) not null,
          name varchar(255),
          price varchar(255),
          brand varchar(255),
          photo varchar(500),
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
    const promisifiedData = data.map(product => {
      return db.queryAsync(
        `INSERT INTO products (ID, name, price, brand, photo) values ("${product.ID}", "${product.name}", "${product.price}", "${product.brand}", "${product.mainPhoto}")`
      );
    });
    Promise.all(promisifiedData).then(results => {
      console.log(results);
    });
  })
  .then(() => {
    const promisified = relatedItems.map(pair => {
      return db.queryAsync(
        `INSERT INTO related_products values ("${pair[0]}", "${pair[1]}")`
      );
    });
    return Promise.all(promisified);
  })
  .then(() => {
    console.log('Database seeded');
  })
  .catch(err => {
    console.error(err);
    db.connectAsync();
  });

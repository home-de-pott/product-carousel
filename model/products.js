const db = require('../db/hostedDb');

module.exports = {
  getProductsRelatedTo: async function(id) {
    const product = await db.queryAsync(
      `SELECT ID, name, price, brand, photo FROM products INNER JOIN related_products 
      WHERE related_products.product_ID = ${id}
      AND related_products.related_product_id = products.ID`
    );
    return product;
  },
  getAll: async function() {
    const products = await db.queryAsync(`SELECT * FROM products`);
    return products;
  },
  getOne: async function(id) {
    const product = await db.queryAsync(
      `SELECT * FROM products WHERE ID = ${id}`
    );
    return product;
  },
};

const express = require('express');

require('dotenv').config({ path: '../.env' });

const app = express();

const bodyParser = require('body-parser');

const products = require('../model/products');

const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use('/products/:id', express.static(__dirname + '/../dist'));

app.get('/product-data/:id', async (req, res) => {
  const id = req.params.id;
  try {
    //get products from db
    const relatedProducts = await products.getProductsRelatedTo(id);
    res.status(200).end(JSON.stringify(relatedProducts));
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

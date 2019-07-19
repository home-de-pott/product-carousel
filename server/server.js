const express = require('express');
const cors = require('cors');

require('dotenv').config({ path: '../.env' });

const app = express();

const bodyParser = require('body-parser');

const products = require('../model/products');

const port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(__dirname + '/../dist'));
// app.use('/products', express.static(__dirname + '/../dist'));
app.use('/products/:id', express.static(__dirname + '/../dist'));

app.get('/product-data', async (req, res) => {
  try {
    //get products from db
    const allproducts = await products.getAll();
    res.status(200).end(JSON.stringify(allproducts));
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.get('/product-data/:id', async (req, res) => {
  try {
    //get products from db
    const product = await products.getOne(req.params.id);
    res.status(200).end(JSON.stringify(product));
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.get('/related-products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    //get products from db
    const relatedProducts = await products.getProductsRelatedTo(id);
    res.status(200).end(JSON.stringify(relatedProducts));
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;

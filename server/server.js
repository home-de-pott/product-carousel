const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());

app.use(express.static(__dirname + "/../dist"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());


app.listen(4002, () => {
  console.log('Listening on 4002');
});

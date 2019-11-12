const express = require('express');
const cors = require("cors");
require("./database");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333,() => {
  console.log('server up');
});

module.exports = app;
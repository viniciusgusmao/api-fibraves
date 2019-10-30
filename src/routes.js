const express = require("express");

const routes = express.Router();

routes.get('/teste',(req,res) => {
  return res.json({nome: "Vinicius"})
})

module.exports = routes;
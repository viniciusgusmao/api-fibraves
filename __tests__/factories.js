const { factory } = require("factory-girl");
const faker = require("faker");
const { Usuario } = require("../src/models");

factory.define('Usuario_Out',Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: "flamengo10"
})


module.exports = factory;
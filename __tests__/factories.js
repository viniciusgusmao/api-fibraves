const { factory } = require("factory-girl");
const faker = require("faker");
const Usuario = require("../src/models/Usuario");

factory.define('Usuario_Out',Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: "asdasd456"
})


module.exports = factory;
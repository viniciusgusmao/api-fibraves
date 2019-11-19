const { factory } = require("factory-girl");
const faker = require("faker");
const { Usuario, Perfil } = require("../src/models");

factory.define('Usuario_Out',Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: "flamengo10"
})

factory.define('Perfil',Perfil, {
  nome: faker.name.findName()
})

module.exports = factory;
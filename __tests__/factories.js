const { factory } = require("factory-girl");
const Usuario = require("../src/models/Usuario");

factory.define('Usuario',Usuario, {
  nome: "Vinicius Gusmão",
  email: "vinicius-og@hotmail.com",
  login: "viniciusog",
  senha: "flamengo",
  cpf: "12163793788"
})

module.exports = factory;
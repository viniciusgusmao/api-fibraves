const { factory } = require("factory-girl");
const faker = require("faker");
faker.locale = "pt_BR";
const { Usuario, Perfil, Endereco } = require("../src/models");

factory.define('Usuario',Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: "flamengo10",
  endereco_id: null
})

factory.define('Endereco',Endereco, {
  rua: faker.address.streetName(),
  cep: "29060120",
  complemento: faker.address.secondaryAddress(),
  numero: 10,
  cidade: faker.address.city(),
  estado: "ES",
})

factory.define('Perfil',Perfil, {
  nome: faker.name.findName()
})

module.exports = factory;
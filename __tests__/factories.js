const { factory } = require("factory-girl");
const faker = require("faker");
faker.locale = "pt_BR";
const models = require("@models");

factory.define('Usuario',models.Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: "flamengo10",
  endereco_id: null
})

factory.define('Endereco',models.Endereco, {
  rua: faker.address.streetName(),
  cep: "29060120",
  complemento: faker.address.secondaryAddress(),
  numero: 10,
  cidade: faker.address.city(),
  estado: "ES",
})

factory.define('Perfil',models.Perfil, {
  nome: faker.name.findName()
})

factory.define('TipoContato',models.TipoContato, {
  nome: "Telefone",
  validacao: "telefone"
})

module.exports = factory;
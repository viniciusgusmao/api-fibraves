const { factory } = require("factory-girl");
const faker = require("faker");
faker.locale = "pt_BR";

const models = require("@models");

factory.define('Usuario',models.Usuario, {
  id: factory.sequence("Usuario.id",(n) => n+1),
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: "flamengo10",
  endereco_id: factory.assoc('Endereco',"id")
})

factory.define('Contato',models.Contato, {
  id: factory.sequence("Contato.id",(n) => n+1),
  valor: faker.phone.phoneNumberFormat(),
  tipocontato_id: factory.assoc("TipoContato","id"),
  usuario_id: factory.assoc("Usuario","id"),
})

factory.define('Endereco',models.Endereco, {
  id: factory.sequence("Endereco.id", (n) => n+1),
  rua: faker.address.streetName(),
  cep: "29060120",
  complemento: faker.address.secondaryAddress(),
  numero: 10,
  cidade: faker.address.city(),
  estado: "ES",
})

factory.define('Perfil',models.Perfil, {
  id: factory.sequence("Perfil.id",(n) => n+1),
  nome: faker.name.findName()
})

factory.define('TipoContato',models.TipoContato, {
  id: factory.sequence("TipoContato", (n) => n+1),
  nome: "Telefone",
  validacao: "telefone"
})

module.exports = factory;
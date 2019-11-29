const { factory } = require("factory-girl");
const faker = require("faker");
faker.locale = "pt_BR";

const models = require("@models");

factory.define('Usuario',models.Usuario, {
  id: faker.random.number(),
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: "flamengo10",
  endereco_id: factory.assoc('Endereco',"id")
})

factory.define('Contato',models.Contato, {
  id: faker.random.number(),
  valor: faker.phone.phoneNumberFormat(),
  tipocontato_id: factory.assoc("TipoContato","id"),
  usuario_id: factory.assoc("Usuario","id"),
})

factory.define('Endereco',models.Endereco, {
  id: faker.random.number(),
  rua: faker.address.streetName(),
  cep: "29060120",
  complemento: faker.address.secondaryAddress(),
  numero: faker.random.number(),
  cidade: faker.address.city(),
  estado: "ES",
})

factory.define('Perfil',models.Perfil, {
  id: faker.random.number(),
  nome: faker.name.findName()
})

factory.define('TipoContato',models.TipoContato, {
  id: faker.random.number(),
  nome: "Telefone",
  validacao: "telefone"
})

factory.define('Associacao',models.Associacao, {
  id: faker.random.number(),
  nome: faker.company.companyName(),
  imagem: null,
  endereco_id: factory.assoc("Endereco","id")
})

factory.define('Evento',models.Evento, {
  id: faker.random.number(),
  nome: faker.commerce.productName(),
  data: faker.date.future(),
  horario: "13:00",
  obs: faker.lorem.paragraph(2),
  endereco_id: factory.assoc("Endereco","id")
})

module.exports = factory;
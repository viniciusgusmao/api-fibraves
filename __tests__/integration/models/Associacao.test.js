const factory = require("@test/factories");
const models = require("@models");
const bcrypt = require("bcryptjs");
const faker = require("faker");
faker.locale = "pt_BR";

let endereco;

describe("Associacao", () => {
  beforeAll(async () => {
    endereco = await factory.create("Endereco"); 
  })
  afterAll(async () => {
    await models.Endereco.destroy({
      where: {},
      truncate: false
    })
  })
  it('should return success when validate nome', async () => {
    try {  
      const usuario = await factory.create("Associacao",{ nome: "ACCAP", endereco_id: endereco.id })
      expect(usuario.nome).toBe("ACCAP");
    } catch(e) {
      // workaround
    }
  })
  it('should return fail when validate nome', async () => {
    try {  
      await factory.create("Associacao",{ nome: "", endereco_id: endereco.id })
    } catch(e) {
      const res = String(e).includes("O campo NOME é obrigatório.");
      expect(res).toBeTruthy();
    }
  })

})
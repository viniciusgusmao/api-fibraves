const factory = require("@test/factories");
const models = require("@models");

describe("CRUD TipoContato.", () => {
  afterAll(async () => {
    await models.TipoContato.destroy({
      where: {},
      truncate: false
    })
  })
  it('should return fail when nome is empty', async () => {
    try { 
      await factory.create("TipoContato", { nome: "" })
    } catch(e) {
      const res = String(e).includes("O campo NOME é obrigatório.");
      expect(res).toBeTruthy();
    }
  })
  
  it('should return fail when validacao is wrong', async () => {
      try {
        await factory.create("TipoContato", { validacao: "teste" })
      } catch(e) {
        const res = String(e).includes("Somente permitido validações: telefone, email, url e nenhuma.");
        expect(res).toBeTruthy();
      }
  })
})
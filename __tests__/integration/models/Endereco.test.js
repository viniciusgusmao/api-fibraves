const factory = require("@test/factories");
const { Endereco } = require("@models");

describe("CRUD Endereco", () => {
  afterEach(async () => {
    await Endereco.destroy({
      where: {},
      truncate: false
    })
  })
  it('should return success when validate rua', async () => {
      const obj = await factory.create("Endereco",{ rua: "rua a" })
      expect(obj.rua).toBe("rua a");
  })
  
  it('should return error when validate cep with incorrect number of characters', async () => {
    try {
      await factory.create("Endereco",{ cep: 123 })
    } catch(e){
      const res = String(e).includes("O campo CEP deve possuir 8 caracteres.");
      expect(res).toBeTruthy();
    }
  })
  it('should return error when cep is empty', async () => {
    try {
      await factory.create("Endereco",{ cep: "" })
    } catch(e){
      const res = String(e).includes("O campo CEP é obrigatório.");
      expect(res).toBeTruthy();
    }
  })

  it('should return error when cidade is empty', async () => {
    try {
      await factory.create("Endereco",{ cidade: "" })
    } catch(e){
      const res = String(e).includes("O campo CIDADE é obrigatório.");
      expect(res).toBeTruthy();
    }
  })

  it('should return error when estado is empty', async () => {
    try {
      await factory.create("Endereco",{ estado: "" })
    } catch(e){
      const res = String(e).includes("O campo ESTADO é obrigatório.");
      expect(res).toBeTruthy();
    }
  })


})
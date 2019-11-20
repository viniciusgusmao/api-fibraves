const factory = require("../../factories");
const { Perfil } = require("../../../src/models");

describe("CRUD Perfil.", () => {
  afterEach(async () => {
    await Perfil.destroy({
      where: {},
      truncate: false
    })
  })
  it('should return success when validate nome', async () => {
     const perfil = await factory.create("Perfil", { nome: "veterinario" })
      expect(perfil.nome).toBe("veterinario");
  })

  it('should return fail when validate nome', async () => {
    try {
      const perfil = await factory.create("Perfil", { nome: "" })
    } catch(e){
      expect(String(e)).toBe("SequelizeValidationError: Validation error: Campo NOME é obrigatório.");
    }     
  })
  
})
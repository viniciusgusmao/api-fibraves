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
      await factory.create("Perfil", { nome: "" })
    } catch(e){
      const res = String(e).includes("Campo NOME é obrigatório.");
      expect(res).toBeTruthy()
    }     
  })
  
})
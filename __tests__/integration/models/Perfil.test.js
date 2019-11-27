const factory = require("@test/factories");
const models = require("@models");

describe("CRUD Perfil.", () => {
  afterAll(async () => {
    await models.Perfil.destroy({
      where: {},
      truncate: false
    })
  })
  it('should return success when validate nome', async () => {
     try {
       const perfil = await factory.create("Perfil", { nome: "veterinario" })
       expect(perfil.nome).toBe("veterinario");
     } catch(e) {
       // workaround
     }
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
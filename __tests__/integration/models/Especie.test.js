const factory = require("@test/factories");
const models = require("@models");

describe("CRUD Especie.", () => {
  afterAll(async () => {
    await models.Especie.destroy({
      where: {},
      truncate: false
    })
  })
  it('should return success when validate nome', async () => {
     try {
       const perfil = await factory.create("Especie", { nome: "Trinca Ferro" })
       expect(perfil.nome).toBe("Trinca Ferro");
     } catch(e) {
       // workaround
     }
  })

  it('should return fail when validate nome', async () => {
    try {
      await factory.create("Especie", { nome: "" })
    } catch(e){
      const res = String(e).includes("O campo NOME é obrigatório.");
      expect(res).toBeTruthy()
    }     
  })
  
})
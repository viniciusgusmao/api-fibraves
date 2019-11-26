const factory = require("@test/factories");
const models = require("@models");

describe.skip("CRUD Perfil.", () => {
  // afterEach(async () => {
  //   let excModels = [ "Perfil", "Endereco", "Usuario" ];
  //   for(let m of excModels){
  //     await models[[m]].destroy({
  //       where: {},
  //       truncate: false
  //     })
  //   }
  // })
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
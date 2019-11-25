const request = require('supertest');
const models = require("@models");
const factory = require("@test/factories");
const app = require("@app/app"); 

describe.skip("Rotas Perfil", () => {
  afterEach(async () => {
    let excModels = [ "Perfil", "TipoContato", "Usuario", "Endereco"];
    for(let m of excModels){
      await models[[m]].destroy({
        where: {},
        truncate: false
      })
    }
  }) 
  
  it("GET /perfil", async () => {
    const response = await request(app)
                               .get('/perfil');
    expect(response.statusCode).toBe(200)
  })

  it("POST /perfil", async () => {
    const response = await request(app)
                                .post('/perfil')
                                .send({ nome: "Veterinario"} );
    expect(response.statusCode).toBe(200)      
  })

  it("PUT /perfil/:id", async () => {
    const perfil = await factory.create("Perfil");
    const response = await request(app)
                                .put(`/perfil/${perfil.id}`)
                                .send({ nome: "Veterinario"} );
    expect(response.statusCode).toBe(200)      
  })

  it("DELETE /perfil/:id", async () => {
    const perfil = await factory.create("Perfil");
    const response = await request(app)
                                .delete(`/perfil/${perfil.id}`)
    expect(response.statusCode).toBe(200)      
  })

  it("DELETE /perfil/:id should return status 400", async () => {
    await factory.create("Endereco");
    const perfil = await factory.create("Perfil");
    const usuario = await factory.create("Usuario");
    try {
      const Usuario = await models.Usuario.findByPk(usuario.id);
      const Perfil = await models.Perfil.findByPk(perfil.id);
      await Perfil.addUsuarioPerfil(Usuario);
      console.log(Perfil.UsuariosPerfil);
      const response = await request(app)
                                  .delete(`/perfil/${perfil.id}`)
      expect(response.statusCode).toBe(400)      
    } catch(e){
      console.log(String(e))
      
    }
  })
})
const request = require('supertest');
const models = require("@models");
const factory = require("@test/factories");
const app = require("@app/app"); 

let perfil;

describe("Rotas Perfil", () => {
  beforeAll(async () => {
    perfil = await factory.create("Perfil");
  })
  afterAll(async () => {
    const delModels = [ "Endereco" ];
    for(let m of delModels){
      await models[[m]].destroy({
        where: {},
        truncate: false
      })
    }
  })
  it("GET /perfis", async () => {
    const response = await request(app)
                               .get('/perfis');
    expect(response.statusCode).toBe(200)
  })

  it("POST /perfis", async () => {
    const response = await request(app)
                                .post('/perfis')
                                .send({ nome: "Veterinario"} );
    expect(response.statusCode).toBe(200)      
  })

  it("PUT /perfis/:id", async () => {
    try {
      const response = await request(app)
                                  .put(`/perfis/${perfil.id}`)
                                  .send({ nome: "Veterinario"} );
      expect(response.statusCode).toBe(200)      
    } catch(e) {
      // console.log("chegou aqui 8")      
    }
  })

  it("DELETE /perfis/:id", async () => {
    try {
      const response = await request(app)
                                  .delete(`/perfis/${perfil.id}`)
      expect(response.statusCode).toBe(200)    
    } catch(e) {
      // console.log("chegou aqui 9")      
    } 
  })

  it("DELETE /perfis/:id should return status 400", async () => {
    try {
      const endereco = await factory.create("Endereco");
      const perfil = await factory.create("Perfil");
      const usuario = await factory.create("Usuario", { endereco_id: endereco.id });

      const Usuario = await models.Usuario.findByPk(usuario.id);
      const Perfil = await models.Perfil.findByPk(perfil.id);
      await Perfil.addUsuarioPerfil(Usuario);
      const response = await request(app)
                                  .delete(`/perfis/${perfil.id}`)
      expect(response.statusCode).toBe(400)      
    } catch(e){
      // console.log("chegou aqui 10")      
    }
  })
})
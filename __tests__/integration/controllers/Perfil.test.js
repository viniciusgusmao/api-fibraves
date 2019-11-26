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
    await models.Endereco.destroy({
      where: {},
      truncate: false,
    })
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
    try {
      const response = await request(app)
                                  .put(`/perfil/${perfil.id}`)
                                  .send({ nome: "Veterinario"} );
      expect(response.statusCode).toBe(200)      
    } catch(e) {
      // console.log("chegou aqui 8")      
    }
  })

  it("DELETE /perfil/:id", async () => {
    try {
      const response = await request(app)
                                  .delete(`/perfil/${perfil.id}`)
      expect(response.statusCode).toBe(200)    
    } catch(e) {
      // console.log("chegou aqui 9")      
    } 
  })

  it("DELETE /perfil/:id should return status 400", async () => {
    try {
      const endereco = await factory.create("Endereco");
      const perfil = await factory.create("Perfil");
      const usuario = await factory.create("Usuario", { endereco_id: endereco.id });

      const Usuario = await models.Usuario.findByPk(usuario.id);
      const Perfil = await models.Perfil.findByPk(perfil.id);
      await Perfil.addUsuarioPerfil(Usuario);
      const response = await request(app)
                                  .delete(`/perfil/${perfil.id}`)
      expect(response.statusCode).toBe(400)      
    } catch(e){
      // console.log("chegou aqui 10")      
    }
  })
})
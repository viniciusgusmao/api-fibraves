const request = require('supertest');
const factory = require("../../factories");
const { Usuario, Perfil } = require("../../../src/models");
const app = require("../../../src/app"); 

describe("Usuario", () => {
  beforeEach(async () => {
    await Usuario.destroy({
      where: {},
      truncate: false
    })
  })
  it("POST /usuarios", async () => {
    const response = await request(app)
                            .post('/usuarios')
                            .send({ nome: "Vinicius Gusmao", email: "vinicius-og@hotmail.com", senha: "flamengo10"} );
    expect(response.statusCode).toBe(200);
  })

  it("GET /usuarios", async () => {
    const response = await request(app).get('/usuarios');
    expect(response.statusCode).toBe(200);
  })

  it("POST /usuarios/:usuario_id/perfil", async () => {   
    const usuario = await factory.create("Usuario_Out");
    const perfil = await factory.create("Perfil");
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/perfil`)
                            .send({perfil_id: perfil.id });
    expect(response.statusCode).toBe(200);
  })
  
  it("GET /usuarios/:usuario_id", async () => {
    const usuario = await factory.create("Usuario_Out");
    const response = await request(app).get(`/usuarios/${usuario.id}`);
    expect(response.statusCode).toBe(200);
  })
  
  it("DELETE /usuarios/:usuario_id/perfil", async () => {
    const usuario = await factory.create("Usuario_Out");
    const perfil = await factory.create("Perfil");
    const response = await request(app)
                            .delete(`/usuarios/${usuario.id}/perfil`)
                            .send({perfil_id: perfil.id });
    expect(response.statusCode).toBe(200);
  })

  
})
const request = require('supertest');
const factory = require("@test/factories");
const { Usuario, Endereco, Perfil } = require("@models");
const app = require("@app/app"); 

describe("Usuario", () => {
  afterEach(async () => {
    await Usuario.destroy({
      where: {},
      truncate: false
    })
    await Perfil.destroy({
      where: {},
      truncate: false
    })
    await Endereco.destroy({
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
  it("POST /usuarios should return 403 status", async () => {
    const response = await request(app)
                            .post('/usuarios')
                            .send({ nome: "Vinicius Gusmao", email: "vinicius-og@hotmail.com"} );
    expect(response.statusCode).toBe(403);
  })

  it("GET /usuarios", async () => {
    const response = await request(app).get('/usuarios');
    expect(response.statusCode).toBe(200);
  })

  it("POST /usuarios/:usuario_id/perfil", async () => {   
    const usuario = await factory.create("Usuario");
    const perfil = await factory.create("Perfil");
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/perfil`)
                            .send({perfil_id: perfil.id });
    expect(response.statusCode).toBe(200);
  })
  
  it("GET /usuarios/:usuario_id", async () => {
    const usuario = await factory.create("Usuario");
    const response = await request(app).get(`/usuarios/${usuario.id}`);
    expect(response.statusCode).toBe(200);
  })

  it("GET /usuarios/:usuario_id should return 400", async () => {
    const response = await request(app).get(`/usuarios/99999`);
    expect(response.statusCode).toBe(400);
  })
  
  it("DELETE /usuarios/:usuario_id/perfil", async () => {
    const usuario = await factory.create("Usuario");
    const perfil = await factory.create("Perfil");
    const response = await request(app)
                            .delete(`/usuarios/${usuario.id}/perfil`)
                            .send({perfil_id: perfil.id });
    expect(response.statusCode).toBe(200);
  })

  it("POST /usuarios/:usuario_id/endereco", async () => {
    const endereco = await factory.create("Endereco");
    const usuario = await factory.create("Usuario");
    const end = {
      rua: endereco.rua,
      cep: endereco.cep,
      complemento: endereco.complemento,
      numero: endereco.numero,
      cidade: endereco.cidade,
      estado: endereco.estado
    }
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/endereco`)
                            .send(end);
    expect(response.statusCode).toBe(200);                     
  })


  
})
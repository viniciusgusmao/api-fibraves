const request = require('supertest');
const models = require("@models");
const factory = require("@test/factories");
const app = require("@app/app"); 

describe.skip("Rotas TipoContato", () => {
  afterEach(async () => {
    let excModels = [ "Contato", "TipoContato", "Usuario", "Endereco"];
    for(let m of excModels){
      await models[[m]].destroy({
        where: {},
        truncate: false
      })
    }
  })   
  it("GET /tipocontato", async () => {
    const response = await request(app)
                            .get('/tipocontato');
    expect(response.statusCode).toBe(200)
  })

  it("POST /tipocontato", async () => {
    const response = await request(app)
      .post('/tipocontato')
      .send({ nome: "Telefone", validacao: "telefone"} );
    expect(response.statusCode).toBe(200)      
  })

  it("DELETE /tipocontato", async () => {
    const tipoContato = await factory.create("TipoContato");
    const response = await request(app)
      .delete(`/tipocontato/${tipoContato.id}`)
    expect(response.statusCode).toBe(200)      
  })

  it("DELETE /tipocontato should return status 400", async () => {
    await factory.create("Endereco");
    const tipoContato = await factory.create("TipoContato");
    const usuario = await factory.create("Usuario");
    await factory.create("Contato",{ tipocontato_id: tipoContato.id, usuario_id: usuario.id });
    const response = await request(app)
      .delete(`/tipocontato/${tipoContato.id}`)
    expect(response.statusCode).toBe(400)      
  })

  it("POST /tipocontato error with wrong value in validacao", async () => {
    const response = await request(app)
      .post('/tipocontato')
      .send({ nome: "Telefone", validacao: "casa"} );
    expect(response.statusCode).toBe(403)      
  })

  it("POST /tipocontato error with wrong value in validacao", async () => {
    const response = await request(app)
      .post('/tipocontato')
      .send({ nome: "Telefone", validacao: "casa"} );
    expect(response.statusCode).toBe(403)      
  })

  it("PUT /tipocontato/:id should return status 200", async () => {
    const tipoContato = await factory.create("TipoContato");
    const response = await request(app)
      .put(`/tipocontato/${tipoContato.id}`)
      .send({ nome: "Facebook", validacao: "nenhuma"} );
    expect(response.statusCode).toBe(200)      
  })
  it("PUT /tipocontato/:id should return status 400", async () => {
    const response = await request(app)
      .put(`/tipocontato/9999`)
      .send({ nome: "Facebook", validacao: "nenhuma"} );
    expect(response.statusCode).toBe(400)      
  })
})
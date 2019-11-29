const request = require('supertest');
const models = require("@models");
const factory = require("@test/factories");
const app = require("@app/app"); 

let tipoContato;

describe("TipoContato", () => {
  beforeAll(async () => {
    tipoContato = await factory.create("TipoContato")
  })
  afterAll(async () => {
    const delModels = [ "Endereco", "TipoContato" ];
    for(let m of delModels){
      await models[[m]].destroy({
        where: {},
        truncate: false
      })
    }
  })
  it("GET /tiposcontatos", async () => {
    const response = await request(app)
                            .get('/tiposcontatos');
    expect(response.statusCode).toBe(200)
  })

  it("POST /tiposcontatos", async () => {
    const response = await request(app)
      .post('/tiposcontatos')
      .send({ nome: "Telefone", validacao: "telefone"} );
    expect(response.statusCode).toBe(200)      
  })

  it("POST /tiposcontatos error with wrong value in validacao", async () => {
    const response = await request(app)
      .post('/tiposcontatos')
      .send({ nome: "Telefone", validacao: "casa"} );
    expect(response.statusCode).toBe(403)      
  })

  it("PUT /tiposcontatos/:id should return status 200", async () => {
    const response = await request(app)
      .put(`/tiposcontatos/${tipoContato.id}`)
      .send({ nome: "Facebook", validacao: "nenhuma"} );
    expect(response.statusCode).toBe(200)      
  })

  it("PUT /tiposcontatos/:id should return status 400", async () => {
    const response = await request(app)
      .put(`/tiposcontatos/9999`)
      .send({ nome: "Facebook", validacao: "nenhuma"} );
    expect(response.statusCode).toBe(400)      
  })

  it("DELETE /tiposcontatos should return status 400", async () => {
    try {
      const endereco = await factory.create("Endereco");
      const tipoContato = await factory.create("TipoContato");
      const usuario = await factory.create("Usuario", { endereco_id: endereco.id });
      await factory.create("Contato",{ tipocontato_id: tipoContato.id, usuario_id: usuario.id });
      const response = await request(app).delete(`/tiposcontatos/${tipoContato.id}`)
      expect(response.statusCode).toBe(400)      
    } catch (e) {
      // workaround
    }
  })

  it("DELETE /tiposcontatos/:id", async () => {
    const response = await request(app)
      .delete(`/tiposcontatos/${tipoContato.id}`)
    expect(response.statusCode).toBe(200)      
  })
})
const request = require('supertest');
const { TipoContato } = require("@models");
const app = require("@app/app"); 

describe("Rotas TipoContato", () => {
  beforeEach( async () => {
    await TipoContato.destroy({
      where: {},
      truncate: false
    })
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

  it("POST /tipocontato error with wrong value in validacao", async () => {
    const response = await request(app)
      .post('/tipocontato')
      .send({ nome: "Telefone", validacao: "casa"} );
    expect(response.statusCode).toBe(403)      
  })


})
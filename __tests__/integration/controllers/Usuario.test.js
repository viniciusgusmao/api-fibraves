const request = require('supertest');
const app = require("../../../src/app"); 

describe("Rotas out Usuario", () => {
  it("POST /usuarios", () => {
    request(app)
      .post('/usuarios')
      .send({ nome: "Vinicius Gusmao", email: "vinicius-og@hotmail.com", senha: "flamengo10"} )
      .expect(200)
  })
  
  it("GET /usuarios", () => {
    request(app)
      .get('/usuarios')
      .expect(200)
  })
})
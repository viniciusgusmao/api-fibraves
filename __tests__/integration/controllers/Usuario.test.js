const request = require('supertest');
const app = require("../../../src/server"); 

describe("Rotas out Usuario", () => {
  it("should return status 200 to register an user", () => {
    request(app)
      .post('/usuarios')
      .send({ nome: "Vinicius Gusmao", email: "vinicius-og@hotmail.com", senha: "flamengo10"} )
      .expect(200)
  })
})
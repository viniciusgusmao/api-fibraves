const request = require('supertest');
const app = require("../../../src/server"); 

decribe("Rotas out Usuario", () => {
  it("should return status 200 to register an user", () => {
    request(app)
      .post('/usuarios')
      .send({ nome: "Vinicius Gusmão", email: "vinicius-og@hotmail.com", senha: "flamengo32" })
      .expect(200)
  })
})
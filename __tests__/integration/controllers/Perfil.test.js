const request = require('supertest');
const app = require("../../../src/app"); 

describe("Rotas out Usuario", () => {
  it("POST /perfil", () => {
    request(app)
      .post('/perfil')
      .send({ nome: "Veterinario"} )
      .expect(200)
  })
  
  it("GET /perfil", () => {
    request(app)
      .get('/perfil')
      .expect(200)
  })
})
const request = require('supertest');
const { Perfil } = require("@models");
const app = require("@app/app"); 

describe("Rotas Perfil", () => {
  beforeEach( async () => {
    await Perfil.destroy({
      where: {},
      truncate: false
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
})
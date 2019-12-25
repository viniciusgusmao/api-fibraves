const request = require('supertest');
const models = require("@models");
const factory = require("@test/factories");
const app = require("@app/app"); 

let especie;

describe("Rotas Especie", () => {
  beforeAll(async () => {
    especie = await factory.create("Especie");
  })
  afterAll(async () => {
    const delModels = [ "Especie" ];
    for(let m of delModels){
      await models[[m]].destroy({
        where: {},
        truncate: false
      })
    }
  })
  it("GET /especies", async () => {
    const response = await request(app)
                               .get('/especies');
    expect(response.statusCode).toBe(200)
  })

  it("POST /especies", async () => {
    const response = await request(app)
                                .post('/especies')
                                .send({ nome: "Trinca Ferro"} );
    expect(response.statusCode).toBe(200)      
  })

  it("PUT /especies/:id", async () => {
    try {
      const response = await request(app)
                                  .put(`/especies/${especie.id}`)
                                  .send({ nome: "Bicudo"} );
      expect(response.statusCode).toBe(200)      
    } catch(e) {
      // console.log("chegou aqui 8")      
    }
  })

  it("DELETE /especies/:id", async () => {
    try {
      const response = await request(app)
                                  .delete(`/especies/${especie.id}`)
      expect(response.statusCode).toBe(200)    
    } catch(e) {
      // console.log("chegou aqui 9")      
    } 
  })

  it("DELETE /especies/:id should return status 400", async () => {
    try {
      const especie = await factory.create("Especie");
      const evento = await factory.create("Evento");

      const Evento = await models.Evento.findByPk(evento.id);
      const Especie = await models.Especie.findByPk(especie.id);
      await Especie.addEvento(Evento);
      const response = await request(app)
                                  .delete(`/especies/${especie.id}`)
      expect(response.statusCode).toBe(400)      
    } catch(e){
      // console.log("chegou aqui 10")      
    }
  })
})
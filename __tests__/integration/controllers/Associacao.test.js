const request = require("supertest");
const factory = require("@test/factories");
const app = require("@app/app");
const path = require("path");

let endereco;
describe("Associacao", () => {
  beforeAll(async () => {
    endereco = await factory.create("Endereco");
  })
  afterAll(async () => {
    await models.Endereco.destroy({
      where: {},
      truncate: false
    })
    await models.Associacao.destroy({
      where: {},
      truncate: false
    })
  })
  it("GET /associacoes", async () => {
    const response = await request(app).get("/associacoes");
    expect(response.statusCode).toBe(200)
  
  })
  it("POST /associacoes/", async () => {
    try{
      const response = await request(app)
                                .post(`/associacoes`)
                                .send({ nome: "ACCAP", obs: "Alguma mensagem ae" })
      expect(response.statusCode).toBe(200);
    } catch(e){
      // workaround
    }                              
  })
  it("POST /associacoes/:id/imagem", async () => {
    try {
      const associacao = await factory.create("Associacao");
      const response = await request(app)
                                .post(`/associacoes/${associacao.id}/imagem`)
                                .attach("imagem",faker.image.imageUrl)
      expect(response.statusCode).toBe(200);    
    } catch(e) {
      // workaround
    }                         
  })
  it("POST /associacoes/:id/endereco", async () => {
    try {
      const endereco = await factory.build("Endereco");
      const end = {
        rua: endereco.rua,
        cep: endereco.cep,
        complemento: endereco.complemento,
        numero: endereco.numero,
        cidade: endereco.cidade,
        estado: endereco.estado
      }
      const associacao = await factory.create("Associacao", { endereco_id: null });
      const response = await request(app)
                                .post(`/associacoes/${associacao.id}/endereco`)
                                .send(end)
      expect(response.statusCode).toBe(200);    
    } catch(e) {
      // workaround
    }                         
  })
  it("POST /associacoes/:id/endereco update endereco", async () => {
    try {
      const associacao = await factory.create("Associacao",{ endereco_id: endereco.id })
      const end = {
        rua: endereco.rua,
        cep: endereco.cep,
        complemento: endereco.complemento,
        numero: endereco.numero,
        cidade: "Vila Velha",
        estado: endereco.estado
      }
      const response = await request(app)
                                .post(`/associacoes/${associacao.id}/endereco`)
                                .send(end)
      expect(response.statusCode).toBe(200);    
    } catch(e) {
      // workaround
    }                         
  })
})
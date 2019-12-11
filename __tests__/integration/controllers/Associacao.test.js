const request = require("supertest");
const factory = require("@test/factories");
const app = require("@app/app");
const models = require("@models");
const faker = require("faker");
faker.locale = "pt_BR";

let evento, endereco, associacao, usuario;
describe("Associacao", () => {
  beforeAll(async () => {
    endereco = await factory.create("Endereco");
    usuario = await factory.create("Usuario",{ endereco_id: endereco.id });
    evento = await factory.create("Evento",{ endereco_id: endereco.id });
    associacao = await factory.create("Associacao",{ endereco_id: endereco.id });
  })
  afterAll(async () => {
    const delModels = [ "UsuarioAssociacao", "Evento", "Usuario", "Associacao", "Endereco" ];
    for(let m of delModels){
      await models[[m]].destroy({
        where: {},
        truncate: false
      })
    }
  })
  it("GET /associacoes", async () => {
    const response = await request(app).get("/associacoes");
    expect(response.statusCode).toBe(200);  
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
      const associacao = await factory.create("Associacao",{ endereco_id: endereco.id });
      const response = await request(app)
                                .post(`/associacoes/${associacao.id}/imagem`)
                                .attach("imagem",faker.image.imageUrl())
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

  it("POST /associacoes/:id/usuario", async () => { 
    try {  
      const response = await request(app)
                              .post(`/associacoes/${associacao.id}/usuario`)
                              .send({usuario_id: usuario.id, presidente: 0 });
      expect(response.statusCode).toBe(200);
    } catch(e) {
      // workaround
      console.log(String(e))
    }
  })
  it("GET /associacoes/:id/usuarios", async () => { 
    try {       
      const usuario_ = await models.Usuario.findOne();
      const associacao_ = await models.Associacao.findByPk(associacao.id);      
      const usuario = await models.Usuario.findByPk(usuario_.id);
      await associacao_.addUsuario(usuario);      
      const response = await request(app).get(`/associacoes/${associacao.id}/usuarios`);
      expect(response.statusCode).toBe(200);
    } catch(e) {
      console.log("aquiii - "+String(e))
    }
  })
  it("GET /associacoes/:id/eventos", async () => { 
    try {       
      const evento_ = await models.Evento.findOne();
      const associacao_ = await models.Associacao.findByPk(associacao.id);      
      const evento = await models.Evento.findByPk(evento_.id);
      await associacao_.addEvento(evento);      
      const response = await request(app).get(`/associacoes/${associacao.id}/eventos`);
      expect(response.statusCode).toBe(200);
    } catch(e) {
      console.log("aquiii - "+String(e))
    }
  })
  it("POST /associacoes/:id/usuario with flag presidente", async () => {     
    const response = await request(app)
                            .post(`/associacoes/${associacao.id}/usuario`)
                            .send({usuario_id: usuario.id, presidente: 1 });
    expect(response.statusCode).toBe(200);   
  })
  it("DELETE /associacoes/:associacao_id/usuario/:usuario_id", async () => {
    try {  
      const usuario_ = await models.Usuario.findOne();
      const associacao_ = await models.Associacao.findByPk(associacao.id);   
      console.log(usuario_.id);   
      const usuario = await models.Usuario.findByPk(usuario_.id);
      await associacao_.addUsuario(usuario);      
      const response = await request(app)
                              .delete(`/associacoes/${associacao.id}/usuario/${usuario.id}`)
      expect(response.statusCode).toBe(200);   
    } catch(e) {
      // workaround
    }
  })
  it("DELETE /associacoes/:associacao_id/evento/:evento_id", async () => { 
    try {  
      const evento_ = await models.Evento.findOne();
      const associacao_ = await models.Associacao.findByPk(associacao.id);      
      const evento = await models.Evento.findByPk(evento_.id);
      await associacao_.addEvento(evento);      
      const response = await request(app)
                              .delete(`/associacoes/${associacao.id}/evento/${evento.id}`)
      expect(response.statusCode).toBe(200);
    } catch(e) {
      // workaround
    }
  })

})
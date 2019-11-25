const request = require('supertest');
const factory = require("@test/factories");
const models = require("@models");
const app = require("@app/app"); 

describe.skip("Usuario", () => {
  beforeEach(async () => {
    let excModels = [ "Endereco", "TipoContato", "Perfil"];
    for(let m of excModels){
      await factory.create(m);
    }
  })
  afterEach(async () => {
    let excModels = [ "Contato", "TipoContato", "Perfil", "Usuario", "Endereco" ];
    for(let m of excModels){
      await models[[m]].destroy({
        where: {},
        truncate: false
      })
    }
  })  
  it("POST /usuarios", async () => {
    const response = await request(app)
                            .post('/usuarios')
                            .send({ nome: "Vinicius Gusmao", email: "vinicius-og@hotmail.com", senha: "flamengo10"} );
    expect(response.statusCode).toBe(200);
  })
  it("POST /usuarios should return 403 status", async () => {
    const response = await request(app)
                            .post('/usuarios')
                            .send({ nome: "Vinicius Gusmao", email: "vinicius-og@hotmail.com"} );
    expect(response.statusCode).toBe(403);
  })

  it("GET /usuarios", async () => {
    const response = await request(app).get('/usuarios');
    expect(response.statusCode).toBe(200);
  })

  it("POST /usuarios/:usuario_id/perfil", async () => {   
    const usuario = await factory.create("Usuario");
    const perfil = await factory.create("Perfil");
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/perfil`)
                            .send({perfil_id: perfil.id });
    expect(response.statusCode).toBe(200);
  })
  
  it("GET /usuarios/:usuario_id", async () => {
    const usuario = await factory.create("Usuario");
    const response = await request(app).get(`/usuarios/${usuario.id}`);
    expect(response.statusCode).toBe(200);
  })

  it("GET /usuarios/:usuario_id should return 400", async () => {
    const response = await request(app).get(`/usuarios/99999`);
    expect(response.statusCode).toBe(400);
  })
  
  it("DELETE /usuarios/:usuario_id/perfil", async () => {
    const usuario = await factory.create("Usuario");
    const perfil = await factory.create("Perfil");
    const response = await request(app)
                            .delete(`/usuarios/${usuario.id}/perfil`)
                            .send({perfil_id: perfil.id });
    expect(response.statusCode).toBe(200);
  })

  it("POST /usuarios/:usuario_id/endereco", async () => {
    const endereco = await factory.build("Endereco");
    const usuario = await factory.create("Usuario",{ endereco_id: null });
    const end = {
      rua: endereco.rua,
      cep: endereco.cep,
      complemento: endereco.complemento,
      numero: endereco.numero,
      cidade: endereco.cidade,
      estado: endereco.estado
    }
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/endereco`)
                            .send(end);
    expect(response.statusCode).toBe(200);                     
  })
  it("POST /usuarios/:usuario_id/endereco update endereco", async () => {
    const endereco = await factory.create("Endereco");
    const usuario = await factory.create("Usuario",{ endereco_id: endereco.id });
    const end = {
      rua: endereco.rua,
      cep: endereco.cep,
      complemento: endereco.complemento,
      numero: endereco.numero,
      cidade: endereco.cidade,
      estado: endereco.estado
    }
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/endereco`)
                            .send(end);
    expect(response.statusCode).toBe(200);                     
  })

  it("POST /usuarios/:usuario_id/contato should return status 200", async () => {
    const usuario = await factory.create("Usuario");
    const tipoContato = await factory.create("TipoContato");
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/contato`)
                            .send({ tipocontato_id: tipoContato.id, valor: "27 9999-9999"  })
    expect(response.statusCode).toBe(200);                            
  })
  it("POST /usuarios/:usuario_id/contato should return status 403 when telefone is wrong", async () => {
    const usuario = await factory.create("Usuario");
    const tipoContato = await factory.create("TipoContato");
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/contato`)
                            .send({ tipocontato_id: tipoContato.id, valor: "27 9999-99" })
    expect(response.statusCode).toBe(403);                            
  })
  it("POST /usuarios/:usuario_id/contato should return status 403 when URL is wrong", async () => {
    const usuario = await factory.create("Usuario");
    const tipoContato = await factory.create("TipoContato", { nome: "Site Pessoal", validacao: "url" });
    const response = await request(app)
                            .post(`/usuarios/${usuario.id}/contato`)
                            .send({ tipocontato_id: tipoContato.id, valor: "https://tylermcginnis/validate-email-address-javascript/" })
    expect(response.statusCode).toBe(403);                            
  })
  it("PUT /usuarios/contato/:contato_id", async () => {
    const usuario = await factory.create("Usuario");
    const tipoContato = await factory.create("TipoContato");
    const contato = await factory.create("Contato",{ tipocontato_id: tipoContato.id, usuario_id: usuario.id });
    const response = await request(app)
                            .put(`/usuarios/contato/${contato.id}`)
                            .send({ valor: "21 3225-5413" })
    expect(response.statusCode).toBe(200);                            
  })
})
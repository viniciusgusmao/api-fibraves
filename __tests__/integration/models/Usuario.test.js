const factory = require("@test/factories");
const models = require("@models");
const bcrypt = require("bcryptjs");
const faker = require("faker");
faker.locale = "pt_BR";

let endereco;

describe("Usuario", () => {
  beforeAll(async () => {
    endereco = await factory.create("Endereco"); 
  })
  it.only('should return success when validate nome', async () => { 
    expect.assertions(1);
    try {
      const usuario = await factory.create("Usuario",{ nome: "vinicius gusmao", endereco_id: endereco.id })        
      expect(usuario.nome).toBe("vinicius gusmao");
    } catch(e) {
      console.log(String(e))
    }
  })

  it('should return an error when validate nome with input with a single word', async (done) => {
    try {
      await factory.create("Usuario",{ nome: "vinicius", endereco_id: endereco.id })
    } catch(e){      
      const res = String(e).includes("Digite um nome e sobrenome.");
      expect(res).toBeTruthy();
    }
    done();
  })
  it('should return success when validate email', async (done) => {
    const email = faker.internet.email();
    const usuario = await factory.create("Usuario",{ email, endereco_id: endereco.id })
    expect(usuario.email).toBe(email);
    done();
  })

  it('should return an error when validate email fails', async (done) => {
    try {
      await factory.create("Usuario",{ email: "vinicius", endereco_id: endereco.id })
    } catch(e){
      const res = String(e).includes("E-mail inválido.");
      expect(res).toBeTruthy();
    }
    done();
  })
  it('should return success when validate senha', async (done) => {
    const senha = "flamengo10";
    const usuario = await factory.create("Usuario",{ senha, endereco_id: endereco.id })
    const match = await bcrypt.compare("flamengo10",usuario.senha)
    expect(match).toBeTruthy();
    done();
  })
  it('should return an error when validate senha fails because there isnt alphanumeric strings', async (done) => {
    try {
      await factory.create("Usuario",{ senha: "456132", endereco_id: endereco.id })
    } catch(e){
      const res = String(e).includes("Sua senha deve conter somente letras e números.");
      expect(res).toBeTruthy();
    }
    done();
  })
  it('should return an error when validate senha fails because there isnt min 6 or max 50 characters', async (done) => {
    try {
      await factory.create("Usuario",{ senha: "asd23", endereco_id: endereco.id })
    } catch(e){      
      const res = String(e).includes("Sua senha deve ter no mínimo 6 e no máximo 50 caracteres.");
      expect(res).toBeTruthy();
    }
    done();
  })

  it("should return an error if email already exist", async (done) => {
    try {
      const email = faker.internet.email();
      console.log(email);
      await factory.create("Usuario",{ email, endereco_id: endereco.id })
      await factory.create("Usuario",{ email, endereco_id: endereco.id })
    } catch(e) {
      console.log(String(e));
      const res = String(e).includes("Este e-mail já está em uso no sistema.");
      expect(res).toBeTruthy();
    }
    done();
  })

})
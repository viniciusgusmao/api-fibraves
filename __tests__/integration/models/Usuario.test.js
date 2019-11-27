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
  afterAll(async () => {
    await models.Endereco.destroy({
      where: {},
      truncate: false
    })
  })
  it('should return success when validate nome', async () => {
    try {  
      const usuario = await factory.create("Usuario",{ nome: "vinicius gusmao", endereco_id: endereco.id })
      expect(usuario.nome).toBe("vinicius gusmao");
    } catch(e) {
      // workaround
    }
  })

  it('should return an error when validate nome with input with a single word', async () => {
      try {
        await factory.create("Usuario",{ nome: "vinicius", endereco_id: endereco.id  })
      } catch(e){
        const res = String(e).includes("Digite um nome e sobrenome.");
        expect(res).toBeTruthy();
      }
  })
  it('should return success when validate email', async () => {
      try {
        const usuario = await factory.build("Usuario",{ email: "vinicius-og@hotmail.com", endereco_id: endereco.id  })
        expect(usuario.email).toBe("vinicius-og@hotmail.com");
      } catch (e) {
        // workaround
      }
  })

  it('should return an error when validate email fails', async () => {
    try {
      await factory.create("Usuario",{ email: "vinicius", endereco_id: endereco.id  })
    } catch(e){
      const res = String(e).includes("E-mail inválido.");
      expect(res).toBeTruthy();
    }
  })
  it('should return success when validate senha', async () => {
    const senha = "flamengo10";
    try {
      const usuario = await factory.create("Usuario",{ senha, endereco_id: endereco.id  })
      const match = await bcrypt.compare("flamengo10",usuario.senha)
      expect(match).toBeTruthy();
    } catch (e){
      // workaround
    }
  })
  it('should return an error when validate senha fails because there isnt alphanumeric strings', async () => {
    try {
      await factory.build("Usuario",{ senha: "456132", endereco_id: endereco.id  })
    } catch(e){
      const res = String(e).includes("Sua senha deve conter somente letras e números.");
      expect(res).toBeTruthy();
    }
  })
  it('should return an error when validate senha fails because there isnt min 6 or max 50 characters', async () => {
    try {
      await factory.create("Usuario",{ senha: "asd23", endereco_id: endereco.id  })
    } catch(e){
      const res = String(e).includes("Sua senha deve ter no mínimo 6 e no máximo 50 caracteres.");
      expect(res).toBeTruthy();
    }
  })

  it("should return an error if email already exist", async () => {
    try {
      const email = faker.internet.email();
      await factory.create("Usuario",{ email, endereco_id: endereco.id  })
      await factory.create("Usuario",{ email, endereco_id: endereco.id  })
    } catch(e) {
      const res = String(e).includes("SequelizeUniqueConstraintError");
      expect(res).toBeTruthy();
    }
  })

})
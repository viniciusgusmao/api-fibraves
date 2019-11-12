const Sequelize = require("sequelize");
const dbConfig = require("../../../src/config/database");
const factory = require("../../factories");
const Usuario = require("../../../src/models/Usuario");
const bcrypt = require("bcryptjs");

const connection = new Sequelize(dbConfig);
Usuario.init(connection);

describe("Usuário no momento do cadastro, fora da área logada.", () => {
  beforeEach(async () => {
    await Usuario.truncate()
  })
  it('should return success when validate nome', async () => {
      const usuario = await factory.create("Usuario_Out",{ nome: "vinicius gusmao" })
      expect(usuario.nome).toBe("vinicius gusmao");
  })
  it('should return an error when validate nome with input with a single word', async () => {
    try {
      const usuario = await factory.create("Usuario_Out",{ nome: "vinicius" })
    } catch(e){
      expect(String(e)).toBe("SequelizeValidationError: Validation error: Digite um nome e sobrenome.");
    }
  })
  it('should return success when validate email', async () => {
    try {
      const usuario = await factory.create("Usuario_Out",{ email: "vinicius-og@hotmail.com" })
    } catch(e){
      expect(usuario.email).toBe("vinicius-og@hotmail.com");
    }
  })
  it('should return an error when validate email fails', async () => {
    try {
      const usuario = await factory.create("Usuario_Out",{ email: "vinicius" })
    } catch(e){
      expect(String(e)).toBe("SequelizeValidationError: Validation error: E-mail inválido.");
    }
  })
  it('should return success when validate senha', async () => {
    const senha = "flamengo10";
    const usuario = await factory.create("Usuario_Out",{ senha })
    const match = await bcrypt.compare("flamengo10",usuario.senha)
    expect(match).toBeTruthy();
  })
  it('should return an error when validate senha fails because there isnt alphanumeric strings', async () => {
    try {
      const usuario = await factory.create("Usuario_Out",{ senha: "456132" })
    } catch(e){
      expect(String(e)).toBe("SequelizeValidationError: Validation error: Sua senha deve conter somente letras e números.");
    }
  })
  it('should return an error when validate senha fails because there isnt min 6 or max 50 characters', async () => {
    try {
      const usuario = await factory.create("Usuario_Out",{ senha: "asd23" })
    } catch(e){
      expect(String(e)).toBe("SequelizeValidationError: Validation error: Sua senha deve ter no mínimo 6 e no máximo 50 caracteres.");
    }
  })
})
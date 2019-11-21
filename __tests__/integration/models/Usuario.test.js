const factory = require("@test/factories");
const { Usuario } = require("@models");
const bcrypt = require("bcryptjs");

describe("Usuário no momento do cadastro, fora da área logada.", () => {
  afterEach(async () => {
    await Usuario.destroy({
      where: {},
      truncate: false
    })
  })
  it('should return success when validate nome', async () => {
      const usuario = await factory.create("Usuario",{ nome: "vinicius gusmao" })
      expect(usuario.nome).toBe("vinicius gusmao");
  })

  it('should return an error when validate nome with input with a single word', async () => {
    try {
      await factory.create("Usuario",{ nome: "vinicius" })
    } catch(e){
      const res = String(e).includes("Digite um nome e sobrenome.");
      expect(res).toBeTruthy();
    }
  })
  it('should return success when validate email', async () => {
      const usuario = await factory.create("Usuario",{ email: "vinicius-og@hotmail.com" })
      expect(usuario.email).toBe("vinicius-og@hotmail.com");
  })

  it('should return an error when validate email fails', async () => {
    try {
      await factory.create("Usuario",{ email: "vinicius" })
    } catch(e){
      const res = String(e).includes("E-mail inválido.");
      expect(res).toBeTruthy();
    }
  })
  it('should return success when validate senha', async () => {
    const senha = "flamengo10";
    const usuario = await factory.create("Usuario",{ senha })
    const match = await bcrypt.compare("flamengo10",usuario.senha)
    expect(match).toBeTruthy();
  })
  it('should return an error when validate senha fails because there isnt alphanumeric strings', async () => {
    try {
      await factory.create("Usuario",{ senha: "456132" })
    } catch(e){
      const res = String(e).includes("Sua senha deve conter somente letras e números.");
      expect(res).toBeTruthy();
    }
  })
  it('should return an error when validate senha fails because there isnt min 6 or max 50 characters', async () => {
    try {
      const usuario = await factory.create("Usuario",{ senha: "asd23" })
    } catch(e){
      const res = String(e).includes("Sua senha deve ter no mínimo 6 e no máximo 50 caracteres.");
      expect(res).toBeTruthy();
    }
  })

  it("should return an error if email already exist", async () => {
    try {
      const usuario = await factory.create("Usuario",{ email: "vinicius@hotmail.com" })
      const usuario_2 = await factory.create("Usuario",{ email: "vinicius@hotmail.com" })
    } catch(e) {
      const res = String(e).includes("Este e-mail já está em uso no sistema.");
      expect(res).toBeTruthy();
    }
  })
})
const factory = require("../../factories");
const Usuario = require("../../../src/models/Usuario");

describe("Usuario", () => {
  it('should register an user', async () => {
    const usuario = await Usuario.create({ nome: "Vinicius Gusmao" })
    console.log(usuario);
    expect(1).toBe(1);
  })
})
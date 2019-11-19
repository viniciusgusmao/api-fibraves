const request = require('supertest');
const factory = require("../../factories");
const { Usuario, Perfil } = require("../../../src/models");
const app = require("../../../src/app"); 

describe("Usuario", () => {
  // beforeEach(async () => {
  //   await Usuario.destroy({
  //     where: {},
  //     truncate: false
  //   })
  //   await Perfil.destroy({
  //     where: {},
  //     truncate: false
  //   })
  // })
  // it.skip("POST /usuarios", () => {
  //   request(app)
  //     .post('/usuarios')
  //     .send({ nome: "Vinicius Gusmao", email: "vinicius-og@hotmail.com", senha: "flamengo10"} )
  //     .expect("Content-type","/json/")
  //     .expect(200)      
  // })

  it("POST /usuarios/:usuario_id/perfil", async () => {   
    const usuario = await factory.create("Usuario_Out");
    const perfil = await factory.create("Perfil");
    request(app)
      .post(`/usuarios/109/perfil`)
      .send({ perfil_id: 36 } )
      .expect("Content-type","/json/")
      .expect(200, {
        success: true
      })      
  })
  
  // it.skip("GET /usuarios", () => {
  //   request(app)
  //     .get('/usuarios')
  //     .expect("Content-type","/json/")
  //     .expect(200)
  // })
})
const Usuario = require("../models/Usuario");

module.exports = {
  async store(req,res) {
    const { nome, email, login, senha, cpf } = req.body;
    try {
      const usuario = await Usuario.create({ nome, email, login, senha, cpf })
      return res.json(usuario);
    } catch(e) {
      return res.json(e)
    }
  } 
}
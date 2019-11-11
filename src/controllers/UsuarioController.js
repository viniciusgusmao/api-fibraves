const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const usuarios = await Usuario.findAll();
    return res.json(usuarios)
  },
  async store(req,res) {
    const { nome, email, senha } = req.body;
    try {
      const usuario = await Usuario.create({ nome, email, senha })
      return res.json(usuario);
    } catch(e) {
      return res.json(e)
    }
  } 
}
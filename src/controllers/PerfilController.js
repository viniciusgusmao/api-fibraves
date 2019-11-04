const Perfil = require("../models/Perfil");

module.exports = {
  async index(req, res) {    
    const perfil = await Perfil.findAll();
    return res.json(perfil);
  },
  async store(req,res) {
    const { nome } = req.body;
    try {
      const perfil = await Perfil.create({ nome });
      return res.json(perfil)
    } catch(e) {
      return res.json(e)
    }
  } 
}
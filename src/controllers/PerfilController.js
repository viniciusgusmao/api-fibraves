const Perfil = require("../models/Perfil");

module.exports = {
  async index(req, res) {
   
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
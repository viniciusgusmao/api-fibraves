const { Perfil } = require("@models");

module.exports = {
  async index(req, res) {    
    const perfil = await Perfil.findAll();
    return res.status(200).json(perfil);
  },
  async store(req,res) {
    const { nome } = req.body;
    try {
      const perfil = await Perfil.create({ nome });
      return res.status(200).json(perfil)
    } catch(e) {
      return res.status(403).json(e)
    }
  } 
}
const models = require("@models");

module.exports = {
  async store(req,res){
    const { nome, validacao } = req.body;
    try {
      await models.TipoContato.create({ nome, validacao })
      return res.status(200).json({success: true})    
    } catch(e) {
      return res.status(403).json(e);
    }
  },
  async index(req,res){
    const tipocontato = await models.TipoContato.findAll();
    return res.status(200).json(tipocontato);
  }
}
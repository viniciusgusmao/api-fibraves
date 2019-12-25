const models = require("@models");

module.exports = {
  async index(req, res) {    
    const especie = await models.Especie.findAll();
    return res.status(200).json(especie);
  },
  async show(req,res) {
    const { id } = req.params;
    const especie = await models.Especie.findByPk(id);

    if (!especie)
      return res.status(400).json({error: "Espécie não encontrada."})

    return res.status(200).json(especie);
  },
  async store(req,res) {
    const { nome } = req.body;
    try {
      const especie = await models.Especie.create({ nome });
      return res.status(200).json(especie)
    } catch(e) {
      return res.status(403).json({error: String(e)})
    }
  },
  async update(req, res){
    const { id } = req.params;
    const { nome } = req.body;
    try {
       await models.Especie.update({
        nome
      }, {
        where: {
          id
        }
      });
      const especie_s = await models.Especie.findByPk(id);
      return res.status(200).json(especie_s)
    } catch(e) {
      return res.status(403).json({error: String(e)})
    }
  },
  async delete(req,res) {
    const { id } = req.params;
    try {
      const especie = await models.Especie.findOne({
        where: {
          id
        },
        include: [ "Passaros", "Eventos" ]
      });
      
      if (especie.Eventos.length > 0)
        return res.status(400).json({error: "Erro ao excluir, existem eventos ligados à esta espécie."})
      
      if (especie.Passaros.length > 0)
         return res.status(400).json({error: "Erro ao excluir, existem pássaros ligados à esta espécie."})

      await models.Especie.destroy({
        where: {
          id
        }
      });
      
      return res.status(200).json({success: "Espécie excluída com sucesso."})
    } catch(e) {
      return res.status(403).json({error: String(e)})
    }
  },
}
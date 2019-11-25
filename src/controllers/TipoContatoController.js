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
  },
  async update(req,res){
    const { id } = req.params;
    const { nome, validacao } = req.body;
    try {
      const tipocontato = await models.TipoContato.findByPk(id);
      if (!tipocontato)
        return res.status(400).json({error: "Este tipo de contato não existe."})

      await models.TipoContato.update({
        nome, validacao
      }, {
        where: {
          id
        }
      })

      return res.status(200).json({success: "Tipo de contato atualizado com sucesso."});
    } catch(e){
      return res.status(403).json({error: String(e)})
    }
  },
  async delete(req,res){
    const { id } = req.params;
    const { nome, validacao } = req.body;
    try {
      const contato = await models.Contato.findAndCountAll({
        where: {
          tipocontato_id: id
        }
      })
      if (contato.count > 0)
        return res.status(400).json({error: "Erro ao excluir, este tipo de contato está relacionado com contatos existentes."})

      await models.TipoContato.destroy({
        where: {
          id
        }
      })
      return res.status(200).json({success: "Tipo de Contato excluído com sucesso."})
    } catch (e) {
      return res.status(403).json({error: String(e)})
    }

  }
}
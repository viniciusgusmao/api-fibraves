const models = require("@models");

module.exports = {
  async index(req, res) {    
    const perfil = await models.Perfil.findAll();
    return res.status(200).json(perfil);
  },
  async show(req,res) {
    const { id } = req.params;
    const perfil = await models.Perfil.findByPk(id);

    if (!perfil)
      return res.status(400).json({error: "Perfil não encontrado."})

    return res.status(200).json(perfil);
  },
  async store(req,res) {
    const { nome } = req.body;
    try {
      const perfil = await models.Perfil.create({ nome });
      return res.status(200).json(perfil)
    } catch(e) {
      return res.status(403).json({error: String(e)})
    }
  },
  async update(req, res){
    const { id } = req.params;
    const { nome } = req.body;
    try {
      const perfil = await models.Perfil.update({
        nome
      }, {
        where: {
          id
        }
      });
      return res.status(200).json(perfil)
    } catch(e) {
      return res.status(403).json({error: String(e)})
    }
  },
  async delete(req,res) {
    const { id } = req.params;
    try {
      const perfil = await models.Perfil.findByPk(id);
      const usuarios = await perfil.getUsuariosPerfil();
      
      if (usuarios)
        return res.status(400).json({error: "Erro ao excluir, existem usuários ligados à este perfil."})

      await models.Perfil.destroy({
        where: {
          id
        }
      });
      
      return res.status(200).json({success: "Perfil excluído com sucesso."})
    } catch(e) {
      return res.status(403).json({error: String(e)})
    }
  },
}
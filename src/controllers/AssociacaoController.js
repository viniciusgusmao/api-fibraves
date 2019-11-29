const models = require("@models")

module.exports = {
  async index(req, res) {
    const associacoes = await models.Associacao.findAll();
    return res.status(200).json(associacoes);
  },
  async store(req, res){
    const { nome, obs } = req.body;
    try {
      const associacao = await models.Associacao.create({
        nome, obs
      })
      return res.status(201).json(associacao);
    } catch(e){
      console.log(String(e))
      return res.status(403).json({ error: String(e) })
    }
  },
  async storeImagem(req,res) {
    try {
      const { id } = req.params;
      const { filename: imagem } = req.file;
      const associacao = await models.Associacao.update({
        imagem
      }, {
        where: {
          id
        }
      })
      return res.status(200).json({ success: true })
    } catch(e){
      return res.status(403).json({ error: String(e)})
    }
  },
  async storeEndereco(req,res) {
    const { id } = req.params;
    const { rua, cep, complemento, numero, cidade, estado } = req.body;
    try {
      const associacao = await models.Associacao.findByPk(id);
      if (!associacao)
        return res.status(403).json({ error: "Associação não encontrada" })

      if (!associacao.endereco_id){
        const endereco = await models.Endereco.create({ rua, cep, complemento, numero, cidade, estado });
        await models.Associacao.update({
          endereco_id: endereco.id
        },{
          where: {
            id: associacao_id
          }
        })   
      } else {
        await models.Endereco.update({
          rua, cep, complemento, numero, cidade, estado 
        },{ 
          where: {
            id: associacao.endereco_id
          }
        })
      }

      return res.status(200).json({ success: true })
    } catch(e){
      console.log(String(e))
      return res.status(403).json({ error: String(e) });
    }
  },
  async delete(req,res) {
    const { id } = req.params;
    try {
      const associacao = await models.Associacao.findByPk(id);
      const usuarios = await associacao.getUsuariosAssociacao();
      const eventos = await associacao.getEventosAssociacao();

      if (usuarios)
        return res.status(400).json({error: "Erro ao excluir, existem usuários ligados à esta associação."})

      if (eventos)
        return res.status(400).json({error: "Erro ao excluir, existem eventos ligados à esta associação."})

      await models.Associacao.destroy({
          where: {
            id
          }
      });
      // COLOCAR OPÇÃO PARA EXCLUIR A IMAGEM DA ASSOCIACAO SE TIVER

      return res.status(200).json({success: "Associação excluída com sucesso."})
    }
  }
}
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
      await models.Associacao.update({
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
      // ----------------------------------------------------------
      return res.status(200).json({success: "Associação excluída com sucesso."})
    } catch(e) {
      return res.status(403).json({error: String(e)})
    }
  },
  async storeUsuario(req, res){    
    const { id } = req.params;
    const { usuario_id, presidente } = req.body;
    try {
      const associacao = await models.Associacao.findByPk(id);   
      
      if (!associacao)
        return res.status(400).json({ error: "Associação não encontrada." })

      const usuario = await models.Usuario.findByPk(usuario_id);  
      
      if (!associacao.getAssociacoesUsuario())
        await associacao.addAssociacaoUsuario(usuario,{ through: { presidente } });
      else
        await associacao.setAssociacoesUsuario(usuario,{ through: { presidente } });

      return res.status(200).json({ success: true });
    
    } catch(e){
      console.log(String(e));
      return res.status(403).json({ error: String(e) });
    } 
  },
  async indexUsuario(req,res) {
    const { id } = req.params;
    try {      
      const associacoes = await models.Associacao.findAll({
        where: {
          id
        },
        attributes: [ 'nome' ],
        include: [
          {
            model: models.Usuario,
            as: 'AssociacoesUsuario',
            attributes: ["nome","email"],
            through: {
              attributes: ["presidente"],
              where: {
                presidente: false
              }
            },
            include: [
              {
                model: models.Endereco,
                as: "endereco",
                attributes: ["rua","complemento","numero","cep","cidade","estado"]
              },
              {
                association: "contatos"
              }
            ]            
          }
        ]
      });      
      return res.status(200).json({ usuarios: associacoes });
    } catch(e) {
      console.log("ou aquii"+String(e));
      return res.status(403).json({ error: String(e) });
    }
  },
  async removeUsuario(req, res){    
    const { associacao_id: id, usuario_id } = req.params;
    try {
      const associacao = await models.Associacao.findByPk(id);   
      
      if (!associacao)
        return res.status(400).json({ error: "Associação não encontrado." })

      const usuario = await models.Usuario.findByPk(usuario_id);  
      
      await associacao.removeAssociacaoUsuario(usuario);
      return res.status(200).json({ success: true });
    
    } catch(e){
      console.log(String(e));
      return res.status(403).json({ error: String(e) });
    } 
  },
  async storeEvento(req, res){    
    const { id } = req.params;
    const { evento_id } = req.body;
    try {
      const associacao = await models.Associacao.findByPk(id);   
      
      if (!associacao)
        return res.status(400).json({ error: "Associação não encontrado." })

      const evento = await models.Evento.findByPk(evento_id);  
      
      await associacao.addAssociacaoEvento(evento);
      return res.status(200).json({ success: true });
    
    } catch(e){
      console.log(String(e));
      return res.status(403).json({ error: String(e) });
    } 
  },
  async removeEvento(req, res){    
    const { associacao_id: id, evento_id } = req.params;
    try {
      const associacao = await models.Associacao.findByPk(id);   
      
      if (!associacao)
        return res.status(400).json({ error: "Associação não encontrada." })

      const evento = await models.Evento.findByPk(evento_id);  
      
      await associacao.removeAssociacaoEvento(evento);
      return res.status(200).json({ success: true });
    
    } catch(e){
      console.log(String(e));
      return res.status(403).json({ error: String(e) });
    } 
  },
}
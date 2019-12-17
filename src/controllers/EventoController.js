const models = require("@models")

module.exports = {
  async index(req, res) {
    const eventos = await models.Evento.findAll();
    return res.status(200).json(eventos);
  },
  async show(req, res) {
    const { id } = req.params;
    const eventos = await models.Evento.findOne({
      where: {
        id
      }
    });
    return res.status(200).json(eventos);
  },
  async store(req, res){
    const { nome, data, horario } = req.body;
    try {
      const evento = await models.Evento.create({
        nome, data, horario
      })
      return res.status(201).json(evento);
    } catch(e){
      return res.status(403).json({ error: String(e) })
    }
  },
  async update(req, res){
    const { id } = req.params;
    const { nome, data, horario } = req.body;
    try {
      const evento = await models.Evento.update({
        nome, data, horario
      },{
        where: {
          id
        }
      })
      return res.status(200).json(evento);
    } catch(e){
      return res.status(403).json({ error: String(e) })
    }
  },
  async storeEndereco(req,res) {
    const { id } = req.params;
    const { rua, cep, complemento, numero, cidade, estado } = req.body;
    try {
      const evento = await models.Evento.findByPk(id);
      if (!evento)
        return res.status(403).json({ error: "Evento não encontrado" })

      if (!evento.endereco_id){
        const endereco = await models.Endereco.create({ rua, cep, complemento, numero, cidade, estado });
        await models.Evento.update({
          endereco_id: endereco.id
        },{
          where: {
            id: evento_id
          }
        })   
      } else {
        await models.Endereco.update({
          rua, cep, complemento, numero, cidade, estado 
        },{ 
          where: {
            id: evento.endereco_id
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
      const evento = await models.Evento.findByPk(id);
      const usuarios = await evento.getUsuariosInscritos();
      const associacoes = await evento.getEventosAssociacao();

      if (usuarios)
        return res.status(400).json({error: "Erro ao excluir, existem usuários ligados à este evento."})

      if (associacoes)
        return res.status(400).json({error: "Erro ao excluir, existem eventos ligados à esta associação."})

      await models.Evento.destroy({
          where: {
            id
          }
      });
      return res.status(200).json({success: "Evento excluído com sucesso."})
    } catch(e) {
      return res.status(403).json({error: String(e)})
    }
  },
  async storeUsuario(req, res){    
    const { id } = req.params;
    const { usuario_id, valor, status, num_inscricao } = req.body;
    try {
      const evento = await models.Evento.findByPk(id);   
      
      if (!evento)
        return res.status(400).json({ error: "Evento não encontrado." })

      const usuario = await models.Usuario.findByPk(usuario_id);  
      
      if (!evento.getUsuarios())
        await evento.addUsuario(usuario,{ through: { valor, status, num_inscricao } });
      else 
        await evento.setUsuarios(usuario,{ through: { valor, status, num_inscricao } });
      
      return res.status(200).json({ success: true });
    
    } catch(e){
      return res.status(403).json({ error: String(e) });
    } 
  },
  async indexUsuario(req,res) {
    const { id } = req.params;
    try {      
      const evento = await models.Evento.findOne({
        where: {
          id
        },
        attributes: [ 'nome', "data", "horario", "obs" ],
        include: [
          {
            model: models.Usuario,
            as: 'Usuarios',
            attributes: ["nome","email"],            
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
      return res.status(200).json({ evento });
    } catch(e) {
      return res.status(403).json({ error: String(e) });
    }
  },
  async removeUsuario(req, res){    
    const { evento_id: id, usuario_id } = req.params;
    try {
      const evento = await models.Evento.findByPk(id);   
      
      if (!evento)
        return res.status(400).json({ error: "Evento não encontrado." })

      const usuario = await models.Usuario.findByPk(usuario_id);  
      
      await evento.removeUsuario(usuario);
      return res.status(200).json({ success: true });
    
    } catch(e){
      console.log(String(e));
      return res.status(403).json({ error: String(e) });
    } 
  },
  async indexAssociacao(req,res) {
    const { id } = req.params;
    try {      
      const evento = await models.Evento.findOne({
        where: {
          id
        },
        attributes: [ 'nome', "data", "horario", "obs" ],
        include: [
          {
            model: models.Associacao,
            as: 'Associacoes',
            attributes: ["nome","imagem", "obs"],            
            include: [
              {
                model: models.Endereco,
                as: "endereco",
                attributes: ["rua","complemento","numero","cep","cidade","estado"]
              }
            ]            
          }
        ]
      });      
      return res.status(200).json({ evento });
    } catch(e) {
      return res.status(403).json({ error: String(e) });
    }
  },
  async removeAssociacao(req, res){    
    const { evento_id: id, associacao_id } = req.params;
    try {
      const evento = await models.Evento.findByPk(id);   
      
      if (!evento)
        return res.status(400).json({ error: "Evento não encontrado." })

      const associacao = await models.Associacao.findByPk(associacao_id);  
      
      await evento.removeAssociacao(associacao);
      return res.status(200).json({ success: true });
    
    } catch(e){
      console.log(String(e));
      return res.status(403).json({ error: String(e) });
    } 
  },
  async storeAssociacao(req, res){    
    const { id } = req.params;
    const { associacao_id } = req.body;
    try {
      const evento = await models.Evento.findByPk(id);   
      
      if (!evento)
        return res.status(400).json({ error: "Evento não encontrado." })

      const associacao = await models.Associacao.findByPk(associacao_id);  
      
      await evento.addAssociacao(associacao);
      return res.status(200).json({ success: true });
    
    } catch(e){
      console.log(String(e));
      return res.status(403).json({ error: String(e) });
    } 
  }  
}
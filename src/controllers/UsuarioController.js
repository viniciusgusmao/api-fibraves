const { Op } = require("sequelize");
const models = require("@models");

module.exports = {
  async show(req,res) {
    const { usuario_id } = req.params;
    try {
      const usuario = await models.Usuario.findByPk(usuario_id,{
        attributes: [ "nome", "email" ],
        include: [ 
          {
            association: "perfis" 
          }, 
          {
            model: models.Endereco,
            as: 'endereco',
            attributes: [ "rua", "cep", "complemento", "numero", "cidade", "estado" ]
          }
        ]
      });
      
      if (!usuario)
        return res.status(400).json({ error: "Usuário não encontrado" });
      
      return res.status(200).json(usuario);
    } catch(e) {
      console.log(String(e));
      return res.status(403).json({error: String(e)})
    }
  },
  async index(req, res) {
    try {
      const usuarios = await models.Usuario.findAll({
        attributes: [ 'nome', 'email', "cpf", "login" ],
        where: {
          status: 1
        },
        include: [
          {
            model: models.Endereco,
            as: 'endereco',
            attributes: [ "rua", "cep", "complemento", "numero", "cidade", "estado" ]
          },
          {
            association: "perfis",
            attributes: [ "nome" ]
          }
        ]
      });     
      return res.status(200).json(usuarios);
    } catch(e) {
      return res.status(403).json(e)
    }
  },
  async store(req,res) {
    const { nome, email, senha } = req.body;
    try {
      const usuario = await models.Usuario.create({ nome, email, senha })
      return res.status(200).json(usuario);
    } catch(e) {
      return res.status(403).json(e)
    }
  }, 
  async storePerfil(req,res) {    
    const { usuario_id } = req.params;
    const { perfil_id, ctf, crmv } = req.body;
    try {
      const usuario = await models.Usuario.findByPk(usuario_id);   
      
      if (!usuario)
        return res.status(400).json({ error: "Usuário não encontrado." })

      const perfil = await models.Perfil.findByPk(perfil_id);  
      
      await usuario.addPerfilUsuario(perfil,{ through: { ctf, crmv } });
      return res.status(200).json({ success: true });
    
    } catch(e){
      console.log(String(e));
      return res.status(400).json({ error: String(e) });
    } 
  },
  async removePerfil(req,res) {
    const { usuario_id } = req.params;
    const { perfil_id } = req.body;
    try {
      const usuario = await models.Usuario.findByPk(usuario_id);   
      
      if (!usuario)
        return res.status(400).json({ error: "Usuário não encontrado." })

      const perfil = await models.Perfil.findByPk(perfil_id);
      await usuario.removePerfilUsuario(perfil);
      return res.status(200).json({ success: true });

    } catch(e) {
      return res.status(400).json({ error: String(e) });
    }
  },
  async storeEndereco(req,res) {
    const { usuario_id } = req.params;
    const { rua, cep, complemento, numero, cidade, estado } = req.body;
    try {
      const usuario = await models.Usuario.findByPk(usuario_id);
      if (!usuario)
        return res.status(403).json({ error: "Usuário não encontrado" })

      if (!usuario.endereco_id){
        const endereco = await models.Endereco.create({ rua, cep, complemento, numero, cidade, estado });
        await models.Usuario.update({
          endereco_id: endereco.id
        },{
          where: {
            id: usuario_id
          }
        })   
      } else {
        await models.Endereco.update({
          id: usuario.endereco_id
        },{ 
          rua, cep, complemento, numero, cidade, estado 
        })
      }

      return res.status(200).json({ success: true })
    } catch(e){
      console.log(String(e))
      return res.status(400).json({ error: e });
    }
  },
  async storeContato(req,res){
    const { usuario_id } = req.params;
    const { tipocontato_id, valor } = req.body; 
    try {
      const usuario = await models.Usuario.findByPk(usuario_id)
      if (!usuario)
        return res.status(400).json({error: "Usuário não encontrado."})

      await models.Contato.create({
        valor, tipocontato_id, usuario_id 
      })
      return res.status(200).json({success: true})

    } catch(e){
      return res.status(400).json({error: e})
    }
  },
  async updateContato(req,res){
    const { contato_id } = req.params;
    const { valor } = req.body; 
    try {
      const contato = await models.Contato.findByPk(contato_id)
      if (!contato)
        return res.status(400).json({error: "Contato não encontrado."})

      await models.Contato.update({
        where: {
          id: contato_id
        }
      }, {
        valor
      })
      return res.status(200).json({success: true})

    } catch(e){
      return res.status(400).json({error: e})
    }
  }
  
}
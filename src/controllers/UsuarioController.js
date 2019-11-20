const { Op } = require("sequelize");
const { Usuario, Perfil } = require("../models");

module.exports = {
  async show(req,res) {
    const { usuario_id } = req.params;
    const usuario = await Usuario.findByPk(usuario_id,{
      attributes: [ "nome", "email" ],
      include: [ "PerfisUsuario", "UsuarioEndereco" ]
    });
    
    if (!usuario)
      return res.status(400).json({ error: "Usuário não encontrado" });
    
    return res.status(200).json(usuario);
  },
  async index(req, res) {
    try {
      console.log("ei porra")
      const usuarios = await Usuario.findAll({
        attributes: [ 'nome', 'email', "cpf", "login" ],
        where: {
          status: 1
        },
        include: [
          {
            association: 'endereco',
          },
          // {
          //   association: "PerfisUsuario",
          //   attributes: [ "nome" ]
          // }
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
      const usuario = await Usuario.create({ nome, email, senha })
      return res.status(200).json(usuario);
    } catch(e) {
      return res.status(403).json(e)
    }
  }, 
  async storePerfil(req,res) {    
    const { usuario_id } = req.params;
    const { perfil_id, ctf, crmv } = req.body;
    try {
      const usuario = await Usuario.findByPk(usuario_id);   
      
      if (!usuario)
        return res.status(400).json({ error: "Usuário não encontrado." })

      const perfil = await Perfil.findByPk(perfil_id);  
      
      await usuario.addPerfilUsuario(perfil,{ through: { ctf, crmv } });
      return res.status(200).json({ success: true });
    
    } catch(e){
      return res.status(400).json({ error: String(e) });
    } 
  },
  async removePerfil(req,res) {
    const { usuario_id } = req.params;
    const { perfil_id } = req.body;
    try {
      const usuario = await Usuario.findByPk(usuario_id);   
      
      if (!usuario)
        return res.status(400).json({ error: "Usuário não encontrado." })

      const perfil = await Perfil.findByPk(perfil_id);
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
      const usuario = await Usuario.findByPk(usuario_id);
      if (!usuario)
        return res.status(403).json({ error: "Usuário não encontrado" })

      const endereco = await Endereco.create({ rua, cep, complemento, numero, cidade, estado });
      await Usuario.update({
        endereco_id: endereco.id
      },{
        where: {
          id: usuario_id
        }
      })   
      return res.status(200).json({ success: true })
    } catch(e){
      return res.status(400).json({ error: String(e) });
    }
  },
  async updateEndereco(req,res){
    const { usuario_id } = req.params;
    const { rua, cep, complemento, numero, cidade, estado } = req.body;
    try {
      const usuario = await Usuario.findByPk(usuario_id);
      if (!usuario)
        return res.status(403).json({ error: "Usuário não encontrado" })

      if (!usuario.endereco_id)
        return res.status(403).json({ error: "Endereço não encontrado" })

      await Endereco.update({
        rua, cep, complemento, numero, cidade, estado
      },{
        where: {
          id: usuario.endereco_id
        }
      })
    } catch(e) {
      return res.status(400).json({ error: String(e) });
    }
  } 
}
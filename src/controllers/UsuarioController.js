const { Usuario, Perfil } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll();
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
    const { perfil_id } = req.body;
    try {
      const usuario = await Usuario.findByPk(usuario_id);   
      
      if (!usuario)
        return res.status(400).json({ error: "Usuário não encontrado." })

      const perfil = await Perfil.findByPk(perfil_id);  
      
      await usuario.addPerfilUsuario(perfil);
      return res.status(200).json({ success: true });
    
    } catch(e){
      return res.status(400).json({ error: String(e) });
    } 
  
  }
}
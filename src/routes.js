const express = require("express");
const UsuarioController = require("@controllers/UsuarioController");
const PerfilController = require("@controllers/PerfilController");
const TipoContatoController = require("@controllers/TipoContatoController");

const routes = express.Router();

routes.post('/usuarios',UsuarioController.store);
routes.post('/usuarios/:usuario_id/perfil',UsuarioController.storePerfil);
routes.post('/usuarios/:usuario_id/endereco',UsuarioController.storeEndereco);
routes.delete('/usuarios/:usuario_id/perfil',UsuarioController.removePerfil);
routes.get('/usuarios',UsuarioController.index);
routes.get('/usuarios/:usuario_id',UsuarioController.show);
routes.post('/usuarios/:usuario_id/contato',UsuarioController.storeContato);
routes.put('/usuarios/contato/:contato_id',UsuarioController.updateContato);

routes.post('/tipocontato',TipoContatoController.store);
routes.get('/tipocontato',TipoContatoController.index);

routes.post('/perfil',PerfilController.store);
routes.get('/perfil',PerfilController.index);

module.exports = routes;

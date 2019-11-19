const express = require("express");
const UsuarioController = require("./controllers/UsuarioController");
const PerfilController = require("./controllers/PerfilController");

const routes = express.Router();

routes.post('/usuarios',UsuarioController.store);
routes.post('/usuarios/:usuario_id/perfil',UsuarioController.storePerfil);
routes.delete('/usuarios/:usuario_id/perfil',UsuarioController.removePerfil);
routes.get('/usuarios',UsuarioController.index);
routes.get('/usuarios/:usuario_id',UsuarioController.show);

routes.post('/perfil',PerfilController.store);
routes.get('/perfil',PerfilController.index);

module.exports = routes;

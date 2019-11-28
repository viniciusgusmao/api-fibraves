const express = require("express");
const multer = require("multer");

const UsuarioController = require("@controllers/UsuarioController");
const PerfilController = require("@controllers/PerfilController");
const TipoContatoController = require("@controllers/TipoContatoController");
const AssociacaoController = require("@controllers/AssociacaoController");
const multerConfig = require("@app/config/multerConfig");

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
routes.put('/tipocontato/:id',TipoContatoController.update);
routes.delete('/tipocontato/:id',TipoContatoController.delete);

routes.post('/perfil',PerfilController.store);
routes.put('/perfil/:id',PerfilController.update);
routes.delete('/perfil/:id',PerfilController.delete);
routes.get('/perfil',PerfilController.index);

routes.get('/associacoes', AssociacaoController.index);
routes.post('/associacoes/:id/imagem', multer(multerConfig).single("imagem"), AssociacaoController.storeImagem);
routes.post('/associacoes/:id/endereco', AssociacaoController.storeEndereco);
routes.post('/associacoes', AssociacaoController.store);
routes.delete('/associacoes/:id', AssociacaoController.delete);

module.exports = routes;

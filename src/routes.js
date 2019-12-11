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

routes.post('/tiposcontatos',TipoContatoController.store);
routes.get('/tiposcontatos',TipoContatoController.index);
routes.put('/tiposcontatos/:id',TipoContatoController.update);
routes.delete('/tiposcontatos/:id',TipoContatoController.delete);

routes.post('/perfis',PerfilController.store);
routes.put('/perfis/:id',PerfilController.update);
routes.delete('/perfis/:id',PerfilController.delete);
routes.get('/perfis',PerfilController.index);

routes.get('/associacoes', AssociacaoController.index);
routes.post('/associacoes/:id/imagem', multer(multerConfig).single("imagem"), AssociacaoController.storeImagem);
routes.post('/associacoes/:id/endereco', AssociacaoController.storeEndereco);
routes.post('/associacoes', AssociacaoController.store);
routes.post('/associacoes/:id/usuario', AssociacaoController.storeUsuario);
routes.get('/associacoes/:id/usuarios', AssociacaoController.indexUsuario);
routes.get('/associacoes/:id/eventos', AssociacaoController.indexEvento);
routes.delete('/associacoes/:associacao_id/usuario/:usuario_id', AssociacaoController.removeUsuario);
routes.post('/associacoes/:id/evento', AssociacaoController.storeEvento);
routes.delete('/associacoes/:associacao_id/evento/:evento_id', AssociacaoController.removeEvento);
routes.delete('/associacoes/:id', AssociacaoController.delete);

module.exports = routes;

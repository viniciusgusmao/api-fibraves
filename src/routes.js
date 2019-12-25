const express = require("express");
const multer = require("multer");

const UsuarioController = require("@controllers/UsuarioController");
const PerfilController = require("@controllers/PerfilController");
const EspecieController = require("@controllers/EspecieController");
const TipoContatoController = require("@controllers/TipoContatoController");
const AssociacaoController = require("@controllers/AssociacaoController");
const EventoController = require("@controllers/EventoController");
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
routes.post('/usuarios/:usuario_id/passaro',UsuarioController.storePassaro);

routes.put('/passaros/:id',UsuarioController.updatePassaro);
routes.delete('/passaros/:id',UsuarioController.removePassaro);
// routes.post('/usuarios/:usuario_id/historico_passaro/:passaro_id',UsuarioController.storeHistoricoPassaro);

routes.post('/tiposcontatos',TipoContatoController.store);
routes.get('/tiposcontatos',TipoContatoController.index);
routes.put('/tiposcontatos/:id',TipoContatoController.update);
routes.delete('/tiposcontatos/:id',TipoContatoController.delete);

routes.post('/perfis',PerfilController.store);
routes.put('/perfis/:id',PerfilController.update);
routes.delete('/perfis/:id',PerfilController.delete);
routes.get('/perfis',PerfilController.index);
routes.get('/perfis/:id',PerfilController.show);

routes.post('/especies',EspecieController.store);
routes.put('/especies/:id',EspecieController.update);
routes.delete('/especies/:id',EspecieController.delete);
routes.get('/especies',EspecieController.index);
routes.get('/especies/:id',EspecieController.show);

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

routes.get('/eventos', EventoController.index);
routes.get('/eventos/:id', EventoController.show);
routes.post('/eventos', EventoController.store);
routes.delete('/evento/:id', EventoController.delete);
routes.put('/eventos/:id', EventoController.update);
routes.post('/eventos/:id/endereco', EventoController.index);
routes.post('/eventos/:id/usuario', EventoController.storeUsuario);
routes.get('/eventos/:id/usuarios', EventoController.indexUsuario);
routes.delete('/evento/:evento_id/usuario/:usuario_id', EventoController.removeUsuario);
routes.get('/eventos/:id/associacoes', EventoController.indexAssociacao);
routes.post('/eventos/:id/associacao', EventoController.storeAssociacao);
routes.delete('/evento/:evento_id/associacao/:associacao_id', EventoController.removeAssociacao);
routes.post('/eventos/:id/especie', EventoController.storeEspecie);
routes.delete('/evento/:evento_id/especie/:especie_id', EventoController.removeEspecie);
routes.post('/eventos/:id/formapagamento', EventoController.storeFormaPagamento);
routes.delete('/evento/:evento_id/formapagamento/:formapagamento_id', EventoController.removeFormaPagamento);

module.exports = routes;

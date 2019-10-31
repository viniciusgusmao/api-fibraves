const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Usuario = require("../models/Usuario");
const Perfil = require("../models/Perfil");

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Perfil.init(connection);

Usuario.associate(connection.models);
Perfil.associate(connection.models);

module.exports = connection;
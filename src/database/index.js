const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Usuario = require("../models/Usuario");
const Perfil = require("../models/Perfil");
const Passaro = require("../models/Passaro");

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Perfil.init(connection);
Passaro.init(connection);

Usuario.associate(connection.models);
Perfil.associate(connection.models);
Passaro.associate(connection.models);

module.exports = connection;
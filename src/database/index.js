const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require("../config/database");

const db = {};
const sequelize = new Sequelize(dbConfig);

fs
  .readdirSync(path.resolve(__dirname,"../","models2"))
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname,"../","models2", file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
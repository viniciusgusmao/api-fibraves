const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      login: DataTypes.STRING,
      senha: DataTypes.STRING,
      cpf: DataTypes.STRING
    },{
      tableName: "usuario",
      sequelize
    });
  }
}

module.exports = Usuario;
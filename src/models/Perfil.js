const { Model, DataTypes } = require('sequelize');

class Perfil extends Model {
  static init(sequelize){
    super.init({
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo NOME é obrigatório"
          }
        }
      },            
    },{
      tableName: "perfil",
      sequelize
    });
  }

  static associate(models){
    // this.belongsToMany(models.Usuario, { foreignKey: 'perfil_id', through: 'perfil_usuario' })
  }

}

module.exports = Perfil;
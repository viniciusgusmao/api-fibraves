const { Model, DataTypes } = require("sequelize");

class TipoContato extends Model {
  static init(sequelize){
    super.init({
      valor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo VALOR é obrigatório"
          }
        }
      },
      tipocontato_id: {
        type: DataTypes.INTEGER
      }
    }, {
      sequelize,
      tableName: "contato"
    })
  }

  static associate(models){
    // this.hasMany(models.Contato, { foreignKey: "tipocontato_id" })
  }

}

module.exports = TipoContato;
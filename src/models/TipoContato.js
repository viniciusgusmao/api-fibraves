const { Model, Datatypes } = require("sequelize");

class TipoContato extends Model {
  static init(sequelize){
    super.init({
      valor: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo VALOR é obrigatório"
          }
        }
      },
      tipocontato_id: {
        type: Datatypes.INTEGER
      }
    }, {
      sequelize,
      tableName: "contato"
    })
  }

  static associate(models){
    this.hasMany(models.Contato, { foreignKey: "tipocontato_id" })
  }

}

module.exports = TipoContato;
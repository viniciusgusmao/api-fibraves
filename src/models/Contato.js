const { Model, Datatypes } = require("sequelize");

class Contato extends Model {
  static init(sequelize){
    super.init({
      valor: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo valor obrigatório"
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
    this.belongsTo(models.TipoContato, { foreignKey: "tipocontato_id" })
  }

}

module.exports = Contato;
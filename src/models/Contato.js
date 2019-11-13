const { Model, DataTypes } = require("sequelize");

class Contato extends Model {
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
      tipocontato_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: "contato"
    })
  }

  static associate(models){
    // this.belongsTo(models.TipoContato, { foreignKey: "tipocontato_id" })
  }

}

module.exports = Contato;
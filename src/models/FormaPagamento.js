const { Model, Datatypes } = require("sequelize");

class FormaPagamento extends Model {
  static init(sequelize){
    super.init({
      nome: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo NOME é obrigatório"
          }
        }
      }
    }, {
      sequelize,
      tableName: "formapagamento"
    })
  }

  static associate(models){
    this.belongsToMany(models.Evento, { foreignKey: 'formapagamento_id', through: 'evento_formapagamento', as: 'evento_formapagamento' })
  }

}

module.exports = FormaPagamento;
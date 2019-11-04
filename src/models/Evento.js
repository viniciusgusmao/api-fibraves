const { Model, Datatypes } = require("sequelize");

class Evento extends Model {
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
      },
      data: {
        type: Datatypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo DATA é obrigatório"
          }
        }
      },
      horario: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo HORÁRIO é obrigatório"
          }
        }
      },
      obs: {
        type: Datatypes.TEXT,
        allowNull: true
      },
      endereco_id: Datatypes.INTEGER
    }, {
      sequelize,
      tableName: "associacao"
    })
  }

  static associate(models){
    this.hasOne(models.Endereco,{ foreignKey: 'endereco_id', as: 'evento_endereco' })
    this.belongsToMany(models.Associacao, { foreignKey: 'evento_id', through: 'associacao_evento', as: 'evento_associacao' })
    this.belongsToMany(models.FormaPagamento, { foreignKey: 'evento_id', through: 'evento_formapagamento', as: 'formapagamento_evento' })
  }

}

module.exports = Evento;
const { Model, DataTypes } = require("sequelize");

class Evento extends Model {
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
      data: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo DATA é obrigatório"
          }
        }
      },
      horario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo HORÁRIO é obrigatório"
          }
        }
      },
      obs: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      endereco_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: "associacao"
    })
  }

  static associate(models){
    // this.hasOne(models.Endereco,{ foreignKey: 'endereco_id', as: 'evento_endereco' })
    // this.belongsToMany(models.Associacao, { foreignKey: 'evento_id', through: 'associacao_evento', as: 'evento_associacao' })
    // this.belongsToMany(models.FormaPagamento, { foreignKey: 'evento_id', through: 'evento_formapagamento', as: 'formapagamento_evento' })    
    // this.belongsToMany(models.Especie,{ foreignKey: 'evento_id', through: 'evento_especie', as: 'especie_evento' })
    // this.hasMany(models.Fase,{ foreignKey: 'evento_id', through: 'fase', as: 'fase_evento' })
    // this.belongsToMany(models.Passaro,{ foreignKey: 'evento_id', through: 'passaro_evento', as: 'passaro_evento' })
    // this.belongsToMany(models.Usuario,{ foreignKey: 'evento_id', through: 'inscricao', as: 'evento_inscricao' })
    // this.hasMany(models.Marcacao, { foreignKey: 'evento_id', as: 'marcacao_evento' })
    
  }

}

module.exports = Evento;
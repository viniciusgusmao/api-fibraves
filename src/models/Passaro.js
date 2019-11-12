const { Model, Datatypes } = require("sequelize");

class Passaro extends Model {
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
      anilha: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo ANILHA é obrigatório"
          }
        }
      },
      nascimento: {
        type: Datatypes.DATE,
        allowNull: true,
      },
      sexo: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo SEXO é obrigatório"
          }
        }
      },
      documento: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      foto: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      especie_id: Datatypes.INTEGER,
      usuario_id: {
        allowNull: true,
        type: Datatypes.INTEGER
      }
    }, {
      sequelize,
      tableName: "passaro"
    })
  }

  static associate(models){
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id' })
    this.belongsToMany(models.Usuario, { foreignKey: 'usuario_id', through: 'historico_passaro', as: 'passaro_historico' })
    this.belongsTo(models.Especie,{ foreignKey: 'especie_id', as: "Especie" })
    this.belongsToMany(models.Evento,{ foreignKey: 'passaro_id', through: 'passaro_evento', as: 'evento_passaro' })
    this.hasMany(models.Marcacao, { foreignKey: 'passaro_id', as: 'marcacao_passaro' })
  }
}

module.exports = Passaro;
const { Model, DataTypes } = require("sequelize");

class Passaro extends Model {
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
      anilha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo ANILHA é obrigatório"
          }
        }
      },
      nascimento: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      sexo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo SEXO é obrigatório"
          }
        }
      },
      documento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      especie_id: DataTypes.INTEGER,
      usuario_id: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    }, {
      sequelize,
      tableName: "passaro"
    })
  }

  static associate(models){
    // this.belongsTo(models.Usuario, { foreignKey: 'usuario_id' })
    // this.belongsToMany(models.Usuario, { foreignKey: 'usuario_id', through: 'historico_passaro', as: 'passaro_historico' })
    // this.belongsTo(models.Especie,{ foreignKey: 'especie_id', as: "Especie" })
    // this.belongsToMany(models.Evento,{ foreignKey: 'passaro_id', through: 'passaro_evento', as: 'evento_passaro' })
    // this.hasMany(models.Marcacao, { foreignKey: 'passaro_id', as: 'marcacao_passaro' })
  }
}

module.exports = Passaro;
const { Model, DataTypes } = require("sequelize");

class Especie extends Model {
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
      }
    }, {
      sequelize,
      tableName: "especie"
    })
  }

  static associate(models){
    // this.belongsToMany(models.Evento,{ foreignKey: 'especie_id', through: 'evento_especie', as: 'evento_especie' })
    // this.hasMany(models.Passaro,{ foreignKey: 'especie_id', as: 'Passaros' })
    // this.hasMany(models.Fase,{ foreignKey: 'especie_id', through: 'fase', as: 'fase_passaro' })
  }

}

module.exports = Especie;
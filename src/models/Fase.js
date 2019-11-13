const { Model, DataTypes } = require("sequelize");

class Fase extends Model {
  static init(sequelize){
    super.init({
      max_classificados: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      minimo_canto: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      tipo_fase: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nome_fase: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pontos_distribuir: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      evento_id: DataTypes.INTEGER,
      especie_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: "fase"
    })
  }

  static associate(models){
    // this.belongsTo(models.Evento, { foreignKey: 'evento_id', as: 'evento_fase' })
    // this.belongsTo(models.Passaro, { foreignKey: 'passaro_id', as: 'passaro_fase' })
    // this.hasMany(models.Marcacao,{ foreignKey: 'fase_id', as: 'marcacao_fase' })
  }

}

module.exports = Fase;
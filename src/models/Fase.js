const { Model, Datatypes } = require("sequelize");

class Fase extends Model {
  static init(sequelize){
    super.init({
      max_classificados: {
        type: Datatypes.INTEGER,
        allowNull: true
      },
      minimo_canto: {
        type: Datatypes.INTEGER,
        allowNull: true
      },
      tipo_fase: {
        type: Datatypes.INTEGER,
        allowNull: false
      },
      nome_fase: {
        type: Datatypes.STRING,
        allowNull: false
      },
      pontos_distribuir: {
        type: Datatypes.INTEGER,
        allowNull: true
      },
      evento_id: Datatypes.INTEGER,
      especie_id: Datatypes.INTEGER
    }, {
      sequelize,
      tableName: "fase"
    })
  }

  static associate(models){
    this.belongsTo(models.Evento, { foreignKey: 'evento_id', as: 'evento_fase' })
    this.belongsTo(models.Passaro, { foreignKey: 'passaro_id', as: 'passaro_fase' })
    this.hasMany(models.Marcacao,{ foreignKey: 'fase_id', as: 'marcacao_fase' })
  }

}

module.exports = Fase;
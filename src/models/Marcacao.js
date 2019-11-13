const { Model, DataTypes } = require("sequelize");

class Marcacao extends Model {
  static init(sequelize){
    super.init({
      qtd_canto: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      passaro_id: DataTypes.INTEGER,
      evento_id: DataTypes.INTEGER,
      fase_id: DataTypes.INTEGER,
      usuario_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: "marcacao"
    })
  }

  static associate(models){
    // this.belongsTo(models.Evento, { foreignKey: 'evento_id', as: 'evento_marcacao' })
    // this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario_marcacao' })
    // this.belongsTo(models.Passaro, { foreignKey: 'passaro_id', as: 'passaro_marcacao' })
    // this.belongsTo(models.Fase, { foreignKey: 'fase_id', as: 'fase_marcacao' })
  }

}

module.exports = Marcacao;
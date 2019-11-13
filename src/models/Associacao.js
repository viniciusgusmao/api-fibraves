const { Model, DataTypes } = require("sequelize");

class Associacao extends Model {
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
      imagem: {
        type: DataTypes.STRING,
        allowNull: true
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
    // this.hasOne(models.Endereco,{ foreignKey: 'endereco_id', as: 'associacao_endereco' })
    // this.belongsToMany(models.Usuario, { foreignKey: 'associacao_id', through: 'usuario_associacao', as: 'usuario_associacao' })
    // this.belongsToMany(models.Evento, { foreignKey: 'associacao_id', through: 'associacao_evento', as: 'associacao_evento' })
  }

}

module.exports = Associacao;
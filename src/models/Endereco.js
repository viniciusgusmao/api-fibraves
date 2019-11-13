const { Model, DataTypes } = require("sequelize");

class Endereco extends Model {
  static init(sequelize){
    super.init({
      rua: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo RUA é obrigatório"
          }
        }
      },
      cep: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo CEP é obrigatório"
          },
          isEqualToOito(value){
            if(value.length != 8)
              throw new Error("Este campo deve possuir 8 caracteres");
          }
        }
      },
      complemento: {
        type: DataTypes.STRING,
        allowNull: true
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo CIDADE é obrigatório"
          }
        }
      },
      estado: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo ESTADO é obrigatório"
          }
        }
      }      
    }, {
      sequelize,
      tableName: "endereco"
    })
  }

  static associate(models){
    // this.hasOne(models.Usuario,{ foreignKey: 'endereco_id', as: 'endereco_usuario' })
    // this.hasOne(models.Associacao,{ foreignKey: 'endereco_id', as: 'endereco_associacao' })
    // this.hasOne(models.Evento,{ foreignKey: 'endereco_id', as: 'endereco_evento' })
  }

}

module.exports = Endereco;
const { Model, Datatypes } = require("sequelize");

class Endereco extends Model {
  static init(sequelize){
    super.init({
      rua: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo RUA é obrigatório"
          }
        }
      },
      cep: {
        type: Datatypes.INTEGER,
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
        type: Datatypes.STRING,
        allowNull: true
      },
      numero: {
        type: Datatypes.INTEGER,
        allowNull: true
      },
      cidade: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Campo CIDADE é obrigatório"
          }
        }
      },
      estado: {
        type: Datatypes.STRING(2),
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
    this.hasOne(models.Usuario,{ foreignKey: 'endereco_id', as: 'endereco_usuario' })
    this.hasOne(models.Associacao,{ foreignKey: 'endereco_id', as: 'endereco_associacao' })
    this.hasOne(models.Evento,{ foreignKey: 'endereco_id', as: 'endereco_evento' })
  }

}

module.exports = Endereco;
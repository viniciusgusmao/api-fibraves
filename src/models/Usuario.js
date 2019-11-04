const { Model, DataTypes } = require('sequelize');
const utils = require("../utils");

class Usuario extends Model {
  static init(sequelize){
    super.init({
      nome: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Campo NOME é obrigatório"
          } 
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Campo E-MAIL é obrigatório"
          },
          isEmail: {
            msg: "E-mail inválido"
          }
        }
      },
      login: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6,30],
            msg: "Seu login deve conter no mínimo 6 e no máximo 30 caracteres"
          }
        }
      },
      senha: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: {
            msg: "Sua senha deve conter somente letras e números"
          },
          len: {
            args: [6,50],
            msg: "Sua senha deve ter no mínimo 6 e no máximo 50 caracteres"
          }
        }
      },
      cpf: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Este campo deve ser numérico"
          },
          isLengthToOnze(value){
            if (value && value.length != 11)
              throw new Error("Este campo deve conter 11 dígitos")
          },
          isValidCPF(value){
            if (value && !utils.validarCPF(value))
              throw new Error("Digite um CPF válido")
          }
        }
      },
      endereco_id: DataTypes.INTEGER
    },{
      tableName: "usuario",
      sequelize
    });
  }

  static associate(models){
    this.belongsToMany(models.Perfil, { foreignKey: 'usuario_id', through: 'perfil_usuario' })
    this.hasMany(models.Passaro, { foreignKey: 'usuario_id' })
    this.belongsToMany(models.Passaro, { foreignKey: 'usuario_id', through: 'historico_passaro', as: 'historico_passaro' })
    this.hasOne(models.Endereco,{ foreignKey: 'endereco_id', as: 'usuario_endereco' })    
    this.belongsToMany(models.Associacao, { foreignKey: 'usuario_id', through: 'usuario_associacao', as: 'associacao_usuario' })
  }

}

module.exports = Usuario;
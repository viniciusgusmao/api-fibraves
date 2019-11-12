const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcryptjs");
const utils = require("../utils");

class Usuario extends Model {
  static init(sequelize){
    super.init({
      nome: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Campo NOME é obrigatório"
          },
          isVerifySpaceBetweenWords(value){
            if(value.indexOf(' ') == -1)
              throw new Error("Digite um nome e sobrenome.")
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
            msg: "E-mail inválido."
          }
        }
      },
      login: {
        type: DataTypes.STRING,
        allowNull: true,
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
            msg: "Sua senha deve conter somente letras e números."
          },
          len: {
            args: [6,50],
            msg: "Sua senha deve ter no mínimo 6 e no máximo 50 caracteres."
          }
        }
      },
      cpf: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: "Este campo deve ser numérico"
          },
          isLengthToOnze(value){
            if (value && String(value).length != 11)
              throw new Error("Este campo deve conter 11 dígitos")
          },
          isValidCPF(value){
            if (value && !utils.validarCPF(value))
              throw new Error("Digite um CPF válido")
          }
        }
      },
      endereco_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },{
      hooks: {
        beforeSave: async (user, options) => {
          user.senha = await bcrypt.hash(user.senha,8)
        }
      },
      tableName: "usuario",
      sequelize
    });
  }

  static associate(models){
    // this.belongsToMany(models.Perfil, { foreignKey: 'usuario_id', through: 'perfil_usuario' })
    this.hasMany(models.Passaro, { foreignKey: { name: 'usuario_id', allowNull: true }, as: "Passaros" })
    // this.belongsToMany(models.Passaro, { foreignKey: 'usuario_id', through: 'historico_passaro', as: 'historico_passaro' })
    // this.hasOne(models.Endereco,{ foreignKey: 'endereco_id', as: 'usuario_endereco' })    
    // this.belongsToMany(models.Associacao, { foreignKey: 'usuario_id', through: 'usuario_associacao', as: 'associacao_usuario' })
    // this.belongsToMany(models.Evento,{ foreignKey: 'usuario_id', through: 'inscricao', as: 'inscricao_evento' })
    // this.hasMany(models.Marcacao, { foreignKey: 'usuario_id', as: 'marcacao_usuario' })
  }

}

module.exports = Usuario;
const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize){
    super.init({
      nome: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: {
            msg: "Digite apenas letras."
          },
          notEmpty: true 
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
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
            msg: "Sua senha deve conter letras e números"
          },
          len: {
            args: [6,50],
            msg: "Sua senha deve ter no mínimo 6 e no máximo 50 caracteres"
          }
        }
      },
      cpf: DataTypes.BIGINT(11)
    },{
      tableName: "usuario",
      sequelize
    });
  }

  static associate(models){
    this.belongsToMany(models.Perfil, {
      foreignKey: 'usuario_id',
      through: 'perfil_usuario'
    })
  }

}

module.exports = Usuario;
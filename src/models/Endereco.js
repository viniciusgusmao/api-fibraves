module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    rua: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O campo RUA é obrigatório."
        }
      }
    },
    cep: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O campo CEP é obrigatório."
        },
        isEqualToOito(value){
          if(String(value).length != 8)
            throw new Error("O campo CEP deve possuir 8 caracteres.");
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
          msg: "O campo CIDADE é obrigatório."
        }
      }
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O campo ESTADO é obrigatório."
        }
      }
    }      
  },{
    tableName: "endereco"
  });

  return Endereco;
}

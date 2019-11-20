module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
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
          if(String(value).length != 8)
            throw new Error("O campo CEP deve possuir 8 caracteres");
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
  },{
    tableName: "endereco"
  });

  Endereco.associate = function(models){
    Endereco.hasOne(models.Associacao, {
      foreignKey: "endereco_id",
      as: "EnderecoAssociacao"
    });
    Endereco.hasOne(models.Evento, {
      foreignKey: "endereco_id",
      as: "EnderecoEvento"
    });
  }

  return Endereco;
}

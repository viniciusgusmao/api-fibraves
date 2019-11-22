module.exports = (sequelize, DataTypes) => {
  const TipoContato = sequelize.define('TipoContato', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Este nome já existe no sistema."
      },
      validate: {
        notEmpty: {
          msg: "O campo NOME é obrigatório."
        }
      }
    },
    validacao: {
      type: DataTypes.ENUM('telefone','url','nenhuma'),
      allowNull: false,
      defaultValue: "nenhuma",
      validate: {
        isVerifyValue(value) {
          let arr = ['telefone','url','nenhuma'];
          if (!arr.includes(value))
            throw new Error("Somente permitido validações: telefone, email, url e nenhuma.");
        }
      }
    }
  },{
    tableName: "tipocontato"
  });

  TipoContato.associate = function(models){
    TipoContato.hasMany(models.Contato, {
      foreignKey: "tipocontato_id"
    })
  }

  return TipoContato;
}

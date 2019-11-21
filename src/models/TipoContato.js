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
      type: DataTypes.ENUM('telefone','email','url','nenhuma'),
      allowNull: false,
      validate: {
        isVerifyValue(value) {
          let arr = ['telefone','email','url','nenhuma'];
          if (!arr.includes(value))
            throw new Error("Somente permitido validações: telefone, email, url e nenhuma.");
        }
      }
    }
  },{
    tableName: "tipoContato"
  });

  TipoContato.associate = function(models){
    TipoContato.hasMany(models.Contato, {
      foreignKey: "tipocontato_id"
    })
  }

  return TipoContato;
}

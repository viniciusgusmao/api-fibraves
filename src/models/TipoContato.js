module.exports = (sequelize, DataTypes) => {
  const TipoContato = sequelize.define('TipoContato', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo NOME é obrigatório"
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

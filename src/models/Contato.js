module.exports = (sequelize, DataTypes) => {
  const Contato = sequelize.define('Contato', {
    valor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo VALOR é obrigatório"
        }
      }
    },
    tipocontato_id: DataTypes.INTEGER
  },{
    tableName: "contato"
  });

  Contato.associate = function(models){
    Contato.belongsTo(models.TipoContato, {
      foreignKey: "tipocontato_id",
      as: "TiposContato"
    })
  }

  return Contato;
}

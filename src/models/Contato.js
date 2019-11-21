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
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipocontato_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{
    tableName: "contato"
  });

  Contato.associate = function(models){
    Contato.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: {
        singular: "usuario",
        plural: "usuarios"
      }
    }),
    Contato.belongsTo(models.TipoContato, {
      foreignKey: "tipocontato_id",
      as: "TiposContato"
    })
  }

  return Contato;
}

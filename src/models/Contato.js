const { Usuario, TipoContato } = require("@models");

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
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id',
        onDelete: 'CASCADE'
      }
    },
    tipocontato_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoContato,
        key: 'id',
        onDelete: 'CASCADE'
      }
    }
  },{
    tableName: "contato"
  });

  Contato.associate = function(models){
    Contato.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      onDelete: 'cascade',
      hooks: true,
      as: {
        singular: "usuario",
        plural: "usuarios"
      }
    }),
    Contato.belongsTo(models.TipoContato, {
      foreignKey: "tipocontato_id",
      onDelete: 'cascade',
      hooks: true,
      as: "TiposContato"
    })
  }

  return Contato;
}

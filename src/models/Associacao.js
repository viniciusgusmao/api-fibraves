module.exports = (sequelize, DataTypes) => {
  const Associacao = sequelize.define('Associacao', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O campo NOME é obrigatório."
        }
      }
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: true
    },
    obs: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },{
    tableName: "associacao"
  });

  Associacao.associate = function(models){
    Associacao.belongsToMany(models.Usuario, {
      foreignKey: "associacao_id",
      through: models.UsuarioAssociacao,
      onDelete: 'cascade',
      as: {
        singular: "Usuario",
        plural: "Usuarios"
      }
    });
    Associacao.belongsToMany(models.Evento, {
      foreignKey: "associacao_id",
      through: "associacao_evento",
      onDelete: 'cascade',
      as: {
        singular: "Evento",
        plural: "Eventos"
      }
    });
    Associacao.belongsTo(models.Endereco, {
      foreignKey: "endereco_id",
      onDelete: "cascade",
      as: 'endereco'
    })
  }

  return Associacao;
}

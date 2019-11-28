module.exports = (sequelize, DataTypes) => {
  const Associacao = sequelize.define('Associacao', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo NOME é obrigatório"
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
    endereco_id: DataTypes.INTEGER
  },{
    tableName: "associacao"
  });

  Associacao.associate = function(models){
    Associacao.belongsToMany(models.Usuario, {
      foreignKey: "associacao_id",
      through: models.UsuarioPerfil,
      as: {
        singular: "AssociacaoUsuario",
        plural: "AssociacoesUsuario"
      }
    });
    Associacao.belongsToMany(models.Evento, {
      foreignKey: "associacao_id",
      through: "associacao_evento",
      as: {
        singular: "AssociacaoEvento",
        plural: "AssociacoesEvento"
      }
    });
    Associacao.hasOne(models.Endereco, {
      foreignKey: "endereco_id",
      as: "AssociacaoEndereco"
    });
  }

  return Associacao;
}

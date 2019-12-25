module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define('Evento', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo NOME é obrigatório"
        }
      }
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo DATA é obrigatório"
        }
      }
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo HORÁRIO é obrigatório"
        }
      }
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
    tableName: "evento"
  });

  Evento.associate = function(models){
    Evento.belongsToMany(models.Usuario, {
      foreignKey: "evento_id",
      through: models.Inscricao,
      as: {
        singular: "Usuario",
        plural: "Usuarios"
      }
    });
    Evento.belongsToMany(models.Associacao, {
      foreignKey: "evento_id",
      through: "associacao_evento",
      as: {
        singular: "Associacao",
        plural: "Associacoes"
      }
    });
    Evento.belongsToMany(models.FormaPagamento, {
      foreignKey: "evento_id",
      through: "evento_formapagamento",
      as: {
        singular: "FormaPagamento",
        plural: "FormasPagamento"
      }
    });
    Evento.belongsToMany(models.Especie, {
      foreignKey: "evento_id",
      through: "evento_especie",
      as: {
        singular: "Especie",
        plural: "Especies"
      }
    });
    Evento.belongsToMany(models.Passaro, {
      foreignKey: "evento_id",
      through: "passaro_evento",
      as: "PassaroEvento"
    });
    Evento.belongsTo(models.Endereco, {
      foreignKey: "endereco_id",
      onDelete: "cascade",
      as: 'endereco'
    })
    Evento.hasMany(models.Fase, {
      foreignKey: "evento_id",
      as: "FaseEvento"
    });
    Evento.hasMany(models.Marcacao, {
      foreignKey: "evento_id",
      as: "MarcacaoEvento"
    });
  }

  return Evento;
}

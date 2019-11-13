const Usuario = require("../models2/Usuario");

module.exports = (sequelize, DataTypes) => {
  const Passaro = sequelize.define('Passaro', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo NOME é obrigatório"
        }
      }
    },
    anilha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo ANILHA é obrigatório"
        }
      }
    },
    nascimento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo SEXO é obrigatório"
        }
      }
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    especie_id: DataTypes.INTEGER,
    usuario_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  },{
    tableName: "passaro"
  });

  Passaro.associate = function(models){
    Passaro.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "Dono"
    });
    Passaro.belongsTo(models.Especie, {
      foreignKey: "especie_id",
      as: "EspeciePassaros"
    });
    Passaro.belongsToMany(models.Usuario, {
      foreignKey: "usuario_id",
      through: "historico_passaro",
      as: "PassaroHistorico"
    });
    Passaro.belongsToMany(models.Evento, {
      foreignKey: "passaro_id",
      through: "passaro_evento",
      as: "EventoPassaro"
    });
    Passaro.hasMany(models.Marcacao, {
      foreignKey: "passaro_id",
      as: "MarcacaoPassaro"
    });
  }

  return Passaro;
}

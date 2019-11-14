module.exports = (sequelize, DataTypes) => {
  const Fase = sequelize.define('Fase', {
    max_classificados: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimo_canto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tipo_fase: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome_fase: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pontos_distribuir: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    evento_id: DataTypes.INTEGER,
    especie_id: DataTypes.INTEGER
  },{
    tableName: "fase"
  });

  Fase.associate = function(models){
    Fase.belongsTo(models.Evento, {
      foreignKey: "evento_id",
      as: "EventoFase"
    })
    Fase.belongsTo(models.Especie, {
      foreignKey: "especie_id",
      as: "EspecieFase"
    })
    Fase.hasMany(models.Marcacao, {
      foreignKey: "fase_id",
      as: "MarcacaoFase"
    })
  }

  return Fase;
}

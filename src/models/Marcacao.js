module.exports = (sequelize, DataTypes) => {
  const Marcacao = sequelize.define('Marcacao', {
    qtd_canto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    passaro_id: DataTypes.INTEGER,
    evento_id: DataTypes.INTEGER,
    fase_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER
  },{
    tableName: "marcacao"
  });

  Marcacao.associate = function(models){
    Marcacao.belongsTo(models.Usuario,{
      foreignKey: "usuario_id",
      as: "UsuarioMarcacao"
    })
    Marcacao.belongsTo(models.Evento,{
      foreignKey: "evento_id",
      as: "EventoMarcacao"
    })
    Marcacao.belongsTo(models.Fase,{
      foreignKey: "fase_id",
      as: "FaseMarcacao"
    })
    Marcacao.belongsTo(models.Passaro, {
      foreignKey: "passaro_id",
      as: "PassaroMarcacao"
    });
  }

  return Marcacao;
}

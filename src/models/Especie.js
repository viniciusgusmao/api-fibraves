module.exports = (sequelize, DataTypes) => {
  const Especie = sequelize.define('Especie', {
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
    tableName: "especie"
  });

  Especie.associate = function(models){
    Especie.belongsToMany(models.Evento, {
      foreignKey: "especie_id",
      through: "evento_especie",
      as: "EventoEspecie"
    });
    Especie.hasMany(models.Passaro, {
      foreignKey: "especie_id",
      as: "PassarosEspecie"
    })
    Especie.hasMany(models.Fase, {
      foreignKey: "especie_id",
      as: "FaseEspecie"
    })
  }

  return Especie;
}

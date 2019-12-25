module.exports = (sequelize, DataTypes) => {
  const Especie = sequelize.define('Especie', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Este nome de espécie já está em uso no sistema."
      },
      validate: {
        notEmpty: {
          msg: "O campo NOME é obrigatório."
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
      as: {
        singular: "Evento",
        plural: "Eventos"
      }
    });
    Especie.hasMany(models.Passaro, {
      foreignKey: "especie_id",
      as: "Passaros"
    })
    Especie.hasMany(models.Fase, {
      foreignKey: "especie_id",
      as: "FaseEspecie"
    })
  }

  return Especie;
}

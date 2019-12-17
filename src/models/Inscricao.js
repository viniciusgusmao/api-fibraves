module.exports = (sequelize, DataTypes) => {
  const Inscricao = sequelize.define('Inscricao', {
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    num_inscricao: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{
    tableName: "inscricao",
  })
    
  return Inscricao;
}

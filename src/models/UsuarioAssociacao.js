module.exports = (sequelize, DataTypes) => {
  const UsuarioAssociacao = sequelize.define('UsuarioAssociacao', {
    presidente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  },{
    tableName: "usuario_associacao"
  })
    
  return UsuarioAssociacao;
}

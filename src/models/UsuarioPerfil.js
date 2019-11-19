module.exports = (sequelize, DataTypes) => {
  const UsuarioPerfil = sequelize.define('UsuarioPerfil', {
    ctf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crmv: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },{
    tableName: "perfil_usuario"
  })
    
  return UsuarioPerfil;
}

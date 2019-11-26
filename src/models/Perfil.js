module.exports = (sequelize, DataTypes) => {
  const Perfil = sequelize.define('Perfil', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Campo NOME é obrigatório."
        }
      }
    },            
  },{
    tableName: "perfil"
  });

  Perfil.associate = function(models){
    Perfil.belongsToMany(models.Usuario, {
      foreignKey: "perfil_id",
      through: models.UsuarioPerfil,
      onDelete: "cascade",
      hooks: true,
      as: {
        singular: "UsuarioPerfil",
        plural: "UsuariosPerfil"
      }
    })
  }

  return Perfil;
}

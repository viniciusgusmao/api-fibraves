module.exports = (sequelize, DataTypes) => {
  const FormaPagamento = sequelize.define('FormaPagamento', {
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
    tableName: "formaPagamento"
  });

  FormaPagamento.associate = function(models){
    FormaPagamento.belongsToMany(models.Evento, {
      foreignKey: "formapagamento_id",
      through: "evento_formapagamento",
      as: "EventoFormapagamento"
    });
  }

  return FormaPagamento;
}

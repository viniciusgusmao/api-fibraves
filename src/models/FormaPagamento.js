module.exports = (sequelize, DataTypes) => {
  const FormaPagamento = sequelize.define('FormaPagamento', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Este tipo de forma de pagamento já está em uso no sistema."
      },
      validate: {
        notEmpty: {
          msg: "O campo NOME é obrigatório."
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
      as: {
        singular: "Evento",
        plural: "Eventos"
      }
    });
  }

  return FormaPagamento;
}

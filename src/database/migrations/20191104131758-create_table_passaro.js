'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('passaro', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        anilha: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        nascimento: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        sexo: {
          type: Sequelize.STRING(15),
          allowNull: false
        },
        documento: {
          type: Sequelize.STRING,
          allowNull: true
        },
        foto: {
          type: Sequelize.STRING,
          allowNull: true
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'usuario', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
    
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.dropTable('passaro');   
  }
};

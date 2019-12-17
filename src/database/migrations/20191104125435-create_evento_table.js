'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.createTable('evento', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      horario: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      obs: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'endereco', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.dropTable('evento');    
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.createTable('especie', { 
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
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.dropTable('especie');    
  }
};

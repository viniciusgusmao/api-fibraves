'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {   
      return queryInterface.createTable('formapagamento', { 
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
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('formapagamento');   
  }
};

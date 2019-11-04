'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('tipocontato', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        validacao: {
          type: Sequelize.STRING,
          allowNull: true
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });   
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.dropTable('tipocontato');   
  }
};

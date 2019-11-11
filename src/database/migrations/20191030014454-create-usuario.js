'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('usuario', { 
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
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        login: {
          type: Sequelize.STRING,
          allowNull: true
        },
        senha: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cpf: {
          type: Sequelize.BIGINT(11),
          allowNull: true
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });   
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('usuario');    
  }
};

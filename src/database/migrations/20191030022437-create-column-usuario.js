'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.addColumn(
        'usuario',
        'cpf', 
        { 
          type: Sequelize.STRING,
          allowNull: true
        }
      );
  },

  down: (queryInterface, Sequelize) => {   
      return queryInterface.removeColumn('usuario','cpf');    
  }
};

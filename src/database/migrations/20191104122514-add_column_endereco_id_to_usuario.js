'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('usuario', 'endereco_id', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.removeColumn('usuario', 'endereco_id');   
  }
};

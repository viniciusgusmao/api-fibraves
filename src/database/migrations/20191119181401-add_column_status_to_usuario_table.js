'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('usuario', 'status', {
        type: Sequelize.INTEGER,
        defaultValue: 1
      });
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.removeColumn('usuario', 'status');   
  }
};

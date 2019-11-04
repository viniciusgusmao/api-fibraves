'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {   
      return queryInterface.addColumn('passaro', 'especie_id', Sequelize.INTEGER);    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.removeColumn('passaro', 'especie_id');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.addColumn('marcacao', 'fase_id', Sequelize.INTEGER );    
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.removeColumn('marcacao','fase_id');    
  }
};

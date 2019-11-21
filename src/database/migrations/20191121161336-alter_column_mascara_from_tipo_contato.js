'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('tipocontato','validacao', { 
        type: Sequelize.ENUM('telefone','email','url','nenhuma') 
      });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('tipocontato','validacao', { 
      type: Sequelize.STRING 
    });
  }
};

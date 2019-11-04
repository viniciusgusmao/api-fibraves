'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('endereco', 'numero', Sequelize.INTEGER, { 
        allowNull: true
       });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('endereco', 'numero', Sequelize.INTEGER, { 
      allowNull: false
     });
    
  }
};

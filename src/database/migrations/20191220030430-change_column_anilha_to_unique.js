'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.changeColumn('passaro', "anilha", { 
        type: Sequelize.STRING,  
        unique: true 
        }
      );
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.changeColumn('passaro', "anilha", { 
        unique: false 
      }
    );
  }
};

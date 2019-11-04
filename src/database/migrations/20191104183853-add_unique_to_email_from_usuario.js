'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addConstraint('usuario',['email'], { 
        type: 'unique',
        name: 'custom_unique_email_unq'
      });
  },

  down: (queryInterface, Sequelize) => {   
      return queryInterface.removeConstraint('usuario','email');    
  }
};

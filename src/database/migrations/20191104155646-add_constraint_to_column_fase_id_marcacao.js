'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('marcacao', ['fase_id'], { 
      type: 'foreign key',
      name: 'custom_fkey_faseid',
      references: {
        table: 'fase',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'    
    });
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.removeConstraint('marcacao','custom_fkey_faseid');    
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.addConstraint('passaro', ['especie_id'], {
      type: 'foreign key',
      name: 'custom_fkey_especie_id',
      references: {
        table: 'especie',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });
    
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.removeConstraint('passaro','custom_fkey_especie_id');
    
  }
};

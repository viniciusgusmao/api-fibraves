'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.addConstraint('usuario', ['endereco_id'], {
      type: 'foreign key',
      name: 'custom_fkey_endereco_id',
      references: {
        table: 'endereco',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });    
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.removeConstraint('usuario','custom_fkey_endereco_id');
  }
};

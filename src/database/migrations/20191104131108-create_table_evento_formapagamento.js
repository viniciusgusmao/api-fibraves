'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('evento_formapagamento', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        formapagamento_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: { model: 'formapagamento', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        evento_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: { model: 'evento', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: (queryInterface, Sequelize) => {   
      return queryInterface.dropTable('evento_formapagamento');    
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('associacao_evento', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        associacao_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: { model: 'associacao', key: 'id' },
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
      return queryInterface.dropTable('associacao_evento');    
  }
};

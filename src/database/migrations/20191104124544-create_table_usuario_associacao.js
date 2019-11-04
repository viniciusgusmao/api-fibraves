'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('usuario_associacao', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'usuario', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        associacao_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'associacao', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        presidente: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });   
  },

  down: (queryInterface, Sequelize) => {   
      return queryInterface.dropTable('usuario_associacao');    
  }
};

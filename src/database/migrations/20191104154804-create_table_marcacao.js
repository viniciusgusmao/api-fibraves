'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('marcacao', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        passaro_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'passaro', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        evento_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'evento', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'usuario', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        qtd_canto: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: (queryInterface, Sequelize) => {   
      return queryInterface.dropTable('marcacao');    
  }
};

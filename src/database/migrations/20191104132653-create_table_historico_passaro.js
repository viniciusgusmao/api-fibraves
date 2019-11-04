'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('historico_passaro', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: { model: 'usuario', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        passaro_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: { model: 'passaro', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: (queryInterface, Sequelize) => {   
      return queryInterface.dropTable('historico_passaro');    
  }
};

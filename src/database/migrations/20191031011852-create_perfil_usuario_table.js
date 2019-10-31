'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('perfil_usuario', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        }, 
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'usuario', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        perfil_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'perfil', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        crmv: {
          type: Sequelize.STRING,
          allowNull: true
        },
        ctf: {
          type: Sequelize.STRING,
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('perfil_usuario');
    
  }
};

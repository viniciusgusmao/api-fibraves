'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('contato', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        valor: {
          type: Sequelize.STRING,
          allowNull: false
        },
        tipocontato_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "tipocontato", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
        },
        usuario_id: {
          type: Sequelize.INTEGER, 
          allowNull: false,
          references: { model: "usuario", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"        
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.dropTable('contato');
  }
};

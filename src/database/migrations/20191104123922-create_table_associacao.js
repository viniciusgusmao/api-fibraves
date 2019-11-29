'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.createTable('associacao', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imagem: {
        type: Sequelize.STRING,
        allowNull: true
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'endereco', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      obs: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });   
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.dropTable('associacao');
   
  }
};

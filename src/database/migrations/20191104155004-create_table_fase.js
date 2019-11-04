'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.createTable('fase', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        especie_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'especie', key: 'id' },
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
        max_classificados: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        pontos_distribuir: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        minimo_canto: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        tipo_fase: {
          type: Sequelize.STRING,
          allowNull: true
        },
        nome_fase: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: (queryInterface, Sequelize) => {   
      return queryInterface.dropTable('fase');    
  }
};

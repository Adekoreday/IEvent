export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserEvents', {
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    eventsId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    isConfirmed: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('UserEvents')
};
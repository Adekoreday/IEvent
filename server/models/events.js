export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    isPremium:  DataTypes.BOOLEAN,
    location: DataTypes.STRING,
    date: DataTypes.DATE,
    deadline: DataTypes.DATE
  }, {});
  Events.associate = function(models) {
    Events.belongsToMany(models.User, {
      foreignKey: 'eventsId',
      otherKey: 'userId',
      through: 'UserEvents',
      as: 'events'
    });
  };
  return Events;
};
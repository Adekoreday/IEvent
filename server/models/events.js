export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    isPremium:  DataTypes.BOOLEAN,
    location: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
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

  Events.findByCategory = async (category) => {
    const event = await Events.findAll({ where: { category } });
    if (event) return event;
    return null;
  };
  Events.findById = async (id) => {
    const event = await Events.findOne({ where: { id } });
    if (event) return event.dataValues;
    return null;
  };
  return Events;
};
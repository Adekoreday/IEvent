export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isPremium: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Events, {
      foreignKey: 'userId',
      otherKey: 'eventsId',
      through: 'UserEvents',
      as: 'users'
    });
  };
  return User;
};
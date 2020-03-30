
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isPremium: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Events, {
      foreignKey: 'userId',
      otherKey: 'eventsId',
      through: 'UserEvents',
      as: 'events',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  User.findByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (user) return user.dataValues;
    return null;
  };

  User.findById = async (id) => {
    const user = await User.findOne({ where: { id } });
    if (user) return user;
    return null;
  };

  User.updatePasswordById = async (id, newPassword) => {
    const user = await User.update(
      { password: newPassword },
      { where: { id } }
    );
    return user[0];
  };
  return User;
};
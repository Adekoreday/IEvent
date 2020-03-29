import bcrypt from 'bcryptjs';
export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Adeyemi',
        lastname: 'Adekorede',
        email: 'adekorede@mailinator.com',
        password: bcrypt.hashSync('password@5', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Adeyemi',
        lastname: 'korede',
        email: 'ade@mailinator.com',
        password: bcrypt.hashSync('password@5', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Events',
    [
      {
        name: 'MeetUp',
        category: 'Adekorede',
        isPremium: true,
        location: 'lagos, Nigeria',
        date: new Date(),
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leap',
        category: 'Adekorede',
        isPremium: false,
        location: 'lagos, Nigeria',
        date: new Date(),
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Events', null, {})
};

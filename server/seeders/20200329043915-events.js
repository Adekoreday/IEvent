export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Events',
    [
      {
        name: 'MeetUp',
        category: 'Adekorede',
        isPremium: true,
        location: 'lagos, Nigeria',
        imageUrl: 'https://res.cloudinary.com/kaytronics/image/upload/v1585100213/web.ae_.processing.courtesy_lrdswh.jpg',
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
        imageUrl: 'https://res.cloudinary.com/kaytronics/image/upload/v1585100213/web.ae_.processing.courtesy_lrdswh.jpg',
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

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Events',
    [
      {
        name: 'South Africa meetup',
        category: 'meetup',
        isPremium: false,
        location: 'victoria, Cape town',
        imageUrl: 'https://res.cloudinary.com/kaytronics/image/upload/v1585100213/web.ae_.processing.courtesy_lrdswh.jpg',
        date: new Date(),
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nigeria Meetup',
        category: 'leap',
        isPremium: false,
        location: 'lagos, Nigeria',
        imageUrl: 'https://res.cloudinary.com/kaytronics/image/upload/v1585100213/web.ae_.processing.courtesy_lrdswh.jpg',
        date: new Date(),
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brazil Vanhackaton',
        category: 'vanhackaton',
        isPremium: false,
        location: 'Brazil, South America',
        imageUrl: 'https://res.cloudinary.com/kaytronics/image/upload/v1585100213/web.ae_.processing.courtesy_lrdswh.jpg',
        date: new Date(),
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Premium Only Webinar',
        category: 'premium',
        isPremium: true,
        location: 'Canada',
        imageUrl: 'https://res.cloudinary.com/kaytronics/image/upload/v1585100213/web.ae_.processing.courtesy_lrdswh.jpg',
        date: new Date(),
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Open for All',
        category: 'open webinar',
        isPremium: false,
        location: 'Canada',
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

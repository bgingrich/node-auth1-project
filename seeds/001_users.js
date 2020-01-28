exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: 'user1test123'},
        {id: 2, username: 'user2', password: 'user2test123'},
        {id: 3, username: 'user3', password: 'user3test123'}
      ]);
    });
};
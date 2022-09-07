const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'eclevela-1234',
    email: 'eliot@email.com',
    password: 'password123'
  },
  {
    username: 'easmsm',
    email: 'emily@email.com',
    password: 'password123'
  },
  {
    username: 'danielcnow',
    email: 'daniel@email.com',
    password: 'password123'
  },
  {
    username: 'tayyjohnson',
    email: 'taylor@email.com',
    password: 'password123'
  },
  {
    username: 'whittenburgsa',
    email: 'savannah@email.com',
    password: 'password123'
  },
 
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;

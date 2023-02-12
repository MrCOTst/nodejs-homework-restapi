const User = {
    _id: '604160bf244710506826c5bc',
    subscription: 'pro',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDE2MGJmMjQ0NzEwNTA2ODI2YzViYyIsImlhdCI6MTYxNTU0Mjg3MywiZXhwIjoxNjE1NTUwMDczfQ._3Q9Q9eoRIPn40B6ha-_Eybvp9GvZb1muv3BPiGStf4',
    email: 'example@example.com',
    password: '$2a$08$okH6376YlenyP1aDx3eJkuE6NoiQNWSXs66Mul0RQr1lrAR9S4pMi',
    avatarURL: '604160bf244710506826c5bc\\1615557622893-default.png',
  };
  
  const users = [];
  users[0] = User;
  
  const newUser = { email: 'example@test.com', password: '1234567' };


  module.exports = { User, users, newUser };
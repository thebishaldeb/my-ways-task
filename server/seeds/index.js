var mongoose = require('mongoose'),
  config = require('../config').get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const { User } = require('../models/user');
const { Internship } = require('../models/internship');

mongoose
  .connect(config.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    var userObj = [
      { username: 'john' },
      { username: 'peter' },
      { username: 'amy' },
      { username: 'hannah' },
      { username: 'michael' },
      { username: 'sandy' },
      { username: 'betty' },
      { username: 'richard' },
      { username: 'susan' },
      { username: 'vicky' },
    ];
    Promise.all([User.create(userObj)]).then(([users]) => {
      var intObj = [
        {
          name: 'Internship 1',
          users: [users[0], users[1], users[2], users[3], users[4]],
        },
        {
          name: 'Internship 2',
          users: [users[5], users[6], users[7], users[8], users[9]],
        },
        {
          name: 'Internship 3',
          users: [users[0], users[6], users[2], users[8], users[4]],
        },
        {
          name: 'Internship 4',
          users: [users[5], users[1], users[7], users[3], users[9]],
        },
      ];
      Promise.all([Internship.create(intObj)]).then(() =>
        mongoose.connection.close(),
      );
    });
  });

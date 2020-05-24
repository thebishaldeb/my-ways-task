var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  config = require('./config').get(process.env.NODE_ENV),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http);

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const connectDb = () => {
  return mongoose.connect(config.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const { User } = require('./models/user');
const { Message } = require('./models/message');
const { Internship } = require('./models/internship');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('client/build'));

app.get('/internships', (req, res) => {
  Internship.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

app.get('/getInternship', (req, res) => {
  let id = req.query.id;
  Internship.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  }).populate('users');
});

app.get('/message', (req, res) => {
  let id = req.query.id;
  let userId = req.query.userId;
  Internship.findOne(
    {
      _id: id,
      users: { _id: userId },
    },
    'name users.username',
    (err, intDoc) => {
      if (err) return res.status(400).send(err);
      res.send(intDoc);
    },
  ).populate({ path: 'users', match: { _id: userId }, select: 'username' });
});

io.on('connection', function (socket) {
  socket.on('room', function (room) {
    var res = room.split('-');
    let id = res[0];
    let userId = res[1];
    Message.find({
      company: { _id: id },
      user: { _id: userId },
    })
      .sort({ createdAt: 1 })
      .exec((err, messages) => {
        if (err) return console.error(err);
        socket.emit(room, messages);
      });
    socket.on('message', msg => {
      const message = new Message({
        content: msg.content,
        sender: msg.sender,
        company: { _id: msg.id },
        user: { _id: msg.userId },
      });
      message.save(err => {
        if (err) return console.error(err);
      });
      io.emit(`${msg.id}-${msg.userId}-1`, msg);
    });
  });
});

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3001;

connectDb().then(async () => {
  http.listen(port, () => {
    console.log('listening on *:' + port);
  });
});

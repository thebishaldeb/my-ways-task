var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  config = require('./config').get(process.env.NODE_ENV),
  app = express();

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
  Internship.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    User.findById(userId, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.send({ message: 'Got in database' });
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
  app.listen(port, () => {
    console.log('SERVER IS RUNNING!!!');
  });
});

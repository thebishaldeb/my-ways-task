const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE:
      // "mongodb+srv://admintu:admintu@thebishaldeb-qlzsd.mongodb.net/test?retryWrites=true&w=majority"
      process.env.MONGODB_URI,
  },
  default: {
    SECRET: 'HEY123USER',
    DATABASE: 'mongodb://localhost:27017/myways',
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};

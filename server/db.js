const mongoose = require('mongoose')

// const connection = 'mongodb://localhost:27017/mastermind'
// mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true })
// console.log('mongoose connecting at: ' + connection);
mongoose.connect(`mongodb+srv://${process.env.myusername}:${process.env.mypassword}@cluster0.moabh.mongodb.net/mastermind?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });

const publicGames = mongoose.Schema({
  user: String,
  gameResult: String,
  difficulty: String,
  gameType: String,
  guesses: Array,
  gameAnswer: Array,
  date: Date
});

const privateGames = mongoose.Schema({
  user: String,
  gameResult: String,
  difficulty: String,
  gameType: String,
  guesses: Array,
  gameAnswer: Array,
  date: Date
});

const users = mongoose.Schema({
  username: String,
  password: String,
  // email: String,
  salt: String, //double check how salt works

  // date: Date
});

const PublicGames = mongoose.model('PublicGames', publicGames);
const PrivateGames = mongoose.model('PrivateGames', privateGames);
const Users = mongoose.model('Users', users);

module.exports.pubg = PublicGames;
module.exports.privg = PrivateGames;
module.exports.users = Users;
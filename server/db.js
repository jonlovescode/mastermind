const mongoose = require('mongoose')

const connection = 'mongodb://localhost:27017/mastermind'
mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true })
console.log('mongoose connecting at: ' + connection);

const mastermindSchema = mongoose.Schema({
  gameResult: String,
  difficulty: String,
  gameType: String,
  guesses: Array
  // term: String,
  // def: String
});

const Mastermind = mongoose.model('Mastermind', mastermindSchema);

module.exports = Mastermind;
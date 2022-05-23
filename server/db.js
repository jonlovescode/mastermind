const mongoose = require('mongoose')

// const connection = 'mongodb://localhost:27017/mastermind'
// mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true })
// console.log('mongoose connecting at: ' + connection);
mongoose.connect(`mongodb+srv://${process.env.myusername}:${process.env.mypassword}@cluster0.moabh.mongodb.net/mastermind?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });

const mastermindSchema = mongoose.Schema({
  gameResult: String,
  difficulty: String,
  gameType: String,
  guesses: Array,
  gameAnswer: Array
  // term: String,
  // def: String
});

const Mastermind = mongoose.model('Mastermind', mastermindSchema);

module.exports = Mastermind;
//functions to run inside express routes
const Model = require('../models/Model.js')

exports.completedGames = (req, res) => {
  Model.findAll()
    .then((results) => {
      res.send(results)
    })
    .catch((err) => {
      console.error('controls.js hit an error in completedGames, model.findAll: ', err)
    })
}

exports.addGame = (req, res) => {
  console.log('invoked addGame - checking req.body: ', req.body)
  Model.add(req.body)
  res.send('just posted: ' + JSON.stringify(req.body))
}
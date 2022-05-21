// runs queries to add things to mongo model
const db = require('../db.js')

exports.findAll = () => {
  return db.find({})
}

exports.add = (data) => {
  return db.create(data)
}
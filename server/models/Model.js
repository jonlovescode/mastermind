// runs queries to add things to mongo model
const pubg = require('../db.js').pubg
const privg = require('../db.js').privg
const users = require('../db.js').users


exports.findAll = () => {
  return pubg.find({})
}

exports.add = (data) => {
  return pubg.create(data)
}
exports.findAllPriv = (username) => {

  return privg.find({user : username})
}
exports.addPriv = (data) => {
  return privg.create(data)
}

const saltGenerator = (username) => {
  return 'salt' + username
}

const passHash = (password) => {
  return password + 'hashed'
}

exports.verifyLogin = (username, password) => {
  //first get salt associated with user
  //then check if usernames and passwords match
  //return result

  //first find username
  return users.find({username:username})
    .then((result) => {
      if (result.length === 1) {
        //check password
        if (passHash(password) === result[0].password) {
          return true
        }
      }
      return false
    })
    .catch((err) => {
      console.error('verifyLogin ran into an error in Models: ', err)
    })

}

exports.validUsername = (username) => {
  return users.find({username:username})
    .then((result) => {
      if (result.length > 0) {
        return false
      } else {
        return true
      }
    })
    .catch((err) => {
      console.error('hit error when validating username: ', err)
    })
}

exports.createUser = (username, password, email) => {

  return users.create({
    username: username,
    salt: saltGenerator(username),
    password: passHash(password),

  })
}
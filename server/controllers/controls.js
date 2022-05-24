//functions to run inside express routes
const Model = require("../models/Model.js");

exports.completedGames = (req, res) => {
  Model.findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(
        "controls.js hit an error in completedGames, model.findAll: ",
        err
      );
    });
};
exports.completedPrivGames = (req, res) => {
  Model.findAllPriv(req.params.username)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(
        "controls.js hit an error in completedGames, model.findAll: ",
        err
      );
    });
};

exports.addGame = (req, res) => {
  Model.add(req.body);
  res.send("just posted: " + JSON.stringify(req.body));
};

exports.addPrivGame = (req, res) => {
  Model.addPriv(req.body);
  res.send("just posted: " + JSON.stringify(req.body));
};

exports.login = (req, res) => {
  Model.verifyLogin(req.body.username, req.body.password).then((result) =>
    result ? res.send("success") : res.send("failed to login")
  );
};

exports.validUsername = (req, res) => {
  console.log("validating username");
  Model.validUsername(req.body.username)
    .then((result) =>
      result
        ? res.send("valid")
        : res.send("NOT valid,  username already exists in db")
    )
    .catch((err) =>
      console.error("valid username struck error in controls.js: ", err)
    );
};

exports.createUser = (req, res) => {
  Model.createUser(req.body.username, req.body.password, req.body.email).then(
    (result) => {
      res.send(
        "created new user " + req.body.username + "with results: " + result
      );
    }
  );
};

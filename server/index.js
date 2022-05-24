require("dotenv").config();
const express = require("express");
const path = require("path");
const Mastermind = require("./db.js")
const Controls = require("./controllers/controls.js")

const app = express();

// middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json())

//routes
app.get('/publicGames', Controls.completedGames)
app.get('/privateGames/:username', Controls.completedPrivGames)

app.post('/publicGames', Controls.addGame)
app.post('/privateGames', Controls.addPrivGame)

app.post('/users', Controls.createUser) // to register/create user
app.post(`/valid`, Controls.validUsername) // for valid registration, simple find({})

app.post('/login', Controls.login) // for verify login

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


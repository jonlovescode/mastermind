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
app.get('/mastermind', Controls.completedGames)

app.post('/completed', Controls.addGame)
// app.post('/completed', (req, res) => {
//   console.log('post request detected')
// })

app.get('/randominteger', (req, res) => {

})

app.listen(3000);
console.log(`Listening at http://localhost:3000`);

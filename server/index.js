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

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

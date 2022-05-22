import React from 'react'
const axios = require('axios')

function Home(props) {
  return <div>
    <header>Welcome to Mastermind</header>
    <button onClick={props.clickHandler} title="Start">Start Game</button>
    <button onClick={props.clickHandler} title="Rules">Rules</button>
    <button onClick={props.clickHandler} title="Completed">Completed Games</button>
  </div>
}

export default Home
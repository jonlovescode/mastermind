import React from 'react'
const axios = require('axios')

function Home(props) {
  return <div>
    <header>Welcome to Mastermind</header>
    <button onClick={props.clickHandler}>Start Game</button>
    <button>Rules</button>
    <button>Completed Games</button>
  </div>
}

export default Home
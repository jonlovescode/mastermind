import React from 'react'
import '../App.css'

const axios = require('axios')

function Home(props) {
  return <div>
    <header>
      <div class="title">
      Welcome to Mastermind
      </div>
    </header>
    {/* <div class="wrapper">
      <> */}
        <div class="container">
          <div class="item start">

            <button onClick={props.clickHandler} title="Start">start</button>
          </div>
        {/* </div> <div class="container"> */}
          <div class="item other">
            <button onClick={props.clickHandler} title="Rules">rules</button>
            <button onClick={props.clickHandler} title="Completed">games</button>
            <button onClick={props.clickHandler} title="Login">login</button>
          </div>
        </div>
      {/* </>
    </div> */}
  </div>
}

export default Home
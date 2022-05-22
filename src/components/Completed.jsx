import React, { useState } from 'react'
const axios = require('axios')

function Completed(props) {


  return <>
    <div>Completed Games</div>
    <div>{props.data.map((game, i) => {
      return <li onClick={() => {
        props.setAnalysis(game)
        props.setPage(4)
      }} key={game._id}>{game.gameResult} - {game.difficulty} {game.gameType} : {game.guesses.length} guesses</li> //onClick, redirect to a page that shows the guesses and corresponding results and the answer for that game
    })}</div>
    <button onClick={() => {
      props.setPage(0)
    }} title="Back">Back</button>
  </>

}

export default Completed
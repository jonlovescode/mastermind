import './App.css';
import React from 'react'
import Home from './components/Home.js'
import Game from './components/Game.js'
import WinLose from './components/WinLose.js'
import Completed from './components/Completed.js'
const axios = require('axios')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // games: [], <-- this should be stored in db
      answer: [],
      page: 0, //state of game page needs to be stored in mongo as gamestate
      lastGameResult : false

    }
    this.setAnswer = this.setAnswer.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setResult = this.setResult.bind(this)
  }

  componentDidMount() {
    console.log('mounted ', this.state)
  }

  setResult(bool) {
    this.setState({lastGameResult : bool})
  }

  setPage(num) {
    this.setState({
      page : num,
    })
  }

  renderPage() {
    if (this.state.page === 0) {
      return <Home setPage={this.setPage} clickHandler={this.setAnswer}></Home>
    } else if (this.state.page === 1) {
      return <Game setPage={this.setPage} answer={this.state.answer} setResult={this.setResult}></Game>
    } else if (this.state.page === 2) {
      return <WinLose setPage={this.setPage} lastGameResult={this.state.lastGameResult}></WinLose>
    } else if (this.state.page === 3) {
      return <Completed setPage={this.setPage}></Completed>
    }
  }

  setAnswer(e) {
    console.log('setAnswer invoked ', e.target)
    axios.get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
      .then((results) => {
        console.log('setanswer results: ', results)
        this.setState({
          answer: results.data.split('\n').filter(Boolean)
        }, () => {
          console.log('whats my state: ', this.state)
        })
      })
      .catch((err) => {
        console.error('setAnswer ran into an error: ', err)
      })
    this.setPage(1)

  }

  render () {
    return <div>

      {this.renderPage()}
    </div>
  }
}

export default App;

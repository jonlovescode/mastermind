import './App.css';
import React from 'react'
import Home from './components/Home.jsx'
import Game from './components/Game.jsx'
import WinLose from './components/WinLose.jsx'
import Completed from './components/Completed.jsx'
import Analysis from './components/Analysis.jsx'
import Rules from './components/Rules.jsx'
const axios = require('axios')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: [],
      page: 0, //state of game page needs to be stored in mongo as gamestate
      lastGameResult : false,
      analysis: {},
      login: false,
      username: ''

    }
    this.homeClick = this.homeClick.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setResult = this.setResult.bind(this)
    this.setAnalysis = this.setAnalysis.bind(this)
    this.setLogin = this.setLogin.bind(this)
  }

  componentDidMount() {
    console.log('mounted ', this.state)
  }

  setLogin(username) {
    this.setState({login:!this.state.login, username:username})
  }

  setAnalysis(data) {
    this.setState({
      analysis: data
    })
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
      return <Home username={this.state.username} isLogin={this.state.login} setLogin={this.setLogin} setPage={this.setPage} clickHandler={this.homeClick} setAnalysis={this.setAnalysis} data={this.state.games}></Home>
    } else if (this.state.page === 1) {
      return <Game username={this.state.username} isLogin={this.state.login} setPage={this.setPage} answer={this.state.answer} setResult={this.setResult}></Game>
    } else if (this.state.page === 2) {
      return <WinLose setPage={this.setPage} lastGameResult={this.state.lastGameResult}></WinLose>
    }
  }

  homeClick(e) {

    if (e.target.title === 'Start') {

      axios.get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
        .then((results) => {

          this.setState({
            answer: results.data.split('\n').filter(Boolean)
          }, () => {
            console.log('whats my state: ', this.state)
          })
        })
        .then(() => this.setPage(1))
        .catch((err) => {
          console.error('homeClick ran into an error: ', err)
        })
      // this.setPage(1)
    } else if (e.target.title === 'Completed') {

      let endpoint
      let params
      if (this.state.login) {
        endpoint = '/privateGames'
        params = `/${this.state.username}`
        endpoint += params
      } else {
        endpoint = '/publicGames'
      }
      axios.get(endpoint)
        .then((results) => {

          this.setState({
            games: results.data
          })
          this.setPage(3)
        })
        .catch((err) => {
          console.error('homeClick ran into an error - title=Completed:   ', err)
        })

    } else if (e.target.title === "Rules") {
      this.setPage(5)
    }

  }

  render () {
    return <div  className="page">

      {this.renderPage()}
    </div>
  }
}

export default App;

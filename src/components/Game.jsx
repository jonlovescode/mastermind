import React, { useState } from 'react'
const axios = require('axios')

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currGuess: ['0','0','0','0'],
      completed: false,
      guesses: []
    }
    this.onChange = this.onChange.bind(this)
    this.submitGuess = this.submitGuess.bind(this)
    this.renderGuess = this.renderGuess.bind(this)
    // this.renderResult = this.renderResult.bind(this)
    this.renderRemainingGames = this.renderRemainingGames.bind(this)
  }

  componentDidMount() {
    console.log('comp mounted')
  }

  renderRemainingGames() {
    return <div>You have {10 - this.state.guesses.length} guesses remaining</div>
  }

  // renderResult(didWin) {
  //   if (didWin || this.state.guesses.length === 10) {
  //     this.props.setResult(didWin)
  //     this.props.setPage(2)
  //   } else {
  //     return <div>Incorrect guess</div>
  //   }
  // }

  renderGuess() {
    if (this.state.guesses.length > 0) {
      console.log('at renderGuess: ', this.state.guesses)

      return this.state.guesses.map((lastguess, i) => {
        return lastguess.map((val, i) => {
          return <div key={i}>{val[0] + ' ' + val[1]}</div>
        })
      })
    }
  }

  submitGuess(e) {
    e.preventDefault()
    let isCorrect = this.props.answer.every((val, i) => val === this.state.currGuess[i])
    console.log(isCorrect)
    // if false load up incorrect result + highlight accordingly (green for correct number and spot, yellow for correct number but wrong spot, red for wrong number)
    console.log('setting state', this.state.guesses)
    let { guesses } = this.state
    guesses.push(this.state.currGuess.map((val, i) => {
      if (val === this.props.answer[i]) {
        return [this.state.currGuess[i], 'green']
      } else if (this.props.answer.includes(val)) {
        return [this.state.currGuess[i], 'yellow']
      } else {
        return [this.state.currGuess[i], 'red']
      }
    }))
    this.setState({
      guesses : guesses
    }, () => {
      console.log('whats my state: ', this.state)
    })
    if (isCorrect || this.state.guesses.length === 10) {
      axios.post('http://localhost:3000/completed', {
        gameResult: isCorrect ? 'win' : 'lose',
        difficulty: 'easy',
        gameType: 'random integers',
        guesses: this.state.guesses,
        gameAnswer: this.props.answer
      })
      // this.setState({
      //   completed: isCorrect
      // })
      this.props.setResult(isCorrect)
      this.props.setPage(2)
    }
  }

  onChange(e) {
    console.log('onChange invoked guess # ', e.target.title)
    let index = parseInt(e.target.title)
    let arr = this.state.currGuess
    arr[index] = e.target.value
    this.setState({
      currGuess: arr
    }, () => {
      console.log(this.state.currGuess)
    })
  }

  render() {
    return <div>
      <button onClick={() => {
        this.props.setPage(0)
      }}>Back</button>
      <form>
        <label>
          guess1
          <input onChange={this.onChange} type="number" title='0'></input>
        </label>
        <label>
          guess2
          <input onChange={this.onChange} type="number"  title='1'></input>
        </label>
        <label>
          guess3
          <input onChange={this.onChange} type="number"  title='2'></input>
        </label>
        <label>
          guess4
          <input onChange={this.onChange} type="number"  title='3'></input>
        </label>
        <button onClick={this.submitGuess}>Submit Guess</button>
      </form>
      <div>{this.renderRemainingGames()}</div>

      <div>{this.renderGuess()}</div>
      {/* <div>{this.renderResult(this.state.completed)}</div> */}
    </div>
  }
}

export default Game
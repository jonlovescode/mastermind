import React, { useState } from "react";
import Rules from "./Rules.jsx";

const axios = require("axios");

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currGuess: ["0", "0", "0", "0"],
      completed: false,
      guesses: [],
      popup: false,
      rules: false,
    };
    this.onChange = this.onChange.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
    this.renderGuess = this.renderGuess.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleRules = this.toggleRules.bind(this);
    // this.renderResult = this.renderResult.bind(this)
    this.renderRemainingGames = this.renderRemainingGames.bind(this);
  }

  componentDidMount() {
    console.log("comp mounted");
  }

  toggleRules() {
    this.setState({
      rules: !this.state.rules,
    });
  }

  toggle() {
    this.setState({
      popup: !this.state.popup,
    });
  }

  renderRemainingGames() {
    return (
      <div>You have {10 - this.state.guesses.length} guesses remaining</div>
    );
  }

  renderGuess() {
    if (this.state.guesses.length > 0) {
      const colors = {
        red: 0,
        yellow: 0,
        blue: 0,
      };
      const hex = {
        red: "#FF6B6B",
        yellow: "#FFD231",
        blue: "#3770DD",
      };
      let len = this.state.guesses.length;
      this.state.guesses[len - 1].forEach((val, i) => {
        colors[val[1]]++;
      });

      return Object.keys(colors).map((k, i) => {
        return (
          <div className="colorbox" key={i}>
            {new Array(colors[k]).fill(
              <button
                className="color"
                style={{ backgroundColor: hex[k] }}
              ></button>
            )}
          </div>
        );
      });
    }
  }

  submitGuess(e) {
    e.preventDefault();

    let isCorrect = this.props.answer.every(
      (val, i) => val === this.state.currGuess[i]
    );

    let { guesses } = this.state;
    guesses.push(
      this.state.currGuess.map((val, i) => {
        if (val === this.props.answer[i]) {
          return [val, "blue"];
        } else if (this.props.answer.includes(val)) {
          return [val, "yellow"];
        } else {
          return [val, "red"];
        }
      })
    );
    this.setState(
      {
        guesses: guesses,
      },
      () => {
        console.log("whats my state: ", this.state);
      }
    );

    if (isCorrect || this.state.guesses.length === 10) {
      let endpoint;
      if (this.props.isLogin) {
        endpoint = "/privateGames";
      } else {
        endpoint = "/publicGames";
      }
      axios
        .post(endpoint, {
          user: this.props.username,
          gameResult: isCorrect ? "win" : "lose",
          difficulty: "easy",
          gameType: "random integers",
          guesses: this.state.guesses,
          gameAnswer: this.props.answer,
          date: new Date(),
          score: 10 - this.state.guesses.length,
        })
        .then(() => {
          console.log("posted to " + endpoint + "successfully");
        })
        .catch((err) =>
          console.error("unsuccessful post to " + endpoint + " ERROR: " + err)
        );

      this.props.setResult(isCorrect);
      this.props.setPage(2);
    }
  }

  onChange(e) {
    console.log('is there a dash: ', e.target.value.match(/[0-7]/), e.target.value, 7 < e.target.value ||  e.target.value < 0)
    if ((e.target.value.match(/[0-7]/) && e.target.value.match(/[0-7]/) === null) ||  7 < e.target.value ||  e.target.value < 0) {
      e.target.value = "0"
      alert('you must enter values between 0 and 7 inclusive')
      return
    }
    let index = parseInt(e.target.title);
    let arr = this.state.currGuess;
    arr[index] = e.target.value;
    this.setState(
      {
        currGuess: arr,
      },
      () => {
        console.log(this.state.currGuess);
      }
    );
  }

  render() {
    return (
      <div>
        <header>
          <div>
            <button
              className="title"
              onClick={() => {
                this.props.setPage(0);
              }}
            >
              Back
            </button>
          </div>

          <div>
            <button
              className="title"
              onClick={() => {
                this.toggle();
              }}
            >
              Guesses
            </button>
            {this.state.popup && (
              <Rules
                content={
                  <>
                    <b className="rules">Your Guesses</b>
                    <div>
                      {this.state.guesses.map((guess, i) => {
                        let red = 0;
                        let yellow = 0;
                        let blue = 0;
                        guess.forEach((val, i) => {
                          if (val[1] === "blue") {
                            blue++;
                          } else if (val[1] === "yellow") {
                            yellow++;
                          } else if (val[1] === "red") {
                            red++;
                          }
                        });

                        return (
                          <div>
                            {guess[0][0] +
                              "-" +
                              guess[1][0] +
                              "-" +
                              guess[2][0] +
                              "-" +
                              guess[3][0] +
                              " : " +
                              red +
                              " red, " +
                              yellow +
                              " yellow, " +
                              blue +
                              " blue."}
                          </div>
                        );
                      })}
                    </div>
                  </>
                }
                handleClose={this.toggle}
              />
            )}
          </div>
          <div>
          <button
              className="title"
              onClick={() => {
                this.toggleRules();
              }}
            >
              Rules
            </button>
          {this.state.rules && (
            <Rules
              content={
                <>
                  <b className="rules">Rules Of Mastermind</b>
                  <p className="rules">
                    Mastermind is a code-breaking game in which you are given 10
                    chances to crack a 4-digit code. Each digit is between 0-7 inclusive and permits repeats. Upon submitting each guess,
                    you will be informed how many of your guesses were either:
                  </p>
                  <p className="rules">
                    -a correct number AND the correct location (blue)
                  </p>
                  <p className="rules">
                    -a correct number AND NOT the correct location (yellow)
                  </p>
                  <p className="rules">-NOT a correct number (red)</p>
                </>
              }
              handleClose={this.toggleRules}
            />
          )}
          </div>
        </header>
        <form className="container">
          <div className="item main">
            <div className="gameview">
              <div className="container">
                <label>
                  <input
                    className="guessbox"
                    onChange={this.onChange}
                    type="text"
                    title="0"
                    min="0"
                    max="7"
                    defaultValue="0"
                  ></input>
                </label>
                <label>
                  <input
                    className="guessbox"
                    onChange={this.onChange}
                    type="text"
                    title="1"
                    min="0"
                    max="7"
                    defaultValue="0"
                  ></input>
                </label>
                <label>
                  <input
                    className="guessbox"
                    onChange={this.onChange}
                    type="text"
                    title="2"
                    min="0"
                    max="7"
                    defaultValue="0"
                  ></input>
                </label>
                <label>
                  <input
                    className="guessbox"
                    onChange={this.onChange}
                    type="text"
                    title="3"
                    min="0"
                    max="7"
                    defaultValue="0"
                  ></input>
                </label>
              </div>
              <div className="centertext">{this.renderRemainingGames()}</div>
              <div className="results">{this.renderGuess()}</div>
            </div>
          </div>
        </form>
        <footer>
          <button className="title" onClick={this.submitGuess}>
            Submit Guess
          </button>
        </footer>

        {/* <div>{this.renderResult(this.state.completed)}</div> */}
      </div>
    );
  }
}

export default Game;

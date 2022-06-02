import React, { useState, useEffect } from "react";
import "../App.css";
import Rules from "./Rules.jsx";
import Completed2 from "./Completed2.jsx";
import Analysis2 from "./Analysis2.jsx";
import Login from "./Login.jsx";

const axios = require("axios");

function Home(props) {
  const [popRules, setPopRules] = useState(false);
  const [popGames, setPopGames] = useState(false);
  const [popLogin, setPopLogin] = useState(false);
  const [popAnalysis, setPopAnalysis] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [game, setGame] = useState({});

  useEffect(() => {
    console.log(username);
  }, [username]);
  // const [email, setEmail] = useState('');

  const [games, setGames] = useState([]);
  const [analysis, setAnalysis] = useState({});

  const toggleLogin = () => {
    setPopLogin(!popLogin);
  };
  const toggleRules = () => {
    setPopRules(!popRules);
  };
  const toggleAnalysis = (game) => {
    setGame(game);
    setPopAnalysis(!popAnalysis);
  };

  const toggleGames = () => {
    let endpoint;
    let params;
    if (props.isLogin) {
      endpoint = "/privateGames";
      params = `/${props.username}`;
      endpoint += params;
    } else {
      endpoint = "/publicGames";
    }
    axios
      .get(endpoint)
      .then((result) => {
        return setGames(result.data);
      })
      .then(() => {

        setPopGames(!popGames);
        return games;
      })
      .catch((err) => console.error("generateGames ran into an ERROR: ", err));
  };

  return (
    <div>
      <header>
        <div className="title">Welcome to Mastermind</div>
      </header>
      <div className="container">
        <div className="item main">
          <button onClick={props.clickHandler} title="Start">
            start
          </button>
        </div>
        <div className="item other">
          <button onClick={toggleRules}>rules</button>
          {popRules && (
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
              handleClose={toggleRules}
            />
          )}
          <button onClick={toggleGames}>games</button>
          {popGames && (
            <Completed2
              content={
                <>
                  <b className="rules completedGames">Completed Games</b>
                  <div className="gamecontainer">
                    {games.map((game, i) => {


                      return (
                        <div className="gamebox">
                          <button
                            className="game"
                            key={i}
                            onClick={() => {
                              toggleAnalysis(game);
                            }}
                          >
                            {game.date.substring(0, 10) + " played by " + (game.user ? game.user : "guest")}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              }
              handleClose={toggleGames}
            />
          )}
          {popAnalysis && (
            <Analysis2
              content={
                <>
                  <b className="rules completedGames">
                    Analyze Game {game.date.substring(0, 10)}
                  </b>
                  {props.isLogin ? <div>User: {game.user}</div> : <></>}
                  <div>Result: {game.gameResult}</div>
                  <div>Score: {game.score}</div>
                  <div>Answer: {game.gameAnswer}</div>
                  <div>Guesses:</div>
                  <div>
                    {game.guesses.map((guess, i) => {

                      return (
                        <div>
                          {guess[0][0] + '-' + guess[1][0] + '-' + guess[2][0] + '-' + guess[3][0]}
                        </div>
                      );
                    })}
                  </div>
                </>
              }
              handleClose={toggleAnalysis}
            />
          )}

          <button onClick={toggleLogin}>
            {props.isLogin ? "logout of " + props.username : "login"}
          </button>
          {popLogin && !props.isLogin && (
            <Login
              content={
                <>
                  <div>
                    Username
                    <input
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      type="text"
                    ></input>
                  </div>
                  <div>
                    Password
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="text"
                    ></input>
                  </div>

                  <button className="Login"
                    onClick={() => {
                      const user = {
                        username: username,
                        password: password,
                      };
                      if (password && username) {
                        axios
                          .post("/login", user)
                          .then((result) => {
                            if (result.data === "success") {

                              props.setLogin(user.username);
                              //prevent situation where user somehow quickly enters a new value into username box
                              toggleLogin();
                            }
                          })
                          .catch((err) =>
                            console.error(
                              "axios post login ran into error Home.jsx: ",
                              err
                            )
                          );
                      }
                    }}
                  >
                    Login
                  </button>
                  <button className="Signup"
                    onClick={() => {
                      //first validate username
                      //then post to users
                      const user = {
                        username: username,
                        password: password,
                      };
                      axios.post("/valid", user).then((result) => {

                        if (result.data === "valid" && password && username) {
                          axios.post("/users", user);
                        } else if (password && username) {
                          alert("username already exists");
                        } else {
                          alert("invalid credentials");
                        }
                      });
                    }}
                  >
                    Sign Up
                  </button>
                </>
              }
              handleClose={toggleLogin}
            />
          )}
          {popLogin && props.isLogin && (
            <Login
              content={
                <>
                  <b className="rules">Confirm Logout</b>

                  <button
                    onClick={() => {
                      props.setLogin("");
                      toggleLogin();
                    }}
                  >
                    Logout
                  </button>
                </>
              }
              handleClose={toggleLogin}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default Home;

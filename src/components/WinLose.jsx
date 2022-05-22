import React from 'react'

function WinLose(props) {
  let backHome = () => {
    console.log('backHome')
    props.setPage(2)
  }

  if (props.lastGameResult) {
    return <>
      <div>You Won!</div>
      <button onClick={() => {
      console.log('click!')
      props.setPage(0)
    }}>Return To Home</button>
    </>
  } else {
    return <>
    <div>You Lose :c</div>
    <button onClick={() => {
      console.log('click!')
      props.setPage(0)
    }}>Return To Home</button>
  </>
  }
}

export default WinLose
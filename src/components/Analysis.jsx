import React from 'react'

function Analysis(props) {


  return <>
    <div>Analyze Game # x</div>
    <div>{JSON.stringify(props.analysis)}</div>

    <button onClick={() => {
      props.setPage(3)
    }} title="Back">Back</button>
  </>

}

export default Analysis
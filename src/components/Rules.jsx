import React from 'react'

function Rules(props) {
  return <>
    <div>Here are the rules you should write out + format via css</div>
    <button onClick={() => {
      props.setPage(0)
    }}>Back</button>
  </>
}

export default Rules
import React from 'react'
import blob1 from '../images/blob1.svg'
import blob2 from '../images/blob2.svg'

function Start(props) {
  return (
    <div className='start-container'>
      <h1>ExaQuiz</h1>
        <p>Test your knowledge here.</p>
        <button className='start-btn' onClick={() => props.start()}>Start quiz</button>
    </div>
  )
}

export default Start
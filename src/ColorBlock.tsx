import React, { PureComponent, useState } from 'react'

export default function ColorBlock({color, numVotes}) {

  // Swap this with the api call for how many votes it has
  const [votes,setVotes] = useState(numVotes);

  return (
    <div className='color-body' style={{backgroundColor: color}} onClick={() => setVotes(votes + 1)}>
      {votes} <br/>
      {color}
    </div>
  )
}

import React, { useState } from 'react'
import { IColorBlock } from './DashBoard';

export default function BigBlock( {cb, buttonClick, blockPosition} ) {
  // This is used to store the state on the screen, since there is no big array holding all the blocks 
  // The blocks are only held in BlockBattle.txs if they are in the top 15 biggest, so this updates
  // their state independently (don't worry, the api is still incrementing them each click to the server
  // const [bigBlockState, setBigBlockState] = useState(cb.votes);

  return (
    <button className={`big-block block-position-${blockPosition%2} block`}
    style={{backgroundColor: '#'+cb.color}} 
    onClick={() => {
        buttonClick(cb.color, cb); 
      } }>
        <h1>#{cb.color}</h1>
        <h2>{cb.votes}</h2>
    </button>
  )
}

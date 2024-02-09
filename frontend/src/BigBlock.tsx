import React, { useState } from 'react'

export default function BigBlock( {cb, buttonClick, blockPosition, onTop} ) {
  // This is used to store the state on the screen, since there is no big array holding all the blocks 
  // The blocks are only held in BlockBattle.txs if they are in the top 15 biggest, so this updates
  // their state independently (don't worry, the api is still incrementing them each click to the server
  // const [bigBlockState, setBigBlockState] = useState(cb.votes);

  const zIndex = onTop ? 1 : 0;
  const isBlackFont = cb.isBlackFont;

  return (
    <button className={`big-block block-position-${blockPosition%2}`}
      style={{backgroundColor: '#'+cb.color, color: isBlackFont ? 'black' : 'white', zIndex: zIndex}} 
      onClick={() => {
          console.log("clicking BIG BUTTON")
          buttonClick(cb.color, cb, 1-blockPosition); 
        } }>
          <h1>#{cb.color}</h1>
          <h2>{cb.votes}</h2>
    </button>
  )
}

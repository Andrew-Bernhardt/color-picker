import React from 'react'
import { useAutoAnimate } from "@formkit/auto-animate/react"

export default function LeaderBoard( {colorBlocks, children, absolute=""} ) {
  const [animationParent] = useAutoAnimate( {duration: 250} );
  console.log("Reloading Leaderboard BELOW vvvv \n")
  console.log(colorBlocks)
  var colorBlocksCopy = JSON.parse(JSON.stringify(colorBlocks))
  colorBlocksCopy.sort((a, b) => (a.votes > b.votes ? -1: 1))
  colorBlocksCopy = colorBlocksCopy.slice(0,15);
  const topColor = '#'+colorBlocksCopy[0].color

  const flames = Array.from(Array(100).keys())
  
  return (
    <div className="leaderboard-flex">
      <h2>{children}</h2> 
      <h2>LeaderBoard</h2>
      <div className="flame-animation">
        {flames.map((flame, i) => 
          <div key={i} className="flame" style={{backgroundColor: topColor}}></div>)
        }
      </div>
      <ul ref={animationParent}> 
        <li className="leaderboard-item top-block" style={{backgroundColor: topColor, color: topColor}}> yo</li>
        {
          colorBlocksCopy.map((cb)=> 
            <li key={cb.color} className="leaderboard-item" style={{backgroundColor: "#"+cb.color, color: cb.isBlackFont ? 'black' : 'white' }}>
              #{cb.color} : {cb.votes}
            </li>
          )
        }
      </ul>
      </div>
  )
}

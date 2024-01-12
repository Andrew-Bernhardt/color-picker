import React from 'react'

export default function LeaderBoard( {colorBlocks, children} ) {
  console.log("Reloading Leaderboard\n")
  console.log(colorBlocks)
  var colorBlocksCopy = JSON.parse(JSON.stringify(colorBlocks))
  colorBlocksCopy.sort((a, b) => (a.votes > b.votes ? -1: 1))
  colorBlocksCopy = colorBlocksCopy.slice(0,15);
  const topColor = '#'+colorBlocksCopy[0].color

  const flames = Array.from(Array(100).keys())
  
  return (
    <div className="leaderboard-flex">
      <h2>{children} LeaderBoard</h2>
      <div className="flame-animation">
        {flames.map((flame, i) => 
          <div className="flame" style={{backgroundColor: topColor}}></div>)
        }
      </div>
      <ul> 
        <li className="leaderboard-item top-block" style={{backgroundColor: topColor, color: topColor}}> yo</li>
        {
          colorBlocksCopy.map((cb)=> 
            <li key={cb.color} className="leaderboard-item" style={{backgroundColor: "#"+cb.color }}>
              #{cb.color} : {cb.votes}
            </li>
          )
        }
      </ul>
      </div>
  )
}

import React from 'react'

export default function LeaderBoard( {colorBlocks, children} ) {
  console.log("Reloading Leaderboard")
  console.log(colorBlocks)
  var colorBlocksCopy = JSON.parse(JSON.stringify(colorBlocks))
  colorBlocksCopy.sort((a, b) => (a.votes > b.votes ? -1: 1))
  colorBlocksCopy = colorBlocksCopy.slice(0,15);

  return (
    <div className="leaderboard-flex">
      <h2>{children} LeaderBoard</h2>
      <ul> 
        {
          colorBlocksCopy.map((cb)=> 
            <li key={cb.color} className="leaderboard-item" style={{backgroundColor: cb.color}}>
              {cb.color} : {cb.votes}
            </li>
          )
        }
      </ul>
      </div>
  )
}

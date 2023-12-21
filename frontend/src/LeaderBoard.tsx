import React from 'react'

export default function LeaderBoard( {colorBlocks, children} ) {
  const colorBlocksCopy = JSON.parse(JSON.stringify(colorBlocks))
  colorBlocksCopy.sort((a, b) => (a.votes > b.votes ? -1: 1))

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

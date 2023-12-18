import logo from './logo.svg';
import ColorBlock from './ColorBlock.tsx';
import './App.css';
import React, { useState } from 'react';

function initialize () {
  return new Array(100).fill({ color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6), votes: 0 });
}

function App() {

  // Make an API call HERE and gather 100 or so randomly generated values. This will save server calls. 
  // We can make 1 server call only here.
 
  const [colorBlocks,setColorBlocks] = useState(initialize);
  
  const handleButtonClick = (id) => {
    setColorBlocks((prevClicks) => {
      const newClicks = [...prevClicks];
      newClicks[id - 1].count++; // Increment the count of the clicked button
      return newClicks;
    });
  };

  const updateColor = (id, color) => {
    setColorBlocks((prevClicks) => {
      const newClicks = [...prevClicks];
      newClicks[id - 1].color = color; // Update the color of the button
      return newClicks;
    });
  };

  return (
    <div className="app-container-grid">
      <div className="color-block-container">
        {
          colorBlocks.map((cb) => {
            return (
              <ColorBlock 
                color={cb.color} 
                numVotes={cb.votes}
                onClick = {handleButtonClick}
              />
            )
          })
        }
      </div>
      <div className="scoreboard">
        <h3>Leaderboard</h3>
        <ol>
          {
            colorBlocks.map((cb)=> {
              return (
                <li>{cb.votes}</li>
              )
            })
          }
        </ol>
        
      </div>
    </div>
  );
}

export default App;

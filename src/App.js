import React, { useState } from 'react';
import Button from './ColorBlock.tsx';

const App = () => {
  const [clicks, setClicks] = useState(new Array(10).fill({ count: 0, color: '' }));

  const handleButtonClick = (id) => {
    setClicks((prevClicks) => {
      const newClicks = [...prevClicks];
      newClicks[id - 1].count++; // Increment the count of the clicked button
      return newClicks;
    });
  };

  const updateColor = (id, color) => {
    setClicks((prevClicks) => {
      const newClicks = [...prevClicks];
      newClicks[id - 1].color = color; // Update the color of the button
      return newClicks;
    });
  };

  return (
    <div>
      <h1>Click Counter App</h1>
      <div>
        {clicks.map((button, index) => (
          <Button
            key={index + 1}
            id={index + 1}
            onClick={handleButtonClick}
            updateColor={updateColor}
          />
        ))}
      </div>
      <h2>Leaderboard</h2>
      <ul>
        {clicks.map((button, index) => (
          <li key={index + 1}>
            Button {index + 1}: Clicks - {button.count} times, Color - {button.color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
import React, { PureComponent, useEffect, useState } from 'react'


interface ColorBlockProps {
  color: string;
  onClick: (id: number) => void;
}

const ColorBlock: React.FC<ColorBlockProps> = ({ color, onClick }) => {
  const [clickCount, setClickCount] = useState(0);
  const [color, setColor] = useState(color);

  function generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let newColor = '#';
    for (let i = 0; i < 6; i++) {
      newColor += letters[Math.floor(Math.random() * 16)];
    }
    return newColor;
  }

  const handleClick = (): void => {
    setClickCount(clickCount + 1);
    onClick(id); // Pass the button ID to the parent component
  };


  return (
    <button onClick={handleClick} style={{ backgroundColor: color }}>
      Block {id} Clicked: {clickCount} times
    </button>
  );
};

export default ColorBlock;

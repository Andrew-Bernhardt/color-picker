import React, { PureComponent, useEffect, useState } from 'react'


interface ColorBlockProps {
  id: number;
  onClick: (id: number) => void;
  updateColor: (id: number, color: string) => void;
}

const ColorBlock: React.FC<ColorBlockProps> = ({ id, onClick, updateColor }) => {
  const [clickCount, setClickCount] = useState(0);
  const [color, setColor] = useState<string>(generateRandomColor());

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

  useEffect(() => {
    updateColor(id, color);
  }, [color, id, updateColor]);

  return (
    <button onClick={handleClick} style={{ backgroundColor: color }}>
      Block {id} Clicked: {clickCount} times
    </button>
  );
};

export default ColorBlock;

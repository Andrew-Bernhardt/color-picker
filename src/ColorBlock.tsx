import React, { PureComponent, useEffect, useState } from 'react'


export default function ColorBlock({ color }) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <button className="color-body" style={{ backgroundColor: color }} onClick={ () => setClickCount(clickCount + 1)}>
      {color} <br/>
      {clickCount}
    </button>
  );
};


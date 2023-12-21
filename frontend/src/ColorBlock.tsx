import React, { PureComponent, useEffect, useState } from 'react'


export default function ColorBlock({ color, votes, onClick }) {
  return (
    <button className="color-body" style={{ backgroundColor: color }} onClick={() => onClick(color)}>
      {color} <br/>
      {votes}
    </button>
  );
};


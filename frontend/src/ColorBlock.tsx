import React, { PureComponent, useEffect, useState } from 'react'


export default function ColorBlock({ color, votes, _id, __v, colorBlock, onClick }) {
  return (
    <button className="color-body" style={{ backgroundColor: color }} onClick={() => onClick(color, colorBlock)}>
      {color} <br/>
      {votes}
    </button>
  );
};


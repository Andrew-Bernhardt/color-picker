import React, { PureComponent, useEffect, useState } from 'react'


export default function ColorBlock({ color, votes, _id, __v, cb, onClick }) {
  return (
    <button className="color-body" style={{ backgroundColor: color }} onClick={() => onClick(color, cb)}>
      {color} <br/>
      {votes}
    </button>
  );
};


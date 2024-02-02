import React, { PureComponent, useEffect, useState } from 'react'
import { IColorBlock } from './model/ColorBlock';


export default function ColorBlock({ color, votes, _id, __v, isBlackFont, colorBlock, onClick }) {


  return (
    <button className="color-body" style=
      {
        { backgroundColor: "#"+color, boxShadow: `0px 2px 2px #${color}`, color: isBlackFont ? 'black' : 'white' }
      }
       onClick={() => onClick(color, colorBlock)}>
      {"#"+color} <br/>
      {votes}
    </button>
  );
};


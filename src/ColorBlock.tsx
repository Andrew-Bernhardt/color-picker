import React, { PureComponent, useState } from 'react'


interface ColorBlockProps {
  id: number;
  onClick: (id: number) => void;
  updateColor: (id: number, color: string) => void;
}

export default function ColorBlock({color, numVotes} : {color:string, numVotes: number}) {

  // Swap this with the api call for how many votes it has
  const [votes,setVotes] = useState(numVotes);

  return (
    <div className='color-body' style={{backgroundColor: color}} onClick={votes + 1}>
      {votes} <br/>
      {color}
    </div>
  )
}

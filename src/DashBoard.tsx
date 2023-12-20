import React, { useState } from 'react'
import ColorBlock from './ColorBlock.tsx';
import LeaderBoard from './LeaderBoard.tsx';
// import IColorBlock from './model/ColorBlock.ts';

interface IColorBlock {
    color: string
    votes: number
}

let lastColor = "";
function getColorBlocks (numBlocks) {
    const retColorBlocks: IColorBlock[] = [];
    for(let i=0;i<numBlocks;i++) {
        const colorObj =  { color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6), votes : 0 }
        retColorBlocks.push(colorObj);
        lastColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
    }
    return retColorBlocks;
}

export default function DashBoard( {numBlocks=100}) {
    // Make an API call HERE and gather 100 or so randomly generated values. This will save server calls. 
    // We can make 1 server call only here.
    const [colorBlocks, setColorBlocks] = useState(getColorBlocks(numBlocks));

    function buttonClick(color) {
        let temp_state = [...colorBlocks];
        setColorBlocks(colorBlocks['color'] + 1);
    }

    return (
        <div className="app-container-grid">
        <div className="color-block-container">
            {
                colorBlocks.map((cb) => 
                    <ColorBlock color={cb.color}/>
                )
            }
        </div>
        <LeaderBoard/>
        </div>
    )
}

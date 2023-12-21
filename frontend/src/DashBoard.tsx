import React, { useEffect, useState } from 'react'
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
    const [allTimeColorBlocks, setAllTimeColorBlocks] = useState(getColorBlocks(numBlocks));
    // Ideally run this every 10 seconds or so...
    const [colorBlocks, setColorBlocks] = useState(getColorBlocks(numBlocks));

    async function buttonClick(color: string) {
        const temp_state = [...colorBlocks];
        const pos = temp_state.findIndex((x) => x.color===color );
        temp_state[pos].votes = temp_state[pos].votes + 1;
        setColorBlocks(temp_state); 
        await updateGlobalColorBlocks(temp_state);
        
    }

    // setInterval( function() { setAllTimeColorBlocks(colorBlocks) }, 5000);

    // function delayUpdate(temp_state: IColorBlock[]) {
    //     setInterval(() => {
    //         setAllTimeColorBlocks(temp_state);
    //     }, 2000);
    // }

    function updateGlobalColorBlocks(temp_state: IColorBlock[]) {
        return new Promise(() => {
            setInterval(() => {
                setAllTimeColorBlocks(temp_state);
            }, 2000);
        })
    }

    return (
        <div className="app-container-flex">
            <div className="color-block-container">
                {
                    colorBlocks.map((cb) => 
                        <ColorBlock key={cb.color} color={cb.color} votes={cb.votes} onClick={buttonClick}/>
                    )
                }
            </div>
            <LeaderBoard colorBlocks={colorBlocks}>Current</LeaderBoard>
            <LeaderBoard colorBlocks={allTimeColorBlocks}>All Time</LeaderBoard>
        </div>
    )
}

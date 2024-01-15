import React, { useEffect, useState } from 'react'
import ColorBlock from './ColorBlock.tsx';
import LeaderBoard from './LeaderBoard.tsx';
import { APIURL } from './GlobalVariables.js'
import Navbar from './Navbar.tsx';
import { useParams } from 'react-router-dom';

// import IColorBlock from './model/ColorBlock.ts';

export interface IColorBlock {
    _id: number
    color: string
    votes: number
    __v: string
}

const preLoad: Array<IColorBlock> = [{
    _id: 0,
    color: '',
    votes: 0,
    __v: ''
}]

function getColorBlocks (numBlocks: number) {
    let lastColor = "";
    const retColorBlocks: IColorBlock[] = [];
    for(let i=0;i<numBlocks;i++) {
        const colorObj =  { _id: i, color: (0x1000000+Math.random()*0xffffff).toString(16).substr(1,6), votes : 0, __v: ''}
        retColorBlocks.push(colorObj);
        lastColor = (0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
    }
    return retColorBlocks;
}

export default function DashBoard( {numBlocks='100', randomOrFirst='random'}) {
    // Make an API call HERE and gather 100 or so randomly generated values. This will save server calls. 
    // We can make 1 server call only here.
    // Static Calls
    // const [allTimeColorBlocks, setAllTimeColorBlocks] = useState(getColorBlocks(numBlocks));
    // const [colorBlocks, setColorBlocks] = useState(getColorBlocks(numBlocks));
    
    // API Calls
    const [allTimeColorBlocks, setAllTimeColorBlocks] = useState(null);
    const [currentColorBlocks, setCurrentColorBlocks] = useState(preLoad);
    const params = useParams();
    console.log("params.numBlocks: " + params.numBlocks)
    console.log("randomized?: " + randomOrFirst)
    if(params.numBlocks!=null) {
        numBlocks = params.numBlocks;
    }

    useEffect(() => {
        console.log("calling api")
        const finalURL = APIURL + `/number/${randomOrFirst}/${numBlocks}`
        console.log("finalURL: " + finalURL)
        fetch(finalURL)
        .then(response => response.json())
        .then(data => 
            setCurrentColorBlocks(data)
        )
        .catch(
            (error) => {
                console.error(error);
            }
        )
    }, [params.numBlocks, randomOrFirst, numBlocks]);
        

    async function buttonClick(color: string, cb: IColorBlock) {
        const temp_state = [...currentColorBlocks];
        const pos = temp_state.findIndex((x) => x.color===color );
        temp_state[pos].votes = temp_state[pos].votes + 1;
        setCurrentColorBlocks(temp_state);
        fetch(APIURL + '/color/increment/'+cb.color , {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        // Update that singular color globally by PATCH
        // await updateGlobalColorBlocks(temp_state);
        
    }

    return (
        <>
        <Navbar />
        <div className="app-container-flex">
            <div className="color-block-container">
                {
                    currentColorBlocks.map((cb) => 
                        <ColorBlock key={cb.color} _id={cb._id} color={cb.color} votes={cb.votes} __v={cb.__v} colorBlock={cb} onClick={buttonClick}/>
                    )
                }
            </div>
            <LeaderBoard colorBlocks={currentColorBlocks}>Current</LeaderBoard>
            {/* <LeaderBoard colorBlocks={allTimeColorBlocks}>All Time</LeaderBoard> */}
        </div>
        </>
    )
}

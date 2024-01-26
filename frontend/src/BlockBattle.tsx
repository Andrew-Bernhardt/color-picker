import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.tsx'
import ColorBlock from './ColorBlock.tsx'
import LeaderBoard from './LeaderBoard.tsx'
import { IColorBlock, preLoad } from './DashBoard.tsx'
import { APIURL } from './GlobalVariables.js'
import { useParams } from 'react-router'
import BigBlock from './BigBlock.tsx'

const emptyColorBlock: IColorBlock = {
    _id: 0,
    color: '#FF',
    votes: 12,
    __v: '0'
}

export default function BlockBattle() {

    const [allTimeColorBlocks, setAllTimeColorBlocks] = useState(preLoad);
    const [blockBattle, setBlockBattle] = useState(preLoad);
    const [lastBlockInLeaderboard, setLastBlockInLeaderboard] = useState({
        _id: 0,
        color: '#FF',
        votes: 12,
        __v: '0'
    });
    const params = useParams();
    // let lastBlockInLeaderboard = emptyColorBlock;

    // Get 2 Colorblocks
    useEffect(() => {
        console.log("Getting 2 colorblocks")
        const finalURL = APIURL + `/number/random/2`
        console.log("finalURL: " + finalURL)
        fetch(finalURL)
        .then(response => response.json())
        .then(blocks => 
            {
                setBlockBattle(blocks);
            }
        )
        .catch(
            (error) => {
                console.error(error);
            }
        )
    }, []);

    //Get LeaderBoard Colors from API
    useEffect(() => {
        console.log("Calling Leaderboard API")
        const finalURL = APIURL + `/number/top-colors/15`
        console.log("finalURL: " + finalURL)
        fetch(finalURL)
        .then(response => response.json())
        .then(data => 
            {
                setAllTimeColorBlocks(data)
                setLastBlockInLeaderboard(data[data.length-1]);
            }
        )
        .catch(
            (error) => {
                console.error(error);
            }
        )
    }, []);


    // When a block is voted for, it will call this method.
    // When a block is voted for, it needs to:
    // 1. increment on the big block
    // 2. increment on the leaderboard
    // 3. call the api to increment on the back end
    // 4. if that block then becomes in the top 15 blocks, we need to REFRESH the leaderboard api
    //      We can do that by
    async function buttonClick(color: string, cb: IColorBlock, losingIndex: number) {

        // Keep Winner

        // Set Block State
        const temp_state = [...blockBattle];
        const pos = temp_state.findIndex((x) => x.color===color );
        temp_state[pos].votes = temp_state[pos].votes + 1;
        setBlockBattle(temp_state);

        // Update Leaderboard if the block is on the leaderboard
        const temp_leaderboard = [...allTimeColorBlocks]
        const posLeaderboard = temp_leaderboard.findIndex((x) => x.color===color )
        if(posLeaderboard != -1) {
            temp_leaderboard[posLeaderboard].votes = temp_leaderboard[posLeaderboard]?.votes + 1
            setAllTimeColorBlocks(temp_leaderboard)
        }

        // Increment the block to the API
        fetch(APIURL + '/color/increment/'+cb.color , {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        // If the block that is just clicked is high enough to join the leaderboard, add it to
        // the leaderboard and rerender the state of the leaderboard.

        console.log("CURRENT VOTES: " + temp_state[pos].votes) 
        console.log("SMALLEST BLOCK: " + lastBlockInLeaderboard.votes)
        console.log ("LAST BLOCKKKK: " + JSON.stringify(lastBlockInLeaderboard))
        
        // An overtake is happening, the block is now on the leaderboard
        if(cb.votes == lastBlockInLeaderboard.votes) {
            console.log("SWITCHING OUT LAST IN LEADERBOARD")
            let temp_leaderboard = [...allTimeColorBlocks]
            temp_leaderboard[temp_leaderboard.length-1] = cb
            temp_leaderboard.sort((a, b) => (a.votes > b.votes ? -1: 1))
            setAllTimeColorBlocks(temp_leaderboard)
            setLastBlockInLeaderboard(temp_leaderboard[temp_leaderboard.length-1])
        }
        
    }


    return (
        <>
            <Navbar />
            <div className="app-container-flex ">
                <div className="block-battle">
                    {
                        blockBattle.map((cb, index) => 
                            <>
                                <BigBlock key={cb.color} cb={cb} buttonClick={buttonClick} blockPosition={index}/>
                            </>
                        )
                    }
                </div>
                <LeaderBoard colorBlocks={allTimeColorBlocks}>Global</LeaderBoard>
                {/* <LeaderBoard colorBlocks={allTimeColorBlocks}>All Time</LeaderBoard> */}
            </div>
        </>
    )
}

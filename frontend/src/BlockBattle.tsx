import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.tsx'
import ColorBlock from './ColorBlock.tsx'
import LeaderBoard from './LeaderBoard.tsx'
import { IColorBlock, emptyColorBlock, preLoad } from './model/ColorBlock.ts'
import { APIURL } from './GlobalVariables.js'
import { useParams } from 'react-router'
import BigBlock from './BigBlock.tsx'

function refreshFunction () {
    console.log("HI");
}

export default function BlockBattle() {

    const [allTimeColorBlocks, setAllTimeColorBlocks] = useState(preLoad);
    const [blockBattle, setBlockBattle] = useState<IColorBlock[]>([]);
    const [winningBlockIndex, setWinningBlockIndex] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [lastBlockInLeaderboard, setLastBlockInLeaderboard] = useState({
        _id: 0,
        color: '#FF',
        votes: 12,
        __v: '0'
    });
    // let refresh = 0;
    // let lastBlockInLeaderboard = emptyColorBlock;


    // Put Both INITIAL Calls into one block
    // Get 3 Colorblocks to use in the project. The 3rd one replaces the 1st or 2nd that loses. The 3rd one then gets refreshed.
    useEffect(() => {
        console.log("refresh: " + refresh)
        console.log("Getting 2 colorblocks")
        const finalURL = APIURL + `/number/random/3`
        console.log("finalURL: " + finalURL)
        fetch(finalURL)
        .then(response => response.json())
        .then(blocks => 
            {
                console.log("3 INITIAL " + JSON.stringify(blocks));
                setBlockBattle(blocks);
            }
        )
        .catch(
            (error) => {
                console.error(error);
            }
        )
    }, [refresh]);

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

    async function getSingleRandomBlock () {
        console.log("getSingleRandomBlock")
        var newBlock: IColorBlock = emptyColorBlock;
        const getNewBlock = APIURL + `/number/random/1`
        await fetch(getNewBlock)
        .then(res => res.json())
        .then(block => 
            {
                console.log("IN THEN METHOD: " + JSON.stringify(block))
                newBlock = block;
            }
        )
        console.log("NEW BLOCK: " + JSON.stringify(newBlock));
        console.log(newBlock[0]);
        return newBlock[0];
    }

    const refreshFunction = () => {
        setRefresh(!refresh)
        console.log("refreshed: " + refresh)
    }

    // When a block is voted for, it will call this method.
    // When a block is voted for, it needs to:
    // 1. increment on the big block
    // 2. increment on the leaderboard
    // 3. call the api to increment on the back end
    // 4. if that block then becomes in the top 15 blocks, we need to REFRESH the leaderboard api
    //      We can do that by
    // 5. Kick out the losing block
    async function buttonClick(color: string, cb: IColorBlock, losingIndex: number) {

        console.log("Button Clicked!")
        
        

        // This sets the z index of the winning block to be higher than the other block
        setWinningBlockIndex(1-losingIndex); 

        // Set Block State
        const temp_state = [...blockBattle];

        // Get a distinct new block
        let newBlock = await getSingleRandomBlock();
        while(newBlock.color == temp_state[0].color || newBlock.color == temp_state[1].color) {
            newBlock = await getSingleRandomBlock();
        }
            
        // Keep Winner - Kick Out Loser
        
        console.log("BEFORE UPDATE: " + JSON.stringify(temp_state))
        const pos = temp_state.findIndex((x) => x.color===color );
        temp_state[pos].votes = temp_state[pos].votes + 1;
        console.log("LOSING INDEX: " + losingIndex)
        console.log("Replacing with new block " + JSON.stringify(temp_state[2]))
        temp_state[losingIndex] = temp_state[2]
        temp_state[2] = newBlock; 
        console.log("Setting block battle: " + JSON.stringify(temp_state));
        console.log(temp_state)
        setBlockBattle(temp_state);
        
        if(temp_state[0]==temp_state[1])
            console.error("SAME BLOCKS")

        // Increment the block to the API
        fetch(APIURL + '/color/increment/'+cb.color , {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())

        // Update Leaderboard if the block is on the leaderboard
        const temp_leaderboard = [...allTimeColorBlocks]
        const posLeaderboard = temp_leaderboard.findIndex((x) => x.color===color )
        console.log("color " + color);
        console.log("posLeaderboard: " + posLeaderboard)
        if(posLeaderboard != -1) {
            temp_leaderboard[posLeaderboard].votes = temp_state[pos].votes
            temp_leaderboard.sort((a, b) => (a.votes > b.votes ? -1: 1))
        } else if(temp_state[pos].votes == lastBlockInLeaderboard.votes) {
            // An overtake is happening, the block is now on the leaderboard
            // If the block that is just clicked is high enough to join the leaderboard, add it to
            // the leaderboard and rerender the state of the leaderboard.
            console.log("CURRENT VOTES: " + temp_state[pos].votes) 
            console.log("SMALLEST BLOCK: " + lastBlockInLeaderboard.votes)
            console.log("LAST BLOCKKKK: " + JSON.stringify(lastBlockInLeaderboard))
            console.log("SWITCHING OUT LAST IN LEADERBOARD")
            console.log("temp_state[pos]:")
            console.log(temp_state[pos])
            temp_leaderboard[temp_leaderboard.length-1] = temp_state[pos]
            temp_leaderboard.sort((a, b) => (a.votes > b.votes ? -1: 1))
        }
        
        setLastBlockInLeaderboard(temp_leaderboard[temp_leaderboard.length-1])
        setAllTimeColorBlocks(temp_leaderboard)
    }

    return (
        
        <>
            <Navbar refreshBlockBattle={refreshFunction} />
            
            <div className="app-container-flex ">
                <div className="block-battle">
                    {
                        blockBattle.slice(0,2).map((_cb, index) => 
                                <BigBlock
                                    key={_cb._id} 
                                    cb={_cb} 
                                    buttonClick={buttonClick} 
                                    blockPosition={index}
                                    onTop={index == winningBlockIndex} // This return true if this index is winning
                                />           
                        )
                    }
                </div>
                <LeaderBoard colorBlocks={allTimeColorBlocks}>Global</LeaderBoard>
                {/* <LeaderBoard colorBlocks={allTimeColorBlocks}>All Time</LeaderBoard> */}
            </div>
        </>
    )
}

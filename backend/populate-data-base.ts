import { IColorBlock } from "../frontend/src/DashBoard";
import { APIURL } from "../frontend/src/GlobalVariables";

function getArrayOfColors (numBlocks: number) {
    let lastColor = "";
    const retColorBlocks: IColorBlock[] = [];
    for(let i=0;i<numBlocks;i++) {
        const colorObj =  { _id: i, color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6), votes : 0, __v: ''}
        retColorBlocks.push(colorObj);
        lastColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
    }
    return retColorBlocks;
}

function getSingleColor () {
    const colorObj =  { color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6), votes : 0, __v: ''}
    return colorObj;
}

function postSingleColor() {
    fetch(APIURL + '/', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(getSingleColor)
    }).then(res => {
        console.log("Request complete! response:", res);
    });
    
}

function postMultipleColors(numColors: number=100): void {

    for(let i=0;i< numColors; i++) {
        postSingleColor;
    }
}

postMultipleColors(100)





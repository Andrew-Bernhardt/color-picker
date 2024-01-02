const APIURL="http://localhost:3001/colorpicker"
interface IColorBlock {
    color: string
    votes: number
}

function getArrayOfColors (numBlocks: number) {
    let lastColor = "";
    const retColorBlocks: IColorBlock[] = [];
    for(let i=0;i<numBlocks;i++) {
        const colorObj =  {color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6), votes : 0 }
        retColorBlocks.push(colorObj);
        lastColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
    }
    return retColorBlocks;
}

function getSingleColor() {
    const colorObj =  { color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6), votes : 0 }
    console.log("HERE IS THE COLOR" + colorObj)
    return colorObj;
}

function postSingleColor() {
    fetch(APIURL + '/', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(getSingleColor())
    }).then(res => {
        console.log(res);
    });
}

function postMultipleColors(numColors: number=100): void {

    for(let i=0;i<numColors;i++) {
        postSingleColor();
    }
}
postMultipleColors(100)





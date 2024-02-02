const express = require('express')
const router = express.Router()
const ColorBlock = require('../models/ColorBlock')
const { readJsonConfigFile } = require('typescript')

// Make sure we put static routes over dynamic routes
// numbers/new should be above numbers/:color (because ':color' will match 'new' technically )

// Get All Colors
router.get('/', async (req, res) => {
    try {
        const colorBlocks = await ColorBlock.find()
        res.json(colorBlocks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get First x Colors
router.get('/number/first/:getNumber', async (req, res) => {
    try {
        const colorBlocks = (await ColorBlock.find()).slice(0,req.params.getNumber)
        res.json(colorBlocks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get Top Colors - ALL of them 
// Sorted each time this is called - could cause problems for bigger numbers
router.get('/number/top-colors/all', async (req, res) => {
    try {
        const colorBlocks = (await ColorBlock.find())
        colorBlocks.sort((a, b) => (a.votes > b.votes ? -1: 1))
        res.json(colorBlocks)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})
// Get Top Colors - BY NUMBER
// Sorted each time this is called - could cause problems for bigger numbers
router.get('/number/top-colors/:number', async (req, res) => {
    try {
        let colorBlocks = (await ColorBlock.find())
        colorBlocks = colorBlocks.sort((a, b) => (a.votes > b.votes ? -1: 1)).splice(0,req.params.number)
        console.log(req.params.number)
        res.json(colorBlocks)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})
// Get Bottom Colors - ALL of them 
// Sorted each time this is called - could cause problems for bigger numbers
router.get('/number/bottom-colors/all', async (req, res) => {
    try {
        const colorBlocks = (await ColorBlock.find())
        colorBlocks.sort((a, b) => (a.votes > b.votes ? 1: -1))
        res.json(colorBlocks)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})
// Get Top Colors - BY NUMBER
// Sorted each time this is called - could cause problems for bigger numbers
router.get('/number/bottom-colors/:number', async (req, res) => {
    try {
        let colorBlocks = (await ColorBlock.find())
        colorBlocks = colorBlocks.sort((a, b) => (a.votes > b.votes ? 1: -1)).splice(0,req.params.number)
        console.log(req.params.number)
        res.json(colorBlocks)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})

// Get Random x Colors
router.get('/number/random/:getNumber', async (req, res) => {
    try {
        // Idea behind this method:
        // We want to generate a random arrangement of the colorblocks in our system. 
        // The best way to generate a random assortment is by using the Fisher-Yates Shuffle Algorithm
        const colorBlocks = (await ColorBlock.find())
        let colorBlocksRandom = JSON.parse(JSON.stringify(colorBlocks))
        console.log("ColorBlocksRandom: "+colorBlocksRandom)

        console.log("Generating Random! Random Length: " + req.params.getNumber)

        let m = parseInt(req.params.getNumber)
        console.log(typeof m)
        console.log("going in...")

        // This will set l to one over the last index of the color block array.
        // The math.random() function, when 'floored', will produce an integer that is never out of bounds
        // This allows for the declaration below to NOT need a '-1' to be added to the end.
        let l = colorBlocksRandom.length;

        while(l>0 && m>0 ) {
            let i = Math.floor(Math.random() * l--)
            m--;

            let t = colorBlocksRandom[l]
            colorBlocksRandom[l] = colorBlocksRandom[i]
            colorBlocksRandom[i] = t
        }
        console.log("Length: " +  colorBlocksRandom.length)
        console.log("l = "+ l)
        console.log("m = " + m)

        colorBlocksRandom = colorBlocksRandom.splice(l, colorBlocksRandom.length)
        console.log("Finished Getting Random Blocks with length = " + colorBlocksRandom.length)
        res.json(colorBlocksRandom)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})



// Deal with One Color with color in URI
router
    .route("/color/:color")
    .get(async (req, res) => {
        const thisColor = await ColorBlock.findOne({color: req.params.color})
        if(thisColor==null) {
            console.log("Color " + req.params.color + " does not exist")
            res.status(404).json({message: "Color " + req.params.color + " does not exist"})
        } else {
            console.log("Returning" + req.params.color)
            res.json(thisColor);
        }
    })
    .post(async (req, res) => {
        const colorBlock = new ColorBlock({
            color: req.params.color,
            votes: 0
        })
        try {
            // Check if the color already exists
            const findColor = await ColorBlock.find({color: req.params.color})
            if(findColor.length==0) { // Does not exist
                console.log("Creating " + req.params.color)
                const newColorBlock = await colorBlock.save()
                res.status(201).json(newColorBlock)
            } else {
                console.log("This color already exists\n" + findColor)
                res.status(403).json({message: "Block already exists. Try incrementing that block?"})
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })
    .delete(async (req, res) => {
        const thisColor = await ColorBlock.findOneAndDelete({color: req.params.color})
        if(thisColor==null) {
            console.log("Color " + req.params.color + " does not exist. Did not delete")
            res.status(404).json({message: "Color " + req.params.color + " does not exist. Did not delete"})
        } else {
            console.log("Deleted " + req.params.color)
            res.json({message: "Deleted " + req.params.color})
        }
    })


// Creating One Unique Color -- DEPRECIATED
// router.post('/', async (req, res) => {
//     const colorBlock = new ColorBlock({
//         color: req.body.color,
//         votes: req.body.votes
//     })

//     try {
//         // Check if the color already exists
//         console.log("Trying to create " + req.body.color)
//         if((await ColorBlock.find({color: req.body.color})).length>0) {
//             res.status(403).json({message: "block already exists!"})
//             console.log(req.body.color + " already exists!")
//         } else {
//             const newColorBlock = await colorBlock.save()
//             res.status(201).json(newColorBlock)
//         }
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// })

// Incrementing One Color
router.patch('/color/increment/:color', async (req, res) => {
    console.log(req.params.color)
    const colorBlock = await ColorBlock.find({color: req.params.color})
    console.log(colorBlock)
    if(colorBlock.length==0) {
        console.log("Color " + req.params.color + " does not exist")
        res.status(400).json({message: "Color " + req.params.color + " does not exist"})
    } else {
        await ColorBlock.findOneAndUpdate({color: req.params.color}, {$inc : {votes: 1}})
        res.json({message: "Color " + req.params.color + " incremented by 1"})
        console.log("Color " + req.params.color + " incremented by 1")
    }

})

// Deleting One Color
router.delete('/:id', (req, res) => {

})

// Delete ALL (BE CAREFUL)
router.delete('/self/destruct/this/joint', async (req, res) => {
    console.log("DELETING ALL COLORS!")
    await ColorBlock.deleteMany({})
    res.json({message: "you killed all the younglings..."})
})

// Update Font Color
router.put('/update/fontcolor', async (req, res) => {

    const setBlack = {
        $set: {
            isBlackFont: true
        }
    }
    const setWhite = {
        $set: {
            isBlackFont: false
        }
    }
    // Set them all to black to start
    const setToBlack = await ColorBlock.updateMany({}, setBlack)
    // console.log(setToBlack.modifiedCount + " changed to black font")

    const resultTotal = await ColorBlock.find({})
    // console.log(resultTotal.length + " Total Blocks Found");

    resultTotal.forEach(async col => {
        if(!wc_hex_is_light(col.color)) {
            await ColorBlock.updateOne({color: col.color}, setWhite)
            console.log(col.color + " set to white font.")
        } else {
            console.log(col.color)
        }
    });

    res.json({message: "you updated the colors!"})


})

function wc_hex_is_light(color) {
    const hex = color;
    const c_r = parseInt(hex.substring(0, 0 + 2), 16);
    const c_g = parseInt(hex.substring(2, 2 + 2), 16);
    const c_b = parseInt(hex.substring(4, 4 + 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 155;
}






module.exports = router
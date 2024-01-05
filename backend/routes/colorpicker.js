const express = require('express')
const router = express.Router()
const ColorBlock = require('../models/ColorBlock')

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

// Get Random x Colors
router.get('/number/random/:getNumber', async (req, res) => {
    try {
        const colorBlocks = (await ColorBlock.find()).slice(0,req.params.getNumber)
        res.json(colorBlocks)
    } catch (error) {
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






module.exports = router
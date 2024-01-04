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
    .get((req, res) => {
        // (await ColorBlock.find(req.body.color))
        console.log("HI")
        res.status(200).json({message: "YO"})
    })
    .post((req, res) => {
        res.send();
    })
    .delete((req, res) => {
        res.send();
    })


// Creating One Unique Color
router.post('/', async (req, res) => {
    const colorBlock = new ColorBlock({
        color: req.body.color,
        votes: req.body.votes
    })

    try {
        // Check if the color already exists
        console.log(req.body.color)
        if((await ColorBlock.find({color: req.body.color})).length>0) {
            res.status(404).json({message: "block already exists!"})
        } else {
            const newColorBlock = await colorBlock.save()
            res.status(201).json(newColorBlock)
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Incrementing One Color
router.patch('/color/increment/:color', (req, res) => {
    console.log(req.body.color)
    res.status(400).json({message: "not done yet idiot"})
})

// Deleting One Color
router.delete('/:id', (req, res) => {

})

// Delete ALL (BE CAREFUL)
router.delete('/self/destruct/this/joint', (req, res) => {
    console.log("DELETING ALL COLORS!")
    ColorBlock.deleteMany({})
    res.status(205).json({message: "you killed all the younglings..."})
})






module.exports = router
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


// Get Specific Color
router.get('/:color', (req, res) => {
    
})

// Deal with One Color with color in URI
router
    .route("/:color")
    .get((req, res) => {
        res.send(req.params.color)
    })
    .post((req, res) => {
        res.send();
    })
    .delete((req, res) => {
        res.send();
    })


// Creating One Color
router.post('/', async (req, res) => {
    const colorBlock = new ColorBlock({
        color: req.body.color,
        votes: req.body.votes
    })

    try {
        // Check if the color already exists
        await ColorBlock.find(req.body.color)
        const newColorBlock = await colorBlock.save()
        res.status(201).json(newColorBlock)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One Color
router.patch('/color/:id', (req, res) => {

})

// Deleting One Color
router.delete('/:id', (req, res) => {

})






module.exports = router
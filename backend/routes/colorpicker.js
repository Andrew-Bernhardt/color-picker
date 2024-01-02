const express = require('express')
const router = express.Router()
const ColorBlock = require('../models/ColorBlock')

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
router.get('/number/:getNumber', async (req, res) => {
    try {
        const colorBlocks = (await ColorBlock.find()).slice(0,req.params.getNumber)
        res.json(colorBlocks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Get One Color
router.get('/:color', (req, res) => {
    res.send(req.params.color)
})

// Creating One Color
router.post('/', async (req, res) => {
    const colorBlock = new ColorBlock({
        color: req.body.color,
        votes: req.body.votes
    })

    try {
        const newColorBlock = await colorBlock.save()
        res.status(201).json(newColorBlock)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One Color
router.patch('/:id', (req, res) => {

})

// Deleting One Color
router.delete('/:id', (req, res) => {

})






module.exports = router
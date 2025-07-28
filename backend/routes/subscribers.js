const express = require('express');
const router = express.Router();

//Getting All
router.get('/', async (req, res) => {
    try {
        res.status(200).json({ message: "Get all subscribers" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Getting One
router.get('/:id', async (req, res) => {
    try {
        
        res.status(200).json({ message: `Get subscriber with ID ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Creating One
router.post('/', async (req, res) => {
    try {
        
        res.status(201).json({ message: "Subscriber created" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//Updating One
router.patch('/:id', async (req, res) => {
    try {
        
        res.status(200).json({ message: `Subscriber with ID ${req.params.id} updated` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//Deleting One
router.delete('/:id', async (req, res) => {
    try {
        
        res.status(200).json({ message: `Subscriber with ID ${req.params.id} deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
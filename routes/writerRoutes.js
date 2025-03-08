const express = require('express');
const router = express.Router();

const {
    fetchAllWriters,
    fetchWriterById,
    removeWriterById,
    addWriter,
    modifyWriterById
} = require('../controllers/writerController');

// Fetch all writers
router.get('/', fetchAllWriters);

// Fetch a single writer by ID
router.get('/:id', fetchWriterById);

// Delete a writer by ID
router.delete('/:id', removeWriterById);

// Update a writer by ID
router.put('/:id', modifyWriterById);

// Create a new writer
router.post('/', addWriter);

module.exports = router;
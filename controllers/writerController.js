const WriterModel = require('../models/writerModel');

// Fetch all writers
const fetchAllWriters = async (req, res) => {
    try {
        const writers = await WriterModel.find();
        res.json(writers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single writer by ID
const fetchWriterById = async (req, res) => {
    try {
        const writer = await WriterModel.findById(req.params.id);
        if (!writer) {
            return res.status(404).json({ message: 'Writer not found' });
        }
        res.json(writer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a writer by ID
const removeWriterById = async (req, res) => {
    try {
        const writer = await WriterModel.findByIdAndDelete(req.params.id);
        if (!writer) {
            return res.status(404).json({ message: 'Writer not found' });
        }
        res.json({ message: 'Writer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new writer
const addWriter = async (req, res) => {
    const { name, bio, image } = req.body;

    // Validate input
    if (!Array.isArray(name) || name.length === 0) {
        return res.status(400).json({ message: "Name must be a non-empty array" });
    }


    
    try {
        const writer = new WriterModel({
            name,
            bio : bio || ["", "", ""],
            image: image || null
        });

        const createdWriter = await writer.save();
        res.status(201).json(createdWriter);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Update a writer by ID
const modifyWriterById = async (req, res) => {
    const { name, bio, image } = req.body;

    // Validate input
    if (name && (!Array.isArray(name) || name.length === 0)) {
        return res.status(400).json({ message: "Name must be a non-empty array" });
    }


    try {
        const writer = await WriterModel.findByIdAndUpdate(
            req.params.id,
            { name, bio, image },
            { new: true, runValidators: true }
        );

        if (!writer) {
            return res.status(404).json({ message: 'Writer not found' });
        }

        res.json(writer);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    fetchAllWriters,
    fetchWriterById,
    removeWriterById,
    addWriter,
    modifyWriterById
};
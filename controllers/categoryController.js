const CategoryModel = require('../models/categoryModel');

// Fetch all categories
const fetchAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single category by ID
const fetchCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a category by ID
const removeCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
const addCategory = async (req, res) => {
    const { name, description } = req.body;

    // Validate input
    if (!Array.isArray(name) || name.length === 0) {
        return res.status(400).json({ message: "Name must be a non-empty array" });
    }

    if (description && !Array.isArray(description)) {
        return res.status(400).json({ message: "Description must be an array" });
    }

    try {
        const category = new CategoryModel({
            name,
            description: description || ["", "", ""],
        });

        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: "Category name must be unique" });
        }
        res.status(500).json({ message: error.message });
    }
};

// Update a category by ID
const modifyCategoryById = async (req, res) => {
    const { name, description } = req.body;

    // Validate input
    if (description && !Array.isArray(description)) {
        return res.status(400).json({ message: "Description must be an array" });
    }

    try {
        const category = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: "Category name must be unique" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    fetchAllCategories,
    fetchCategoryById,
    removeCategoryById,
    addCategory,
    modifyCategoryById
};
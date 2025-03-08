const SubCategoryModel = require('../models/subCategoryModel');

// Fetch all subcategories
const fetchAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategoryModel.find().populate('category');
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single subcategory by ID
const fetchSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategoryModel.findById(req.params.id).populate('category');
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.json(subCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a subcategory by ID
const removeSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategoryModel.findByIdAndDelete(req.params.id);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.json({ message: 'SubCategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new subcategory
const addSubCategory = async (req, res) => {
    const { name, description, category } = req.body;
    console.log(name,description,category);
    

    // Validate input
    if (!Array.isArray(name) || name.length === 0) {
        return res.status(400).json({ message: "Name must be a non-empty array" });
    }

    if (description && !Array.isArray(description)) {
        return res.status(400).json({ message: "Description must be an array" });
    }
    try {
        const subCategory = new SubCategoryModel({
            name,
            description: description || [],
            category
        });

        const createdSubCategory = await subCategory.save();
        res.status(201).json(createdSubCategory);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: "SubCategory name must be unique" });
        }
        res.status(500).json({ message: error.message });
    }
};

// Update a subcategory by ID
const modifySubCategoryById = async (req, res) => {
    const { name, description, category } = req.body;

    // Validate input
    if (description && !Array.isArray(description)) {
        return res.status(400).json({ message: "Description must be an array" });
    }


    try {
        const subCategory = await SubCategoryModel.findByIdAndUpdate(
            req.params.id,
            { name, description, category },
            { new: true, runValidators: true }
        );

        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }

        res.json(subCategory);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: "SubCategory name must be unique" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    fetchAllSubCategories,
    fetchSubCategoryById,
    removeSubCategoryById,
    addSubCategory,
    modifySubCategoryById
};
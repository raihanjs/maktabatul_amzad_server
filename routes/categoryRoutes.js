const express = require('express');
const router = express.Router();

const {
    fetchAllCategories,
    fetchCategoryById,
    removeCategoryById,
    addCategory,
    modifyCategoryById
} = require('../controllers/categoryController');

// Fetch all categories
router.get('/', fetchAllCategories);

// Fetch a single category by ID
router.get('/:id', fetchCategoryById);

// Delete a category by ID
router.delete('/:id', removeCategoryById);

// Update a category by ID
router.put('/:id', modifyCategoryById);

// Create a new category
router.post('/', addCategory);

module.exports = router;
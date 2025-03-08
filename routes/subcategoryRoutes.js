const express = require('express');
const router = express.Router();

const {
    fetchAllSubCategories,
    fetchSubCategoryById,
    removeSubCategoryById,
    addSubCategory,
    modifySubCategoryById
} = require('../controllers/subcategoryController');

// Fetch all subcategories
router.get('/', fetchAllSubCategories);

// Fetch a single subcategory by ID
router.get('/:id', fetchSubCategoryById);

// Delete a subcategory by ID
router.delete('/:id', removeSubCategoryById);

// Update a subcategory by ID
router.put('/:id', modifySubCategoryById);

// Create a new subcategory
router.post('/', addSubCategory);

module.exports = router;
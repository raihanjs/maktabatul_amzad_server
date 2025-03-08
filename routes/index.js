const express = require('express');
const router = express.Router();

const writerRoutes = require('./writerRoutes');
const categoryRoutes = require('./categoryRoutes');
const subcategoryRoutes = require('./subcategoryRoutes');


router.use('/writers', writerRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subcategoryRoutes);

module.exports = router;
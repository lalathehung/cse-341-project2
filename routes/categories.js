const router = require('express').Router();
const categoriesController = require('../controllers/categories');

// GET all categories
router.get('/', categoriesController.getAllCategories);

// POST create category
router.post('/', categoriesController.createCategory);

module.exports = router;
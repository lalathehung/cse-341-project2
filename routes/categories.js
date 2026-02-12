const router = require('express').Router();
const categoriesController = require('../controllers/categories');

const { isAuthenticated } = require("../middleware/authenticate.js");

router.get('/', categoriesController.getAllCategories);
router.post('/', isAuthenticated, categoriesController.createCategory);
router.put('/:id', isAuthenticated, categoriesController.updateCategory);
router.delete('/:id', isAuthenticated, categoriesController.deleteCategory);

module.exports = router;
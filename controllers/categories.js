const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCategories = async (req, res) => {
   //#swagger.tags=['Categories']
   try {
      const result = await mongodb.getDatabase().collection('categories').find();
      const categories = await result.toArray();
      res.status(200).json(categories);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const createCategory = async (req, res) => {
   //#swagger.tags=['Categories']
   const category = {
      name: req.body.name,
      description: req.body.description,
      createdAt: new Date(),
      isActive: req.body.isActive ?? true
   };

   // Validation for POST
   if (!category.name) {
      return res.status(400).json({ error: 'name is required' });
   }

   try {
      const response = await mongodb.getDatabase().collection('categories').insertOne(category);
      res.status(201).json({ _id: response.insertedId });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const updateCategory = async (req, res) => {
   //#swagger.tags=['Categories']
   try {
      const categoryId = new ObjectId(req.params.id);
      const category = {
         name: req.body.name,
         description: req.body.description,
         isActive: req.body.isActive
      };

      // Validation for PUT
      if (req.body.name && typeof req.body.name !== 'string') {
         return res.status(400).json({ error: 'name must be a string' });
      }

      const response = await mongodb.getDatabase().collection('categories').replaceOne({ _id: categoryId }, category);
      if (response.modifiedCount > 0) {
         res.status(204).send();
      } else {
         res.status(404).json({ message: 'Category not found or no changes made' });
      }
   } catch (err) {
      res.status(400).json({ error: 'Invalid category ID or data format' });
   }
};

const deleteCategory = async (req, res) => {
   //#swagger.tags=['Categories']
   try {
      const categoryId = new ObjectId(req.params.id);
      const response = await mongodb.getDatabase().collection('categories').deleteOne({ _id: categoryId });
      if (response.deletedCount > 0) {
         res.status(204).send();
      } else {
         res.status(404).json({ message: 'Category not found' });
      }
   } catch (err) {
      res.status(400).json({ error: 'Invalid category ID' });
   }
};

module.exports = {
   getAllCategories,
   createCategory,
   updateCategory,
   deleteCategory
};
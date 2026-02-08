const mongodb = require('../data/database');

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
      isActive: true
   };

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

module.exports = { getAllCategories, createCategory };
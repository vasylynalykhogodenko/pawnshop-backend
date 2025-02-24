const ItemCategory = require('../models/ItemCategory');

exports.getAllCategory = async (req, res) => {
  try {
    const itemCategory = await ItemCategory.find();
    res.status(200).json(itemCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
    try {
      const itemById = req.params.id;
      const itemCategory = await ItemCategory.findById(itemById);
      res.status(200).json(itemCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
      const { categoryName, notes } = req.body;

      if (!categoryName) {
        return res.status(400).json({ message: 'Category name is required' });
      }

      const existingCategory = await ItemCategory.findOne({ categoryName });
      if (existingCategory) {
        return res.status(409).json({ message: 'Category already exists' });
      }

      const newItemCategory = new ItemCategory({
        categoryName,
        notes
      })

      const savedItemCategory = await newItemCategory.save();
      res.status(201).json(savedItemCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.updateCategory = async (req, res) =>  {
  try {
    const { id } = req.params;
    const { categoryName, notes } = req.body;
    const category = await ItemCategory.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (categoryName) category.categoryName = categoryName;
    if (notes) category.notes = notes;

    await category.save();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ItemCategory.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
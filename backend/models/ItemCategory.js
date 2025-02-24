/**
 * @openapi
 * components:
 *   schemas:
 *     ItemCategory:
 *       type: object
 *       required:
 *         - categoryName
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         categoryName:
 *           type: string
 *           description: Name of the item category
 *         notes:
 *           type: string
 *           description: Additional notes about the category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the category was last updated
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the category
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the category
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         categoryName: "Electronics"
 *         notes: "For electronic devices and gadgets"
 *         createdAt: "2024-02-24T00:38:47Z"
 *         updatedAt: "2024-02-24T00:38:47Z"
 *         createdBy: "507f1f77bcf86cd799439012"
 *         updatedBy: "507f1f77bcf86cd799439012"
 */

const mongoose = require('mongoose');

const itemCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  notes: { type: String },
}, { timestamps: true });

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);
module.exports = ItemCategory;
/**
 * @openapi
 * components:
 *   schemas:
 *     PriceHistory:
 *       type: object
 *       required:
 *         - price
 *         - date
 *       properties:
 *         price:
 *           type: number
 *           description: Historical price of the pawned item
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date when the price was recorded
 *
 *     PawnTransaction:
 *       type: object
 *       required:
 *         - itemCategory
 *         - client
 *         - itemDescription
 *         - pawnDate
 *         - returnDate
 *         - amount
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         itemCategory:
 *           type: string
 *           description: Reference to the ItemCategory model
 *         client:
 *           type: string
 *           description: Reference to the Client model
 *         itemDescription:
 *           type: string
 *           description: Description of the pawned item
 *         pawnDate:
 *           type: string
 *           format: date-time
 *           description: Date when the item was pawned
 *         returnDate:
 *           type: string
 *           format: date-time
 *           description: Expected return date
 *         amount:
 *           type: number
 *           description: Loan amount
 *         commission:
 *           type: number
 *           default: 5
 *           description: Commission percentage for the transaction
 *         priceHistory:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PriceHistory'
 *           description: History of price changes
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the transaction was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the transaction was last updated
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         itemCategory: "507f1f77bcf86cd799439012"
 *         client: "507f1f77bcf86cd799439013"
 *         itemDescription: "Gold Ring 18K"
 *         pawnDate: "2024-02-24T01:17:07Z"
 *         returnDate: "2024-03-24T01:17:07Z"
 *         amount: 1000
 *         commission: 5
 *         priceHistory: [
 *           {
 *             price: 1000,
 *             date: "2024-02-24T01:17:07Z"
 *           }
 *         ]
 */

const mongoose = require('mongoose');

const pawnTransactionSchema = new mongoose.Schema({
    itemCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemCategory' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    itemDescription: { type: String, required: true },
    pawnDate: { type: Date, required: true },
    returnDate: { type: Date, require: true },
    amount: { type: Number, required: true },
    commission: { type: Number, required: true, default: 5 },
    priceHistory: [{
      price: { type: Number, required: true },
      date: { type: Date, required: true }
    }]
});

const PawnTransaction = mongoose.model('PawnTransaction', pawnTransactionSchema);
module.exports = PawnTransaction;
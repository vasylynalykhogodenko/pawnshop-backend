/**
 * @openapi
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - middleName
 *         - passportNumber
 *         - passportSeries
 *         - passportIssueDate
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         firstName:
 *           type: string
 *           description: Client's first name
 *         lastName:
 *           type: string
 *           description: Client's last name
 *         middleName:
 *           type: string
 *           description: Client's middle name
 *         passportNumber:
 *           type: string
 *           description: Client's passport number (must be unique)
 *         passportSeries:
 *           type: string
 *           description: Client's passport series
 *         passportIssueDate:
 *           type: string
 *           format: date
 *           description: Date when the passport was issued
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the client was registered
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the client information was last updated
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         firstName: "John"
 *         lastName: "Doe"
 *         middleName: "Robert"
 *         passportNumber: "123456789"
 *         passportSeries: "AB"
 *         passportIssueDate: "2020-01-01"
 *         createdAt: "2024-02-24T00:54:35Z"
 *         updatedAt: "2024-02-24T00:54:35Z"
 */

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  passportNumber: { type: String, required: true, unique: true },
  passportSeries: { type: String, required: true },
  passportIssueDate: { type: Date, required: true }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
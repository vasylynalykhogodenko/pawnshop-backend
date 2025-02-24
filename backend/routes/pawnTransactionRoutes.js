/**
 * @openapi
 * tags:
 *   name: Pawn Transactions
 *   description: Pawn Transaction management endpoints
 */
/**
 * @openapi
 * /api/pawnTransaction:
 *   get:
 *     summary: Get all pawn transactions
 *     description: Retrieves a list of all pawn transactions with pagination, filtering, and sorting options.
 *     tags: [Pawn Transactions]
 *     security:
 *       - bearerAuth: []
 *      x-roles: [Admin, Employee]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of transactions per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [pawnDate, returnDate, amount, createdAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         description: Filter by client ID
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Filter by item category ID
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter transactions from this date (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter transactions to this date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of pawn transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PawnTransaction'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 100
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 10
 *                         hasNext:
 *                           type: boolean
 *                           example: true
 *                         hasPrev:
 *                           type: boolean
 *                           example: false
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new pawn transaction
 *     description: Creates a new pawn transaction with the provided information
 *     tags: [Pawn Transactions]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin, Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemCategory
 *               - client
 *               - itemDescription
 *               - pawnDate
 *               - returnDate
 *               - amount
 *             properties:
 *               itemCategory:
 *                 type: string
 *                 description: ID of the item category
 *                 example: "507f1f77bcf86cd799439012"
 *               client:
 *                 type: string
 *                 description: ID of the client
 *                 example: "507f1f77bcf86cd799439013"
 *               itemDescription:
 *                 type: string
 *                 description: Detailed description of the pawned item
 *                 minLength: 3
 *                 example: "Gold Ring 18K, 5.2g"
 *               pawnDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the item is pawned (UTC - YYYY-MM-DD HH:MM:SS)
 *                 example: "2025-02-24 01:37:44"
 *               returnDate:
 *                 type: string
 *                 format: date-time
 *                 description: Expected return date (UTC - YYYY-MM-DD HH:MM:SS)
 *                 example: "2025-03-24 01:37:44"
 *               amount:
 *                 type: number
 *                 minimum: 0
 *                 description: Loan amount
 *                 example: 1000
 *               commission:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 default: 5
 *                 description: Commission percentage
 *                 example: 5
 *           example:
 *             itemCategory: "507f1f77bcf86cd799439012"
 *             client: "507f1f77bcf86cd799439013"
 *             itemDescription: "Gold Ring 18K, 5.2g"
 *             pawnDate: "2025-02-24 01:37:44"
 *             returnDate: "2025-03-24 01:37:44"
 *             amount: 1000
 *             commission: 5
 *     responses:
 *       201:
 *         description: Pawn transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Pawn transaction created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     transaction:
 *                       allOf:
 *                         - $ref: '#/components/schemas/PawnTransaction'
 *                         - type: object
 *                           properties:
 *                             createdBy:
 *                               type: string
 *                               example: "Nazariy003"
 *                             createdAt:
 *                               type: string
 *                               example: "2025-02-24 01:37:44"
 *                             priceHistory:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   price:
 *                                     type: number
 *                                     example: 1000
 *                                   date:
 *                                     type: string
 *                                     example: "2025-02-24 01:37:44"
 *       400:
 *         description: Invalid input or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                       message:
 *                         type: string
 *                   example:
 *                     - field: "amount"
 *                       message: "Amount must be greater than 0"
 *                     - field: "returnDate"
 *                       message: "Return date must be after pawn date"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Client or ItemCategory not found
 *       500:
 *         description: Server error
 * 
 *   /api/pawnTransaction/{id}:
 *   get:
 *     summary: Get a pawn transaction by ID
 *     tags: [Pawn Transactions]
 *     security:
 *       - bearerAuth: []
 *      x-roles: [Admin, Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pawn transaction ID
 *     responses:
 *       200:
 *         description: Pawn transaction found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PawnTransaction'
 *       404:
 *         description: Pawn transaction not found
 *       401:
 *         description: Unauthorized
 * 
 *   put:
 *     summary: Update a pawn transaction
 *     tags: [Pawn Transactions]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin, Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pawn transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemCategory:
 *                 type: string
 *               client:
 *                 type: string
 *               itemDescription:
 *                 type: string
 *               pawnDate:
 *                 type: string
 *                 format: date-time
 *               returnDate:
 *                 type: string
 *                 format: date-time
 *               amount:
 *                 type: number
 *               commission:
 *                 type: number
 *               priceHistory:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PriceHistory'
 *     responses:
 *       200:
 *         description: Pawn transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PawnTransaction'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pawn transaction not found
 * 
 *   delete:
 *     summary: Delete a pawn transaction
 *     tags: [Pawn Transactions]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pawn transaction ID
 *     responses:
 *       200:
 *         description: Pawn transaction deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pawn transaction not found
 */

const express = require('express');
const router = express.Router();
const pawnTransactionController = require('../controllers/pawnTransactionController');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');

router.use(authenticateJWT);

router.get('/', authorizeRole(['Admin', 'Employee']), pawnTransactionController.getAllPawnTransactions);
router.get('/:id', authorizeRole(['Admin', 'Employee']), pawnTransactionController.getPawnTransactionById);
router.post('/', authorizeRole(['Admin', 'Employee']), pawnTransactionController.createPawnTransaction);
router.put('/:id', authorizeRole(['Admin', 'Employee']), pawnTransactionController.updatePawnTransaction);
router.delete('/:id', authorizeRole(['Admin']), pawnTransactionController.deletePawnTransaction);

module.exports = router;
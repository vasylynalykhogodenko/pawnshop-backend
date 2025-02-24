/**
 * @openapi
 * tags:
 *   name: Pawn Transactions
 *   description: Pawn transaction management endpoints
 */

/**
 * @openapi
 * /api/pawnTransaction:
 *   get:
 *     summary: Get all pawn transactions
 *     description: |
 *       Retrieves a list of all pawn transactions with pagination and filtering.
 *       Accessible by both Admin and Employee roles.
 *       Current User: Admin
 *       Current UTC Time Format: YYYY-MM-DD HH:MM:SS
 *     tags: [Pawn Transactions]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin, Employee]
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
 *     responses:
 *       200:
 *         description: Successfully retrieved pawn transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PawnTransaction'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User role not authorized
 *       500:
 *         description: Server error
 *         
 *   post:
 *     summary: Create a new pawn transaction
 *     description: |
 *       Creates a new pawn transaction.
 *       Accessible by both Admin and Employee roles.
 *       Current User: Admin
 *       Current UTC Time: 2025-02-24 02:44:06
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
 *                 example: "Gold Ring 18K, 5.2g"
 *               pawnDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the item is pawned
 *                 example: "2025-02-24 02:44:06"
 *               returnDate:
 *                 type: string
 *                 format: date-time
 *                 description: Expected return date
 *                 example: "2025-03-24 02:44:06"
 *               amount:
 *                 type: number
 *                 description: Loan amount
 *                 example: 1000
 *               commission:
 *                 type: number
 *                 description: Commission percentage
 *                 default: 5
 *                 example: 5
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
 *                   $ref: '#/components/schemas/PawnTransaction'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User role not authorized
 *       500:
 *         description: Server error
 */

/**
 * @openapi
 * /api/pawnTransaction/{id}:
 *   get:
 *     summary: Get a pawn transaction by ID
 *     description: |
 *       Retrieves a specific pawn transaction by ID.
 *       Accessible by both Admin and Employee roles.
 *       Current User: Admin
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
 *     responses:
 *       200:
 *         description: Successfully retrieved pawn transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PawnTransaction'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User role not authorized
 *       404:
 *         description: Transaction not found
 *
 *   put:
 *     summary: Update a pawn transaction
 *     description: |
 *       Updates an existing pawn transaction.
 *       Accessible by both Admin and Employee roles.
 *       Current User: Admin
 *       Current UTC Time: 2025-02-24 02:44:06
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
 *             $ref: '#/components/schemas/PawnTransaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User role not authorized
 *       404:
 *         description: Transaction not found
 *
 *   delete:
 *     summary: Delete a pawn transaction
 *     description: |
 *       Deletes a pawn transaction.
 *       Only accessible by Admin role.
 *       Current User: Admin
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
 *         description: Transaction deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User role not authorized
 *       404:
 *         description: Transaction not found
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
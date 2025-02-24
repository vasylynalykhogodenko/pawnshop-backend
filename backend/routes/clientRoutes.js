/**
 * @openapi
 * tags:
 *   name: Clients
 *   description: Client management endpoints
 */
/**
 * @openapi
 * /api/client:
 *   get:
 *     summary: Get all clients
 *     description: Retrieves a list of all clients. Supports pagination and filtering. Requires authentication.
 *     tags: [Clients]
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
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering clients by name or passport number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [firstName, lastName, passportNumber, createdAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of clients retrieved successfully
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
 *                     clients:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Client'
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
 *     summary: Create a new client
 *     description: Creates a new client with the provided information. Requires authentication.
 *     tags: [Clients]
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
 *               - firstName
 *               - lastName
 *               - middleName
 *               - passportNumber
 *               - passportSeries
 *               - passportIssueDate
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Client's first name
 *                 minLength: 2
 *               lastName:
 *                 type: string
 *                 description: Client's last name
 *                 minLength: 2
 *               middleName:
 *                 type: string
 *                 description: Client's middle name
 *                 minLength: 2
 *               passportNumber:
 *                 type: string
 *                 description: Passport number (must be unique)
 *                 pattern: ^[0-9]+$
 *               passportSeries:
 *                 type: string
 *                 description: Passport series
 *                 pattern: ^[A-Z]+$
 *               passportIssueDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the passport was issued (YYYY-MM-DD)
 *           example:
 *             firstName: "John"
 *             lastName: "Doe"
 *             middleName: "Robert"
 *             passportNumber: "123456789"
 *             passportSeries: "AB"
 *             passportIssueDate: "2020-01-01"
 *     responses:
 *       201:
 *         description: Client created successfully
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
 *                   example: "Client created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Client'
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
 *                   example: "Passport number already exists"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 * 
 * /api/client/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin, Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized
 * 
 *   put:
 *     summary: Update a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               passportNumber:
 *                 type: string
 *               passportSeries:
 *                 type: string
 *               passportIssueDate:
 *                 type: string
 *                 format: date
 *             example:
 *               firstName: "John"
 *               lastName: "Doe"
 *               middleName: "Robert"
 *               passportNumber: "123456789"
 *               passportSeries: "AB"
 *               passportIssueDate: "2020-01-01"
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Invalid input or duplicate passport number
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Client not found
 * 
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Client not found
 *       409:
 *         description: Client cannot be deleted (has associated transactions)
 */

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');

router.use(authenticateJWT);

router.get('/', authorizeRole(['Admin', 'Employee']), clientController.getAllClients);
router.get('/:id', authorizeRole(['Admin', 'Employee']), clientController.getClientById);
router.post('/', authorizeRole(['Admin', 'Employee']), clientController.createClient);
router.put('/:id', authorizeRole(['Admin', 'Employee']), clientController.updateClient);
router.delete('/:id', authorizeRole(['Admin']), clientController.deleteClient);

module.exports = router;
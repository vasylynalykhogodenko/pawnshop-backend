/**
 * @openapi
 * tags:
 *   name: Item Categories
 *   description: Item category management endpoints
 */
/**
 * @openapi
 * /api/itemCategory:
 *   get:
 *     summary: Get all item categories
 *     tags: [Item Categories]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin]
 *     responses:
 *       200:
 *         description: List of item categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemCategory'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 *   post:
 *     summary: Create a new item category
 *     tags: [Item Categories]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: Name of the category
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCategory'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
/**
 * @openapi
 * /api/itemCategory/{id}:
 *   get:
 *     summary: Get an item category by ID
 *     tags: [Item Categories]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item category ID
 *     responses:
 *       200:
 *         description: Category found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCategory'
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 * 
 *   put:
 *     summary: Update an item category
 *     tags: [Item Categories]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 * 
 *   delete:
 *     summary: Delete an item category
 *     tags: [Item Categories]
 *     security:
 *       - bearerAuth: []
 *     x-roles: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */

const express = require('express');
const router = express.Router();
const itemCategoryController = require('../controllers/itemCategoryController');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');

router.use(authenticateJWT);

router.get('/', authorizeRole(['Admin']), itemCategoryController.getAllCategory);
router.get('/:id', authorizeRole(['Admin']), itemCategoryController.getCategoryById);
router.post('/', authorizeRole(['Admin']), itemCategoryController.createCategory);
router.put('/:id', authorizeRole(['Admin']), itemCategoryController.updateCategory);
router.delete('/:id', authorizeRole(['Admin']), itemCategoryController.deleteCategory);

module.exports = router;
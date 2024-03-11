// pkgs:
import express from "express";

// utils:
import authMiddleware from "../common/middlewares/auth.middleware";
import { createNewProduct } from "../controllers/collections/product/creating.controller";
import { deleteProduct } from "../controllers/collections/product/deleting.controller";
import { updateProduct } from "../controllers/collections/product/updating.controller";
import {
    getAllProduct,
    getSingleProductById,
} from "../controllers/collections/product/reading.controller";

// create new router:
const router = express.Router();

// setup HTTP requests:
// GET::
/**
 * @openapi
 * /api/v0/Product:
 *   get:
 *     summary: Get all Product
 *     responses:
 *       '200':
 *         description: A list of Product
 */
router.get(`/`, getAllProduct);

/**
 * @openapi
 * /api/v0/Product/s/{id}:
 *   get:
 *     summary: Get a single Product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single Product
 */
router.get(`/s/:id`, getSingleProductById);

/**
 * @openapi
 * /api/v0/Product/new:
 *   post:
 *     summary: Create a new Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProductData'
 *     responses:
 *       '201':
 *         description: Product created successfully
 */
router.post(`/new`, createNewProduct);

/**
 * @openapi
 * /api/v0/Product/{id}:
 *   delete:
 *     summary: Delete an Product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 */
router.delete(`/:id`, authMiddleware, deleteProduct);

/**
 * @openapi
 * /api/v0/Product/{id}:
 *   patch:
 *     summary: Update an Product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductData'
 *     responses:
 *       '200':
 *         description: Product updated successfully
 */
router.patch(`/:id`, authMiddleware, updateProduct);

export default router;

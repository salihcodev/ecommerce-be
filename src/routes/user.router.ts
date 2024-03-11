// pkgs:
import express from "express";

// utils:
import {
    changePassword,
    forgotPassword,
    getRegisteredUsers,
    signinHandler,
    signupHandler,
    terminateUser,
    updateUserRole,
} from "../controllers/auth/customer.controller";

// create new router:
const router = express.Router();

/**
 * @openapi
 * /api/v0/auth/whoishere:
 *   get:
 *     summary: Get all registered users
 *     responses:
 *       200:
 *         description: A list of registered users
 */
router.get("/whoishere", getRegisteredUsers);

/**
 * @openapi
 * /api/v0/auth/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statue:
 *                   type: string
 *                   example: SUCCESS
 *                   description: Status of the response
 *                 info:
 *                   type: string
 *                   description: Additional information
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The ID of the user
 *                         name:
 *                           type: string
 *                           description: The name of the user
 *                         email:
 *                           type: string
 *                           format: email
 *                           description: The email address of the user
 *                     accessToken:
 *                       type: string
 *                       description: Access token for the registered user
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the error
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                   description: A message indicating the error
 *                 error:
 *                   type: string
 *                   description: Details of the error
 */

router.post("/signup", signupHandler);

/**
 * @openapi
 * /api/v0/auth/signin:
 *   post:
 *     summary: Sign in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignin'
 *     responses:
 *       200:
 *         description: User signed in successfully
 */
router.post("/signin", signinHandler);

/**
 * @openapi
 * /api/v0/auth/terminate/{id}:
 *   delete:
 *     summary: Terminate a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User terminated successfully
 */
router.delete("/terminate/:id", terminateUser);

/**
 * @openapi
 * /api/v0/auth/role/{id}:
 *   post:
 *     summary: Update user role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum:
 *                  - ADMIN
 *                  - USER
 *     responses:
 *       200:
 *         description: User role updated successfully
 */
router.post("/role/:id", updateUserRole);

/**
 * @openapi
 * /api/v0/auth/new-token:
 *   post:
 *     summary: Request a new authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statue:
 *                   type: string
 *                   example: SUCCESS
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   example: Successfully sent an E-mail with reset token.
 *                   description: A message indicating the success of the operation
 *                 info:
 *                   type: string
 *                   description: Additional information
 *                 data:
 *                   type: string
 *                   description: The generated authentication token
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please provide an email.
 *                   description: A message indicating the error
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to generate new token.
 *                   description: A message indicating the error
 *                 error:
 *                   type: string
 *                   description: Details of the error
 */
router.post("/new-token", forgotPassword);

/**
 * @openapi
 * /api/v0/auth/new-password:
 *   post:
 *     summary: Update user password
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The token received for password change
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm password
 *     responses:
 *       '200':
 *         description: User password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statue:
 *                   type: string
 *                   example: SUCCESS
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   example: Updated the user password successfully.
 *                   description: A message indicating the success of the operation
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Passwords do not match.
 *                   description: A message indicating the error
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update the user password.
 *                   description: A message indicating the error
 *                 error:
 *                   type: string
 *                   description: Details of the error
 */
router.post("/new-password", changePassword);

export default router;

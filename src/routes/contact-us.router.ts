// pkgs:
import express from "express";

// utils:
import { handelContactUsForm } from "../controllers/collections/contact-us.controller";

// create new router:
const router = express.Router();

// receive a email form users.
/**
 * @openapi
 * /api/v0/contact-us:
 *   post:
 *     summary: Handle contact us form submission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the sender
 *               fromMail:
 *                 type: string
 *                 format: email
 *                 description: The email address of the sender
 *               message:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       '200':
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   example: Thanks, We received your message.
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
 *                   example: Failed to send reset password email
 *                   description: A message indicating the error
 *                 error:
 *                   type: string
 *                   description: Details of the error
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   example: Could not send your email, Please retry again.
 *                   description: A message indicating the error
 *                 error:
 *                   type: string
 *                   description: Details of the error
 */

router.post(`/contact-us`, handelContactUsForm);

export default router;

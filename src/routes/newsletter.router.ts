// pkgs:
import express from "express";
import newsLetterSubscription from "../controllers/collections/newsletter-subscription.controller";

// utils:

// create new router:
const router = express.Router();

/**
 * @openapi
 * /api/v0/newsletter-subscription/{userEmail}:
 *   post:
 *     summary: Subscribe to newsletter
 *     parameters:
 *       - in: path
 *         name: userEmail
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email of the user to subscribe to the newsletter
 *     requestBody:
 *       required: false
 *     responses:
 *       '200':
 *         description: Newsletter subscription successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/newsletter-subscription/:userEmail", newsLetterSubscription);

export default router;

import { Router } from "express";

import * as controller
from "./auth.controller.js";

import {
  authenticate,
} from "../../common/middlewares/auth.js";


const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: vinokyo@gmail.com
 *               password:
 *                 type: string
 *                 example: P@ssw0rd
 *     responses:
 *       201:
 *         description: Success
 */
router.post(
  "/login",
  controller.login
);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh Token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: vinokyo@gmail.com
 *     responses:
 *       201:
 *         description: Success
 */
router.post(
  "/refresh-token",
  controller.refreshToken
);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: vinokyo@gmail.com
 *     responses:
 *       201:
 *         description: Success
 */
router.post(
  "/logout",
  authenticate,
  controller.logout
);

export default router;
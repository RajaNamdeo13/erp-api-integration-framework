const express = require("express");
const router = express.Router();

const { login } = require("../services/authService");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login as Admin
 *     description: Returns a JWT token after successful authentication.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    const token = login(username, password);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    res.status(200).json({
        success: true,
        message: "Login Successful",
        token
    });

});

module.exports = router;
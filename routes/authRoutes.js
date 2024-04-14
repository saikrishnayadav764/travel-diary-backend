// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, userProfile } = require('../controllers/authController');
const authenticate = require("../config/middleware");

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/profile
router.get("/profile", authenticate, userProfile);

module.exports = router;

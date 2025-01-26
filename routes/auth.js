const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controller/auth')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect if authentication fails
    session: false, // Avoid session creation if using JWT
  }),
  (req, res) => {
    // Generate a token (JWT or custom) here if needed
    res.redirect("/dashboard"); // Redirect to a specific page after successful login
  }
);

module.exports = router;

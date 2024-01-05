const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/dashboard", authenticateToken, (req, res) => {
    res.json({
        message: "Coming soon", user: req.user
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET_KEY = process.env.SECRET_KEY

router.post("/signup/anonymous", signupAsAnAnonymousUser);
router.post("/signup", signupAsARegularUser);
router.post("/login", loginAsARegularUser);
router.post("/login/anonymous", loginAsAnAnonymousUser);

module.exports = router
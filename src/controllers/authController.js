const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.SECRET_KEY;

function generateAuthToken(user) {
  return jwt.sign({ userId: user._id, nickname: user.nickname }, JWT_SECRET_KEY, { expiresIn: '1h' });
}

async function loginAsAnAnonymousUser(req, res) {
  try {
    const { nickname, passcode } = req.body;

    const user = await User.findOne({ nickname, isAnonymous: true });
    if (!user) {
      return res.status(401).json({ error: 'Invalid nickname or passcode' });
    }

    const isPasswordValid = await bcrypt.compare(passcode, user.passcode);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid nickname or passcode' });
    }

    const authToken = generateAuthToken(user);

    return res.json({ user, authToken });
  } catch (error) {
    console.error('Error during anonymous login:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function signupAsAnAnonymousUser(req, res) {
  try {
    const { nickname, passcode } = req.body;
    const hashedPasscode = await bcrypt.hash(passcode, 10);
    const newUser = new User({
      nickname,
      passcode: hashedPasscode,
      isAnonymous: true,
    });
    await newUser.save();

    const authToken = generateAuthToken(newUser);

    return res.status(201).json({
      message: 'An anonymous user has signed up successfully',
      authToken,
    });
  } catch (error) {
    console.error('Error signing up:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
}

async function signupAsARegularUser(req, res) {
  try {
    const { firstName, lastName, email, passcode } = req.body;

    const hashedPasscode = await bcrypt.hash(passcode, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      isAnonymous: false,
      passcode: hashedPasscode,
    });
    await newUser.save();

    const authToken = generateAuthToken(newUser);

    return res.status(201).json({
      message: 'Sign up successful',
      authToken,
    });
  } catch (error) {
    console.error('Error signing up:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
}

async function loginAsARegularUser(req, res) {
  try {
    const { email, passcode } = req.body;
    const user = await User.findOne({ email, isAnonymous: false });
    if (!user) {
      return res.status(401).json({
        error: 'Email is incorrect',
      });
    }
    const isPasswordValid = await bcrypt.compare(passcode, user.passcode);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid passcode',
      });
    }
    const authToken = generateAuthToken(user);
    return res.json({
      user,
      authToken,
    });
  } catch (error) {
    console.error('An error occurred during login:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
}

module.exports = {
  signupAsARegularUser,
  signupAsAnAnonymousUser,
  loginAsARegularUser,
  loginAsAnAnonymousUser,
};
     
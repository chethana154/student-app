const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, course, status, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      course,
      status,
      role: role || 'student'
    });

    res.status(201).json({ message: 'User registered' });
  } catch {
    res.status(500).json({ message: 'Registration failed' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, email: user.email, _id: user._id, role: user.role });
  } catch {
    res.status(500).json({ message: 'Login failed' });
  }
};

const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Only admins get the full student list
      if (user.role === 'admin') {
        const students = await User.find({ role: 'student' });
        return res.json(students);
      }
  
      // Students only get their own profile
      res.json(user);
    } catch {
      res.status(500).json({ message: 'Error fetching profile' });
    }
  };

module.exports = { registerUser, loginUser, getProfile };

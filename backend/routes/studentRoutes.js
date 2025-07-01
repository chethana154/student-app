const express = require('express');
const router = express.Router();
const { getStudents, addStudent } = require('../controllers/studentController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, getStudents);
router.post('/', protect, addStudent);

module.exports = router;
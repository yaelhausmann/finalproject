const express = require('express');
const router = express.Router();
const Control = require('../controllers/users')

router.post('/signup', Control.create)
router.post('/login', Control.get_one)
router.delete('/:userID', Control.delete)

module.exports = router;
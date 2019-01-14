const express = require('express');
const router = express.Router();
const Control = require('../controllers/users')

router.get('/', Control.get_all)
router.post('/register', Control.create)
router.post('/login', Control.get_one)
router.delete('/:userID', Control.delete)

module.exports = router;
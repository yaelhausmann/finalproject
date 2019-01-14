const express = require('express');
const router = express.Router();
const CheckAuth = require('../middleware/check-auth')
const Control = require('../controllers/order')

router.get('/', CheckAuth, Control.get_all);
router.post('/', CheckAuth, Control.create);
router.get('/:orderID', CheckAuth, Control.get_one);
router.delete('/:productId', CheckAuth, Control.delete);


module.exports = router
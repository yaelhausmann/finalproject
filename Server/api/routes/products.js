const express = require('express');
const router = express.Router();
const CheckAuth = require('../middleware/check-auth')
const Control = require('../controllers/products')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const filFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }


}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filFilter
})
// Retreiving all the products
router.get('/',Control.get_all);
// find a product by id
router.get('/id/:productId', Control.get_one);
// find all product of a given category
router.get('/category/:category', Control.get_by_category);
//Create a product
router.post('/', CheckAuth, upload.single('productImage'), Control.create);
// Modify a Product
router.patch('/id/:productId', CheckAuth,Control.update);
// Delete a product
router.delete('/id/:productId', CheckAuth, Control.delete);



module.exports = router
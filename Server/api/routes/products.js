const express = require('express');
const router = express.Router();
const Product = require('../models/products')
const mongoose = require('mongoose') // import mongoose to create mongooseobject id
const multer = require('multer')
const CheckAuth = require('../middleware/check-auth')
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

//---------------------- GETTERS -------------------------------


// Route for retreiving all the products
router.get('/', (req, res, next) => {
    Product.find() //the method finc can also accept where clause
        .select('name price category productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage : doc.productImage,
                        _id: doc._id,
                        category: doc.category,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/products/id/${doc._id}`
                        }
                    }
                })
            }
            if (docs.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "the product collection is empty"
                })
            }

        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            }
        )
});




// find a product by id
router.get('/id/:productId', (req, res, next) => {
    const id = req.params.productId //retrieve the product id from the requests arguments Express will give an argument of the same name that we write with semicolumn 
    Product.findById(id)
    .select('name price category productImage')
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) { //if there is an object with this id
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }


        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })


});

// find all product of a given category

router.get('/category/:category', (req, res, next) => {


    const category = req.params.category //retrieve the product id from the requests arguments Express will give an argument of the same name that we write with semicolumn 
    console.log(category)
    Product.find()
    .select('name price category productImage')
        .where('category').equals(category)
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) { //if there is an object with this id
                res.status(200).json({
                    products: doc,
                    request: {
                        type: 'GET',
                        description: 'GoBack to get all the products',
                        url: `http://localhost:3000/products`
                    }

                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }


        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })


});



router.post('/', CheckAuth, upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        productImage: req.file.path
    })
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Product Created Successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/id/${result._id}`
                    }
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

});


router.patch('/id/:productId', CheckAuth,(req, res, next) => {
    const id = req.params.productId //retrieve the product id from the requests arguments Express will give an argument of the same name that we write with semicolumn 
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne(
        {
            _id: id
        },
        {
            $set: updateOps
        })
        .exec()
        .then(
            result => {
                console.log(result)
                res.status(200).json({
                    message: 'Product updated',
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/id/${id}`
                    }
                })
            }
        )
        .catch(
            err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            }
        )



});

router.delete('/id/:productId', CheckAuth,(req, res, next) => {
    const id = req.params.productId //retrieve the product id from the requests arguments Express will give an argument of the same name that we write with semicolumn 

    Product.remove({
        _id: id
    })
        .exec()
        .then(
            result => {
                result.status(200).json(result)
            }
        )
        .catch(
            err => {
                console.log(err)
                res.status(500).json({ error: err })
            }
        )


});



module.exports = router
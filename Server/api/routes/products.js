const express = require('express');
const router = express.Router();
const Product = require('../models/products')
const mongoose = require('mongoose') // import mongoose to create mongooseobject id

router.get('/', (req, res, next) => {
    Product.find() //the method finc can also accept where clause
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
                res.status(200).json(docs);
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

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST request to /products',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId //retrieve the product id from the requests arguments Express will give an argument of the same name that we write with semicolumn 
    Product.findById(id)
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

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId //retrieve the product id from the requests arguments Express will give an argument of the same name that we write with semicolumn 
    const updateOps = {};

    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update(
        {
            _id: id
        },
        {
            $set: updateOps
        })
        .exec()
        .then(
            result =>{
                console.log(result);
                res.status(200).json(result)
            }
        )
        .catch(
            err =>{
                console.log(err)
                res.status(500).json({
                    error : err
                })
            }
        )



});

router.delete('/:productId', (req, res, next) => {
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
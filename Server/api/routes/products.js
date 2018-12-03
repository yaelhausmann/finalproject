const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId //retrieve the product id from the requests arguments Express will give an argument of the same name that we write with semicolumn 
    if (id === 'check') {
        res.status(200).json({
            message: 'Id received successful',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'ID passed out',
            id: id
        });
    };


});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'updated product'
    })


});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product'
    })


});

module.exports = router
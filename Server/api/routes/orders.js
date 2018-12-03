const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({ // code 201 for post request because it says that everthing was created succesfully
        message: 'Order was created'
    });
});

router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID //retrieve the orderID id from the requests arguments Express will give an argument of the same name that we write with semicolumn 
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
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'order Deleted '
    })


});



module.exports = router
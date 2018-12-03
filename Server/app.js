// Packages imports
const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Routes importing
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')


app.use(morgan('dev')); //logger middleware
app.use(bodyParser.urlencoded({extended : false})); // parse the url middleware in order to extract the payloads
app.use(bodyParser.json()); //extract the request in json format
app.use('/products', productRoutes); // products Middleware => go to product API
app.use('/orders', orderRoutes); // products Middleware => go to product API

app.use ((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS' ){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})

    }
    next();
})
app.use((req, res, next)=>{ // if the request get here it means that it does not match any of the routes above
    const error = new Error('Not found'); //Create an Error object 
    error.status = 404;// status not found
    next(error);
})
app.use((error, req, res, next)=>{
    res.status(error.status || 500);//all response that fall here will get the 500 status even if the error is a 404
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app;
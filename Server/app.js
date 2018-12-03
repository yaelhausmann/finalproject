const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')
app.use('/products', productRoutes); // products Middleware => go to product API
app.use('/orders', orderRoutes); // products Middleware => go to product API

module.exports = app;
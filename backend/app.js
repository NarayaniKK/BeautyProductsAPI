const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Initialize the app
const app = express();

// Import routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/product'); // Import the product router
const cartRouter = require('./routes/cart'); // Import the cart router
const wishlistRouter = require('./routes/wishlist'); // Import the wishlist router

console.log('MongoDB URI:', process.env.MONGODB_URI);

// MongoDB connection
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API route setup
app.use('/api/products', productsRouter); // Register the products API
app.use('/api/cart', cartRouter); // Register the cart API
app.use('/api/wishlist', wishlistRouter); // Register the wishlist API

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

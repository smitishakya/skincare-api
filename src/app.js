require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const SkincareProdRouter = require('./skincareprod/skincareprod-router')
const SkincareTypesRouter = require('./skincaretype/skincaretype-router')
const SkincareReviewRouter = require('./skincarereview/skincarereview-router')

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/skincare', SkincareProdRouter)

app.use('/skintype', SkincareTypesRouter)

app.use('/reviews', SkincareReviewRouter)



app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        console.error(error)
        response = { message: error.message, error };
    }
    res.status(500).json(response);
})

module.exports = app;
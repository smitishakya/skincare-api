const express = require('express');
const SkincareTypesService = require('./skincaretypes-service')

const SkincareTypesRouter = express.Router()



SkincareTypesRouter
    .route('/')
    .get((req, res, next) => {
        SkincareTypesService.getAllTypes(
            req.app.get('db')
        )
            .then(products => {
                res.json(products)
            })
            .catch(next)
    })

module.exports = SkincareTypesRouter
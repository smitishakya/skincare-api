const express = require('express');
const SkincareProdService = require('./skincareprod-service')

const SkincareProdRouter = express.Router()


SkincareProdRouter
    .route('/')
    .get((req, res, next) => {
        SkincareProdService.getAllProducts(
            req.app.get('db')
        )
            .then(products => {
                res.json(products)
            })
            .catch(next)
    })


SkincareProdRouter
    .route('/:id')

    .delete((req, res, next) => {

        SkincareProdService.deleteProducts(
            req.app.get('db'),
            req.params.id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = SkincareProdRouter
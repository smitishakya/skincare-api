const express = require('express');
const SkincareReviewService = require('./skincarereview-service')
const jsonParser = express.json()


const SkincareReviewRouter = express.Router()


SkincareReviewRouter
    .route('/')
    .get((req, res, next) => {
        SkincareReviewService.getAllComments(
            req.app.get('db')
        )
            .then(products => {
                res.json(products)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name, rating, comment} = req.body
        const newReview = { name, rating, comment}

        for (const [key, value] of Object.entries(newReview))
        if (value == null)
        return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
        })
       
        
        SkincareReviewService.insertProducts(
            req.app.get('db'),
            newReview
        )
            .then(products => {
                res
                    .status(201)
                    .json(products)
            })
            .catch(next)
    })


SkincareReviewRouter
    .route('/:id')

    .delete((req, res, next) => {

        SkincareReviewService.deleteProducts(
            req.app.get('db'),
            req.params.id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = SkincareReviewRouter
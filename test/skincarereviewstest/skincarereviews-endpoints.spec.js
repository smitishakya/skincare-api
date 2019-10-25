const {expect} = require('chai')
const knex = require('knex')
const app = require('../../src/app')
const {makeSkinCareReviews} = require('./reviews.fixture')

describe('Skincare Reviews Endpoints', function(){
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('skincare_reviews').truncate())

    afterEach('cleanup', () => db('skincare_reviews').truncate())

    describe('GET /reviews', () => {
        context('Given no reviews', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/reviews')
                    .expect(200, [])
            })
        })

        context('Given there are products in the database', () => {
            const testReviews = makeSkinCareReviews()

            beforeEach('insert reviews', () => {
                return db
                    .into('skincare_reviews')
                    .insert(testReviews)
            })

            it('GET /reviews responds with 200 and all of the reviews', () => {
                return supertest(app)
                    .get('/reviews')
                    .expect(200)
                    .then(res => {
                        expect(res.body.map(review => ({
                            ...review,
                          
                        }))).to.eql(testReviews)
                    })
            })
        })




    })
    describe(`POST /reviews`, () => {
        it(`creates reviews, responding with 201 and the new review `, function () {
            this.retries(3)
            const newReview = {
                name: 'Test new review',
                rating: 3,
                comment: 'Test new commentt...'
            }
            
            return supertest(app)
                .post('/reviews')
                .send(newReview)
                .expect(201)
                .expect(res => {
                    expect(res.body.name).to.eql(newReview.name)
                    expect(res.body.rating).to.eql(newReview.rating)
                    expect(res.body.comment).to.eql(newReview.comment)
                    expect(res.body).to.have.property('id')
                    
                    return res;
                })
                .then(postRes => {
                    
                
                    supertest(app)
                        .get(`/reviews/${postRes.body.id}`)
                        .expect(postRes.body)
                })
                

        })

        const requiredFields = ['name', 'rating', 'comment']

        requiredFields.forEach(field => {
            const newReview = {
                name: 'Test new review',
                rating: 3,
                comment: 'Test new commentt...'
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newReview[field]

                return supertest(app)
                    .post('/reviews')
                    .send(newReview)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })


    })
})








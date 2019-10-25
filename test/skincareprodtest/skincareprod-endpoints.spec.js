const {expect} = require('chai')
const knex = require('knex')
const app = require('../../src/app')
const {makeSkinCareProducts} = require('./products.fixture')

describe('Skincare Products Endpoints', function(){
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('skincare_products').truncate())

    afterEach('cleanup', () => db('skincare_products').truncate())

    describe('GET /skincare', () => {
        context('Given no products', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/skincare')
                    .expect(200, [])
            })
        })

        context('Given there are products in the database', () => {
            const testProducts = makeSkinCareProducts()

            beforeEach('insert products', () => {
                return db
                    .into('skincare_products')
                    .insert(testProducts)
            })

            it('GET /skincare responds with 200 and all of the products', () => {
                return supertest(app)
                    .get('/skincare')
                    .expect(200)
                    .then(res => {
                        expect(res.body.map(product => ({
                            ...product,
                          
                        }))).to.eql(testProducts)
                    })
            })
        })




    })
})








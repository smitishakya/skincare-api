const {expect} = require('chai')
const knex = require('knex')
const app = require('../../src/app')
const {makeSkinCareTypes} = require('./skintypes.fixture')

describe('Skincare Types Endpoints', function(){
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('skincare_skintypes').truncate())

    afterEach('cleanup', () => db('skincare_skintypes').truncate())

    describe('GET /skintype', () => {
        context('Given no skintype', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/skintype')
                    .expect(200, [])
            })
        })

        context('Given there are skintype in the database', () => {
            const testSkintype = makeSkinCareTypes()

            beforeEach('insert skintype', () => {
                return db
                    .into('skincare_skintypes')
                    .insert(testSkintype)
            })

            it('GET /skintype responds with 200 and all of the skintypes', () => {
                return supertest(app)
                    .get('/skintype')
                    .expect(200)
                    .then(res => {
                        expect(res.body.map(skintype => ({
                            ...skintype,
                          
                        }))).to.eql(testSkintype)
                    })
            })
        })




    })
})








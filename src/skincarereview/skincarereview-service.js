const SkincareReviewService = {
    getAllComments(knex) {
        return knex.select('*').from('skincare_reviews')
    },
    insertProducts(knex, newSkincare) {
        return knex
            .insert(newSkincare)
            .into('skincare_reviews')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('skincare_reviews').select('*').where('id', id).first()
    },
    deleteProducts(knex, id) {
        return knex('skincare_reviews')
            .where({ id })
            .delete()
    }
}

module.exports = SkincareReviewService


const SkincareProdService = {
    getAllProducts(knex) {
        return knex.select('*').from('skincare_products')
    },
    insertProducts(knex, newSkincare) {
        return knex
            .insert(newSkincare)
            .into('skincare_products')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('skincare_products').select('*').where('id', id).first()
    },
    deleteProducts(knex, id) {
        return knex('skincare_products')
            .where({ id })
            .delete()
    }
}

module.exports = SkincareProdService


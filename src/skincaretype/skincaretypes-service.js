const SkincareProdService = {
    getAllTypes(knex) {
        return knex.select('*').from('skincare_skintypes')
    }
}

module.exports = SkincareProdService
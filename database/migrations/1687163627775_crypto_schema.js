'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CryptoSchema extends Schema {
  up () {
    this.create('cryptos', (table) => {
      table.string('id', 100).primary()
      table.string('symbol', 20).notNullable()
      table.string('name', 100).notNullable()
      table.string('ethereum_address', 100).nullable()
      table.string('polygon_pos_address', 100).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cryptos')
  }
}

module.exports = CryptoSchema

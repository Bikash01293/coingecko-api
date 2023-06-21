'use strict'

const { Command } = use('@adonisjs/ace')
const axios = use('axios')
const Crypto = use('App/Models/Crypto')

class FetchCryptoData extends Command {
  static get signature () {
    return 'fetch:crypto-data'
  }

  static get description () {
    return 'Fetches data from Coingecko API and stores it in a database'
  }

  async handle (args, options) {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true')
      const cryptoList = response.data

      await Crypto.truncate() // Clear existing data

      for (const crypto of cryptoList) {
        await Crypto.create({
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name,
          ethereum_address: crypto.platforms?.ethereum || null,
          polygon_pos_address: crypto.platforms?.['polygon-pos'] || null
        })
      }

      this.success('Crypto data fetched and stored successfully.')
    } catch (error) {
      this.error('Failed to fetch and store crypto data.')
      console.error(error)
    }
  }
}

module.exports = FetchCryptoData

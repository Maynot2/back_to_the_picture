const Pool = require('pg-pool')

const pool = new Pool({
  database: 'back_to_the_pictures',
  user: 'postgres',
  password: 'password',
  port: 5432,
  max: 10, // Pool max size
  idleTimeoutMillis: 1000 // Close idle clients after 1 second
})

module.exports.query = (text, values) => {
  return pool
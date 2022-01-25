const PORT = process.env.PORT || 3000
const DB_HOST = process.env.DB_HOST
const JWT_SECRET_KEY = process.env.JWT_SECRET
const BASE_URI = '/api/v1'

module.exports = {
    PORT,
    DB_HOST,
    JWT_SECRET_KEY,
    BASE_URI
}
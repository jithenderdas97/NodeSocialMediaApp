require('dotenv').config({ path: 'config/.env' })
const app = require('./app')
const mongoDb = require('./config/database')

mongoDb()
const PORT = process.env.PORT || 3000
app.listen(PORT,() => console.log(`Server is listening on http://localhost:${PORT}`))
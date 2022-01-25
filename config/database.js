const mongoose = require('mongoose')
const mongoDb = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log(`Mongodb connection successfully ${data.connection.host}`);
    } catch (err) {
        console.log(`mongodb connection failed ${err}`);
    }
    
}



module.exports = mongoDb
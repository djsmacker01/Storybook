const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
        })
        console.log(`MongoDB connected yes: ${conn.connection.host}`)
    }

    catch (err) { 
        console.error(err)
        process.exit(1)
    }
}
console.log(process.env.MONGO_URI,' checking for MongoDB')

module.exports = connectDB
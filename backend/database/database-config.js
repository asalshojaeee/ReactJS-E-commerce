const mongoes = require('mongoose')

async function connectDB() {
    try {
       await mongoes.connect(process.env.MONGODB_URI)
    } catch (err) {
        console.log(err)

    }
}
module.exports = connectDB



// const dbURI = 'mongodb://127.0.0.1:27017/mydatabase';

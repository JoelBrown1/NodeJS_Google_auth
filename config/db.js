const mongoose = require('mongoose');

// mongoose is promise based
// could use .then or async/await
const connectDB = async () => {
  try {
    /**
     * connect to the database
     */
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB;
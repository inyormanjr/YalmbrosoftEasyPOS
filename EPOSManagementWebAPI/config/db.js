const mongoose = require('mongoose');

const connectDB = async (mongoDbURI) => {
   
    console.log(mongoDbURI);
    const conn = await mongoose.connect(mongoDbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connection: ${conn.connection.host}`.black.bgGreen)
};

module.exports = connectDB;
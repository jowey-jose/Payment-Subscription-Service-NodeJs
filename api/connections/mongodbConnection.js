
// const mongoose = require("mongoose");
// const username = "localhost:27017";
// const password = "";
// const dbname = "stripe_payment_subscribers";

// mongoose.connect(
//   `mongodb://${username}:${password}@localhost:27017/${dbname}?authSource=admin&readPreference=primary`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", async function () {
//   console.log("Connected successfully");
// });

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// const db = process.env.MONGODB
const db = "mongodb://localhost:27017/stripe_payment_subscribers"

mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + 'mongodb://localhost:27017/stripe_payment_subscribers')
})

mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected')
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection disconnected through app termination'
    )
    process.exit(0)
  })
})

// const { connect, connection } = require('mongoose');

// connect('mongodb://localhost/usersandthoughts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = connection;



const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/social-network";

mongoose.connect(mongoURI, {
  useNewURLParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.log(`Error connecting to database: ${error.message}`);
});

mongoose.set("debug", true);

module.exports = mongoose.connection;
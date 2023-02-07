const app = require("./app");
const mongoose = require("mongoose");

const {DB_HOST, PORT = 3000} = process.env;

mongoose.set('strictQuery', false);
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

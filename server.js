const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(cors());
const contactsRouter = require("./api/contacts");
app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.set("strictQuery", false);
const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

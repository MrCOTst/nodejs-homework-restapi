const express = require("express");
const logger = require("morgan");
const cors = require("cors");

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

module.exports = app;

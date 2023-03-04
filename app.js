const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(cors());

const contactsRouter = require("./api/contacts");
const usersRouter = require("./api/users");
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message: message,
    data: "Internal Server Error",
  });
});

module.exports = app;

const express = require("express");

const notesRoute = require("./notesRoutes");

const app = express();

app.use("/notes", notesRoute);

module.exports = app;
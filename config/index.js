// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser



// const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

// Middleware configuration
module.exports = (app) => {
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  // app.use(
  //   cors({
  //     origin: [FRONTEND_URL],
  //   })
  // );

  app.use(logger("dev"));


};

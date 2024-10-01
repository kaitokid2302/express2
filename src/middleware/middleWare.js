const express = require("express");

// json middleware
const jsonMiddleWare = express.json();
const urlencodedMiddleWare = express.urlencoded({ extended: true });

module.exports = {
  jsonMiddleWare,
  urlencodedMiddleWare,
};

const express = require("express");
const router = require("./routes/api");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const {
  jsonMiddleWare,
  urlencodedMiddleWare,
} = require("./middleware/middleWare");
const connection = require("./config/db");
const User = require("./models/User");

const app = express();
app.use(jsonMiddleWare);
app.use(fileUpload());
app.use(urlencodedMiddleWare);

app.use("/api", router);
const host = process.env.HOST_NAME;
const port = process.env.PORT;

(async () => {
  try {
    await connection();
    app.listen(port, host, () => {
      console.log(`>>> Server is running on http://${host}:${port}`);
    });
  } catch (e) {
    console.error(">>> Error starting server:", e);
  }
})();

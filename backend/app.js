const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/database");
const path = require("path");
require("./config/passport-setup");

/**importing routes */
const authentication = require("./routes/authentication"); // Import Authentication Routes
const user = require("./routes/user-route");
const userProperties = require("./routes/user-properties-route");

const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(
  config.uri,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // reconnectTries: 30,
    // reconnectInterval: 500,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("connection lost" + err);
    } else {
      console.log("DB is connected");
    }
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static("public"));

// Middleware
// express-session must be used before passport
app.use("/api/authentication", authentication);
app.use("/api/user", user);
app.use("/api/user-properties", userProperties);



//Start Server: Listen on port 8080
let server = app.listen(port, () => {
  console.log("Listening on port 8080");
});

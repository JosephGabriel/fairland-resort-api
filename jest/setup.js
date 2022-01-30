const dotenv = require("dotenv");
const { startServer } = require("../src");

if (process.env.NODE_ENV === "test") {
  dotenv.config();
}

module.exports = async () => {
  // ...
  // Set reference to mongod in order to close the server during teardown.
  global.server = startServer;
};

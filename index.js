const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./database/connect");
const signup = require("./routes/signup");
const login = require("./routes/login");

dotenv.config({ path: "./.env" });

app.use(cors());
app.use(express.json());

connectToDb();

app.use("/api", signup);
app.use("/api", login);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

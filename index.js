const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");

dotenv.config({ path: "./.env" });

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

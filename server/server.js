const express = require("express");
const bodyParser = require("body-parser");

const PORT = 5555;
const api = require("./routes/api");
const app = express();

app.use(bodyParser.json());

app.use("/api", api); //localhost:5555/api

app.get("/", function (req, res) {
  res.send("Hello from server");
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});

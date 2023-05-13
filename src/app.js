const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => res.send("Hello! Internet Programming 2Team"));
app.listen(PORT, () => console.log("Test app listening on port 8000!"));

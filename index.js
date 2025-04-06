const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { urlShort, getOriginalUrl } = require("./Controllers/url.js"); 

const app = express();
const port = 8000;

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/URL_SHORTENER")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

app.get("/", (req, res) => {
  res.render("server.ejs", { shortUrl: null });
});

// Handle URL submission
app.post("/shorten", urlShort);

// Redirect to original URL
app.get("/:shortCode", getOriginalUrl);

app.listen(port, () => console.log("Server is running on port 8000"));

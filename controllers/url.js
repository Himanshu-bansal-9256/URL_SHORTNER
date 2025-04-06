const Url = require("../models/Url.js");
const shortid = require("shortid");

const urlShort = async (req, res) => {
  try {
    const longUrl = req.body.longUrl;
    if (!longUrl) {
      return res.status(400).send("Long URL is required.");
    }

    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:8000/${shortCode}`;

    // Save to database
    const newUrl = new Url({ shortCode, longUrl });
    await newUrl.save();

    console.log("URL shortened successfully:", newUrl);
    res.render("server.ejs", { shortUrl });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getOriginalUrl = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;

    // Find in database
    const urlRecord = await Url.findOne({ shortCode });

    if (urlRecord) {
      return res.redirect(urlRecord.longUrl);
    } else {
      return res.status(404).send("Short URL not found.");
    }
  } catch (error) {
    console.error("Error retrieving original URL:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Correctly export functions
module.exports = { urlShort, getOriginalUrl };

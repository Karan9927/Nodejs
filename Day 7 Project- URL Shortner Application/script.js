import express from "express";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import path from "path";

const app = express();

const __dirname = path.resolve();
const port = process.env.PORT || 5000;

const urlDatabase = {};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/shorten", (req, res) => {
  const longUrl = req.body.longUrl;

  if (!isValidUrl(longUrl)) {
    return res.status(400).send("Invalid URL");
  }

  const shortUrl = generateShortUrl();
  urlDatabase[shortUrl] = longUrl;

  res.send(`Shortened URL: https://urlshortnerrr.onrender.com/${shortUrl}`);
});

app.get("/:shortUrl", (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = urlDatabase[shortUrl];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function generateShortUrl() {
  return nanoid(8);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

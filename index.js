const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/getData", async (req, res) => {
  try {
    const { url, tag } = req.query; // URL ve tag parametrelerini al
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const data = await page.evaluate((tag) => {
      return Array.from(document.querySelectorAll(tag)).map(
        (element) => element.innerText
      );
    }, tag); // Dinamik olarak alınan tag parametresini kullan

    await browser.close();
    res.json(data);
  } catch (error) {
    console.error("Detaylı hata:", error);
    res.status(500).send("Sunucu hatası: " + error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

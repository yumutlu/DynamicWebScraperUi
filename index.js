const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/getHeadings", async (req, res) => {
  try {
    const { url } = req.query;
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const headings = await page.evaluate(() =>
      //BU KISIM SİTENİN YAPISINA GÖRE DEĞİŞEBİLİR HANGİ TAG GEREKLİYSE YAZILIR
      Array.from(document.querySelectorAll("li")).map(
        (heading) => heading.innerText
      )
    );

    await browser.close();
    res.json(headings);
  } catch (error) {
    console.error("Detaylı hata:", error);
    res.status(500).send("Sunucu hatası: " + error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

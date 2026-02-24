const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const PASSWORD = "23603892";

app.get('/', async (req, res) => {
    const targetUrl = req.query.url;
    const userToken = req.query.token;

    if (userToken !== PASSWORD) return res.send("Access Denied");
    if (!targetUrl) return res.send("No URL provided");

    try {
        const response = await axios.get(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        const $ = cheerio.load(response.data);

        // קסם: משנה את כל הקישורים באתר כדי שיעברו דרך השרת שלך שוב
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.startsWith('http')) {
                $(el).attr('href', `?token=${PASSWORD}&url=${encodeURIComponent(href)}`);
            }
        });

        res.send($.html());
    } catch (e) {
        res.send("Error loading site: " + e.message);
    }
});

app.listen(process.env.PORT || 8080);

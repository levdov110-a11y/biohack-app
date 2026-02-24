const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/proxy', async (req, res) => {
    const { url, token } = req.query;
    if (token !== "23603892") return res.status(403).send("Denied");

    try {
        const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(response.data);

        // כאן הקסם: משכתבים את כל הקישורים באתר שחזר
        // כך שכל לחיצה תשלח פקודה לגיטהאב ולא לאתר המקורי
        $('a').each((i, el) => {
            const oldHref = $(el).attr('href');
            if (oldHref) {
                $(el).attr('href', `javascript:parent.browseTo('${oldHref}')`);
            }
        });

        res.send($.html());
    } catch (e) {
        res.send("Error: " + e.message);
    }
});
app.listen(process.env.PORT || 8080);

const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
    const { url, token } = req.query;
    if (token !== "23603892") return res.status(403).send("Denied");
    
    try {
        const response = await axios.get(url, { responseType: 'text' });
        res.send(response.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
app.listen(process.env.PORT || 8080);

const shortid = require('shortid')
const URL = require('../models/url2');

async function handleGenerateNewShortURL (req, res) {
    // console.log('Received request to generate new short URL');
    const body = req.body;
    // console.log('Request body:', body);
    if(!body.url) return res.status(400).json( {error: "URL is required"})
    const shortID = shortid(); //ye 8 character ki nanoid dedega 
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render('home', { id: shortID});
    // return res.json({ id: shortID})
}

async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId});
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}

const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics} = require('../controllers/url1');
const router = express.Router();

console.log('Debbuging');

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;

const express = require('express');
const path = require('path')

const app = express();
const PORT = 8001;
const urlRoute = require('./routes/url3')
const {connectToMongoDB} = require('./connection')
const URL = require('./models/url2')
const staticRoute = require('./routes/staticRouter');

connectToMongoDB('mongodb://localhost:27017/url-shortner')
.then(() => console.log('MongoDB Connected!'));

app.set('view engine', "ejs");
app.set('views', path.resolve('./views'));

app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false}));

app.use('/url', urlRoute);
app.use('/', staticRoute)

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', { urls: allUrls, });
})


app.get('/:shortId', async (req, res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now(),
        }
    }})

    res.redirect(entry.redirectURL);
})

//findOneAndUpdate m pehla parameter find krne ka h 

app.listen(PORT, () => { console.log(`Server start at PORT: ${PORT}`);
})

//shortid jo generate hui h use given url pe redirect krna hai 
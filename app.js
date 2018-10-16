const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var exphbs = require('express-handlebars')

const app = express()
mongoose.connect('mongodb://localhost/contractor_project')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

let reviews = [
    {
        charityTitle: "Children's Scholarship Fund",
        charityDomain: "Education",
        charityScore: 100,
        charityLocation: "Phildelphia, PA"
    },
    {
        charityTitle: "Congressional Medal of Honor Foundation",
        charityDomain: "Civil Rights",
        charityScore: 100,
        charityLocation: "Los Angeles, CA"
    },
    {
        charityTitle: "Amazon Conservation Association",
        charityDomain: "Enviorment",
        charityScore: 100,
        charityLocation: "Washington DC"
    }
]

const Review = mongoose.model('Review', {
    charityTitle: String,
    charityDomain: String,
    charityScore: Number,
    charityLocation: String
})

// index
app.get('/', (req, res) => {
    // res.render('home', { msg: 'Wow I\'m so behind on this project!' });
    Review.find().then(reviews => {
        res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
        console.log("whoa whoa whoa there bud");
    })
})

// new
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

// create
app.post('/reviews', (req, res) => {
    // console.log(req.body);
    // res.render('reviews-new  ', {});
    Review.create(req.body).then((reviews) => {
        console.log(reviews);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

// show
app.get('/reviews/:id', (req, res) => {
    res.send('all good over here')
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

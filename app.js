const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var exphbs = require('express-handlebars')

const app = express()
mongoose.connect('mongodb://localhost/contractor_project')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

let charities = [
    {
        title: "Children's Scholarship Fund",
        domain: "Education",
        score: 100,
        location: "Phildelphia, PA",
        donationAmount: Number
    },
    {
        title: "Congressional Medal of Honor Foundation",
        domain: "Civil Rights",
        score: 100,
        location: "Los Angeles, CA",
        donationAmount: Number
    },
    {
        title: "Amazon Conservation Association",
        domain: "Enviorment",
        score: 100,
        location: "Washington DC",
        donationAmount: Number
    }
]

const Charity = mongoose.model('Charity', {
    title: String,
    domain: String,
    score: Number,
    location: String,
    donationAmount: Number
})

// index
app.get('/', (req, res) => {
    // res.render('home', { msg: 'Wow I\'m so behind on this project!' });
    Charity.find().then(charities => {
        res.render('reviews-index', { charities: charities });
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
    Charity.create(req.body).then((charity) => {
        console.log(charity);
        res.redirect(`/reviews/${review._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

// show
app.get('/reviews/:id', (req, res) => {
    Charity.findById(req.params.id).then((charity) => {
        res.render('reviews-show', { charity: charity })
    }).catch((err) => {
        console.log(err.message);
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

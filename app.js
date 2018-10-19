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
        funds: Number
    },
    {
        title: "Congressional Medal of Honor Foundation",
        domain: "Civil Rights",
        score: 100,
        location: "Los Angeles, CA",
        funds: Number
    },
    {
        title: "Amazon Conservation Association",
        domain: "Enviorment",
        score: 100,
        location: "Washington DC",
        funds: Number
    }
]

let donations = [
    {
        donor: "Your Mom",
        charity: "Children's Scholarship Fund",
        amount: 7000
    }
]

const Charity = mongoose.model('Charity', {
    title: String,
    domain: String,
    score: Number,
    location: String,
    funds: Number
})

const Donation = mongoose.model('Donation', {
    donor: String,
    charity: String,
    amount: Number,
})

// index
app.get('/', (req, res) => {
    // res.render('home', { msg: 'Wow I\'m so behind on this project!' });
    // Charity.find().then(charities => {
        res.render('charities-index', { charities: charities });
    // })
    // .catch(err => {
    //     console.log("whoa whoa whoa there bud");
    // })
})

// index
app.get('/charities/list', (req, res) => {
    // res.render('home', { msg: 'Wow I\'m so behind on this project!' });
    // Charity.find().then(charities => {
        res.render('charities-list', { charities: charities });
    // })
    // .catch(err => {
    //     console.log("whoa whoa whoa there bud");
    // })
})

// new
app.get('/charities/donate', (req, res) => {
    res.render('charities-donate', {});
})

// create
app.post('/charities', (req, res) => {
    // console.log(req.body);
    // res.render('reviews-new  ', {});
    Charity.create(req.body).then((charity) => {
        console.log(charity);
        res.redirect(`/charities/${charity._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

// show
app.get('/charities/:id', (req, res) => {
    Charity.findById(req.params.id).then((charity) => {
        res.render('charities-show', { charity: charity })
    }).catch((err) => {
        console.log(err.message);
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

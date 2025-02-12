const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({name, occupation, catchPhrase}) 
        .then((createdCelebrity) => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            res.render('celebrities/new-celebrity');
        })
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((foundCelebrities) => {
            res.render('celebrities/celebrities', {celebrities: foundCelebrities})
        })
        .catch((err) => console.log(err));
})

module.exports = router;
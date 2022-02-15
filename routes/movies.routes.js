const router = require('express').Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then((foundCelebrities) => {
            res.render('movies/new-movie', {celebrities: foundCelebrities})


        })
        .catch((err) => console.log(err))
})

router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
        .then((createdMovie) => {
            res.redirect('/movies/movies')
        })
        .catch((err) => console.log(err));

})


module.exports = router;
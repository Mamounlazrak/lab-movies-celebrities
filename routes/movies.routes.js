const router = require('express').Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const { route } = require('.');

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
            res.redirect('/movies')
        })
        .catch((err) => console.log(err));

})
router.get('/movies', (req, res, next) => {
    Movie.find()
        .then((foundMovies) => {
            res.render('movies/movies', {movies: foundMovies})
        })
        .catch((err) => console.log(err));
})

router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params; 
    Movie.findById(id)
        .populate('cast')
        .then((foundMovie) => {
            res.render('movies/movie-details', foundMovie)
        })
        .catch((err) => console.log(err))
})

router.post('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params; 
    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => console.log(err));
})

router.get('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params; 
    let movie; 
    Movie.findById(id)
        .then((foundMovie) => {
            movie = foundMovie;
            return Celebrity.find()
        })
        .then((foundCelebrities) => {

            res.render('movies/edit-movie', {movie, foundCelebrities} )
        })
        .catch((err) => console.log(err)); 
})

router.post('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params;
    const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => console.log(err));
})


module.exports = router;
const express = require('express');
const router = express.Router();

const {projects} = require('./data/data.json');

//home page route

router.get('/', (req, res) => {
    res.render('index', {projects})
});

// router.get('/about', (req, res) => {
//     res.render('about');
// });

router.get('/error', (req, res, next) => {
    console.log('Custom 500 error thrown')

    const err = new Error();
    err.message = 'Custom 500'
    err.status = 500;
    throw err;
});

//Dynamic route to projects based on ID

router.get('/projects/:id', (reg, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({id}) => id === +projectId)
    if(project){
        res.render('project', {project});
    } else {
        const err = new Error();
        err.status = 404;
        err.message = 'The project you\'re looking for doesn\'t exist yet!';
        next(err);
    }
});

module.exports = router;

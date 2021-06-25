const express = require('express');
const app = express();
const routes = require('./routes');

            //take 1 delete when done ^^^^^^^
            // const index = require('./routes');
            // const aboutMiles = require('./routes/about');
            // const projects = require('./routes/projects');

app.set('view engine', 'pug');

// use a static route and the express.static method to serve the static files located in the public folder

app.use('/static', express.static('public'));

app.use('/', routes);

//404 errors

app.use((req, res, next) => {
    console.log("app.js 404");
    const err = new Error();
    err.status = 404;
    next(err);
});

//Global errors

app.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status === 404) {
        console.log('404');
        err.message = 'Page not found'
        res.status(404).render('page-not-found', {err});
    } else {
        console.log('500 error');
        res.status(err.status || 500).render('error', {err});
    }
});

// Finally, start your server. Your app should listen on port 3000, and log a string to the console that says which port the app is listening to.

app.listen(3003, () => {
    console.log('This app is running on localhost: 3000!');
});
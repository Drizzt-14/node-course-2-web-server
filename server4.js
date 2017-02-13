const express = require('express');
const hbs = require(`hbs`); //require handlebars template enigne
const fs = require('fs');

var app = express(); 
hbs.registerPartials(__dirname + '/views/partials');

app.set(`view-engine`, `hbs`); //declare handlebars as the main view engine


app.use((req, res, next) => { //req and res are the regular requests and responses. next is the command that tells the middleware we can move on
    var now = new Date().toString(); //make the date a readable one
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => { //Write the log into a server.log and add a newLine after it, add a mandatory callback for error handling
        if (err) {
            console.log('Unable to append to server.js');
        }
    }); 
    next(); //if this doesn not get called, req and res would not be released and would not be available for the rest of the code
}); 

/*  This blocks the code so it is commented out
app.use((req, res, next) => {
    res.render('maintanance.hbs');
});
*/

app.use(express.static(__dirname + '/public')); //Middleware - Teach Express how to read from a static directory

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear(); //In JS we use the date object
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: `Home Page`,
        welcomeParagraph: `Welcome mate!`
    });
}); 

app.get('/about', (req, res) => {
    res.render(`about.hbs`, {//Render the page and send it to the client. Pass an object to the file to be rendered
        pageTitle: `About Page`,
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
}); 


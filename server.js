const express = require('express');

var app = express(); //call the method to initialize express

app.use(express.static(__dirname + '/public')); //*6

app.get('/', (req, res) => {//*1 
    //res.send('<h1>Hello Express!</h1>');//*2
    res.send({ //*4
        name: 'Driztt',
        likes: [
            'Sword Play',
            'Archery'
        ]
    });
}); 

app.get('/about', (req, res) => {//*5
    res.send('About Page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });
});

app.listen(3000, () => {//*3
    console.log('Server is up on port 3000');
}); 



/*
1 - Set up a hadnler for an HTTP reguest that takes a callback - what to send back to the person who made the request
    The callback accepts 2 param: request (req) and response (res). The req param hold a lot of info such as the HTTP headers, body info, the method
    that was made with that req path etc.
    Basically we can response (res) with what ever way we like.
    When we use get we actully setting up a ROUTE for '/' which is the root route
2 - In this get if someone requests for '/' we responsd with the strinf "Hello..."
3 - Bind this app to a port on out machine, the param it accepts is a port number, in this case 3000
    It also takes a second optional param, a callback. It us there because sometimes it takes time to run the server
    so in our case we just want to notify the user that the server is up
4 - Express notices we've sent an object so it automatically converts it into a JSON file and send it as a JSON   
5 - Setting up a new route for /about
6 - Setting up a middleware because we want to tweak the way express works. This is where use() becomes handy
    In this case we're going to call express.static and call it as a function and pass a path to help.html
    __dirname is the var that passes the path to the projects directory
    Middleware handles every request made to the files located whithin the provided directory, meaning that help.html
    will be served now. It allows us to not specify a path for each file we put there such as index.html, app.css etc
    All of these can be called with their name. In this case we use locahost:3000/help.html. Notice
    we didn't use /public and this is the meaning of middleware, at least for now.
*/
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const server = app.listen(8000);
const io = require('socket.io')(server);
var counter = 0;


io.on('connection', function (socket) { //This triggers our server's connection listener to run, and this occurs for every new socket connection. 

    socket.on('posting_form', function (data) { //The server's listener with the matching 'thank you' label will be triggered...
        // console.log(data.survey); //...and invoke its callback.
        // console.log(data.rand);
        var random_number = Math.floor(Math.random() * 1000);
        socket.emit('updated_message', { dataSurvey: data.survey,rand: random_number }); //Then the server will emit a message 'greeting' to the client, because we placed an emit event there. 
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    res.redirect('/');
});

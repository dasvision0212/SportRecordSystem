const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const path = require('path');
const publicDirPath = path.join(__dirname, '../public');

var corsOptions= {
    origin: [
        '*',
        'http://35.240.254.213:8787',
        'http://34.87.51.47:8787',
        'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
}
// Static Resource
app.use(express.static(publicDirPath));
// Accept JSON Format
app.use(express.json());

app.use(cors(corsOptions));

// Route
app.get('/', function(req, res){
    res.sendFile(path.join(publicDirPath, 'views/home.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(publicDirPath, 'views/history.html'));
})
app.get('/record', (req, res) => {
    res.send('record page!')
})
app.get('/team', (req, res) => {
    res.sendFile(path.join(publicDirPath, 'views/team.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(publicDirPath, 'views/signup.html'));
})
app.post('/signup', (req, res) => {
    console.log(req.body)

    return res.send({url: '/'});
})

// Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicDirPath, 'views/login.html'));
})
app.post('/login', (req, res) => {
    console.log(req.body)
    
    //Unauthorized client
    if (req.body.name.includes("no")) {
        return res.status(401).send('請提供正確的使用者名稱和密碼!');
    }

    return res.send({url: '/'});
})

// Listen on port
app.listen(port , () => {
    console.log('Server is up on port:', port,'!')
})
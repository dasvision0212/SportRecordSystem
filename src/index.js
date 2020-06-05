const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const path = require('path');
const publicDirPath = path.join(__dirname, '../public');
const { createProxyMiddleware } = require('http-proxy-middleware');
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var corsOptions= {
    origin: [
        '*',
        'http://35.240.254.213',
        'http://34.87.51.47',
        'http://localhost:3000',
        'http://34.87.51.47:8787/api/game/5ebeb1115a6c20ed3e900f67/record',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
}

process.env.LOCALTEST = true
if(process.env.LOCALTEST) {
    app.use('/api', createProxyMiddleware({ target: 'https://ntuim.cjiso.ninja/', changeOrigin: true }));
}

// Static Resource
app.use(express.static(publicDirPath));
// Accept JSON Format
app.use(express.json());

app.use(cors());

// Routes
app.get('/', function(req, res){
    res.sendFile(path.join(publicDirPath, 'views/home.html'));
});
app.get('/history', (req, res) => {
    if(!req.cookies.session) {
        res.sendFile(path.join(publicDirPath, 'views/login.html'));
    }
    res.sendFile(path.join(publicDirPath, 'views/history.html'));
})
app.get('/record', (req, res) => {
    if(!req.cookies.session) {
        res.sendFile(path.join(publicDirPath, 'views/login.html'));
    }
    res.send('record page!');
})
app.get('/team', (req, res) => {
    if(!req.cookies.session) {
        res.sendFile(path.join(publicDirPath, 'views/login.html'));
    }
    res.sendFile(path.join(publicDirPath, 'views/team.html'));
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(publicDirPath, 'views/signup.html'));
})
app.get('/record123', (req, res) => {
    res.sendFile(path.join(publicDirPath, 'views/record.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicDirPath, 'views/login.html'));
})


// Listen on port
app.listen(port , () => {
    console.log('Server is up on port:', port,'!')
})
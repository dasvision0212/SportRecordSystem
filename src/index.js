const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const publicDirPath = path.join(__dirname, '../public');

// Static Resource
app.use(express.static(publicDirPath));
// Accept JSON Format
app.use(express.json());

// Route
app.get('/', function(req, res){
    res.sendFile(path.join(publicDirPath, 'views/home.html'));
});

app.get('/history', (req, res) => {
    res.send('history page!')  
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
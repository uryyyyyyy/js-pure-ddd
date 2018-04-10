const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
let count = 0;

app.use('/dist', express.static('dist'));

app.get('/api/count', (req, res) => {
    res.contentType('application/json');
    const obj = {"amount": count};
    setTimeout(() => res.json(obj), 1000);
    //res.status(400).json(obj); //for error testing
});

app.put('/api/count', (req, res) => {
    console.log(req.body)
    res.contentType('application/json');
    if(req.body.amount % 5 === 0) {
        setTimeout(() => res.status(400).json({reason: '5で割り切れる数の時はエラーが出るようにしています'}), 1000);
    } else {
        count = req.body.amount
        setTimeout(() => res.json({}), 1000);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server start at port 3000")
});
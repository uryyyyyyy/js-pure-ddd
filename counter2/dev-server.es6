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
  setTimeout(() => res.json(obj), 500);
  //res.status(400).json(obj); //for error testing
});

app.put('/api/count', (req, res) => {
  console.log(req.body)
  res.contentType('application/json');
  count = req.body.amount
  setTimeout(() => res.json({}), 500);
  //res.status(400).json(obj); //for error testing
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server start at port 3000")
});
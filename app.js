const bodyParser = require('body-parser')
const express = require('express');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.use(express.static('public')) // Set up public folder to serve any static files like images, CSS and Js.

app.engine('html', require('ejs').renderFile) // EJS is a simple templating language that allows to generate HTML markup with plain JavaScript.

const port = 3000;

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`);
});

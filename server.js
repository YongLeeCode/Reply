var express = require('express');
var app = express();
var cors = require('cors');

const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const port = process.env.PORT || 9000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/`, require(`./routes`));

mongodb.initDB((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Server is running on port ${port}`);
    }
});
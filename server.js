var express = require('express');
var app = express();
var cors = require('cors');

const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const port = process.env.PORT || 9000;

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/`, require(`./routes`));
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDoc))


mongodb.initDB((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Server is running on port ${port}`);
    }
});
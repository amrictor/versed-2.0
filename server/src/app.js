require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const credentials = process.env.ENV === 'PROD' ? {
  key: fs.readFileSync('ssl.key'), 
  cert: fs.readFileSync('ssl.crt')
} : {};
const app = express(credentials);
app.use(bodyparser.json());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

const publicAPI = require('./api')

app.use('/api/public', cors(), publicAPI);

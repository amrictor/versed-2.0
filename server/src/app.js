require('dotenv').config();
const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyparser.json());
const publicAPI = require('./api')
app.use('/api/public', cors(), publicAPI);

const credentials = process.env.ENV === 'PROD' ? {
  key: fs.readFileSync('ssl.key'), 
  cert: fs.readFileSync('ssl.crt')
} : {};
const httpsServer = https.createServer(credentials, app);

const port = process.env.PORT || 8080;

(process.env.ENV === 'PROD' ? httpsServer : app).listen(port, () => console.log(`Listening on port ${port}..`));



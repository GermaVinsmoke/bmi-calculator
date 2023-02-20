'use strict';

const express = require('express');

//process.env.NODE_ENV === "production"

const PORT = 3000;
const HOST = 'localhost';

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, HOST);
//console.log(`Running on http://${HOST}:${PORT}`);
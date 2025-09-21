const express = require('express');
const cors = require('cors');
const cleanroutes = require('express-clean-routes');

const app = express();

// Routes
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use('/api/', cleanroutes(routes));

module.exports = app;
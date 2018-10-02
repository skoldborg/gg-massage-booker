require('dotenv').config();

const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('serve-favicon');
const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (error) => {
    if (error) console.error(`Mongoose connection failed with the following error: ${error}`);

    console.log('Mongoose connection successful');
});
mongoose.Promise = global.Promise;

// View engine
app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Cookies
app.use(cookieParser())

// Static assets
app.use(express.static(path.join(__dirname, 'dist')));

// Favicon
app.use(favicon('./dist/favicon.ico'));

// Import models
require(path.join(__dirname, 'server/models/TimeSlot'));

// Parse urlencoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow pre-flight CORS requests
app.use(cors());
app.options('*', cors());

// Routes
const router = require('./server/routes/index');
app.use('/', router);

const viewRoute = process.env.NODE_ENV === 'production' ? 'dist' : 'client';

app.get('/*', (req, res) => {
    res.render(path.join(__dirname, `${viewRoute}/index.html`));
})

// Kill node process on terminal exit & exceptions
// process.on('SIGINT', () => { process.exit(); });
// process.on('uncaughtException', () => { process.exit(); })

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))


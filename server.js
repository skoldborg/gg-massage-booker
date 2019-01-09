require('dotenv').config();

const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (error) => {
    if (error) console.error(`Mongoose connection failed with the following error: ${error}`);

    console.log('Mongoose connection successful');
});
mongoose.Promise = global.Promise;

// View engine
// app.set('views', __dirname + '/client');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'server/views/')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'server/views/'));

// Cookies
app.use(cookieParser())

// Static assets
app.use(express.static(path.join(__dirname, 'dist')));

// Favicon
app.use(favicon(path.join(__dirname, 'favicon.ico')));

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
    res.render('index', {
        rootPath: process.env.NODE_ENV === 'production' ? 'https://gg-massage-booker.herokuapp.com' : 'http://localhost:3001'
    });
})

// Kill node process on terminal exit & exceptions
// process.on('SIGINT', () => { process.exit(); });
// process.on('uncaughtException', () => { process.exit(); })

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))


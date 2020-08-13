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

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    error => {
        if (error) {
            console.error(
                `Mongoose connection failed with the following error ${error}`
            );
        }

        console.log("Mongoose connection successful");
    }
);
mongoose.Promise = global.Promise;

// View engine
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname, 'views/')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/'));

// Cookies
app.use(cookieParser())

// Static assets
app.use(express.static(path.join(__dirname, '../dist')));

// Favicon
app.use(favicon(path.join(__dirname, '../favicon.ico')));

// Import models
require(path.join(__dirname, 'models/TimeSlot'));

// Parse urlencoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow pre-flight CORS requests
app.use(cors());
app.options('*', cors());

// Routes
const router = require(path.join(__dirname, 'routes/index'));
app.use('/', router);

const viewRoute = process.env.NODE_ENV === 'production' ? 'dist' : 'client';

app.get('/*', (req, res) => {
    res.render('index', {
        rootPath: process.env.NODE_ENV === 'production' ? 'https://gg-massage-booker.herokuapp.com' : 'http://localhost:3001'
    });
})

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))


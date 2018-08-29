require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (error) => {
    if (error) console.error(`Mongoose connection failed with the following error: ${error}`);

    console.log('Mongoose connection successful');
});
mongoose.Promise = global.Promise;

// import models
require(path.join(__dirname, 'server/models/TimeSlot'));

// Parse urlencoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow pre-flight CORS requests
app.use(cors());
app.options('*', cors());

// Routes
const router = require('./server/routes');
app.use('/', router);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'dist')));

//     app.get('/', (req, res) => {
//         res.sendFile(path.join(__dirname, 'index.html'));
//     })
// }

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))

require('dotenv').config();
require('./utils/verifyConfiguration')();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

const middleware = require('./utils/middleware');
const routes = require('./controllers');
const db = require('./models');

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
} else {
    app.use(express.static('client/build'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(middleware.handleError);
app.use(routes);

// Send all other requests to react app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

db.sequelize.sync({force:false}).then(function () {
    app.listen(PORT, function () {
        console.log(`Server now on port ${PORT}!`);
    });
});

const express = require('express')
require('dotenv').config()
const expressSession = require('express-session')
const pgSession = require('connect-pg-simple')(expressSession);

const errorHandler = require('./middleware/error_handler')
const logger = require('./middleware/logger')

const entriesController = require('./controllers/entries')
const usersController = require('./controllers/users')
const sessionsController = require('./controllers/sessions');
const db = require('./database/db');

const app = express()
const port = process.env.PORT || 3000;

app.use(logger)

app.use(expressSession({
    store: new pgSession({
        pool: db,
        createTableIfMissing: true,
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,    
}))

app.use(express.static('client'))
app.use(express.json())

// Challenges API in separate file
app.use('/api/entries', entriesController);
app.use('/api/users', usersController);
app.use('/api/sessions', sessionsController)

// Catch any errors at the end
app.use(errorHandler)

// start the web server
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

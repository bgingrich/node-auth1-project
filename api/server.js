const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const usersRouter = require('../users/user-router');
const authRouter = require('../auth/auth-router');

const server = express();

const sessionConfig = {
    name: 'monkey', // sid
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false, // true in production
        httpOnly: true,
    },
    resave: false, //  
    saveUninitialized: false, // GDPR laws against cookies automatically

};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;
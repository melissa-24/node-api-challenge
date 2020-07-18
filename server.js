const express = require('express');

const projectRouter = require('./routers/projectRouter.js');

// ...............................
const server = express();
server.use(express.json());

// ...............................

server.use('/api/projects', projectRouter);

// ...............................
server.get('/', (req, res) => {
    res.json( 'I am at your server!' );
});

// ...............................

module.exports = server;
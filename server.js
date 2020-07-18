const express = require('express');

const projectRouter = require('./routers/projectRouter.js');
const actionRouter = require('./routers/actionRouter.js');

// ...............................
const server = express();
server.use(express.json());

// ...............................

server.use('/api/projects', projectRouter);
server.use('/api/projects/:id', actionRouter);

// ...............................
server.get('/', (req, res) => {
    res.json( 'I am at your server!' );
});

// ...............................

module.exports = server;
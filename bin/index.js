#! /usr/bin/env node
const createServer = require('../index');

createServer().listen(5000, () => {
    console.log('app is start port 5000: localhost:5000');
})

const http = require('http');
const app = require('./app') // server created with express
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);


const http = require('http');
const flavors = require('./flavors');

const server = http.createServer((req, res) => {
  if (req.url === '/flavors') {
    res.write(`The flavors are ${flavors.join(', ')}.`)
  } else {
    res.write('Hello World!');
  }
  res.end();
});
server.listen(3000);
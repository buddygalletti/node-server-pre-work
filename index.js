const http = require('http');
const flavors = require('./flavors');

const server = http.createServer(function(req, res) {
  if (req.url === '/flavors') {
    if (req.method === 'POST') {
      res.write("Error: You can't add another flavor.")
    } else {
      res.write(`The flavors are ${flavors.join(', ')}.`)
    }
  } else {
    res.write('Hello World!');
  }
  res.end();
});
server.listen(3000);
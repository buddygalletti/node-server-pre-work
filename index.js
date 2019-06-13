const fs = require('fs')
const path = require('path')
const http = require('http');
const flavors = require('./flavors');
const qs = require('querystring');

const orderItems = []

const server = http.createServer(function(req, res) {
  const incomingItemChunks = []
  if (req.url === '/flavors') {
    if (req.method === 'POST') {
      res.write("Error: You can't add another flavor.");
    } else {
      res.write(`The flavors are ${flavors.join(', ')}.`);
    }
    res.end();
  } else if (req.url === '/order') {
    if (req.method === 'POST') {
      req.on('data', function (chunk) {
        incomingItemChunks.push(chunk.toString());
      });
      req.on('end', function () {
        const parsed = qs.parse(incomingItemChunks.join(''));
        orderItems.push(parsed.item);
        fs.appendFile(path.join(__dirname, 'orders.txt'), parsed.item + '|', function (err) {
            if (err) {
                console.error(err)
                res.statusCode = 500
                res.end()
            } else {
                // let the user know that their item was added
                res.write('New item added');
                res.end();
            }
        })
      });
    } else {
      //we can send the order back to the user if they make a 'GET' request to /order
      const order = orderItems.join(', ')
      res.write(`Your order is: ${order}`);
      res.end()
    }
  } else {
    res.write('Hello World!');
    res.end();
  }
});

server.listen(3000);
const http = require('http');
const port = process.env.PORT || 5000;
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello from Node server\n');
});
server.listen(port, () => console.log(`Server listening on ${port}`));

// Import the http module
const http = require('http');

// Define the hostname and port
const hostname = 'projetoscti.com.br';
const port = 21;

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Node.js is installed and running!</h1>');
});

// Start the server and listen on the specified port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

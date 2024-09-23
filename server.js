const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Configuration
const host = '0.0.0.0';
const port = 8083;

// Create the HTTP server
const server = http.createServer((req, res) => {
    let body = [];

    // Parse the URL and query parameters
    const uri = url.parse(req.url, true);
    const queryParams = querystring.parse(uri.query);
    const status = queryParams.status || 200;

    // Set response headers
    res.setHeader('Content-Type', 'application/json');

    // Log basic request info
    console.log(`\nReceived ${req.method
        } request for: ${req.url
        }`);
    console.log('> Headers:', req.headers);

    // Handle request body chunks
    req.on('data', chunk => {
        body.push(chunk);
    });

    // Handle the end of the request
    req.on('end', () => {
        // Process the body
        body = Buffer.concat(body).toString();

        // Log request details
        console.log('> Request Body:', body || 'No Body');

        // Respond with the echoed request details
        const responseBody = {
            method: req.method,
            path: uri.pathname,
            headers: req.headers,
            query: queryParams,
            body: body ? JSON.parse(body) : null
        };

        // Send response
        res.statusCode = status;
        res.end(JSON.stringify(responseBody,
            null,
            2));
    });

    // Error handling
    req.on('error', err => {
        console.error('Error handling request:', err.message);
        res.statusCode = 500;
        res.end(JSON.stringify({
            error: 'Internal Server Error'
        }));
    });
});

// Start the server
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});

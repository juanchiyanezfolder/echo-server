const express = require('express');
const jwt = require('jsonwebtoken');
const url = require('url');
const querystring = require('querystring');

// Configuration
const host = '0.0.0.0';
const port = 8083;

const JWT_SECRET_KEY = 'dummy_private_key_for_testing'; // Dummy private key for JWT signing

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock OAuth /oauth/token endpoint for testing purposes
app.post('/oauth/token', (req, res) => {
    const { grant_type, client_id, client_secret } = req.body;

    // Simulate a client credentials grant type flow
    if (grant_type !== 'client_credentials') {
        return res.status(400).json({
            error: 'unsupported_grant_type',
            error_description: 'Only client_credentials grant type is supported'
        });
    }

    // Create a JWT token payload with the provided client_id
    const tokenPayload = {
        client_id,
    };

    // Sign the JWT token with the dummy private key and set expiration to 1 hour
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY, { expiresIn: '1h' });

    // Return the access token and token details
    return res.status(200).json({
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: 3600, // Token expiration in seconds (1 hour)
    });
});

// Route to handle all incoming requests
app.all('*', (req, res) => {
    // Parse the URL and query parameters
    const uri = url.parse(req.url, true);
    const queryParams = querystring.parse(uri.query);
    const status = queryParams.status || 200;

    // Log basic request info
    console.log(`\nReceived ${req.method} request for: ${req.url}`);
    console.log('> Headers:', req.headers);

    // Log request body if present
    console.log('> Request Body:', req.body || 'No Body');

    // Build the response object
    const responseBody = {
        method: req.method,
        path: uri.pathname,
        headers: req.headers,
        query: queryParams,
        body: req.body || null
    };

    // Send the response
    res.status(status).json(responseBody);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error handling request:', err.message);
    res.status(500).json({
        error: 'Internal Server Error'
    });
});

// Start the server
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});

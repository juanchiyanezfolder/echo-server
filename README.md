# Echo Server

## Description

The Echo Server is a simple Node.js application designed to handle HTTP requests by echoing back the request body. It serves as a useful tool for testing API clients and understanding HTTP server behavior.

## Features

- **Handles various HTTP methods**: Supports GET, POST, PUT, DELETE, and more.
- **Echoes request body**: Returns the body of the incoming request.
- **Customizable status codes**: Allows specifying HTTP response status codes via query parameters.
- **Detailed request logging**: Outputs request method, URL, headers, and body for debugging.
- **OAuth Token Endpoint**: Simulates OAuth authentication by generating a JWT access token using `client_id` and `client_secret`.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (optional, for containerization)

## Getting Started

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/echo-server.git
cd echo-server
```

### Installation

Install the dependencies

`npm install`

### Runing the server

#### Option 1: Run Locally
To start the server locally, use the following command:

`npm start`

#### Option 2: Run in Docker

If you prefer to run the server in a Docker container, follow these steps:

1- Build the Docker image:

`docker build -t echo-server`

2- Run the Docker container:

`docker run -p 8083:8083 echo-server`

The server will be accessible at http://localhost:8083.

### Testing the Echo Server

You can test the server using tools like Postman or curl.

#### Using curl
Here’s an example of how to send a POST request with JSON data:

`curl -X POST http://localhost:8083/echo -H "Content-Type: application/json" -d '{"message": "Hello!"}'`

### Using Postman
##### 1- Open Postman.
##### 2- Set the request type to POST.
##### 3- Enter the URL: http://localhost:8083/echo.
##### 4- In the Headers tab, add:
##### 5- Key: Content-Type
##### 6- Value: application/json
##### 7- In the Body tab, select raw and enter your JSON data:

```json
{
    "message": "Hello!"
}
```

### Customizing Status Codes
You can customize the HTTP response status code by adding a status query parameter to your request. For example:

`curl -X POST "http://localhost:8083/echo?status=404" -H "Content-Type: application/json" -d '{"message": "Not Found!"}'`

### Logging Requests
The server logs the details of each incoming request to the console, including the method, URL, headers, and body. This is useful for debugging and understanding server behavior.

### Testing the OAuth Token Endpoint
The /oauth/token endpoint simulates an OAuth token generation for testing purposes. It accepts client_id and client_secret, and generates a JWT access token.

#### Request
##### 1- Method: `POST`
##### 2- URL: /oauth/token
##### 3- Headers: Content-Type: application/x-www-form-urlencoded
##### 4- Body Parameters:

```json
{
    "grant_type": "client_credentials", //Must be "client_credentials"
    "client_id": "Your OAuth client ID",
    "client_secret": "Your OAuth client secret"
}
```

#### Example Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```
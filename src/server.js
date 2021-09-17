const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');
const xmlHandler = require('./xmlResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlDictionary = {
    'GET': {
        'application/json': {
            '/': htmlHandler.getIndex,
            '/style.css': htmlHandler.getCSS,
            '/success': jsonHandler.getSuccess,
            '/badRequest': jsonHandler.getBadRequest,
            '/unauthorized': jsonHandler.getUnauthorized,
            '/forbidden': jsonHandler.getForbidden,
            '/internal': jsonHandler.getInternal,
            '/notImplemented': jsonHandler.getNotImplemented,
            notFound: jsonHanlder.notFound,
        },
        'text/xml': {
            '/': htmlHandler.getIndex,
            '/style.css': htmlHandler.getCSS,
            '/success': xmlHandler.getSuccess,
            '/badRequest': xmlHandler.getBadRequest,
            '/unauthorized': xmlHandler.getUnauthorized,
            '/forbidden': xmlHandler.getForbidden,
            '/internal': xmlHandler.getInternal,
            '/notImplemented': xmlHandler.getNotImplemented,
            notFound: xmlHandler.notFound,
        },
    },
};

// Handles new information being posted to the application.
const handlePost = (request, response, parsedUrl) => {

};

// Handles sending data from the application to the user.
const handleGet = (request, response, parsedUrl) => {

};

// Parses URL and determines what kind of operation the API is handling.
const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);

    const acceptedTypes = request.headers.accept.split(',');
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
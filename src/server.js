const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses');
const getHandler = require('./getResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlDictionary = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': getHandler.getCSS,
    '/success': getHandler.getSuccess,
    '/badRequest': getHandler.getBadRequest,
    '/unauthorized': getHandler.getUnauthorized,
    '/forbidden': getHandler.getForbidden,
    '/internal': getHandler.getInternal,
    '/notImplemented': getHandler.getNotImplemented,
    notFound: getHandler.getNotFound,
  },
};

// Handles sending data from the application to the user.
const handleGet = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const acceptedTypes = request.headers.accept.split(',');
  if (urlDictionary[request.method][parsedUrl.pathname]) {
    urlDictionary[request.method][parsedUrl.pathname](request, response);
  } else {
    urlDictionary[request.method].notFound(request, response);
  }
};

// Parses URL and determines what kind of operation the API is handling.
const onRequest = (request, response) => {
  if (request.method === 'GET') handleGet(request, response);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

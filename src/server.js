const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses');
const getHandler = require('./getResponses');
const postHandler = require('./postResponses');
const headHandler = require('./headResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlDictionary = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': getHandler.getSuccess,
    '/badRequest': getHandler.getBadRequest,
    '/unauthorized': getHandler.getUnauthorized,
    '/forbidden': getHandler.getForbidden,
    '/internal': getHandler.getInternal,
    '/notImplemented': getHandler.getNotImplemented,
    '/getUsers': getHandler.getUsers,
    '/notReal': getHandler.getNotFound,
    notFound: getHandler.getNotFound,
  },
  HEAD: {
    '/getUsers': headHandler.getUsersHead,
    '/notReal': headHandler.getNotFoundHead,
    notFound: headHandler.getNotFoundHead,
  },
  POST: {
    '/addUser': postHandler.addUser,
    notFound: getHandler.getNotFound,
  }
};

// Handles sending data from the application to the user.
const handleGet = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (urlDictionary[request.method][parsedUrl.pathname]) {
    urlDictionary[request.method][parsedUrl.pathname](request, response);
  } else {
    urlDictionary[request.method].notFound(request, response);
  }
};

const handlePost = (request, response) => {

};

// Parses URL and determines what kind of operation the API is handling.
const onRequest = (request, response) => {
  if (request.method === 'GET') handleGet(request, response);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

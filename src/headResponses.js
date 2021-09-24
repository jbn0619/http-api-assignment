const url = require('url');

const getUsersHead = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end();
};

const getNotFoundHead = (request, response) => {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end();
};

module.exports = {
    getUsersHead,
    getNotFoundHead,
  };
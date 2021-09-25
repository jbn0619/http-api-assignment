const query = require('querystring');
const getHandler = require('./getResponses');

const addUser = (request, response) => {
  // uploads come in as a byte stream that we need
  // to reassemble once it's all arrived
  const body = [];

  // if the upload stream errors out, just throw a
  // a bad request and send it back
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  // on 'data' is for each byte of data that comes in
  // from the upload. We will add it to our byte array.
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // on end of upload stream.
  request.on('end', () => {
    // combine our byte array (using Buffer.concat)
    // and convert it to a string value (in this instance)
    const bodyString = Buffer.concat(body).toString();
    // since we are getting x-www-form-urlencoded data
    // the format will be the same as querystrings
    // Parse the string into an object by field name
    const bodyParams = query.parse(bodyString);

    if (getHandler.users[bodyParams.name]) {
      getHandler.users[bodyParams.name] = bodyParams;

      response.writeHead(204, { 'Content-Type': 'application/json' });
      const responseObj = {
        message: 'Updated!',
      };
      response.write(JSON.stringify(responseObj));
      response.end();
    } else if (bodyParams.name && bodyParams.age) {
      getHandler.users[bodyParams.name] = bodyParams;

      response.writeHead(201, { 'Content-Type': 'application/json' });
      const responseObj = {
        message: 'Success!',
      };
      response.write(JSON.stringify(responseObj));
      response.end();
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      const responseObj = {
        message: 'Missing required user parameters.',
      };
      response.write(JSON.stringify(responseObj));
      response.end();
    }
  });
};

module.exports = {
  addUser,
};

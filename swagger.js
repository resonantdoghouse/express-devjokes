require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

let host, schemes;

if (process.env.NODE_ENV === 'development') {
  host = `localhost:${process.env.PORT}`;
  schemes: ['http'];
} else {
  ('developerjokes.herokuapp.com');
  schemes: ['https'];
}

const doc = {
  info: {
    title: 'DevJokes API',
    description: 'A practice REST API with cringe-worthy jokes',
  },
  schemes,
  host,
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

require('dotenv').config()
const swaggerAutogen = require('swagger-autogen')();

let host = process.env.NODE_ENV === 'development' ? `localhost:${process.env.PORT}` : `developerjokes.herokuapp.com`;

const doc = {
  info: {
    title: 'DevJokes API',
    description: 'A practice REST API with cringe-worthy jokes',
  },
  host: host,
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  // .then(() => {
  //   require('./server');
  // })
  // .catch((err) => {
  //   console.error(err);
  // });

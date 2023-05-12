// require('dotenv').config()
const swaggerAutogen = require('swagger-autogen')();

console.log('PORT', process.env.PORT)

const doc = {
  info: {
    title: 'DevJokes API',
    description: 'A practice REST API with cringe-worthy jokes',
  },
  host: `localhost:${process.env.PORT}`,
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

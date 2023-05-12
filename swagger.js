const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'DevJokes API',
    description: 'A practice REST API with cringe-worthy jokes',
  },
  host: 'localhost:5051',
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    require('./server');
  })
  .catch((err) => {
    console.error(err);
  });

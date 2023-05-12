const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const jokeRoutes = require('./routes/jokes');
const app = express();
const PORT = process.env.PORT || 5051;

app.use(express.json());
app.use(cors());

// api routes
app.use('/jokes', jokeRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});

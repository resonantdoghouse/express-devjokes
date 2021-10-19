const express = require('express');
const cors = require('cors');
const jokesRoutes = require('./routes/jokes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API' });
});

// api routes
app.use('/jokes', jokesRoutes);

app.listen(PORT, console.log(`App running at http://localhost:${PORT}`));

const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();

// load video json file using the File System module `fs`
function loadJokesData() {
  return JSON.parse(fs.readFileSync('./data/jokes.json', 'utf8'));
}

router.get('/', (_req, res) => {
  // #swagger.description = 'Get all jokes'
  res.json(loadJokesData());
});

router.get('/random', (_req, res) => {
  // #swagger.description = 'Get a random joke from the jokes collection'
  const jokes = loadJokesData();
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json(joke);
});

router.get('/:id', (req, res) => {
  // #swagger.description = 'Get a single joke by it\'s id'
  const jokes = loadJokesData();
  const filteredJokes = jokes.filter((joke) => joke.id === req.params.id);
  if (filteredJokes.length === 0) {
    res
      .status(404)
      .json({ message: `Joke with id: ${req.params.id} not found` });
  } else {
    res.json(filteredJokes.shift());
  }
});

router.post('/', checkAuth, (req, res) => {
  // #swagger.description = 'Post a new joke to the jokes collection'
  if (!req.body.question || !req.body.answer) {
    res.status(400).json({ message: 'bad request, please provide a question and answer' });
  } else {
    const jokes = loadJokesData();
    const joke = {
      id: uuidv4(),
      question: req.body.question,
      answer: req.body.answer,
      posted: Date.now(),
    };
    jokes.push(joke);
    fs.writeFileSync('./data/jokes.json', JSON.stringify(jokes), 'utf8');
    res.status(200).json({ message: 'joke created', jokes });
  }
});

// update joke
router.put('/:id', checkAuth, (req, res) => {
  if (!req.body) {
    res.json(400).json({
      message: 'bad request, please provide at least a question or answer',
    });
  } else {
    const jokes = loadJokesData();
    const jokeIndex = jokes.findIndex((joke) => joke.id === req.params.id);
    if (jokeIndex === -1) {
      res
        .status(404)
        .json({ message: `Joke with id: ${req.params.id} not found` });
    } else {
      const joke = jokes[jokeIndex];
      if (req.body.question) joke.question = req.body.question;
      if (req.body.answer) joke.answer = req.body.answer;
      jokes.splice(jokeIndex, 1, joke);
      fs.writeFileSync('./data/jokes.json', JSON.stringify(jokes), 'utf8');
      res.status(200).json({ success: 'joke updated', jokes });
    }
  }
});

// delete single joke by id
router.delete('/:id', checkAuth, (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Error joke not deleted' });
  } else {
    const jokes = loadJokesData();
    const jokeIndex = jokes.findIndex((joke) => joke.id === req.params.id);
    if (jokeIndex === -1) {
      res
        .status(404)
        .json({ message: `Joke with id: ${req.params.id} not found` });
    } else {
      jokes.splice(jokeIndex, 1);
      fs.writeFileSync('./data/jokes.json', JSON.stringify(jokes), 'utf8');
      res.json({ success: 'joke deleted', jokes });
    }
  }
});




module.exports = router;

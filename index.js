const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');


app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

// Middleware
app.use(bodyParser.json());

// In-memory storage
let ingredients = [];
let currentStage = 1;


// API routes
app.post('/api/ingredients', (req, res) => {
  ingredients = req.body;
  res.json({ message: 'Ingredients saved successfully' });
});


app.get('/api/ingredients', (req, res) => {
  res.json(ingredients);
});

app.get('/api/stage', (req, res) => {
  res.json({ currentStage });
});

try {
  app.post('/api/stage', (req, res) => {
  currentStage = req.body.stage;
  res.json({ message: 'Stage updated successfully' });
})
}
catch(e){
  console.error('ошибка рендера текущей стадии', err)
}

app.get('/api/recipes', (req, res) => {
  fs.readFile(path.join(__dirname, 'cook.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading cook.json:', err);
      return res.status(500).json({ error: 'Error reading recipes' });
    }
    try {
      const recipes = JSON.parse(data);
      res.json(recipes);
    } catch (parseError) {
      console.error('Error parsing cook.json:', parseError);
      res.status(500).json({ error: 'Error parsing recipes' });
    }
  });
});


// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
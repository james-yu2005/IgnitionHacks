// server.js
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Register routes
app.use('/api/openai/skills_query', skillsQeury);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
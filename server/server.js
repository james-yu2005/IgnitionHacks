const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const openaiRoutes = require('./routes/openai/skills'); // Corrected path

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the routes for OpenAI skills
app.use('/openai/skills', openaiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();
const { querySkills } = require('../../controllers/query_skills'); // Ensure the path is correct

// POST request to /openai/skills/query
router.post('/query', querySkills);

module.exports = router;

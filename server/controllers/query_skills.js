const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const querySkills = async (req, res) => {
  const { message_from_user, context_for_ai } = req.body;

  if (!message_from_user || !context_for_ai) {
    return res.status(400).json({ error: "Both message_from_user and context_for_ai are required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: context_for_ai },
        { role: "user", content: message_from_user },
      ],
      max_tokens: 500,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while querying the AI.");
  }
};

module.exports = {
  querySkills,
};

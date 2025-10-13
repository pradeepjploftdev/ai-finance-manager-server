import OpenAI from "openai";

const apiKey = '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'

const openai = new OpenAI({apiKey});

console.log('[apiKey]', process.env.OPENAI_API_KEY)

export const extractExpense = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Extract expense from this text in JSON format like {"category": "...", "amount": 0}: ${text}`
        }
      ],
      temperature: 0
    });

    const responseText = completion.choices[0].message.content;

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI API request failed" });
  }
};
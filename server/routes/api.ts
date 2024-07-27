import express from 'express';
import { callOpenAI } from '../../apiClient.ts';  // Adjust the import path as necessary

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('Received request at /api/v1');

    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Who won the world series in 2020?' },
      { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
      { role: 'user', content: 'Where was it played?' }
    ];

    console.log('Calling OpenAI...');
    const resData = await callOpenAI(messages);
    console.log('OpenAI response:', resData);

    res.json(resData);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error:', err.message);
      res.status(500).send(err.message);
    } else {
      console.error('Unknown error');
      res.status(500).send('Something went wrong');
    }
  }
});

router.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;  // Extract the prompt from the request body
console.log(prompt);

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Define the messages structure based on the incoming prompt
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ];

    // Call the OpenAI API
    const responseData = await callOpenAI(messages);

    // Extract relevant information from the response
    const completion = responseData.choices[0]?.message?.content || 'No response from AI';

    // Return a user-friendly response
    res.json({
      response: completion,
      usage: responseData.usage,
      id: responseData.id,
      model: responseData.model,
    });

  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
});


export default router;



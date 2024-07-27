import express from 'express';
// import { callOpenAI } from '../../apiFunction.ts';  // Adjust the import path as necessary
import fetch from 'node-fetch'; // Ensure you have node-fetch installed
import 'dotenv/config';
const router = express.Router();
const apiKey = process.env.OPENAI_API_KEY;
const openaiUrl = 'https://api.openai.com/v1/chat/completions'
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

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Define the messages structure based on the incoming prompt
    const messages = [
      { role: 'system', content: 'You are a helpful teaching assistant that is responding to a beginner student. Please be patient and clear with your answers.' },
      { role: 'user', content: prompt }
    ];

    // Call OpenAI API without streaming
    const response = await fetch(openaiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: await response.text() });
    }

    const data = await response.json() as any; // Parse the JSON response
    // Add the assistant's response to the messages array
    const sanitisedResponse = data.choices[0].message.content
    // Send the response back to the client
    res.json(sanitisedResponse);

  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
});

// router.post('/stream', async (req, res) => {
//   try {
//     const { prompt } = req.body;  // Extract the prompt from the request body
// // console.log(prompt);

//     if (!prompt) {
//       return res.status(400).json({ error: 'Prompt is required' });
//     }

//     // Define the messages structure based on the incoming prompt
//     const messages = [
//       { role: 'system', content: 'You are a helpful teaching assistant that is responding to a beginner student. Pleas be patient and clear with your answers.' },
//       { role: 'user', content: prompt }
//     ];

//      // Call OpenAI API with stream enabled
//      const response = await fetch(openaiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages: messages,
//         stream: true // Enable streaming
//       })
//     });

//     if (!response.ok) {
//       return res.status(response.status).json({ error: await response.text() });
//     }

//     console.log("unalteredRes: ", response);
    
//     // Set response headers for streaming
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');

//     // Stream data from OpenAI to the client
//     const alteredResponse = response.body?.pipe(res);
//     console.log('altered:', alteredResponse);
//     return alteredResponse;

//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   }
// });


export default router;



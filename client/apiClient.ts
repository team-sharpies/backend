import request from 'superagent'
import { Welcome } from '../models/response.ts'

const serverURL = '/api/v1'

// *** EXAMPLE ***
export function getWelcome(): Promise<Welcome> {
  return request.get(`${serverURL}/welcome`).then((response) => response.body)
}
// ***   ***   ***

// Test front end stuff


// Function to fetch and handle streamed response
export async function fetchStreamedResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:3000/api/v1/llm/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';

    // Read the stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode and process each chunk
      result += decoder.decode(value, { stream: true });
    }

    // Return the full response
    console.log("apiClient:", result);
    
    return result;
  } catch (error) {
    console.error('Error fetching streamed response:', error);
    throw error;
  }
}

// Example usage
// fetchStreamedResponse('Who won the World Series in 2020?')
//   .then(response => {
//     console.log('Full response:', response);
//   })
//   .catch(error => {
//     console.error('Error fetching streamed response:', error);
//   });
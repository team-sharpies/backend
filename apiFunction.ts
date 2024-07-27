import fetch from 'node-fetch';
import 'dotenv/config';

export async function fetchAndProcessStreamedResponse() {
  const response = await fetch('http://localhost:3000/api/v1/llm/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: 'Who won the World Series in 2020?' }),
  });
  if (response) {
  console.log({response});

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    
    const reader = response.body.getReader();
    // console.log({reader});
    
    const decoder = new TextDecoder('utf-8');
    let result = '';
    
    // Read the stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // Decode and process each chunk
      const chunk = decoder.decode(value, { stream: true });
      
      // Process the chunk
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '));
      for (const line of lines) {
        const data = line.slice(6); // Remove 'data: ' prefix
        if (data === '[DONE]') break; // End of stream
        try {
          const json = JSON.parse(data);
          if (json.choices && json.choices[0].delta && json.choices[0].delta.content) {
            result += json.choices[0].delta.content;
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
      
      // Display the current result
      // console.log(result);
    }
    
    return result;
  }
  }
  
// Example usage
// fetchAndProcessStreamedResponse()
//   .then(response => {
//     console.log('Full response:', response);
//   })
//   .catch(error => {
//     console.error('Error fetching streamed response:', error);
//   });



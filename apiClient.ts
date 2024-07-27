import request from 'superagent'
import { Welcome } from '../models/welcome.ts'
import 'dotenv/config'

const serverURL = '/api/v1'

// *** EXAMPLE ***
export function getApiRes(): Promise<Welcome> {
  return request.get(`${serverURL}/llm`).then((response) => response.body)
}
// ***   ***   ***

import fetch from 'node-fetch';

// const AZURE_AI_ENDPOINT = 'https://your-proxy-endpoint.com';
// const API_KEY = 'your-api-key';

// to access the key variable
const apiKey = process.env.API_KEY
const apiProxy = process.env.PROXY_ENDPOINT
export async function callAzureAI(data: any): Promise<any> {
  const response = await fetch(apiProxy, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': apiKey
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// Example usage
const requestData = {
  // Your request data here
  documents: [
    {
      language: "en",
      id: "1",
      text: "I love programming with TypeScript!"
    },
    {
      language: "en",
      id: "2",
      text: "Express is a great framework for building web applications."
    }
  ]
};

callAzureAI(requestData)
  .then(responseData => {
    console.log('Response from Azure AI:', responseData);
  })
  .catch(error => {
    console.error('Error calling Azure AI:', error);
  });

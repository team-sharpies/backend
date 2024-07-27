// import request from 'superagent'
// // import { Welcome } from '../models/welcome.ts'
// import 'dotenv/config'

// const serverURL = '/api/v1'

// export function getApiRes(): Promise<any> {
//   return request.get(`${serverURL}/llm`).then((response) => response.body)
// }

// import fetch from 'node-fetch';
// import 'dotenv/config';

// const apiKey = process.env.API_KEY;
// const apiProxy = process.env.PROXY_ENDPOINT;

// if (!apiKey || !apiProxy) {
//   throw new Error('API_KEY and PROXY_ENDPOINT must be set in the .env file');
// }
// interface Message {
//   role: string;
//   content: string;
// }

// export async function callAzureAI(messages: Message[]): Promise<any> {
//   console.log(`API Key: ${apiKey}`);
//   console.log(`API Proxy: ${apiProxy}`);

//   const data = {
//     // model: "gpt-35-turbo",
//     model: "shesharp-fp-hack-gpt35-turbo-16K",
//     messages: messages,
//     api_version: "2024-02-01"
//   };

//   const response = await fetch(`${apiProxy}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Ocp-Apim-Subscription-Key': apiKey,
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.statusText}`);
//   }

//   return await response.json();
// }


import fetch from 'node-fetch';
import 'dotenv/config';

const apiKey = process.env.OPENAI_API_KEY;
const apiProxy = 'https://api.openai.com/v1';

if (!apiKey) {
  throw new Error('OPENAI_API_KEY must be set in the .env file');
}

interface Message {
  role: string;
  content: string;
}

export async function callOpenAI(messages: Message[]): Promise<any> {
  const data = {
    model: "gpt-3.5-turbo",
    messages: messages,
  };

  const url = `${apiProxy}/chat/completions`;
  console.log(`Request URL: ${url}`);
  console.log(`Request Data: ${JSON.stringify(data, null, 2)}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error: ${response.statusText} - ${errorText}`);
      throw new Error(`Error: ${response.statusText} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log(`Response Data: ${JSON.stringify(responseData, null, 2)}`);
    return responseData;

  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
    throw error;
  }
}

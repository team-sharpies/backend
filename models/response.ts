export interface Welcome {
  statement: string
}

// models/response.ts

export interface OpenAIResponse {
  response: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  id: string;
  model: string;
}
Cloudflare Workers AI Chat Completion API

Overview

This project implements an API similar to OpenAI's chat completions using Cloudflare Workers AI and Llama 3 + Mistral models. The API provides chat completion capabilities using both small and large models from Llama 3 and Mistral.
HTTP was chosen as the communication protocol due to its simplicity, universality, and ease of integration.

Features

Supports four AI models:

Llama 3 Small (@cf/meta/llama-3-8b-instruct-awq)

Llama 3 Large (@hf/meta-llama/meta-llama-3-8b-instruct)

Mistral Small (@cf/mistral/mistral-7b-instruct-v0.1)

Mistral Large (@hf/mistral/mistral-7b-instruct-v0.2)

Uses Cloudflare Workers AI to process AI-generated responses.

Accepts POST requests with a simple JSON payload.

Model selection is optional (defaults to Llama 3 Large).

Implements basic error handling.

API Usage

Endpoint: POST https://llama-worker.harrismaqsoodmir.workers.dev

prompt (string) [Required] - The text input for AI completion.

model (string) [Optional] - The model to use. Available options:

llama-3-small

llama-3-large

mistral-small

mistral-large

cURL Example:

curl --location 'https://llama-worker.harrismaqsoodmir.workers.dev' \
--header 'Content-Type: application/json' \
--data '{
  "model": "mistral-small",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Explain quantum computing in simple terms." }
  ],
  "temperature": 0.8,
  "max_tokens": 512,
  "top_p": 0.9,
  "top_k": 40,
  "seed": 123,
  "repetition_penalty": 1.2,
  "frequency_penalty": 0.1,
  "presence_penalty": 0.1
}'

For running locally

use command
- npm install -g wrangler

clone the repo
 - cd the-repo
 - wrangler login
 - wrangler deploy (Note the deployed Worker URL e.g., https://your-worker.your-subdomain.workers.dev)

for running locally
 - npm run dev  OR
 - wrangler dev

Future challenges
We can give other features like choices by using the model to generate the response multiple times simultaneously and use it as choices. 

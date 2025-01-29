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
    "prompt": "What does a cat eat?",
    "model": "llama-3-small"
}'

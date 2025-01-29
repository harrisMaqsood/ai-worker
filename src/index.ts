export default {
	async fetch(request, env, ctx): Promise<Response> {
		type RequestBody = {
			model?: string;
			messages: { role: 'system' | 'user' | 'assistant'; content: string }[];
			temperature?: number;
			max_tokens?: number;
			top_p?: number;
			top_k?: number;
			seed?: number;
			repetition_penalty?: number;
			frequency_penalty?: number;
			presence_penalty?: number;
		};

		const roles = ['system', 'user', 'assistant'];
		const models: { [key: string]: string } = {
			'llama-3-small': '@cf/meta/llama-3-8b-instruct-awq',
			'llama-3-large': '@hf/meta-llama/meta-llama-3-8b-instruct',
			'mistral-small': '@cf/mistral/mistral-7b-instruct-v0.1',
			'mistral-large': '@hf/mistral/mistral-7b-instruct-v0.2',
		};

		try {
			// Validate request method
			if (request.method !== 'POST') {
				return Response.json({
					status: 400,
					message: 'Only POST method is allowed.',
				});
			}

			const {
				messages = [],
				max_tokens = 256,
				temperature = 0.6,
				top_p = 1,
				top_k = 50,
				seed,
				repetition_penalty = 1.0,
				frequency_penalty = 0.0,
				presence_penalty = 0.0,
				model,
			}: RequestBody = await request.json();

			if (!messages || messages.length <= 0) {
				return Response.json({
					status: 400,
					message: 'The "messages" field is required and cannot be empty.',
				});
			}

			if (model && !models[model]) {
				return Response.json({
					status: 400,
					message: 'Invalid model provided. Please use a valid model name.',
				});
			}

			const invalidRole = messages.find((msg) => !roles.includes(msg.role.toLowerCase()));
			if (invalidRole) {
				return Response.json({
					status: 400,
					message: `Invalid role in messages: ${invalidRole.role}`,
				});
			}

			const modelToUse = model ? models[model] : models['llama-3-large'];

			const modelParams = {
				messages: messages.map((msg) => ({
					...msg,
					role: roles.includes(msg.role.toLowerCase()) ? msg.role.toLowerCase() : 'user',
					content: msg.content || '',
				})),
				max_tokens,
				temperature,
				top_p,
				top_k,
				seed,
				repetition_penalty,
				frequency_penalty,
				presence_penalty,
			};

			const response = await env.AI.run(modelToUse, modelParams);

			return Response.json({
				status: 200,
				response,
			});
		} catch (error) {
			console.log(error);
			return Response.json({
				status: 500,
				message: 'Internal server error',
				error,
			});
		}
	},
} satisfies ExportedHandler<Env>;

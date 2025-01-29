export default {
	async fetch(request, env, ctx): Promise<Response> {
		type RequestBody = {
			prompt: string;
			model?: string;
		};
		const models: { [key: string]: string } = {
			'llama-3-small': '@cf/meta/llama-3-8b-instruct-awq',
			'llama-3-large': '@hf/meta-llama/meta-llama-3-8b-instruct',
			'mistral-small': '@cf/mistral/mistral-7b-instruct-v0.1',
			'mistral-large': '@hf/mistral/mistral-7b-instruct-v0.2',
		};
		try {
			if (request.method !== 'POST') {
				return Response.json({
					status: 400,
					message: 'only post method allowed',
				});
			}
			const { prompt, model }: RequestBody = await request.json();
			if (!prompt) {
				return Response.json({
					status: 400,
					message: 'prompt is required',
				});
			}
			const response = await env.AI.run((model && models[model]) || models['llama-3-large'], {
				prompt,
			});
			return Response.json({
				status: 200,
				data: response,
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

// Generated by Wrangler
// After adding bindings to `wrangler.json`, regenerate this interface via `npm run cf-typegen`
interface Env {
	AI: {
		run: (model: string, input: Record<string, any>) => Promise<any>;
	};
}

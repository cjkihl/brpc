import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { router } from "./routes";
import { createContext } from "./trpc";

// Run tRPC server with the the native Bun http server
Bun.serve({
	fetch(req) {
		return fetchRequestHandler({
			endpoint: "/trpc",
			req,
			router,
			createContext,
		});
	},
});

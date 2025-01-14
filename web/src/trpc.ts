import {
	createTRPCProxyClient,
	unstable_httpBatchStreamLink,
} from "@trpc/client";

import type { AppRouter } from "server";

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		unstable_httpBatchStreamLink({
			url: "http://localhost:3000/trpc",

			// Example of how to set headers for every request
			// Removing the authorization header will make protected procedures fail
			async headers() {
				return {
					authorization: "Bearer secret",
				};
			},
		}),
	],
});

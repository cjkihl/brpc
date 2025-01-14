import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { router } from "./routes";
import { createContext } from "./trpc";
import { cors } from "./middlewares";

Bun.serve({
  fetch: cors(
    async (req) => {
      return await fetchRequestHandler({
        endpoint: "/trpc",
        req,
        router,
        createContext,
      });
    },
    {
      headers: ["*"], // Allow all cors headers for tRPC to work
    }
  ),
});

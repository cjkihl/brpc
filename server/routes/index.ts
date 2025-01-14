import { protectedProcedure, publicProcedure, trpc } from "../trpc";
import { authRoute } from "./auth";

/**
 * Example tRPC router with one subrouter (auth),
 * one public procedure (ping)
 * and one protected procedure (protected)
 */
export const router = trpc.router({
	auth: authRoute,
	ping: publicProcedure.query(() => "pong"),
	protected: protectedProcedure.query(() => "Nice, you remembered your token!"),
});

export type AppRouter = typeof router;
